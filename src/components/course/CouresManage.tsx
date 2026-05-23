"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassNames, courseStatus } from "@/src/constanst";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from "../icons";
import Link from "next/link";
import { ICourse } from "@/src/database/course.md";
import Swal from "sweetalert2";
import { updateCourse } from "@/src/lib/actions/course.action";
import { ECourseStatus } from "@/src/types/enum";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import IconArrowRight from "../icons/IconArrowRight";

const CouresManage = ({ courses }: { courses: ICourse[] }) => {
  const handleDeleteCourseItem = (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Xóa khóa học thành công!");
      }
    });
  };

  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công!");
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleChangeStatus ~ error:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Heading>Quản lý khóa học</Heading>
        <div className="w-75">
          <Input placeholder="Tìm kiếm khóa học ..." />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Cài đặt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((courses, index) => {
              const courseStatusTitleItem = courseStatus.find(
                (item) => item.value === courses.status,
              );
              return (
                <TableRow key={courses.slug}>
                  <TableCell className="w-10 p-4">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt=""
                        src={courses.image}
                        width={80}
                        height={80}
                        className="shrink-0 size-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-base">
                          {courses.title}
                        </h3>
                        <h4 className="text-sm text-slate-500">
                          {new Date(courses.create_at).toLocaleDateString(
                            "vi-VI",
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-base">
                      {courses.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className={cn(
                        commonClassNames.status,
                        courseStatusTitleItem?.className,
                      )}
                      onClick={() =>
                        handleChangeStatus(courses.slug, courses.status)
                      }
                    >
                      {courseStatusTitleItem?.title}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/manage/course/update-content?slug=${courses.slug}`}
                        className={commonClassNames.iconSetting}
                      >
                        <IconStudy />
                      </Link>
                      <Link
                        href={`/course/${courses.slug}`}
                        target="_blank"
                        className={commonClassNames.iconSetting}
                      >
                        <IconEye />
                      </Link>
                      <Link
                        href={`/manage/course/update?slug=${courses.slug}`}
                        className={commonClassNames.iconSetting}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourseItem(courses.slug)}
                        className={commonClassNames.iconSetting}
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button type="button" className={commonClassNames.iconPagination}>
          <IconArrowLeft />
        </button>
        <button type="button" className={commonClassNames.iconPagination}>
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CouresManage;
