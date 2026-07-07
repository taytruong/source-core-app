export interface RatingItemProps {
  rating: string;
}

function RatingItem({ rating }: RatingItemProps) {
  return (
    <div className="from-primary rounded-full bg-linear-to-tr to-yellow-400 p-2 px-4 text-sm font-medium text-white">
      {rating}
    </div>
  );
}

export default RatingItem;
