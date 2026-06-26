"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import React from "react";
import {
  allValue,
  commonClassNames,
  courseStatus,
  orderStatus,
} from "@/src/shared/constants";
import Swal from "sweetalert2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { IconCancel, IconCheck } from "@/src/shared/components/icons";
import useQueryString from "@/src/hooks/useQueryString";
import { updateOrder } from "@/src/lib/actions/order.action";
import { toast } from "sonner";
import { OrderManageProps } from "../types/order.types";
import { EOrderStatus } from "@/src/shared/types/enum";
import { Input } from "@/src/shared/components/ui/input";
import {
  BadgeStatus,
  EmptySpace,
  Heading,
  HoverTooltip,
  Pagination,
} from "@/src/shared/components";

const OrderManagePage = ({
  orders = [],
  totalPages,
  total,
}: OrderManageProps) => {
  const { handleSearchData, handleSelectStatus } = useQueryString();

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

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-75 xl:w-95">
            <Input
              placeholder="Tìm kiếm đơn hàng ..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}
            defaultValue={allValue}
          >
            <SelectTrigger className="w-full max-w-48" size="lg">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
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
          {orders.length === 0 && <EmptySpace text="Không có đơn hàng" />}
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
                  <TableCell>{order.user?.name}</TableCell>
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
                  <TableCell>
                    <strong>{order.coupon?.code || ""}</strong>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus item={orderStatusItem}></BadgeStatus>
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
      <Pagination totalPages={totalPages} total={total}></Pagination>
    </>
  );
};

export default OrderManagePage;
