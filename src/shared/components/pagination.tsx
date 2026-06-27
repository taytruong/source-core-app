"use client";
import { debounce } from "lodash";
import React from "react";

import useQueryString from "@/src/hooks/useQueryString";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleArrowLeft,
  IconDoubleArrowRight,
} from "@/src/shared/components/icons";
import { ITEM_PER_PAGE } from "@/src/shared/constants";

interface IPaginationProps {
  totalPages: number;
  total: number;
}
const Pagination = ({ total, totalPages }: IPaginationProps) => {
  const { currentPage, handleChangePage } = useQueryString();
  const onInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value < 1) return;
    handleChangePage(value);
  }, 250);

  if (total <= ITEM_PER_PAGE) return null;

  return (
    <div className="mt-10 flexCenter gap-3">
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
        className="w-20 h-10 rounded-full bg-white outline-none text-center px-2 font-medium"
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
        {" "}
        <IconDoubleArrowRight />
      </PaginationButton>
    </div>
  );
};

interface IPaginationButton {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

function PaginationButton({ children, disabled, onClick }: IPaginationButton) {
  const paginationButtonClassNames =
    "size-7 rounded-full bg-white shadow-sm p-2 flexCenter disabled:bg-gray-200";

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
