import Link from 'next/link';

const AlreadyEnroll = () => {
  return (
    <div className="rounded-lg bg-white p-5">
      You are already enrolled in this course. Please click on{' '}
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
