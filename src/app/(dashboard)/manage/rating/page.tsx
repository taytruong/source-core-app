import React from "react";

import { getRatings } from "@/src/lib/actions/rating.action";
import { ERatingStatus } from "@/src/types/enum";

import RatingManage from "./RatingManage";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ERatingStatus;
  };
}) => {
  const ratings = await getRatings({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search || "",
    status: searchParams.status,
  });

  return <RatingManage ratings={ratings} />;
};

export default page;
