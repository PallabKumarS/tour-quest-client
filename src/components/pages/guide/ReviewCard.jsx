import PropTypes from "prop-types";
import { PhotoView } from "react-photo-view";
import { Rating, RoundedStar } from "@smastrom/react-rating";

const ReviewCard = ({ review }) => {
  const { posterImage, posterName, comment, postRating, postDate } = review;

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#F13650",
    inactiveFillColor: "#f472b6",
  };

  return (
    <div className="card card-side bg-[#657bad99] shadow-xl mx-auto px-5 pt-5 items-center flex-col md:flex-row justify-between">
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
};

export default ReviewCard;
