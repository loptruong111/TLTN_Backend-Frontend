import { Rating } from "@mui/material";
import moment from "moment";

export default function Review({ review }) {
  return (
    <div className="flex flex-row gap-3 py-3 border-b">
      <img
        className="rounded-full w-10 h-10"
        src={review.userId.avatar}
        alt="avatar"
      />
      <div>
        <div className="flex flex-row items-center">
          <p className=" font-semibold text-sm truncate">
            {review.userId.name}
          </p>
          <p className="text-xs text-gray-500 ml-2">
            {moment(review.createdAt).fromNow()}
          </p>
        </div>
        <Rating name="size-small" value={review.rating} size="small" readOnly />
        <p className="text-sm">{review.comment}</p>
      </div>
    </div>
  );
}
