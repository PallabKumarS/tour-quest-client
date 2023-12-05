import PropTypes from "prop-types";
import MotionBtn from "../shared/MotionBtn";
import { FaHeartCirclePlus } from "react-icons/fa6";
import useAuth from "../shared/useAuth";
import { PhotoView } from "react-photo-view";
import { useNavigate } from "react-router-dom";
import useAxios from "../shared/useAxios";

const PackageCard = ({ card }) => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { user, handleAlert } = useAuth();
  const { _id, tourImage, tourTitle, tourType, price, tourDestination } = card;

  const handleAdd = () => {
    const wish = {
      tourImage: tourImage,
      tourTitle: tourTitle,
      id: _id,
      email: user?.email,
    };
    axiosSecure
      .post(`/wishlist?email=${user?.email}`, wish)
      .then((res) => {
        if (res.status == 201) {
          handleAlert("success", "Added To WishList");
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };
  return (
    <div className="card w-[400] glass bg-[#5f5f2cb9] mx-auto">
      <div className="relative">
        <PhotoView src={tourImage}>
          <img
            className="w-[500px] h-[350px]"
            src={tourImage}
            alt={tourTitle}
          />
        </PhotoView>
        <FaHeartCirclePlus
          onClick={handleAdd}
          className="text-5xl absolute bottom-0 right-0 text-red-500 -translate-x-1/2 title"
        />
      </div>
      <div className="card-body">
        <h2 className={`card-title text-[#d1e570dc] mb-2`}>{tourType}</h2>
        <h2 className={`card-title text-[#8fd712d3] mb-2`}>{tourTitle}</h2>
        <div className="card-actions justify-end items-center mb-2">
          <p className="font-semibold text-[#e633d1e8] text-lg">
            {tourDestination}
          </p>
          <p className="text-[#e82952d3] text-lg">{price}</p>
        </div>
        <MotionBtn
          onClick={() => navigate(`/packages/${_id}`)}
          text={"View Package"}
        ></MotionBtn>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  card: PropTypes.object,
};

export default PackageCard;
