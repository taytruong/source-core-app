export const formatMinutesToHour = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  return `${hours}h${remainMinutes}p`;
};

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('vi-VN');
};

export const timeAgo = (date: string | Date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years) return `${years} years ago`;
  if (months) return `${months} months ago`;
  if (days) return `${days} days ago`;
  if (hours) return `${hours} hours ago`;
  if (minutes) return `${minutes} minutes ago`;

  return `${seconds} seconds ago`;
};
