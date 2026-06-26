import { EOrderStatus } from "@/src/shared/types/enum";

export interface OrderManageProps {
  totalPages: number;
  total: number;
  orders: {
    _id: string;
    code: string;
    total: number;
    amount: number;
    discount: number;
    status: EOrderStatus;
    coupon: {
      code: string;
    };
    course: {
      title: string;
    };
    user: {
      name: string;
    };
  }[];
}

export interface OrderManagePageParams {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}
