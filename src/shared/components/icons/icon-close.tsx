import React, { ComponentProps } from "react";

const IconClose = (props: ComponentProps<"svg">) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
     />
  );
};

export default IconClose;
