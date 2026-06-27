"use client";
import React, { MouseEvent, useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { cn } from "@/lib/utils";
import { ILesson } from "@/src/database/lesson.md";
import { createLecture, updateLecture } from "@/src/lib/actions/lecture.action";
import { createLesson, updateLesson } from "@/src/lib/actions/lesson.action";
import { HoverTooltip } from "@/src/shared/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { commonClassNames } from "@/src/shared/constants";
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/src/types";

import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
} from "../../shared/components/icons";
import LessonItemUpdate from "../lesson/LessonItemUpdate";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const lectures = course.lectures;

  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");

  const [lessonEdit, setLessonEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");

  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id.toString(),
        order: lectures.length + 1,
        path: `/manage/course/update-content?slug=${course.slug}`,
      });

      if (res?.success) {
        toast.success("Thêm chương mới thành công!");
      }
    } catch (error) {
      console.log("🚀 ~ handleAddNewLecture ~ error:", error);
    }
  };

  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    e.stopPropagation();
    try {
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
          await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `/manage/course/update-content?slug=${course.slug}`,
            },
          });
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleDeleteLecture ~ error:", error);
    }
  };

  const handleUpdateLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });

      if (res?.success) {
        toast.success("Cập nhật chương thành công!");
        setLectureIdEdit("");
        setLectureEdit("");
      }
    } catch (error) {
      console.log("🚀 ~ handleDeleteLecture ~ error:", error);
    }
  };

  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        path: `/manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: "Tiêu đề mới",
        slug: `tieu-de-moi-${Date.now().toString().slice(-3)}`,
      });

      if (res?.success) {
        toast.success("Thêm tập mới thành công!");

        return;
      }
      toast.error("Thêm tập mới thất bại!");
    } catch (error) {
      console.log("🚀 ~ handleAddNewLesson ~ error:", error);
    }
  };

  const handleUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[!"'()*+.:@~]/g,
          }),
        },
        path: `/manage/course/update-content?slug=${course.slug}`,
      });

      if (res?.success) {
        toast.success("Cập nhật tập này thành công!");
        setLessonIdEdit("");
        setLessonEdit("");
      }
    } catch (error) {
      console.log("🚀 ~ handleUpdateLesson ~ error:", error);
    }
  };

  const handleDeleteLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    e.stopPropagation();
    try {
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
          await updateLesson({
            lessonId,
            updateData: {
              _destroy: true,
            },
            path: `/manage/course/update-content?slug=${course.slug}`,
          });
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleDeleteLecture ~ error:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((item: TUpdateCourseLecture) => (
          <div key={item._id.toString()}>
            <Accordion collapsible={!lectureIdEdit} type="single">
              <AccordionItem value={item._id.toString()}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3 justify-between w-full pr-5">
                    {item._id.toString() === lectureIdEdit ? (
                      <>
                        <div className="w-full">
                          <Input
                            defaultValue={item.title}
                            placeholder="Tên chương"
                            onChange={(e) => setLectureEdit(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <HoverTooltip label="Cập nhật">
                            <span
                              className={cn(
                                commonClassNames.iconSetting,
                                "text-green-500",
                              )}
                              onClick={(e) =>
                                handleUpdateLecture(e, item._id.toString())
                              }
                            >
                              <IconCheck />
                            </span>
                          </HoverTooltip>
                          <HoverTooltip label="Hủy cập nhật">
                            <span
                              className={cn(
                                commonClassNames.iconSetting,
                                "text-red-500",
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLectureIdEdit("");
                              }}
                            >
                              <IconCancel />
                            </span>
                          </HoverTooltip>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{item.title}</div>
                        <div className="flex gap-2">
                          <HoverTooltip label="Chỉnh sửa">
                            <span
                              className={commonClassNames.iconSetting}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLectureIdEdit(item._id.toString());
                                setLectureEdit(item.title);
                              }}
                            >
                              <IconEdit />
                            </span>
                          </HoverTooltip>

                          <HoverTooltip label="Xóa">
                            <span
                              className={cn(
                                commonClassNames.iconSetting,
                                "text-red-500",
                              )}
                              onClick={(e) =>
                                handleDeleteLecture(e, item._id.toString())
                              }
                            >
                              <IconDelete />
                            </span>
                          </HoverTooltip>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                {item.lessons?.length > 0 && (
                  <AccordionContent className="border-none bg-transparent!">
                    <div className="flex flex-col gap-3">
                      {item.lessons.map((lesson: ILesson) => (
                        <Accordion
                          key={lesson._id.toString()}
                          collapsible={!lessonIdEdit}
                          type="single"
                        >
                          <AccordionItem value={lesson._id.toString()}>
                            <AccordionTrigger>
                              <div className="flex items-center gap-3 justify-between w-full pr-5">
                                {lesson._id.toString() === lessonIdEdit ? (
                                  <>
                                    <div className="w-full">
                                      <Input
                                        defaultValue={lesson.title}
                                        placeholder="Tên tập"
                                        onChange={(e) =>
                                          setLessonEdit(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <HoverTooltip label="Cập nhật">
                                        <span
                                          className={cn(
                                            commonClassNames.iconSetting,
                                            "text-green-500",
                                          )}
                                          onClick={(e) =>
                                            handleUpdateLesson(
                                              e,
                                              lesson._id.toString(),
                                            )
                                          }
                                        >
                                          <IconCheck />
                                        </span>
                                      </HoverTooltip>
                                      <HoverTooltip label="Hủy cập nhật">
                                        <span
                                          className={cn(
                                            commonClassNames.iconSetting,
                                            "text-red-500",
                                          )}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setLessonIdEdit("");
                                          }}
                                        >
                                          <IconCancel />
                                        </span>
                                      </HoverTooltip>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div>{lesson.title}</div>
                                    <div className="flex gap-2">
                                      <HoverTooltip label="Chỉnh sửa">
                                        <span
                                          className={
                                            commonClassNames.iconSetting
                                          }
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setLessonIdEdit(
                                              lesson._id.toString(),
                                            );
                                            setLessonEdit(lesson.title);
                                          }}
                                        >
                                          <IconEdit />
                                        </span>
                                      </HoverTooltip>

                                      <HoverTooltip label="Xóa">
                                        <span
                                          className={cn(
                                            commonClassNames.iconSetting,
                                            "text-red-500",
                                          )}
                                          onClick={(e) =>
                                            handleDeleteLesson(
                                              e,
                                              lesson._id.toString(),
                                            )
                                          }
                                        >
                                          <IconDelete />
                                        </span>
                                      </HoverTooltip>
                                    </div>
                                  </>
                                )}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <LessonItemUpdate
                                lesson={lesson}
                               />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            </Accordion>
            <Button
              className="mt-5 ml-auto w-fit block"
              onClick={() =>
                handleAddNewLesson(item._id.toString(), course._id.toString())
              }
            >
              Thêm tập mới
            </Button>
          </div>
        ))}
      </div>
      <Button className="mt-5" onClick={handleAddNewLecture}>
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
