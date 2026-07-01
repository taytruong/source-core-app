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

import useQueryString from '../hooks/use-query-string';

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
    <div className="flexCenter mt-10 gap-3">
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
        className="h-10 w-20 rounded-full bg-white px-2 text-center font-medium outline-none"
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

interface PaginationButton {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

function PaginationButton({ children, disabled, onClick }: PaginationButton) {
  const paginationButtonClassNames =
    'size-7 rounded-full bg-white shadow-sm p-2 flexCenter disabled:bg-gray-200';

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
