'use client';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { useQueryString } from '../../hooks';
import { SortQueryParams } from '../../types';
import { TableHead } from '../ui/table';

const FIELD_SORT_MAP: Record<
  'create' | 'price' | 'title' | 'name',
  { asc: SortQueryParams; desc: SortQueryParams }
> = {
  create: { asc: 'oldest', desc: 'recent' },
  price: { asc: 'price_asc', desc: 'price_desc' },
  title: { asc: 'title_asc', desc: 'title_desc' },
  name: { asc: 'name_asc', desc: 'name_desc' },
};

export interface SortableTableProps {
  children: React.ReactNode;
  field: 'create' | 'price' | 'title' | 'name';
  className?: string;
}

function SortableTable({ children, className, field }: SortableTableProps) {
  const params = useSearchParams();
  const sortValue = params.get('sort') || 'recent';
  const { createQueryString } = useQueryString();

  const fieldSort = FIELD_SORT_MAP[field];
  const isActive = sortValue === fieldSort.asc || sortValue === fieldSort.desc;
  const isDesc = sortValue === fieldSort.desc;

  const handleSort = () => {
    const nextSort = isActive && isDesc ? fieldSort.asc : fieldSort.desc;

    createQueryString('sort', nextSort);
  };

  return (
    <TableHead
      className={`cursor-pointer select-none ${className ?? ''}`}
      onClick={handleSort}
    >
      <div className="flex items-center gap-1">
        {children}
        {isActive ? (
          isDesc ? (
            <ArrowDown className="text-primary size-3.5" />
          ) : (
            <ArrowUp className="text-primary size-3.5" />
          )
        ) : (
          <ArrowUpDown className="size-3.5 opacity-40" />
        )}
      </div>
    </TableHead>
  );
}

export default SortableTable;
