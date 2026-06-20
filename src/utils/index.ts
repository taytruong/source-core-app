import { Work_Sans } from "next/font/google";

const work__sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const createOrderCode = () =>
  `DH-${new Date().getTime().toString().slice(-6)}`;

export const formatViews = (views: number) => {
  if (views < 1000) return views;
  return `${(views / 1000).toFixed(1)}k`;
};

export const formatMinutesToHour = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return `${hours}h${remainMinutes}p`;
};

export { work__sans };
