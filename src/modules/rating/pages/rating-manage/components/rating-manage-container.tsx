'use client';

import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

import { deleteRating, updateRating } from '@/src/modules/rating/actions';
import {
  BadgeStatus,
  FilterSelectStatus,
  Pagination,
  SortableTable,
  TableAction,
  TableActionItem,
} from '@/src/shared/components/common';
import { Input } from '@/src/shared/components/ui/input';
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
  ratingList,
  RatingStatus,
  ratingStatus,
} from '@/src/shared/constants';
import { useQueryString } from '@/src/shared/hooks';
import { RatingItemData } from '@/src/shared/types';

interface RatingManageContainerProps {
  ratings?: RatingItemData[];
  totalPages: number;
  total: number;
}

const RatingManageContainer = ({
  ratings,
  total,
  totalPages,
}: RatingManageContainerProps) => {
  const { handleSearchData, handleSelectStatus } = useQueryString();

  const handleUpdateRating = async (id: string) => {
    try {
      await updateRating(id);
    } catch (error) {
      console.log('🚀 ~ handleUpdateRating ~ error:', error);
    }
  };

  const handleDeleteRating = async (id: string) => {
    try {
      Swal.fire({
        title: 'Are you sure you want to delete this rating?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteRating(id);
        }
      });
    } catch (error) {
      console.log('🚀 ~ handleDeleteRating ~ error:', error);
    }
  };

  return (
    <div>
      <div className="mb-10 flex flex-col justify-start gap-5 lg:flex-row lg:items-center">
        <div className="flex gap-3">
          <div className="w-full lg:w-125">
            <Input
              placeholder="Search ratings..."
              onChange={handleSearchData}
            />
          </div>
          <FilterSelectStatus
            allValue={allValue}
            options={ratingStatus}
            placeholder="Search ratings..."
            onValueChange={(value) => handleSelectStatus(value as RatingStatus)}
          />
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Course</TableHead>
            <SortableTable field="create">Create Date</SortableTable>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!ratings &&
            ratings.length > 0 &&
            ratings.map((rating: RatingItemData, index: number) => {
              const ratingStatusItem = ratingStatus.find(
                (item) => item.value === rating.status,
              );
              const icon = ratingList.find(
                (item) => item.value === rating.rate,
              )?.title;

              return (
                <TableRow key={rating.rate}>
                  <TableCell className="w-10 p-7">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <strong>{rating.content}</strong>
                        <Image
                          alt=""
                          height={20}
                          src={`/rating/${icon}.png`}
                          width={20}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="hover:text-primary text-sm font-semibold whitespace-nowrap transition-colors duration-200 lg:text-base"
                      href={`/course/${rating.course.slug}`}
                      target="_blank"
                    >
                      {rating.course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <time>
                      {new Date(rating.create_at).toLocaleDateString('vi-VI')}
                    </time>
                  </TableCell>
                  <TableCell>
                    <strong>{rating.user?.name}</strong>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      title={ratingStatusItem?.title}
                      variant={ratingStatusItem?.variant}
                    />
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      {rating.status !== RatingStatus.ACTIVE && (
                        <TableActionItem
                          label="Update Status"
                          type="approve"
                          onClick={() => handleUpdateRating(rating._id)}
                        />
                      )}
                      <TableActionItem
                        label="Delete Rating"
                        type="delete"
                        onClick={() => handleDeleteRating(rating._id)}
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
    </div>
  );
};

export default RatingManageContainer;
