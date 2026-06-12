import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchOrder } from "@/src/lib/actions/order.action";
import { EOrderStatus } from "@/src/types/enum";
import { Heading, HoverTooltip } from "@/src/components/common";
import Link from "next/link";
import { IconArrowLeft, IconPlus } from "@/src/components/icons";
import { Input } from "@/components/ui/input";

import { commonClassNames } from "@/src/constanst";
import IconArrowRight from "@/src/components/icons/IconArrowRight";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}) => {
  const orders = await fetchOrder({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search || "",
    status: searchParams.status,
  });
  return (
    <>
      <HoverTooltip
        label="Tạo mã giảm giá"
        className="fixed right-5 bottom-5"
        labelClassName="bg-primary"
        IsColorArrow
      >
        <Link href="/manage/coupon/new">
          <IconPlus className="size-10 rounded-full bg-primary flexCenter text-white p-2 hover:animate-[spin_0.8s_linear_0.5]" />
        </Link>
      </HoverTooltip>

      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý mã giảm giá (coupon)</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-75">
            <Input placeholder="Tìm kiếm mã giảm giá ..." />
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Mã (code)</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
      <div className="flex items-center justify-end gap-3 mt-5">
        <button type="button" className={commonClassNames.iconPagination}>
          <IconArrowLeft />
        </button>
        <button type="button" className={commonClassNames.iconPagination}>
          <IconArrowRight />
        </button>
      </div>
    </>
  );
};

export default page;
