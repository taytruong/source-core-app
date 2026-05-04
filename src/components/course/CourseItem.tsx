import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconClock, IconEye, IconStar } from "../icons";

const courseInfo = [
  {
    title: "3000",
    icon: (className?: string) => <IconEye className={className} />,
  },
  {
    title: "4.6",
    icon: (className?: string) => <IconStar className={className} />,
  },
  {
    title: "30h25p",
    icon: (className?: string) => <IconClock className={className} />,
  },
];

const CourseItem = () => {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl">
      <Link href="#" className="block h-48 relative">
        <Image
          src="https://images.unsplash.com/photo-1773332598413-a6d5279d1ae8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width:640px) 300px, 100vw"
          priority
        />
        <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium text-xs bg-green-500">
          New
        </span>
      </Link>
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3">
          Khóa học Pro - xây dựng e-learning system hoàn chỉnh
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500">
          {courseInfo.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              {item.icon("size-5")}
              <span>{item.title}</span>
            </div>
          ))}
          <span className="font-bold text-primary ml-auto text-base">
            100.000
          </span>
        </div>
        <Link
          href="#"
          className="flex items-center justify-center w-full mt-10 rounded-lg text-white bg-primary h-12"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
