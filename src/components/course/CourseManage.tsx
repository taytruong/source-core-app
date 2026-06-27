"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { ICourse } from "@/src/database/course.md";
import useQueryString from "@/src/hooks/useQueryString";
import { updateCourse } from "@/src/lib/actions/course.action";
import {
  BadgeStatus,
  Heading,
  HoverTooltip,
  Pagination,
  TableAction,
  TableActionItem,
} from "@/src/shared/components";
import { Input } from "@/src/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/components/ui/table";
import { allValue, courseStatus } from "@/src/shared/constants";
import { ECourseStatus } from "@/src/types/enum";

import { IconPlus } from "../../shared/components/icons";

const CourseManage = ({
  courses,
  total,
  totalPages,
}: {
  courses: ICourse[] | undefined;
  totalPages: number;
  total: number;
}) => {
  const { handleSearchData, handleSelectStatus } = useQueryString();
  const handleDeleteCourseItem = (slug: string) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa không?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Xóa khóa học",
      cancelButtonText: "Hủy",
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
        title: "Bạn có muốn đổi trạng thái không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cập nhật",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                status === ECourseStatus.PENDING
                  ? ECourseStatus.APPROVED
                  : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công!");
          // router.push(
          //   `${pathname}?${createQueryString("status", "")}&${createQueryString("search", "")}`,
          // );
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleChangeStatus ~ error:", error);
    }
  };

  const [page, setPage] = useState(1);

  const handleChagePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((previous) => previous - 1);
    if (type === "next") setPage((next) => next + 1);
  };

  // useEffect(() => {
  //   router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  // }, [page]);

  return (
    <>
      <HoverTooltip
        IsColorArrow
        className="fixed right-5 bottom-5"
        label="Tạo khóa học mới"
        labelClassName="bg-primary"
      >
        <Link href="/manage/course/new">
          <IconPlus className="size-10 rounded-full bg-primary flexCenter text-white p-2 hover:animate-[spin_0.8s_linear_0.5]" />
        </Link>
      </HoverTooltip>

      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý khóa học</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-75">
            <Input
              placeholder="Tìm kiếm khóa học ..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) =>
              handleSelectStatus(value as ECourseStatus)
            }
          >
            <SelectTrigger className="w-full max-w-48" size="lg">
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
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Cài đặt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!courses && courses.length > 0 && courses.map((courses, index) => {
              const courseStatusTitleItem = courseStatus.find(
                (item) => item.value === courses.status,
              );

              return (
                <TableRow key={courses.slug}>
                  <TableCell className="w-10 p-7">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt=""
                        className="shrink-0 size-16 rounded-lg object-cover"
                        height={80}
                        src={courses.image}
                        width={80}
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-medium text-sm lg:text-base whitespace-nowrap">
                          {courses.title}
                        </h3>
                        <h4 className="text-xs lg:text-sm text-slate-500">
                          {new Date(courses.create_at).toLocaleDateString(
                            "vi-VI",
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-sm lg:text-base">
                      {courses?.price?.toLocaleString("en-EN")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <HoverTooltip label="Có thể chuyển sang 'Đã duyệt' / 'Chờ duyệt'">
                      <button>
                        <BadgeStatus
                          item={courseStatusTitleItem}
                          onClick={() =>
                            handleChangeStatus(courses.slug, courses.status)
                          }
                         />
                      </button>
                    </HoverTooltip>
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      <TableActionItem
                        label="Cập nhật nội dụng cho người xem"
                        type="doc"
                        url={`/manage/course/update-content?slug=${courses.slug}`}
                      />
                      <TableActionItem
                        newTab
                        label="Xem khóa học"
                        type="view"
                        url={`/course/${courses.slug}`}
                      />
                      <TableActionItem
                        label="Cập nhật thông tin khóa học"
                        type="edit"
                        url={`/manage/course/update?slug=${courses.slug}`}
                      />
                      <TableActionItem
                        label="Xóa khóa học"
                        type="delete"
                        onClick={() => handleDeleteCourseItem(courses.slug)}
                      />
                    </TableAction>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination total={total} totalPages={totalPages} />
    </>
  );
};

export default CourseManage;
