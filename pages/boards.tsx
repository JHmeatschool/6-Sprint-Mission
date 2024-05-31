import instance from "../lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../lib/dateUtils";
import { searchArticles } from "../lib/searchUtils";
import { sortByLatest, sortByLikes } from "../lib/sortUtils";

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

const SortDropdown = styled.div`
  position: relative;
`;

const SortButton = styled.button`
  background-color: transparent;
  border: none;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DropdownContent = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled.button`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: #f1f1f1;
  }
`;
export default function Boards() {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("latest");

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

  const handleSortByLatest = () => {
    setSortBy("최신순");
    setDropdownVisible(false);
  };

  const handleSortByLikes = () => {
    setSortBy("좋아요순");
    setDropdownVisible(false);
  };

  let sortedArticles: Article[] = allArticles;
  if (sortBy === "최신순") {
    sortedArticles = sortByLatest(allArticles);
  } else if (sortBy === "좋아요순") {
    sortedArticles = sortByLikes(allArticles);
  }

  const filteredArticles = searchArticles(allArticles, searchQuery);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <SortDropdown>
        <SortButton onClick={() => setDropdownVisible(!dropdownVisible)}>
          {sortBy} ▼
        </SortButton>
        <DropdownContent visible={dropdownVisible}>
          <DropdownItem onClick={handleSortByLatest}>최신 순</DropdownItem>
          <DropdownItem onClick={handleSortByLikes}>좋아요 순</DropdownItem>
        </DropdownContent>
      </SortDropdown>
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
