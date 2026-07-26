'use client';

import {
  CourseGrid,
  Pagination,
  SortCreateAt,
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
        <div className="flex gap-3">
          <div className="w-full lg:w-125">
            <Input
              placeholder="Search course ..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleSelectLevel(value as CourseLevel)}
          >
            <SelectTrigger
              className="w-full max-w-48"
              size="lg"
            >
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>All</SelectItem>
                {courseLevel.map((level) => (
                  <SelectItem
                    key={level.value}
                    value={level.value}
                  >
                    {level.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
