import Link from "next/link";

import { IconPlus } from "@/src/shared/components/icons";

const BouncedLink = ({ url }: { url: string }) => {
  return (
    <Link
      className="size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce"
      href={url}
    >
      <IconPlus />
    </Link>
  );
};

export default BouncedLink;
