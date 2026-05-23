import { ICourse } from "../database/course.md";

export type LinkActiveProps = {
  url: string;
  children?: React.ReactNode;
};

export type MenuItemProps = {
  url: string;
  title: string;
  icon?: React.ReactNode;
};

export type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export type TCreateCourseParams = {
  title: string;
  slug: string;
  author: Types.ObjectId;
};

export type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>; // Partial : from must to option
  path?: string;
};
