module.exports = {
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
