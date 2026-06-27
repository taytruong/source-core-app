import Link from "next/link";

const AlreadyEnroll = () => {
  return (
    <div className="bg-white rounded-lg p-5">
      Bạn đang có khóa học này rồi. Vui lòng nhấn vào{" "}
      <Link className="text-primary font-semibold" href="/study">
        Khu vực học tập
      </Link>
    </div>
  );
};

export default AlreadyEnroll;
