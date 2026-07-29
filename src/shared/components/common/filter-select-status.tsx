import { FunnelIcon } from 'lucide-react';

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
  return (
    <div className="flex w-48 items-center gap-2">
      <div className="flex items-center gap-2">
        <FunnelIcon size={16} />:
      </div>
      <Select
        defaultValue={defaultValue ?? allValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger
          className={className}
          size="lg"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
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
  );
}

export default FilterSelectStatus;
