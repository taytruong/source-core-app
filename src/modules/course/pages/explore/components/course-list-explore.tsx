'use client';

import { SearchIcon } from 'lucide-react';

import {
  CourseGrid,
  FilterSelectStatus,
  Pagination,
  SortCreateAt,
} from '@/src/shared/components/common';
import { Input } from '@/src/shared/components/ui/input';
import {
  allValue,
  CourseLevel,
  courseLevel,
  ITEM_PER_PAGE,
} from '@/src/shared/constants';
import { useQueryString } from '@/src/shared/hooks';

import { CourseItem } from '../../../components/course-item';
import { CourseItemData } from '../../../types';

export interface CourseListSuggestionProps {
  courses: CourseItemData[] | undefined;
  isLoading: boolean;
  total?: number;
}

function CourseListSuggestion({
  courses,
  isLoading,
  total = 0,
}: CourseListSuggestionProps) {
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);
  const { handleSearchData, handleSelectLevel } = useQueryString();
  const courseList = courses || [];

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-full lg:w-125">
            <Input
              icon={<SearchIcon size={18} />}
              placeholder="Search course ..."
              onChange={handleSearchData}
            />
          </div>
          <FilterSelectStatus
            allValue={allValue}
            options={courseLevel}
            placeholder="Select Level"
            onValueChange={(value) => handleSelectLevel(value as CourseLevel)}
          />
          <SortCreateAt />
        </div>
        <CourseGrid isLoading={isLoading}>
          {courseList?.length > 0 &&
            courseList?.map((item) => (
              <CourseItem
                key={item.slug}
                data={item}
              />
            ))}
        </CourseGrid>
      </div>
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </>
  );
}

export default CourseListSuggestion;
