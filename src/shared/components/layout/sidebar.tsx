'use client';

import Image from 'next/image';

import logo from '@/src/assets/logo.png';
import { MenuItem } from '@/src/shared/components/common';
import { menuItems } from '@/src/shared/constants';

const Sidebar = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 hidden w-75 flex-col border-r border-r-gray-200 bg-linear-to-r from-orange-100 to-white/40 px-8 py-5 shadow-sm lg:flex">
      <a
        className="flexCenter mb-11 text-4xl font-semibold"
        href="/"
      >
        <span className="mb-2">
          <Image
            alt="logo"
            className="object-cover"
            height={27}
            src={logo}
            width={32}
          />
        </span>
        cademy.
      </a>
      <ul className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            url={item.url}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
