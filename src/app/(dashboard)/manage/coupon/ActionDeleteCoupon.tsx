"use client";
import TableActionItem from "@/src/components/common/TableActionItem";
import { deleteCoupon } from "@/src/lib/actions/coupon.action";
import React from "react";
import Swal from "sweetalert2";

const ActionDeleteCoupon = ({ code }: { code: string }) => {
  const handleDeleteCoupon = async (code: string) => {
    try {
      Swal.fire({
        title: "Bạn có muốn xóa mã (coupon) này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Thoát",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCoupon(code);
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleDeleteCoupon ~ error:", error);
    }
  };
  return (
    <TableActionItem
      type="delete"
      label="Xóa khóa học"
      onClick={() => handleDeleteCoupon(code)}
    ></TableActionItem>
  );
};

export default ActionDeleteCoupon;
