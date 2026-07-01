'use client';

import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

import { deleteRating, updateRating } from '@/src/modules/rating/actions';
import {
  BadgeStatus,
  Heading,
  TableAction,
  TableActionItem,
} from '@/src/shared/components';
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
  ratingList,
  RatingStatus,
  ratingStatus,
} from '@/src/shared/constants';
import useQueryString from '@/src/shared/hooks/use-query-string';
import { RatingItem } from '@/src/types';

const RatingManage = ({ ratings }: { ratings: any }) => {
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
        title: 'Bạn có muốn xóa đánh giá không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Thoát',
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
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading className="">Quản lý đánh giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-75">
            <Input
              placeholder="Tìm kiếm đánh giá..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleSelectStatus(value as RatingStatus)}
          >
            <SelectTrigger
              className="w-full max-w-48"
              size="lg"
            >
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {ratingStatus.map((status) => (
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
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ratings.length > 0 &&
            ratings.map((rating: RatingItem, index: number) => {
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
                      <time>
                        {new Date(rating.create_at).toLocaleDateString('vi-VI')}
                      </time>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="hover:text-primary font-semibold transition-all"
                      href={`/course/${rating.course.slug}`}
                      target="_blank"
                    >
                      {rating.course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <strong>{rating.user?.name}</strong>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus item={ratingStatusItem} />
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      {rating.status !== RatingStatus.ACTIVE && (
                        <TableActionItem
                          label="Cập nhật trạng thái"
                          type="approve"
                          onClick={() => handleUpdateRating(rating._id)}
                        />
                      )}
                      <TableActionItem
                        label="Xóa trạng thái"
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
    </div>
  );
};

export default RatingManage;
