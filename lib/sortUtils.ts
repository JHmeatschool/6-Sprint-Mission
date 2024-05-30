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

// 최신 순으로 정렬하는 함수
export function sortByLatest(articles: Article[]): Article[] {
  return articles.slice().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

// 좋아요 순으로 정렬하는 함수
export function sortByLikes(articles: Article[]): Article[] {
  return articles.slice().sort((a, b) => b.likeCount - a.likeCount);
}
