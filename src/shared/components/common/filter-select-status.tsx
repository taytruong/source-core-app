'use client';

import { FunnelIcon } from 'lucide-react';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/components/ui/select';

export interface FilterOption {
  value: string | number;
  title: string;
  className?: string;
}

interface FilterSelectStatusProps {
  options: FilterOption[];
  onValueChange: (value: string) => void;
  allValue: string;
  allLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  type?: 'icon';
}

function FilterSelectStatus({
  allLabel = 'All',
  allValue,
  className = 'w-full max-w-48',
  defaultValue,
  onValueChange,
  options,
  placeholder,
}: FilterSelectStatusProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!!isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm"
        />
      )}

      <div
        className={`relative flex w-48 items-center gap-2 ${
          isOpen ? 'z-50' : 'z-auto'
        }`}
      >
        <div className="flex items-center gap-2">
          <FunnelIcon size={16} />:
        </div>

        <Select
          defaultValue={defaultValue ?? allValue}
          open={isOpen}
          onOpenChange={setIsOpen}
          onValueChange={onValueChange}
        >
          <SelectTrigger
            className={className}
            size="lg"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent className="z-60">
            <SelectGroup>
              <SelectItem value={allValue}>{allLabel}</SelectItem>

              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  className={option.className}
                  value={`${option.value}`}
                >
                  {option.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default FilterSelectStatus;
