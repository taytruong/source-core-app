'use client';

import Link from 'next/link';

import {
  BadgeStatus,
  Pagination,
  TableAction,
  TableActionItem,
} from '@/src/shared/components/common';
import { Input } from '@/src/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/components/ui/select';
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
      {/* <BouncedLink
        label="Create Coupon"
        url="/manage/coupon/new"
      /> */}

      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="flex gap-3">
          <div className="w-full lg:w-125">
            <Input
              placeholder="Search coupon code ..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleChangeQs('active', value)}
          >
            <SelectTrigger
              className="w-full max-w-48"
              size="lg"
            >
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>All</SelectItem>
                {couponStatus.map((status) => (
                  <SelectItem
                    key={status.value}
                    className={status.className}
                    value={`${status.value}`}
                  >
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Link
          className="bg-primary button-primary flex h-10 items-center justify-center rounded-lg px-3 font-medium text-white"
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
