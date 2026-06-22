import React from "react";
import { IconArrowLeft } from "../icons";
import IconArrowRight from "../icons/IconArrowRight";
import { commonClassNames } from "@/src/constanst";

const PaginationBtn = ({
  page,
  onClickPrev,
  onClickNext,
}: {
  page?: number;
  onClickPrev?: () => void;
  onClickNext?: () => void;
}) => {
  return (
    <div className="flex items-center justify-end gap-3 mt-5">
      <span className="font-medium">Trang {page} </span>
      <button
        type="button"
        className={commonClassNames.iconPagination}
        // onClick={() => handleChagePage("prev")}
        onClick={onClickPrev}
      >
        <IconArrowLeft />
      </button>
      <button
        type="button"
        className={commonClassNames.iconPagination}
        onClick={onClickNext}
      >
        <IconArrowRight />
      </button>
    </div>
  );
};

export default PaginationBtn;
