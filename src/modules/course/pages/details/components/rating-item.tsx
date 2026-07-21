import Image from 'next/image';

import { RatingIcon } from '@/src/shared/types';

export interface RatingItemProps {
  rating: string;
  title?: RatingIcon;
  author?: string;
  avatar?: string;
}

function RatingItem({ author, avatar, rating, title }: RatingItemProps) {
  return (
    <div className="bg-item flex flex-col gap-3 rounded-lg p-2 text-sm font-medium shadow-sm">
      <div className="flex items-center gap-2">
        <span className="italic">{rating}</span>
        <span>
          <Image
            alt={title ?? ''}
            height={20}
            src={`/rating/${title}.png`}
            width={20}
          />
        </span>
      </div>
      <div className="border border-slate-400" />
      {!!avatar && (
        <div className="flex items-center gap-2">
          <Image
            alt={author ?? ''}
            height={30}
            src={avatar}
            width={30}
          />
          <span className="text-sm font-normal">@{author}</span>
        </div>
      )}
    </div>
  );
}

export default RatingItem;
