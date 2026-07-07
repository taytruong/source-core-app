import Link from 'next/link';
import { JSX } from 'react';

import {
  IconCheck,
  IconDelete,
  IconDocument,
  IconEdit,
  IconEye,
} from '@/src/shared/components/icons';

import HoverTooltip from './hover-tooltip';

type TableActionIcon = 'edit' | 'delete' | 'view' | 'doc' | 'approve';

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
  const icon: Record<TableActionIcon, JSX.Element> = {
    edit: <IconEdit />,
    delete: <IconDelete />,
    view: <IconEye />,
    doc: <IconDocument />,
    approve: <IconCheck />,
  };

  const commonClassNames =
    'flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-200 p-2 hover:bg-slate-100';

  if (url)
    return (
      <HoverTooltip label={label}>
        <Link
          className={commonClassNames}
          href={url}
          target={newTab ? '_blank' : undefined}
        >
          {icon[type]}
        </Link>
      </HoverTooltip>
    );

  return (
    <HoverTooltip label={label}>
      <button
        className={commonClassNames}
        onClick={onClick}
      >
        {icon[type]}
      </button>
    </HoverTooltip>
  );
};

export default TableActionItem;
