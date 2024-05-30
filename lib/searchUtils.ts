// search.ts
export interface Article {
  id: number;
  title: string;
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  likeCount: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export function searchArticles(articles: Article[], query: string): Article[] {
  if (!query) {
    return articles;
  }

  return articles.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );
}
