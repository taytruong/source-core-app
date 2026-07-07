'use client';
import Swal from 'sweetalert2';

import { deleteCoupon } from '@/src/modules/coupon/actions/coupon.action';
import { TableActionItem } from '@/src/shared/components/common';

interface DeleteCouponModalProps {
  code: string;
}

const DeleteCouponModal = ({ code }: DeleteCouponModalProps) => {
  const handleDeleteCoupon = async (code: string) => {
    try {
      Swal.fire({
        title: 'Bạn có muốn xóa mã (coupon) này không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Thoát',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCoupon(code);
        }
      });
    } catch (error) {
      console.log('🚀 ~ handleDeleteCoupon ~ error:', error);
    }
  };

  return (
    <TableActionItem
      label="Xóa khóa học"
      type="delete"
      onClick={() => handleDeleteCoupon(code)}
    />
  );
};

export default DeleteCouponModal;
