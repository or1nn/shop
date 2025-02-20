import ContentLoader from 'react-content-loader';

export const Skeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={365}
      viewBox="0 0 250 380"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="15" y="20" rx="10" ry="10" width="160" height="200" />
      <rect x="205" y="20" rx="20" ry="20" width="30" height="30" />
      <rect x="5" y="438" rx="10" ry="10" width="95" height="30" />
      <rect x="15" y="240" rx="10" ry="10" width="220" height="50" />
      <rect x="15" y="315" rx="10" ry="10" width="150" height="40" />
      <rect x="200" y="315" rx="20" ry="20" width="40" height="40" />
    </ContentLoader>
  );
};
