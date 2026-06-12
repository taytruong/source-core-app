"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { commonClassNames, courseStatus, orderStatus } from "@/src/constanst";
import Link from "next/link";
import Swal from "sweetalert2";
import { EOrderStatus } from "@/src/types/enum";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { Heading, HoverTooltip, StatusBadge } from "@/src/components/common";
import {
  IconArrowLeft,
  IconCancel,
  IconCheck,
  IconPlus,
} from "@/src/components/icons";
import IconArrowRight from "@/src/components/icons/IconArrowRight";
import useQueryString from "@/src/hooks/useQueryString";
import { updateOrder } from "@/src/lib/actions/order.action";
import { toast } from "sonner";

interface IOrderManageProps {
  _id: string;
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
  const { createQueryString, pathname, router } = useQueryString();

  const handleUpdateOrder = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: EOrderStatus;
  }) => {
    if (status === EOrderStatus.CANCEL) {
      Swal.fire({
        title: "Bạn có muốn hủy đơn hàng không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Thoát",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateOrder({ orderId, status });
        }
      });
    }
    if (status === EOrderStatus.COMPLETE) {
      const res = await updateOrder({ orderId, status });
      if (res?.success) {
        toast.success("Cập nhật đơn hàng thành công");
      }
    }
  };

  const handleSelectStatus = (status: EOrderStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };

  const handleSearchOrder = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    },
    500,
  );
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
            <Input
              placeholder="Tìm kiếm đơn hàng ..."
              onChange={(e) => handleSearchOrder(e)}
            />
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
            <TableHead>STT</TableHead>
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
            orders.map((order, index) => {
              const orderStatusItem = orderStatus.find(
                (item) => item.value === order.status,
              );
              return (
                <TableRow key={order.code}>
                  <TableCell className="w-10 p-7">{index + 1}</TableCell>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{order.amount.toLocaleString("us-US")}</span>
                      {order.discount > 0 && (
                        <span>{order.discount.toLocaleString("us-US")}</span>
                      )}
                      <strong className={orderStatusItem?.className}>
                        {order.total.toLocaleString("us-US")}
                      </strong>
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <StatusBadge item={orderStatusItem}></StatusBadge>
                  </TableCell>
                  <TableCell>
                    {order.status !== EOrderStatus.CANCEL && (
                      <div className="flex gap-3">
                        {order.status === EOrderStatus.PENDING && (
                          <HoverTooltip label="Duyệt đơn hàng">
                            <button
                              type="button"
                              className={commonClassNames.iconSetting}
                              onClick={() =>
                                handleUpdateOrder({
                                  orderId: order._id,
                                  status: EOrderStatus.COMPLETE,
                                })
                              }
                            >
                              <IconCheck />
                            </button>
                          </HoverTooltip>
                        )}

                        <HoverTooltip label="Hủy đơn hàng">
                          <button
                            type="button"
                            className={commonClassNames.iconSetting}
                            onClick={() =>
                              handleUpdateOrder({
                                orderId: order._id,
                                status: EOrderStatus.CANCEL,
                              })
                            }
                          >
                            <IconCancel />
                          </button>
                        </HoverTooltip>
                      </div>
                    )}
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
