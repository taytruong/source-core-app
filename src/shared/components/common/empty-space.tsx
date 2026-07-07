import React from "react";

import { TableCell, TableRow } from "@/src/shared/components/ui/table";

const EmptySpace = ({ text }: { text?: string }) => {
  return (
    <TableRow>
      <TableCell colSpan={99}>
        <div className="flexCenter text-center h-20">
          {text || "Không có dữ liệu"}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptySpace;
