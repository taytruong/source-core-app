import { MenuItemProps } from '../../types';
import LinkActive from './link-active';

const MenuItem = ({
  icon,
  onlyIcon,
  title = '',
  title2,
  url = '/',
}: MenuItemProps) => {
  return (
    <li>
      <div className="flex items-center gap-3 px-2 pb-2 text-gray-500">
        {!!title2 && (
          <>
            <span className="text-muted-foreground/70 text-[10px] font-semibold tracking-wider uppercase">
              {title2}
            </span>
            <div className="border-border/70 h-px flex-1 border-t border-dashed" />
          </>
        )}
      </div>
      <LinkActive url={url}>
        {icon}
        {onlyIcon ? null : title}
      </LinkActive>
    </li>
  );
};

export default MenuItem;
