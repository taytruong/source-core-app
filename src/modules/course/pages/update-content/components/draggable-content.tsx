import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import slugify from 'slugify';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { updateLesson, updateLessonOrder } from '@/src/modules/lesson/actions';
import { HoverTooltip } from '@/src/shared/components/common';
import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
} from '@/src/shared/components/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/shared/components/ui/accordion';
import { Input } from '@/src/shared/components/ui/input';
import { LectureItemData, LessonItemData } from '@/src/shared/types';

import DraggableHandle from './draggable-handle';
import DraggableItem from './draggable-item';
import UpdateContentAction from './update-content-action';
import UpdateContentLessonItem from './update-content-lesson-item';

export interface DraggableContentProps {
  lecture: LectureItemData;
  lessonIdEdit: string;
  setLessonEdit: (lessonId: string) => void;
  lessonEdit: string;
  setLessonIdEdit: Dispatch<SetStateAction<string>>;
  courseSlug: string;
  id: string;
}

function DraggableContent({
  courseSlug,
  id,
  lecture,
  lessonEdit,
  lessonIdEdit,
  setLessonEdit,
  setLessonIdEdit,
}: DraggableContentProps) {
  const [lessonList, setLessonList] = useState<LessonItemData[]>([]);
  const { setNodeRef } = useDroppable({
    id,
  });

  const handleUpdateLesson = async (
    event: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    event.stopPropagation();
    try {
      const respone = await updateLesson({
        lessonId,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: 'vi',
            remove: /[!"'()*+.:@~]/g,
          }),
        },
        path: `/manage/course/update-content?slug=${courseSlug}`,
      });

      if (respone?.success) {
        toast.success('Update lesson successfully!');
        setLessonIdEdit('');
        setLessonEdit('');
      }
    } catch (error) {
      console.log('🚀 ~ handleUpdateLesson ~ error:', error);
    }
  };

  const handleDeleteLesson = async (
    event: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    event.stopPropagation();
    try {
      Swal.fire({
        title: 'Are you sure you want to delete this lesson?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateLesson({
            lessonId,
            updateData: {
              _destroy: true,
            },
            path: `/manage/course/update-content?slug=${courseSlug}`,
          });
        }
      });
    } catch (error) {
      console.log('🚀 ~ handleDeleteLecture ~ error:', error);
    }
  };

  // handle drag lesson in lecture
  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const activeIndex = lessonList.findIndex(
        ({ _id }) => _id.toString() === active.id,
      );
      const overIndex = lessonList.findIndex(
        ({ _id }) => _id.toString() === over.id,
      );

      const newLessons = arrayMove(lessonList, activeIndex, overIndex);

      setLessonList(newLessons);

      for (const [index, lesson] of newLessons.entries()) {
        await updateLessonOrder({
          lessonId: lesson._id.toString(),
          order: index + 1,
          path: `/manage/course/update-content?slug=${courseSlug}`,
        });
      }
    }
  };

  useEffect(() => {
    setLessonList(lecture.lessons);
  }, [lecture.lessons]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AccordionContent className="border-none bg-transparent!">
        <div className="flex flex-col gap-3">
          <SortableContext
            id={id}
            items={lessonList.map((lesson) => lesson._id.toString())}
          >
            <div
              ref={setNodeRef}
              className="flex flex-col gap-5"
            >
              {lessonList.map((lesson) => (
                <DraggableItem
                  key={lesson._id.toString()}
                  id={lesson._id.toString()}
                >
                  <Accordion
                    collapsible={!lessonIdEdit}
                    type="single"
                  >
                    <AccordionItem value={lesson._id.toString()}>
                      <AccordionTrigger>
                        <div className="flex w-full items-center justify-between gap-3 pr-5">
                          {lesson._id.toString() === lessonIdEdit ? (
                            <>
                              <div className="w-full">
                                <Input
                                  className="border border-slate-200"
                                  defaultValue={lesson.title}
                                  placeholder="Lesson Name"
                                  onChange={(event) =>
                                    setLessonEdit(event.target.value)
                                  }
                                />
                              </div>
                              <div className="flex gap-2">
                                <HoverTooltip label="Update">
                                  <span>
                                    <UpdateContentAction
                                      variant="success"
                                      onClick={(event) =>
                                        handleUpdateLesson(
                                          event,
                                          lesson._id.toString(),
                                        )
                                      }
                                    >
                                      <IconCheck />
                                    </UpdateContentAction>
                                  </span>
                                </HoverTooltip>
                                <HoverTooltip label="Cancel Update">
                                  <span>
                                    <UpdateContentAction
                                      variant="danger"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setLessonIdEdit('');
                                      }}
                                    >
                                      <IconCancel />
                                    </UpdateContentAction>
                                  </span>
                                </HoverTooltip>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>{lesson.title}</div>
                              <div className="flex gap-2">
                                <HoverTooltip label="Edit">
                                  <span>
                                    <UpdateContentAction
                                      variant="default"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setLessonIdEdit(lesson._id.toString());
                                        setLessonEdit(lesson.title);
                                      }}
                                    >
                                      <IconEdit />
                                    </UpdateContentAction>
                                  </span>
                                </HoverTooltip>

                                <HoverTooltip label="Delete">
                                  <span>
                                    <UpdateContentAction
                                      variant="danger"
                                      onClick={(event) =>
                                        handleDeleteLesson(
                                          event,
                                          lesson._id.toString(),
                                        )
                                      }
                                    >
                                      <IconDelete />
                                    </UpdateContentAction>
                                  </span>
                                </HoverTooltip>
                                <HoverTooltip label="Move Lesson">
                                  <div className="flexCenter">
                                    <DraggableHandle />
                                  </div>
                                </HoverTooltip>
                              </div>
                            </>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 p-5">
                        <UpdateContentLessonItem
                          courseSlug={courseSlug}
                          lesson={lesson}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </DraggableItem>
              ))}
            </div>
          </SortableContext>
        </div>
      </AccordionContent>
    </DndContext>
  );
}

export default DraggableContent;
