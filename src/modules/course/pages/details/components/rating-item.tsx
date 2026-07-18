import Image from 'next/image';

import { RatingIcon } from '@/src/shared/types';

export interface RatingItemProps {
  rating: string;
  title?: RatingIcon;
}

function RatingItem({ rating, title }: RatingItemProps) {
  return (
    <div className="border-primary rounded-lg border p-2 text-sm font-medium">
      <div className="flex items-center gap-2">
        <span>{rating}</span>
        <span>
          <Image
            alt={title ?? ''}
            height={20}
            src={`/rating/${title}.png`}
            width={20}
          />
        </span>
      </div>
    </div>
  );
}

export default RatingItem;
