import Link from "next/link";
import React from "react";

const AlreadyEnroll = () => {
  return (
    <div className="bg-white rounded-lg p-5">
      Bạn đang có khóa học này rồi. Vui lòng nhấn vào{" "}
      <Link href="/study" className="text-primary font-semibold">
        Khu vực học tập
      </Link>
    </div>
  );
};

export default AlreadyEnroll;
