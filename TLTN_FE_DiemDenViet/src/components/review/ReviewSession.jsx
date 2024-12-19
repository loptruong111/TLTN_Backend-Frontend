import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Review from "./Review";
import { useSelector } from "react-redux";
import { Accordion, Alert, Button } from "flowbite-react";
import { Rating } from "@mui/material";
import ReviewService from "../../services/ReviewService";

export default function ReviewSession({ destinationId }) {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [reviewError, setReviewError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);

  const { user } = useSelector((state) => state.user);

  const fetchReviews = useCallback(
    async (startIndex = 0, append = false) => {
      try {
        const queryParams = new URLSearchParams({
          isDeleted: false,
          destinationId,
          startIndex,
          limit: 6,
          oder: 1,
        }).toString();

        const res = await ReviewService.getForDestination(queryParams);

        if (res.status) {
          setTotalReviews(res.data.total);
          setReviews((prevReviews) =>
            append ? [...prevReviews, ...res.data.data] : res.data.data
          );
          setCurrentIndex(startIndex);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    },
    [destinationId]
  );

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.comment.trim() || newReview.comment.length > 500) {
      setReviewError("nhận xét phải ít hơn 500 kí tự.");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        ...newReview,
        userId: user._id,
        destinationId,
      };

      const res = await ReviewService.post(reviewData);

      if (res.status) {
        setNewReview({ rating: 5, comment: "" });
        setReviewError(null);
        setReviews((prevReviews) => [
          { ...res.data, userId: { name: user.name, avatar: user.avatar } },
          ...prevReviews,
        ]);
        setTotalReviews((prevTotal) => prevTotal + 1);
      } else {
        setReviewError(res.data.message || "Lỗi tạo nhận xét.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setReviewError("Có lỗi xảy ra khi gửi nhận xét.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMoreReviews = async () => {
    setLoadingMore(true);
    await fetchReviews(currentIndex + 6, true);
    setLoadingMore(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-center">nhận xét</h3>

      {user ? (
        <div>
          <div className="text-sm flex flex-row gap-1 items-center">
            <img className="w-6 rounded-full" src={user.avatar} alt="avatar" />
            <Link
              className="text-xs text-cyan-600 hover:underline"
              to="/profile"
            >
              @{user.name}
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-teal-500 p-3 mt-4"
          >
            <Rating
              name="simple-controlled"
              value={newReview.rating}
              onChange={(e, newValue) =>
                setNewReview((prev) => ({ ...prev, rating: newValue }))
              }
            />
            <textarea
              rows="3"
              maxLength="500"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Viết nhận xét của bạn..."
              className="w-full rounded-md border-gray-400 text-sm"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-400 text-sm">
                {500 - newReview.comment.length} kí tự còn lại...
              </p>
              <Button
                gradientDuoTone="purpleToBlue"
                type="submit"
                disabled={!newReview.comment.trim() || isSubmitting}
              >
                {isSubmitting ? "Đang gửi..." : "nhận xét"}
              </Button>
            </div>
            {reviewError && (
              <Alert color="failure" className="mt-5">
                {reviewError}
              </Alert>
            )}
          </form>
        </div>
      ) : (
        <p>
          Đăng nhập để nhận xét. <Link to="/signin">Đăng nhập</Link>
        </p>
      )}

      <Accordion className="my-3">
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex flex-row items-center">
              <p>Lượt nhận xét</p>
              <div className="border border-gray-400 px-2 ml-1">
                {totalReviews}
              </div>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            {reviews.length === 0 ? (
              <p>Chưa có nhận xét nào.</p>
            ) : (
              reviews.map((review, index) => (
                <Review key={index} review={review} />
              ))
            )}

            {reviews.length < totalReviews && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={loadMoreReviews}
                  disabled={loadingMore}
                  className="hover:text-blue-500"
                >
                  {loadingMore ? "Đang tải..." : "Hiện thêm nhận xét"}
                </button>
              </div>
            )}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}
