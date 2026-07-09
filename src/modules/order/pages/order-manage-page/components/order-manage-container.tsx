'use client';

import { toast } from 'sonner';
import Swal from 'sweetalert2';

import {
  BadgeStatus,
  EmptySpace,
  HoverTooltip,
  Pagination,
} from '@/src/shared/components/common';
import { IconCancel, IconCheck } from '@/src/shared/components/icons';
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
import {
  allValue,
  courseStatus,
  ITEM_PER_PAGE,
  OrderStatus,
  orderStatus,
} from '@/src/shared/constants';
import { useQueryString } from '@/src/shared/hooks';
import { OrderItemData } from '@/src/shared/types';

import { updateOrder } from '../../../actions';
import OrderAction from './order-action';

export interface OrderManageContainerProps {
  orders?: OrderItemData[];
  total?: number;
}

const OrderManageContainer = ({
  orders = [],
  total = 0,
}: OrderManageContainerProps) => {
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);
  const { handleSearchData, handleSelectStatus } = useQueryString();

  const handleUpdateOrder = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: OrderStatus;
  }) => {
    if (status === OrderStatus.CANCEL) {
      Swal.fire({
        title: 'Bạn có muốn hủy đơn hàng không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Thoát',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateOrder({ orderId, status });
        }
      });
    }
    if (status === OrderStatus.COMPLETE) {
      const response = await updateOrder({ orderId, status });

      if (response?.success) {
        toast.success('Cập nhật đơn hàng thành công');
      }
    }
  };

  return (
    <>
      <div className="mb-10 flex flex-col justify-start gap-5 lg:flex-row lg:items-center">
        <div className="flex gap-3">
          <div className="w-full lg:w-75 xl:w-95">
            <Input
              placeholder="Tìm kiếm đơn hàng ..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleSelectStatus(value as OrderStatus)}
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
                {courseStatus.map((status) => (
                  <SelectItem
                    key={status.value}
                    className={status.className}
                    value={status.value}
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
                      <span>{order.amount.toLocaleString('us-US')}</span>
                      {order.discount > 0 && (
                        <span>{order.discount.toLocaleString('us-US')}</span>
                      )}
                      <strong className={orderStatusItem?.className}>
                        {order.total.toLocaleString('us-US')}
                      </strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong>{order.coupon?.code || ''}</strong>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      title={orderStatusItem?.title}
                      variant={orderStatusItem?.variant}
                    />
                  </TableCell>
                  <TableCell>
                    {order.status !== OrderStatus.CANCEL && (
                      <div className="flex gap-3">
                        {order.status === OrderStatus.PENDING && (
                          <HoverTooltip label="Duyệt đơn hàng">
                            <span>
                              <OrderAction
                                onClick={() =>
                                  handleUpdateOrder({
                                    orderId: order._id.toString(),
                                    status: OrderStatus.COMPLETE,
                                  })
                                }
                              >
                                <IconCheck />
                              </OrderAction>
                            </span>
                          </HoverTooltip>
                        )}

                        <HoverTooltip label="Hủy đơn hàng">
                          <span>
                            <OrderAction
                              onClick={() =>
                                handleUpdateOrder({
                                  orderId: order._id.toString(),
                                  status: OrderStatus.CANCEL,
                                })
                              }
                            >
                              <IconCancel />
                            </OrderAction>
                          </span>
                        </HoverTooltip>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </>
  );
};

export default OrderManageContainer;
