import React from "react";
import HoverTooltip from "./HoverTooltip";
import { commonClassNames } from "@/src/constanst";
import {
  IconCheck,
  IconDelete,
  IconDocument,
  IconEdit,
  IconEye,
} from "../icons";
import Link from "next/link";

type TableActionIcon = "edit" | "delete" | "view" | "doc" | "approve";
const TableActionItem = ({
  onClick,
  type,
  url,
  label,
  newTab = false,
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
          href={url}
          className={commonClassNames.iconSetting}
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
