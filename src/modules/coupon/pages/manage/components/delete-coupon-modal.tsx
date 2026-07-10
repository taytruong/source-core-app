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
        title: 'Are you sure you want to delete this coupon?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
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
      label="Delete Coupon"
      type="delete"
      onClick={() => handleDeleteCoupon(code)}
    />
  );
};

export default DeleteCouponModal;
