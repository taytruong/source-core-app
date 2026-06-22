import React from "react";
import RatingManage from "./RatingManage";
import { getRatings } from "@/src/lib/actions/rating.action";
import { ERatingStatus } from "@/src/types/enum";

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
  return <RatingManage ratings={ratings}></RatingManage>;
};

export default page;
