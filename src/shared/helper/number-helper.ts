export const formatViews = (views: number) => {
  if (views < 1000) return views;

  return `${(views / 1000).toFixed(1)}k`;
};
