module.exports = {
  // 개발 모드에서 캐싱 비활성화
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },
};

const nextConfig = {
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
