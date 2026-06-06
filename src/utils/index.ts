import { Work_Sans } from "next/font/google";

const work__sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const createOrderCode = () =>
  `DH-${new Date().getTime().toString().slice(-6)}`;

export { work__sans };
