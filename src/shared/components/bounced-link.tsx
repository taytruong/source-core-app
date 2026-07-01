import Link from 'next/link';

import { IconPlus } from '@/src/shared/components/icons';

import HoverTooltip from './hover-tooltip';

const BouncedLink = ({ url }: { url: string }) => {
  return (
    <HoverTooltip
      IsColorArrow
      className="fixed right-5 bottom-5"
      label="Tạo khóa học mới"
      labelClassName="bg-primary"
    >
      <Link href={url}>
        <IconPlus className="bg-primary flexCenter size-10 rounded-full p-2 text-white hover:animate-[spin_0.8s_linear_0.5]" />
      </Link>
    </HoverTooltip>
  );
};

export default BouncedLink;
