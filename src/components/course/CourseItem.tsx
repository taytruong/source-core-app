import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconClock, IconEye, IconStar } from "../icons";
import { ICourse } from "@/src/database/course.md";

const CourseItem = ({ data, cta }: { data: ICourse; cta?: string }) => {
  const courseInfo = [
    {
      title: data?.views,
      icon: (className?: string) => <IconEye className={className} />,
    },
    {
      title: data?.rating[0],
      icon: (className?: string) => <IconStar className={className} />,
    },
    {
      title: "30h25p",
      icon: (className?: string) => <IconClock className={className} />,
    },
  ];
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl">
      <Link href={`course/${data?.slug}`} className="block h-48 relative">
        <Image
          src={data.image}
          alt=""
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width:640px) 300px, 100vw"
          priority
        />
        {/* <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium text-xs bg-green-500">
          {data?.create_at.toLocaleDateString("vi-VI")}
        </span> */}
      </Link>
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-3">{data?.title}</h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500">
          {courseInfo.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              {item.icon("size-5")}
              <span>{item.title}</span>
            </div>
          ))}
          <span className="font-bold text-primary ml-auto text-base">
            {data?.price.toLocaleString()}đ
          </span>
        </div>
        <Link
          href={`course/${data?.slug}`}
          className="flex items-center justify-center w-full mt-10 rounded-lg text-white bg-primary h-12"
        >
          {cta || "Xem chi tiết"}
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
