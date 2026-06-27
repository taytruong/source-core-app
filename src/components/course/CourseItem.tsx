"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { getCourseLessonsInfo } from "@/src/lib/actions/course.action";
import { commonClassNames } from "@/src/shared/constants";
import { StudyCourseProps } from "@/src/types";
import { formatMinutesToHour, formatViews } from "@/src/utils";

import { IconClock, IconEye, IconStar } from "../../shared/components/icons";

const CourseItem = ({
  cta,
  data,
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
      <Link className="block h-48 relative" href={courseUrl}>
        <Image
          priority
          alt=""
          className="w-full h-full object-cover rounded-lg"
          height={200}
          sizes="@media (min-width:640px) 300px, 100vw"
          src={data.image}
          width={300}
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
              <div key={index} className="flex items-center gap-2">
                {item.icon("size-5")}
                <span>{item.title}</span>
              </div>
            ))}
            <span className="font-bold text-primary ml-auto text-base">
              {data?.price?.toLocaleString("en-EN")}
            </span>
          </div>
          <Link className={commonClassNames.primaryButton} href={courseUrl}>
            {cta || "Xem chi tiết"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
