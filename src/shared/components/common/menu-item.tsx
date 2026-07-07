import { MenuItemProps } from '../../types';
import LinkActive from './link-active';

const MenuItem = ({ icon, onlyIcon, title = '', url = '/' }: MenuItemProps) => {
  return (
    <li>
      <LinkActive url={url}>
        {/* <div className="flexCenter text-primary size-8 rounded-lg bg-white">
          {icon}
        </div> */}
        {icon}
        {onlyIcon ? null : title}
      </LinkActive>
    </li>
  );
};

export default MenuItem;
