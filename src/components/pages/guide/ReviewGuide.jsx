/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Loader from "../../shared/Loader";
import { gradientTextClasses, inputClasses } from "../../shared/CustomText";
import CustomContainer from "../../shared/CustomContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../shared/useAuth";
import { customButtonClasses } from "../../shared/MotionBtn";
import ReviewCard from "./ReviewCard";
import useAxios from "../../shared/useAxios";

const ReviewGuide = ({ id, refetch }) => {
  const axiosSecure = useAxios();
  const { user, handleAlert } = useAuth();
  const { isLoading, data: reviews } = Loader(
    `/reviews/${id}`,
    `/reviews/${id}`
  );

  if (isLoading) {
    return <CustomContainer></CustomContainer>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const posterImage = formData.get("posterImage");
    const posterName = formData.get("posterName");
    const postDate = formData.get("postingDate");
    const postRating = formData.get("postRating");
    const comment = formData.get("comment");

    const reviewData = {
      postedTo: id,
      posterImage,
      posterName,
      postDate,
      postRating,
      comment,
    };

    axiosSecure
      .post(`/reviews?email=${user?.email}`, reviewData)
      .then((res) => {
        if (res.status == 201) {
          handleAlert("success", "Review Posted Successfully");
          refetch();
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  return (
    <div>
      {reviews.length > 0 ? (
        reviews?.map((review) => (
          <ReviewCard key={review._id} review={review}></ReviewCard>
        ))
      ) : (
        <div>
          <h3 className={`${gradientTextClasses} text-2xl font-semibold mb-10`}>
            No Reviews Yet...
          </h3>
        </div>
      )}

      {/* review form here  */}
      <div className="mt-20">
        <h3 className="text-xl font-semibold mb-10 text-lime-500">
          You Can Leave A Review Below
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Poster Image</label> <br />
            <input
              className={`${inputClasses}`}
              type="text"
              name="posterImage"
              defaultValue={user?.photoURL}
              required
            />
          </div>

          <div>
            <label>Poster Name</label> <br />
            <input
              className={`${inputClasses}`}
              type="text"
              name="posterName"
              defaultValue={user?.displayName}
              required
            />
          </div>

          <div>
            <label>Posting Date</label> <br />
            <DatePicker
              className={`my-2 text-center ${inputClasses} w-72`}
              required
              name="postingDate"
              selected={new Date()}
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              readOnly
            />
          </div>

          <div>
            <label>Post Rating</label> <br />
            <input
              className={`${inputClasses}`}
              type="number"
              name="postRating"
              min="0"
              max="5"
              required
              placeholder="min 0 to max 5"
            />
          </div>

          <div>
            <label>Comment</label> <br />
            <textarea
              className={`${inputClasses}`}
              name="comment"
              required
              placeholder="Leave A Review"
            />
          </div>

          <button className={`${customButtonClasses}`} type="submit">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

ReviewGuide.propTypes = {
  id: PropTypes.string,
};

export default ReviewGuide;
