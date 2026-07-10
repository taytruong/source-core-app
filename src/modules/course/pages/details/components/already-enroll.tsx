import Link from 'next/link';

const AlreadyEnroll = () => {
  return (
    <div className="rounded-lg bg-white p-5">
      Bạn đang có khóa học này rồi. Vui lòng nhấn vào{' '}
      <Link
        className="text-primary font-semibold"
        href="/study"
      >
        Study Area
      </Link>
    </div>
  );
};

export default AlreadyEnroll;
