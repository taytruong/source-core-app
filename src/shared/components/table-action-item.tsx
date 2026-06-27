import Link from "next/link";
import React from "react";

import {
  IconCheck,
  IconDelete,
  IconDocument,
  IconEdit,
  IconEye,
} from "@/src/shared/components/icons";
import { commonClassNames } from "@/src/shared/constants";

import HoverTooltip from "./hover-tooltip";

type TableActionIcon = "edit" | "delete" | "view" | "doc" | "approve";
const TableActionItem = ({
  label,
  newTab = false,
  onClick,
  type,
  url,
}: {
  onClick?: () => void;
  type: TableActionIcon;
  url?: string;
  label: string;
  newTab?: boolean;
}) => {
  const icon: Record<TableActionIcon, any> = {
    edit: <IconEdit />,
    delete: <IconDelete />,
    view: <IconEye />,
    doc: <IconDocument />,
    approve: <IconCheck />,
  };

  if (url)
    return (
      <HoverTooltip label={label}>
        <Link
          className={commonClassNames.iconSetting}
          href={url}
          target={newTab ? "_blank" : undefined}
        >
          {icon[type]}
        </Link>
      </HoverTooltip>
    );

  return (
    <HoverTooltip label={label}>
      <button className={commonClassNames.iconSetting} onClick={onClick}>
        {icon[type]}
      </button>
    </HoverTooltip>
  );
};

export default TableActionItem;
