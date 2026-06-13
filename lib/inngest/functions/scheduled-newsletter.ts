import { inngest } from "../client";
import { fetchArticles } from "../../news";
import { marked } from "marked";
import { sendEmail } from "@/lib/email";
import { createClient } from "@/lib/server";

export default inngest.createFunction(
  {
    id: "newsLetter/scheduled",
    cancelOn: [{ event: "newsletter.schedule.deleted", match: "data.user_id" }], // Cancel this function if a "newsletter.schedule.deleted" event is received with a matching user_id
    triggers: [{ event: "newsletter.schedule" }],
  },
  async ({ event, step }) => {
    const isUserActive = await step.run("check-user-status", async () => {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("user_preferences")
        .select("is_active")
        .eq("user_id", event.data.user_id)
        .single();

      if (error) {
        console.error("Error fetching user preferences:", error);
      }

      return data?.is_active || false;
    });

    if (!isUserActive) {
      console.log(
        `User ${event.data.user_id} is not active. Skipping newsletter.`,
      );
      return { message: "User is not active. Newsletter not sent." };
    }

    const categories = event.data.categories;
    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

    const summary = await step.ai.infer("summarize-articles", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an expert newsletter editor creating a personalized newsletter.
            Write a concise, engaging summary that:
            - highlights the most important stories
            - provides context and insights
            - Uses a friendly, conventional tone
            - Is well-structured with clear sections for each story
            - keeps the reader informed and engaged
            format the response as a proper newsletter with title and organized content.
            Make it email-friendly with clear sections and engaging subject lines.

            Create a newsletter summary for these articles from the past week.
            categories requested: ${categories.join(", ")}
            
            Articles: 
            ${allArticles.map((article: any, idx: number) => `${idx + 1}. ${article.title} \n ${article.description} \n Source: ${article.url}\n`).join("\n")}`,
              },
            ],
          },
        ],
      },
    });

    const newsLetterContent = summary.candidates?.[0]?.content
      ?.parts?.[0] as any;

    if (!newsLetterContent) {
      throw new Error("Failed to generate newsletter content");
    }

    const htmlContent = await marked(newsLetterContent.text);

    const sendResult = await step.run("send-newsletter", async () => {
      return await sendEmail(
        event.data.categories.join(", "),
        event.data.email,
        allArticles.length,
        htmlContent,
      );
    });

    await step.run("schedule-next", async () => {
      const now = new Date();
      let nextSchedule: Date;

      switch (event.data.frequency) {
        case "daily":
          nextSchedule = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case "weekly":
          nextSchedule = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        case "biweekly":
          nextSchedule = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
          break;
        default:
          nextSchedule = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      }
      nextSchedule.setHours(9, 0, 0, 0); // Set to 9 AM. Change only the time, keep the date as calculated above.

      await inngest.send({
        name: "newsletter.schedule",
        data: {
          categories,
          email: event.data.email,
          frequency: event.data.frequency,
          user_id: event.data.user_id,
        },
        ts: nextSchedule.getTime(),
      });
    });
    return {
      message: "Newsletter sent successfully",
      newsLetter: htmlContent,
      ariclesCount: allArticles.length,
      nextScheduled: true,
    };
  },
);
