"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { commonClassNames, courseStatus, orderStatus } from "@/src/constanst";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { ICourse } from "@/src/database/course.md";
import Swal from "sweetalert2";
import { updateCourse } from "@/src/lib/actions/course.action";
import { ECourseStatus, EOrderStatus } from "@/src/types/enum";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { Heading, HoverTooltip, StatusBadge } from "@/src/components/common";
import {
  IconArrowLeft,
  IconDelete,
  IconDocument,
  IconEdit,
  IconEye,
  IconPlus,
} from "@/src/components/icons";
import IconArrowRight from "@/src/components/icons/IconArrowRight";
import { IOrder } from "@/src/database/order.md";

interface IOrderManageProps {
  code: string;
  total: number;
  amount: number;
  discount: number;
  status: EOrderStatus;
  course: {
    title: string;
  };
  user: {
    name: string;
  };
}

const OrderManage = ({ orders = [] }: { orders: IOrderManageProps[] }) => {
  const handleSelectStatus = (status: EOrderStatus) => {};

  return (
    <>
      <HoverTooltip
        label="Tạo khóa học mới"
        className="fixed right-5 bottom-5"
        labelClassName="bg-primary"
        IsColorArrow
      >
        <Link href="/manage/course/new">
          <IconPlus className="size-10 rounded-full bg-primary flexCenter text-white p-2 hover:animate-[spin_0.8s_linear_0.5]" />
        </Link>
      </HoverTooltip>

      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-75">
            <Input placeholder="Tìm kiếm đơn hàng ..." />
          </div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}
          >
            <SelectTrigger className="w-full max-w-48" size="lg">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseStatus.map((status) => (
                  <SelectItem
                    value={status.value}
                    key={status.value}
                    className={status.className}
                  >
                    {status.title}
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
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khoá học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 &&
            orders.map((order) => {
              const orderStatusItem = orderStatus.find(
                (item) => item.value === order.status,
              );
              return (
                <TableRow key={order.code}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <StatusBadge item={orderStatusItem}></StatusBadge>
                  </TableCell>
                </TableRow>
              );
            })}
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

export default OrderManage;
