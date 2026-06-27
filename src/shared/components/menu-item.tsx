import React from "react";

import LinkActive from "./link-active";

interface MenuItemProps {
  url: string;
  title: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
}

const MenuItem = ({ icon, onlyIcon, title = "", url = "/" }: MenuItemProps) => {
  return (
    <ul>
      <LinkActive url={url}>
        {icon}
        {onlyIcon ? null : title}
      </LinkActive>
    </ul>
  );
};

export default MenuItem;
