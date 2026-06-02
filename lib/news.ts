type Article = {
  title: string;
  url: string;
  description: string;
};

export const fetchArticles = async (
  categories: string[],
): Promise<Article[]> => {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(); // Last 7 days

  const promise = categories.map(async (category) => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(category)}&from=${since}&sortBy=publishedAt&apiKey=${process.env.NEWS_APIKEY}`,
      );

      if (!res.ok) {
        console.error(
          `Failed to fetch articles for category ${category}:`,
          res.statusText,
        );
        return [];
      }
      const data = await res.json();

      return data.articles.slice(0,5).map((article: any) => {
        return {
          title: article.title || "No title",
          url: article.url || "",
          description: article.description || "No description",
        };
      });
    } catch (error) {
      console.error(`Error fetching articles for category ${category}:`, error);
      return [];
    }
  });

  const results = await Promise.all(promise);
  return results.flat();
};
