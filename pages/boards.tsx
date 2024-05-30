import instance from "../lib/axios";
import Header from "../components/Header";
import { useEffect, useState } from "react";

interface Article {
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

export default function Boards() {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await instance.get("/articles");
        console.log("Response data:", response.data);
        const sortedArticles = response.data.list.sort(
          (a: Article, b: Article) => b.likeCount - a.likeCount
        );
        const bestArticles = sortedArticles.slice(0, 3);
        console.log("Best articles:", bestArticles);
        setBestArticles(bestArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <h1>베스트 게시글</h1>
      <ul>
        {bestArticles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>좋아요 수: {article.likeCount}</p>
            <p>작성자: {article.writer.nickname}</p>
            <p>게시날짜: {article.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
