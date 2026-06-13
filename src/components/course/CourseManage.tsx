"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { commonClassNames, courseStatus } from "@/src/constanst";
import {
  IconArrowLeft,
  IconDelete,
  IconDocument,
  IconEdit,
  IconEye,
  IconPlus,
} from "../icons";
import Link from "next/link";
import { ICourse } from "@/src/database/course.md";
import Swal from "sweetalert2";
import { updateCourse } from "@/src/lib/actions/course.action";
import { ECourseStatus } from "@/src/types/enum";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import IconArrowRight from "../icons/IconArrowRight";
import { Heading, HoverTooltip, StatusBadge, TableAction } from "../common";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import useQueryString from "@/src/hooks/useQueryString";
import TableActionItem from "../common/TableActionItem";
import PanigationBtn from "../common/PanigationBtn";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const { createQueryString, pathname, router } = useQueryString();
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
          router.push(
            `${pathname}?${createQueryString("status", "")}&${createQueryString("search", "")}`,
          );
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleChangeStatus ~ error:", error);
    }
  };

  const handleSelectStatus = (status: ECourseStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };

  const handleSearchCourse = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    },
    500,
  );

  const [page, setPage] = useState(1);

  const handleChagePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((prev) => prev - 1);
    if (type === "next") setPage((next) => next + 1);
  };

  useEffect(() => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  }, [page]);

  return (
    <>
      <HoverTooltip
        label="Tạo khóa học mới"
        className="fixed right-5 bottom-5"
        labelClassName="bg-primary"
        IsColorArrow
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
              onChange={(e) => handleSearchCourse(e)}
            />
          </div>
          <Select
            onValueChange={(value) =>
              handleSelectStatus(value as ECourseStatus)
            }
          >
            <SelectTrigger className="w-full max-w-48" size="lg">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseStatus.map((status) => (
                  <SelectItem
                    value={status.value}
                    key={status.value}
                    className={status.className}
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
          {courses.length > 0 &&
            courses.map((courses, index) => {
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
                        src={courses.image}
                        width={80}
                        height={80}
                        className="shrink-0 size-16 rounded-lg object-cover"
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
                        <StatusBadge
                          item={courseStatusTitleItem}
                          onClick={() =>
                            handleChangeStatus(courses.slug, courses.status)
                          }
                        ></StatusBadge>
                      </button>
                    </HoverTooltip>
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      <TableActionItem
                        type="doc"
                        label="Cập nhật nội dụng cho người xem"
                        url={`/manage/course/update-content?slug=${courses.slug}`}
                      />
                      <TableActionItem
                        type="view"
                        label="Xem khóa học"
                        url={`/course/${courses.slug}`}
                        newTab
                      />
                      <TableActionItem
                        type="edit"
                        label="Cập nhật thông tin khóa học"
                        url={`/manage/course/update?slug=${courses.slug}`}
                      />
                      <TableActionItem
                        type="delete"
                        label="Xóa khóa học"
                        onClick={() => handleDeleteCourseItem(courses.slug)}
                      />
                    </TableAction>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <PanigationBtn
        page={page}
        onClickNext={() => handleChagePage("next")}
        onClickPrev={() => handleChagePage("prev")}
      ></PanigationBtn>
    </>
  );
};

export default CourseManage;
