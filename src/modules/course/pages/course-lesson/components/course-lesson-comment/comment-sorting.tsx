'use client';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { useQueryString } from '@/src/shared/hooks';

const CommentSorting = () => {
  const params = useSearchParams();
  const sortValue = params.get('sort');
  const { createQueryString } = useQueryString();

  const isActive = sortValue === 'recent' || sortValue === 'oldest';
  const isDesc = sortValue === 'recent';

  const handleSortComment = () => {
    createQueryString('sort', sortValue === 'recent' ? 'oldest' : 'recent');
  };

  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-2 font-medium ${
        isActive ? 'text-primary' : ''
      }`}
      onClick={handleSortComment}
    >
      {isDesc ? 'Most recent' : 'Oldest'}
      {isActive ? (
        isDesc ? (
          <ArrowDown className="size-4" />
        ) : (
          <ArrowUp className="size-4" />
        )
      ) : (
        <ArrowUpDown className="size-4 opacity-40" />
      )}
    </button>
  );
};

export default CommentSorting;
