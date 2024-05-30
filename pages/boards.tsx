import instance from "../lib/axios";
import Image from "next/image";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../lib/dateUtils";
import { searchArticles } from "../lib/searchUtils";

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

const BoardTitle = styled.h2`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.87px;
  text-align: left;
  position: relative;
  left: 180px;
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

const AllArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin: 0 auto;
`;

const BoardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const RegisterButton = styled.button`
  width: 88px;
  height: 42px;
  left: 1113px;
  gap: 10px;
  border: none;
  border-radius: 8px;
  opacity: 0px;
  background-color: #3692ff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
  color: #ffffff;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function Boards() {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        setAllArticles(response.data.list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredArticles = searchArticles(allArticles, searchQuery);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <BoardTitle>베스트 게시글</BoardTitle>
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

      <BoardTitleContainer>
        <BoardTitle>게시글</BoardTitle>
        <RegisterButton>글쓰기</RegisterButton>
      </BoardTitleContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      <AllArticlesWrapper>
        {filteredArticles.map((article) => (
          <ArticleContainer key={article.id}>
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
      </AllArticlesWrapper>
    </div>
  );
}
