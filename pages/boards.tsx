import instance from "../lib/axios";
import Image from "next/image";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../lib/dateUtils";

const Layout = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ArticlesWrapper = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const ArticleContainer = styled.div`
  width: 384px;
  height: 169px;
  gap: 0px;
  opacity: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BestTitle = styled.h2`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.87px;
  text-align: left;
  position: relative;
  left: 360px;
`;

const BestBadge = styled.div`
  position: absolute;
  top: 0;
  left: 24px;
`;

const ArticleTitle = styled.h2`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 23.87px;
  text-align: left;
  position: absolute;
  top: 24px;
  left: 24px;
  max-width: 336px;
  word-wrap: break-word;
`;

const WriterLikeDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 336px;
  margin-top: 110px;
`;

const WriterLikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateContainer = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: left;
  color: #9ca3af;
`;

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
    <Layout>
      <Header />
      <BestTitle>베스트 게시글</BestTitle>
      <ArticlesWrapper>
        {bestArticles.map((article) => (
          <ArticleContainer key={article.id}>
            <BestBadge>
              <Image
                src="/images/bestbadge.svg"
                alt="베스트 게시글"
                width={102}
                height={30}
              />
            </BestBadge>
            <ArticleTitle>{article.title}</ArticleTitle>
            <WriterLikeDateContainer>
              <WriterLikeContainer>
                <p>{article.writer.nickname}</p>
                <p>🤍{article.likeCount}</p>
              </WriterLikeContainer>
              <DateContainer>{formatDate(article.createdAt)}</DateContainer>
            </WriterLikeDateContainer>
          </ArticleContainer>
        ))}
      </ArticlesWrapper>
    </Layout>
  );
}
