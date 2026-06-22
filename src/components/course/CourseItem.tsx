"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconClock, IconEye, IconStar } from "../icons";
import { commonClassNames } from "@/src/constanst";
import { StudyCourseProps } from "@/src/types";
import { formatMinutesToHour, formatViews } from "@/src/utils";
import { getCourseLessonsInfo } from "@/src/lib/actions/course.action";

const CourseItem = ({
  data,
  cta,
  url = "",
}: {
  data: StudyCourseProps;
  cta?: string;
  url?: string;
}) => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    async function getDuration() {
      const res = await getCourseLessonsInfo({ slug: data.slug });
      setDuration(res?.duration || 0);
    }
    getDuration();
  }, [data.slug]);

  // const { duration }: any =
  //   (await getCourseLessonsInfo({ slug: data.slug })) || 0;
  const courseUrl = url || `/course/${data.slug}`;
  const courseInfo = [
    {
      title: formatViews(data?.views),
      icon: (className?: string) => <IconEye className={className} />,
    },
    {
      title: 5,
      icon: (className?: string) => <IconStar className={className} />,
    },
    {
      title: formatMinutesToHour(duration),
      icon: (className?: string) => <IconClock className={className} />,
    },
  ];
  return (
    <div className="bg-white border border-gray-200 p-3 rounded-2xl flex flex-col">
      <Link href={courseUrl} className="block h-48 relative">
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
      <div className="pt-4 flex flex-col flex-1">
        <h3 className="font-medium text-lg mb-3">{data?.title}</h3>
        <div className="mt-auto">
          <div className="xl:flex xl:items-center xl:gap-3 xl:mb-5 text-xs text-gray-500 grid grid-cols-2 mb-0">
            {courseInfo.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                {item.icon("size-5")}
                <span>{item.title}</span>
              </div>
            ))}
            <span className="font-bold text-primary ml-auto text-base">
              {data?.price?.toLocaleString("en-EN")}
            </span>
          </div>
          <Link href={courseUrl} className={commonClassNames.primaryButton}>
            {cta || "Xem chi tiết"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
