'use client';

import {
  BadgeStatus,
  BouncedLink,
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
      <BouncedLink
        label="Tạo mã giảm giá"
        url="/manage/coupon/new"
      />

      <div className="mb-10 flex flex-col justify-start gap-5 lg:flex-row lg:items-center">
        <div className="flex gap-3">
          <div className="w-full lg:w-75">
            <Input
              placeholder="Tìm kiếm mã giảm giá ..."
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
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
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
                      title="Đang họat động"
                      variant="success"
                    />
                  ) : (
                    <BadgeStatus
                      title="Chưa kích hoạt"
                      variant="warning"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      label="Cập nhật thông tin khóa học"
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
