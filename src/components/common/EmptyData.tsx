import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const EmptyData = ({ text }: { text?: string }) => {
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

export default EmptyData;
