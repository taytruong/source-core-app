"use client";
import Link from "next/link";
import React from "react";

import useQueryString from "@/src/hooks/useQueryString";
import {
  BadgeStatus,
  Heading,
  HoverTooltip,
  Pagination,
  TableAction,
  TableActionItem,
} from "@/src/shared/components";
import { IconPlus } from "@/src/shared/components/icons";
import { Input } from "@/src/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { allValue, couponStatus } from "@/src/shared/constants";
import { TCouponItem } from "@/src/types";
import { ECouponType } from "@/src/types/enum";

import ActionDeleteCoupon from "./ActionDeleteCoupon";

const CouponManage = ({
  coupons,
  total,
  totalPages,
}: {
  coupons: TCouponItem[] | undefined;
  totalPages: number;
  total: number;
}) => {
  const { handleChangeQs, handleSearchData } = useQueryString();

  return (
    <>
      <HoverTooltip
        IsColorArrow
        className="fixed right-5 bottom-5"
        label="Tạo mã giảm giá"
        labelClassName="bg-primary"
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
            defaultValue={allValue}
            onValueChange={(value) => handleChangeQs("active", value)}
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
          {!!coupons && coupons.length > 0 && coupons.map((item, index) => (
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
                    <BadgeStatus
                      item={{
                        title: "Đang hoạt động",
                        className: "text-green-500",
                      }}
                     />
                  ) : (
                    <BadgeStatus
                      item={{
                        title: "Chưa kích hoạt",
                        className: "text-orange-500",
                      }}
                     />
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      label="Cập nhật thông tin khóa học"
                      type="edit"
                      url={`/manage/coupon/update?code=${item.code}`}
                     />
                    <ActionDeleteCoupon code={item.code} />
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination total={total} totalPages={totalPages} />
    </>
  );
};

export default CouponManage;
