'use client';
import { debounce } from 'lodash';
import React from 'react';

import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleArrowLeft,
  IconDoubleArrowRight,
} from '@/src/shared/components/icons';
import { ITEM_PER_PAGE } from '@/src/shared/constants';

import { useQueryString } from '../../hooks';

interface PaginationProps {
  totalPages: number;
  total: number;
}
const Pagination = ({ total, totalPages }: PaginationProps) => {
  const { currentPage, handleChangePage } = useQueryString();
  const onInputChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (value < 1) return;
      handleChangePage(value);
    },
    250,
  );

  if (total <= ITEM_PER_PAGE) return null;

  return (
    <div className="mt-6 flex items-center justify-end gap-3">
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(1)}
      >
        <IconDoubleArrowLeft />
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        <IconArrowLeft />
      </PaginationButton>
      <input
        className="bg-item h-7 w-15 rounded-lg px-2 text-center font-medium shadow-sm outline-none"
        placeholder="1"
        type="number"
        value={currentPage}
        onChange={onInputChange}
      />
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        <IconArrowRight />
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(totalPages)}
      >
        {' '}
        <IconDoubleArrowRight />
      </PaginationButton>
    </div>
  );
};

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

function PaginationButton({
  children,
  disabled,
  onClick,
}: PaginationButtonProps) {
  const paginationButtonClassNames =
    'size-7 rounded-lg bg-item shadow-sm flexCenter disabled:bg-gray-200';

  return (
    <button
      className={paginationButtonClassNames}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Pagination;
