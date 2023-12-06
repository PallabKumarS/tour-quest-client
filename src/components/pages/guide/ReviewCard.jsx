import PropTypes from "prop-types";
import { PhotoView } from "react-photo-view";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { MdDeleteForever } from "react-icons/md";

const ReviewCard = ({ review, handleDelete }) => {
  const { _id, posterImage, posterName, comment, postRating, postDate } =
    review;

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#F13650",
    inactiveFillColor: "#f472b6",
  };

  return (
    <div className="card card-side bg-[#657bad99] shadow-xl mx-auto px-5 pt-5 items-center flex-col md:flex-row justify-between mt-10 relative">
      <MdDeleteForever
        className="absolute top-0 right-0 -translate-x-3/4 translate-y-3/4 text-4xl text-red-500 hover:text-red-700"
        onClick={() => handleDelete(_id)}
      />
      <div className="card-body md:flex items-center">
        <figure className="">
          <PhotoView src={posterImage}>
            <img
              className="rounded-full w-[200px] h-[170px]"
              src={posterImage}
              alt=""
            />
          </PhotoView>
        </figure>
        <div className=" mx-auto">
          <p className="my-3 text-[#804af3]">{posterName}</p>
          <p className="font-semibold text-[#4e33e6e8] my-3">
            Posted : {postDate}
          </p>
          <div className="flex items-center justify-center">
            <Rating
              style={{ maxWidth: 150 }}
              value={postRating}
              itemStyles={myStyles}
            ></Rating>
          </div>
        </div>
      </div>
      <div className="mx-auto flex-grow">
        <p className="my-3 px-2 text-[#bfec91]">{comment}...</p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default ReviewCard;
