"use client";
import { IconPlay, IconStudy, IconUsers } from "@/src/components/icons";
import React, { useState } from "react";
import ButtonEnroll from "./ButtonEnroll";
import CouponForm from "./CouponForm";

const CourseWidget = ({
  data,
  findUser,
  duration,
}: {
  data: any;
  findUser: any;
  duration: string;
}) => {
  const [price, setPrice] = useState<number>(data.price);
  const [coupon, setCoupon] = useState("");

  return (
    <>
      <div className="bg-white rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-primary text-3xl font-bold">
            {price.toLocaleString("en-EN")}
          </strong>
          <span className="text-slate-400 line-through text-lg">
            {data.sale_price.toLocaleString("en-EN")}
          </span>
          <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary/30 text-primary font-medium text-sm">
            {Math.floor((price / data.sale_price) * 100)}%
          </span>
        </div>
        <h3 className="font-medium mb-3 text-sm">Khóa học gồm có:</h3>
        <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>{duration} học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconUsers className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconStudy className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <ButtonEnroll
          user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
          courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
          amount={price}
          coupon={coupon}
        ></ButtonEnroll>
        <CouponForm
          setCouponId={setCoupon}
          originalPrice={data.price}
          setPrice={setPrice}
          courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
        />
      </div>
    </>
  );
};

export default CourseWidget;
