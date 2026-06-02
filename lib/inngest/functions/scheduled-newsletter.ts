import { inngest } from "../client";
import { fetchArticles } from "../../news";

export default inngest.createFunction(
  { id: "newsLetter/scheduled", triggers: { event: "newsletter.schedule" } },
  async ({ event, step }) => {
    const allArticles = await step.run("fetch-news", async () => {
      const categories = [
        "technology",
        "health",
        "sports",
        "entertainment",
        "business",
      ];

      return fetchArticles(categories);
    });
  },
);
