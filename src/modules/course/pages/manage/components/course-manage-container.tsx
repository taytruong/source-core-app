'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import {
  BadgeStatus,
  HoverTooltip,
  Pagination,
  TableAction,
  TableActionItem,
} from '@/src/shared/components/common';
import { Input } from '@/src/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/components/ui/table';
import {
  allValue,
  CourseStatus,
  courseStatus,
  ITEM_PER_PAGE,
} from '@/src/shared/constants';
import { useQueryString } from '@/src/shared/hooks';

import { updateCourse } from '../../../actions';
import { CourseItemData } from '../../../types';

interface CourseManageContainerProps {
  courses?: CourseItemData[];
  total?: number;
}

const CourseManageContainer = ({
  courses = [],
  total = 0,
}: CourseManageContainerProps) => {
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);
  const { handleSearchData, handleSelectStatus } = useQueryString();

  const handleDeleteCourseItem = (slug: string) => {
    Swal.fire({
      title: 'Are you sure you want to delete this course?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete Course',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: CourseStatus.PENDING,
            _destroy: true,
          },
          path: '/manage/course',
        });
        toast.success('Course deleted successfully!');
      }
    });
  };

  const handleChangeStatus = async (slug: string, status: CourseStatus) => {
    try {
      Swal.fire({
        title: 'Are you sure you want to change the status?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update Status',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                status === CourseStatus.PENDING
                  ? CourseStatus.APPROVED
                  : CourseStatus.PENDING,
              _destroy: false,
            },
            path: '/manage/course',
          });
          toast.success('Status updated successfully!');
        }
      });
    } catch (error) {
      console.log('🚀 ~ handleChangeStatus ~ error:', error);
    }
  };

  return (
    <>
      {/* <BouncedLink
        label="Create New Course"
        url="/manage/course/new"
      /> */}

      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="flex gap-3">
          <div className="w-full lg:w-125">
            <Input
              placeholder="Search courses ..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleSelectStatus(value as CourseStatus)}
          >
            <SelectTrigger
              className="w-full max-w-48"
              size="lg"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>All</SelectItem>
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
        <Link
          className="bg-primary button-primary flex h-10 items-center justify-center rounded-lg px-3 font-medium text-white"
          href="/manage/course/new"
        >
          Apply New Course
        </Link>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Information Course</TableHead>
            <TableHead>Price ($)</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Settings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!courses &&
            courses.length > 0 &&
            courses.map((courses, index) => {
              const courseStatusTitleItem = courseStatus.find(
                (item) => item.value === courses.status,
              );

              return (
                <TableRow key={courses.slug}>
                  <TableCell className="w-10 p-7">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-10">
                      <Image
                        alt=""
                        className="size-16 shrink-0 rounded-lg object-cover"
                        height={80}
                        src={courses.image}
                        width={80}
                      />
                      <h3 className="text-sm font-semibold whitespace-nowrap lg:text-base">
                        {courses.title}
                      </h3>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium lg:text-base">
                      {courses?.price?.toLocaleString('en-EN')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <h4 className="text-xs font-medium lg:text-sm">
                      {new Date(courses.create_at).toLocaleDateString('vi-VI')}
                    </h4>
                  </TableCell>
                  <TableCell>
                    <HoverTooltip label="Can be changed to 'Approved' / 'Pending'">
                      <button>
                        <BadgeStatus
                          title={courseStatusTitleItem?.title}
                          variant={courseStatusTitleItem?.variant}
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
                        label="Update Content for Students"
                        type="doc"
                        url={`/manage/course/update-content?slug=${courses.slug}`}
                      />
                      <TableActionItem
                        newTab
                        label="View Course"
                        type="view"
                        url={`/course/${courses.slug}`}
                      />
                      <TableActionItem
                        label="Update Course Information"
                        type="edit"
                        url={`/manage/course/update?slug=${courses.slug}`}
                      />
                      <TableActionItem
                        label="Delete Course"
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
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </>
  );
};

export default CourseManageContainer;
