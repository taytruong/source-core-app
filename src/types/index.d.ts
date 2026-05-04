type LinkActiveProps = {
  url: string;
  children?: React.ReactNode;
};

type MenuItemProps = {
  url: string;
  title: string;
  icon?: React.ReactNode;
};

type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export { LinkActiveProps, MenuItemProps, TCreateUserParams };
