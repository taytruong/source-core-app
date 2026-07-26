'use client';
import { useSearchParams } from 'next/navigation';

import { sortOptions } from '../../constants';
import { useQueryString } from '../../hooks';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export interface SortCreateAtProps {}

function SortCreateAt(_props: SortCreateAtProps) {
  const params = useSearchParams();
  const sortValue = params.get('sort');
  const { createQueryString } = useQueryString();

  const handleSelectSort = (value: string) => {
    createQueryString('sort', value);
  };

  return (
    <Select
      defaultValue={sortValue || 'recent'}
      onValueChange={handleSelectSort}
    >
      <SelectTrigger
        className="w-full max-w-48"
        size="lg"
      >
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortCreateAt;
