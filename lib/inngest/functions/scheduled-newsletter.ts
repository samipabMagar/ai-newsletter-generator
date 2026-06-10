import { inngest } from "../client";
import { fetchArticles } from "../../news";

export default inngest.createFunction(
  { id: "newsLetter/scheduled", triggers: [{ event: "newsletter.schedule" }] },
  async ({ event, step }) => {
    const categories = [
      "technology",
      "health",
      "sports",
      "entertainment",
      "business",
    ];
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
            ${allArticles.map((article: any, idx:number) => `${idx + 1}. ${article.title} \n ${article.description} \n Source: ${article.url}\n`).join("\n")}`,
              },
            ],
          },
        ],
      },
    });

    console.log(summary);
    return {};
  },
);
