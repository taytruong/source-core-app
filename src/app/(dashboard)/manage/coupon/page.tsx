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
import { ECouponType, EOrderStatus } from "@/src/types/enum";
import {
  Heading,
  HoverTooltip,
  StatusBadge,
  TableAction,
} from "@/src/components/common";
import Link from "next/link";
import {
  IconArrowLeft,
  IconDelete,
  IconEdit,
  IconPlus,
} from "@/src/components/icons";
import { Input } from "@/components/ui/input";

import { commonClassNames } from "@/src/constanst";
import IconArrowRight from "@/src/components/icons/IconArrowRight";
import { getCoupons } from "@/src/lib/actions/coupon.action";
import TableActionItem from "@/src/components/common/TableActionItem";

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
  const coupons = await getCoupons({});
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
        <TableBody>
          {coupons &&
            coupons.length > 0 &&
            coupons.map((item, index) => (
              <TableRow key={item.code}>
                <TableCell className="w-10 p-7">{index + 1}</TableCell>
                <TableCell>
                  <strong>{item.code}</strong>
                </TableCell>
                <TableCell>
                  <strong>{item.title}</strong>
                </TableCell>
                <TableCell>
                  {item.type === ECouponType.AMOUNT ? (
                    <>{item.value.toLocaleString("us-US")}</>
                  ) : (
                    <>{item.value}%</>
                  )}
                </TableCell>
                <TableCell>
                  {item.used} / {item.limit}
                </TableCell>
                <TableCell>
                  {item.active ? (
                    <StatusBadge
                      item={{
                        title: "Đang hoạt động",
                        className: "text-green-500",
                      }}
                    ></StatusBadge>
                  ) : (
                    <StatusBadge
                      item={{
                        title: "Chưa kích hoạt",
                        className: "text-orange-500",
                      }}
                    ></StatusBadge>
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      type="edit"
                      label="Cập nhật thông tin khóa học"
                      url={`/manage/coupon/update?code=${item.code}`}
                    ></TableActionItem>
                    <TableActionItem
                      type="delete"
                      label="Xóa khóa học"
                    ></TableActionItem>
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
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
