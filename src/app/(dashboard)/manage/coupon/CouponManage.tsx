"use client";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { IconPlus } from "@/src/components/icons";
import { Input } from "@/components/ui/input";
import { allValue, commonClassNames, couponStatus } from "@/src/constanst";
import TableActionItem from "@/src/components/common/TableActionItem";
import ActionDeleteCoupon from "./ActionDeleteCoupon";
import { TCouponItem } from "@/src/types";
import useQueryString from "@/src/hooks/useQueryString";
import Pagination from "@/src/components/common/Pagination";

const CouponManage = ({
  coupons,
  totalPages,
  total,
}: {
  coupons: TCouponItem[] | undefined;
  totalPages: number;
  total: number;
}) => {
  const { handleSearchData, handleChangeQs } = useQueryString();
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
            <Input
              placeholder="Tìm kiếm mã giảm giá ..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            onValueChange={(value) => handleChangeQs("active", value)}
            defaultValue={allValue}
          >
            <SelectTrigger className="w-full max-w-48" size="lg">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {couponStatus.map((item) => (
                  <SelectItem key={item.value} value={`${item.value}`}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
                  <h3 className="font-semibold">{item.code}</h3>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{item.title}</span>
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
                    <ActionDeleteCoupon code={item.code}></ActionDeleteCoupon>
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination totalPages={totalPages} total={total}></Pagination>
    </>
  );
};

export default CouponManage;
