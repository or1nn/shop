export const getFormatTitle = (title: string) =>
  title.length > 70 ? `${title.slice(0, 70).trimEnd()}...` : title;
