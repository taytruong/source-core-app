'use client';

import Link from 'next/link';

import {
  BadgeStatus,
  FilterSelectStatus,
  Pagination,
  TableAction,
  TableActionItem,
} from '@/src/shared/components/common';
import { Input } from '@/src/shared/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/components/ui/table';
import { allValue, couponStatus, CouponType } from '@/src/shared/constants';
import { useQueryString } from '@/src/shared/hooks';
import { CouponItemData } from '@/src/shared/types';

import DeleteCouponModal from './delete-coupon-modal';

export interface ManageCouponContainerProps {
  coupons?: CouponItemData[];
  totalPages: number;
  total: number;
}

function ManageCouponContainer({
  coupons,
  total,
  totalPages,
}: ManageCouponContainerProps) {
  const { handleChangeQs, handleSearchData } = useQueryString();

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="flex gap-3">
          <div className="w-full lg:w-125">
            <Input
              placeholder="Search coupon code ..."
              onChange={handleSearchData}
            />
          </div>
          <FilterSelectStatus
            allValue={allValue}
            options={couponStatus}
            placeholder="Select Status"
            onValueChange={(value) => handleChangeQs('active', value)}
          />
        </div>
        <Link
          className="bg-primary button-primary flex h-10 items-center justify-center rounded-lg px-3 font-semibold text-white"
          href="/manage/coupon/new"
        >
          Apply New Coupon
        </Link>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Coupon Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!coupons &&
            coupons.length > 0 &&
            coupons.map((coupon, index) => (
              <TableRow key={coupon.code}>
                <TableCell className="w-10 p-7">{index + 1}</TableCell>
                <TableCell>
                  <h3 className="font-semibold">{coupon.code}</h3>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{coupon.title}</span>
                </TableCell>
                <TableCell>
                  {coupon.type === CouponType.AMOUNT ? (
                    <>{coupon.value.toLocaleString('us-US')}</>
                  ) : (
                    <>{coupon.value}%</>
                  )}
                </TableCell>
                <TableCell>
                  <h4 className="text-xs font-medium lg:text-sm">
                    {new Date(coupon.create_at).toLocaleDateString('vi-VI')}
                  </h4>
                </TableCell>
                <TableCell>
                  {coupon.used} / {coupon.limit}
                </TableCell>
                <TableCell>
                  {coupon.active ? (
                    <BadgeStatus
                      title="Active"
                      variant="success"
                    />
                  ) : (
                    <BadgeStatus
                      title="Inactive"
                      variant="warning"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      label="Update Coupon Information"
                      type="edit"
                      url={`/manage/coupon/update?code=${coupon.code}`}
                    />
                    <DeleteCouponModal code={coupon.code} />
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </>
  );
}

export default ManageCouponContainer;
