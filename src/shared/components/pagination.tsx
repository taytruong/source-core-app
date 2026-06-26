"use client";
import useQueryString from "@/src/hooks/useQueryString";
import { debounce } from "lodash";
import React from "react";

import { ITEM_PER_PAGE } from "@/src/shared/constants";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleArrowLeft,
  IconDoubleArrowRight,
} from "@/src/shared/components/icons";

interface IPaginationProps {
  totalPages: number;
  total: number;
}
const Pagination = ({ totalPages, total }: IPaginationProps) => {
  const { handleChangePage, currentPage } = useQueryString();
  const onInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 1) return;
    handleChangePage(value);
  }, 250);
  if (total <= ITEM_PER_PAGE) return null;
  return (
    <div className="mt-10 flexCenter gap-3">
      <PaginationButton
        onClick={() => handleChangePage(1)}
        disabled={currentPage === 1}
      >
        <IconDoubleArrowLeft />
      </PaginationButton>
      <PaginationButton
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IconArrowLeft />
      </PaginationButton>
      <input
        type="number"
        placeholder="1"
        value={currentPage}
        className="w-20 h-10 rounded-full bg-white outline-none text-center px-2 font-medium"
        onChange={onInputChange}
      />
      <PaginationButton
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IconArrowRight />
      </PaginationButton>
      <PaginationButton
        onClick={() => handleChangePage(totalPages)}
        disabled={currentPage === totalPages}
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

function PaginationButton({ onClick, disabled, children }: IPaginationButton) {
  const paginationBtnClassNames =
    "size-7 rounded-full bg-white shadow-sm p-2 flexCenter disabled:bg-gray-200";
  return (
    <button
      className={paginationBtnClassNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Pagination;
