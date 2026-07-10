'use client';
import { MouseEvent, useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import { createLecture, updateLecture } from '@/src/modules/lecture/actions';
import { createLesson } from '@/src/modules/lesson/actions';
import { HoverTooltip } from '@/src/shared/components/common';
import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
} from '@/src/shared/components/icons';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/src/shared/components/ui/accordion';
import { Button } from '@/src/shared/components/ui/button';
import { Input } from '@/src/shared/components/ui/input';

import { CourseItemData } from '../../../types';
import DraggableContent from './draggable-content';
import UpdateContentAction from './update-content-action';

interface UpdateContentCourseContainerProps {
  course: CourseItemData;
}

const UpdateContentCourseContainer = ({
  course,
}: UpdateContentCourseContainerProps) => {
  const lectures = course.lectures;

  const [lectureEdit, setLectureEdit] = useState('');
  const [lectureIdEdit, setLectureIdEdit] = useState('');

  const [lessonEdit, setLessonEdit] = useState('');
  const [lessonIdEdit, setLessonIdEdit] = useState('');

  const handleAddNewLecture = async () => {
    try {
      const response = await createLecture({
        title: 'New Lecture',
        course: course._id.toString(),
        order: lectures.length + 1,
        path: `/manage/course/update-content?slug=${course.slug}`,
      });

      if (response?.success) {
        toast.success('Add new lecture successfully!');
      }
    } catch (error) {
      console.log('🚀 ~ handleAddNewLecture ~ error:', error);
    }
  };

  const handleDeleteLecture = async (
    event: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    event.stopPropagation();
    try {
      Swal.fire({
        title: 'Are you sure you want to delete this lecture?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
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
      console.log('🚀 ~ handleDeleteLecture ~ error:', error);
    }
  };

  const handleUpdateLecture = async (
    event: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    event.stopPropagation();
    try {
      const respone = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });

      if (respone?.success) {
        toast.success('Update lecture successfully!');
        setLectureIdEdit('');
        setLectureEdit('');
      }
    } catch (error) {
      console.log('🚀 ~ handleDeleteLecture ~ error:', error);
    }
  };

  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    const foundLecture = lectures.find(
      (lecture) => lecture._id.toString() === lectureId,
    );

    try {
      const respone = await createLesson({
        path: `/manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: 'New Title',
        slug: `new-title-${Date.now().toString().slice(-3)}`,
        order: (foundLecture?.lessons?.length || 0) + 1,
      });

      if (respone?.success) {
        toast.success('Add new lesson successfully!');

        return;
      }
      toast.error('Add new lesson failed!');
    } catch (error) {
      console.log('🚀 ~ handleAddNewLesson ~ error:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture) => (
          <div key={lecture._id.toString()}>
            <Accordion
              collapsible={!lectureIdEdit}
              type="single"
            >
              <AccordionItem value={lecture._id.toString()}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between gap-3 pr-5">
                    {lecture._id.toString() === lectureIdEdit ? (
                      <>
                        <div className="w-full">
                          <Input
                            defaultValue={lecture.title}
                            placeholder="Lecture Name"
                            onChange={(event) =>
                              setLectureEdit(event.target.value)
                            }
                          />
                        </div>
                        <div className="flex gap-2">
                          <HoverTooltip label="Update">
                            <UpdateContentAction
                              variant="success"
                              onClick={(event) =>
                                handleUpdateLecture(
                                  event,
                                  lecture._id.toString(),
                                )
                              }
                            >
                              <IconCheck />
                            </UpdateContentAction>
                          </HoverTooltip>
                          <HoverTooltip label="Cancel Update">
                            <UpdateContentAction
                              variant="danger"
                              onClick={(event) => {
                                event.stopPropagation();
                                setLectureIdEdit('');
                              }}
                            >
                              <IconCancel />
                            </UpdateContentAction>
                          </HoverTooltip>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{lecture.title}</div>
                        <div className="flex gap-2">
                          <HoverTooltip label="Edit">
                            <UpdateContentAction
                              variant="info"
                              onClick={(event) => {
                                event.stopPropagation();
                                setLectureIdEdit(lecture._id.toString());
                                setLectureEdit(lecture.title);
                              }}
                            >
                              <IconEdit />
                            </UpdateContentAction>
                          </HoverTooltip>

                          <HoverTooltip label="Delete">
                            <UpdateContentAction
                              variant="danger"
                              onClick={(event) =>
                                handleDeleteLecture(
                                  event,
                                  lecture._id.toString(),
                                )
                              }
                            >
                              <IconDelete />
                            </UpdateContentAction>
                          </HoverTooltip>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                <DraggableContent
                  courseSlug={course.slug}
                  id={lecture._id.toString()}
                  lecture={lecture}
                  lessonEdit={lessonEdit}
                  lessonIdEdit={lessonIdEdit}
                  setLessonEdit={setLessonEdit}
                  setLessonIdEdit={setLessonIdEdit}
                />
              </AccordionItem>
            </Accordion>
            <Button
              className="mt-5 ml-auto block w-fit"
              onClick={() =>
                handleAddNewLesson(
                  lecture._id.toString(),
                  course._id.toString(),
                )
              }
            >
              Add new lesson
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="mt-5"
        onClick={handleAddNewLecture}
      >
        Add new lecture
      </Button>
    </div>
  );
};

export default UpdateContentCourseContainer;
