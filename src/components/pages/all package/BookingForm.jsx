/* eslint-disable react/prop-types */
import { headerClasses, inputClasses } from "../../shared/CustomText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { customButtonClasses } from "../../shared/MotionBtn";
import useAuth from "../../shared/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxios from "../../shared/useAxios";
import { useState } from "react";

const BookingForm = ({ guides, id, packageName, price }) => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { handleAlert, user } = useAuth();
  const [date, setDate] = useState("");

  //   const handleTouristImageChange = (e) => {
  //     const file = e.target.files[0];
  //     setTouristImage(file);
  //   };

  const handleBook = (booking) => {
    axiosSecure
      .post(`/bookings?email=${user?.email}`, booking)
      .then((res) => {
        if (res.status == 201) {
          handleAlert("success", "Added To Bookings");
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const touristName = formData.get("touristName");
    const touristEmail = formData.get("touristEmail");
    const touristImage = formData.get("touristImage");
    const price = formData.get("price");
    const guide = formData.get("guide");

    e.preventDefault();
    // if (price <= 0) {
    //   return handleAlert("warn", "Price Must Be More Than Zero");
    // }
    const booking = {
      packageName: packageName,
      packageId: id,
      touristName,
      touristEmail,
      touristImage,
      price,
      tourDate: date,
      guide,
      status: "In Review",
    };

    user
      ? Swal.fire({
          title: "Confirm Your Booking?",
          confirmButtonText: "Save",
          showCancelButton: true,
          showDenyButton: true,
          denyButtonText: `My Bookings`,
        }).then((result) => {
          if (result.isConfirmed) {
            handleBook(booking);
          } else if (result.isDenied) {
            navigate("/dashboard/bookings");
          }
        })
      : (navigate("/login"), handleAlert("warn", "Please Login First"));
  };

  return (
    <div className="mt-20">
      <h2 className={`my-20 ${headerClasses}`}>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tourist Name</label> <br />
          <input
            className={`${inputClasses} my-2 ml-3`}
            type="text"
            defaultValue={user?.displayName}
            name="touristName"
            required
          />
        </div>

        <div>
          <label>Tourist Email</label> <br />
          <input
            className={`${inputClasses} my-2 ml-3`}
            type="email"
            name="touristEmail"
            defaultValue={user?.email}
            required
          />
        </div>

        {/* <div>
          <label>Tourist Image</label> <br />
          <input
          className={`${inputClasses} my-2 ml-3`} type="file" onChange={handleTouristImageChange}
          required />
        </div> */}
        <div>
          <label>Tourist Image</label> <br />
          <input
            className={`${inputClasses} my-2 ml-3`}
            type="text"
            name="touristImage"
            defaultValue={user?.photoURL}
            required
          />
        </div>

        <div>
          <label>Price</label> <br />
          <input
            className={`${inputClasses} my-2 ml-3`}
            type="text"
            name="price"
            defaultValue={price}
            required
            readOnly
          />
        </div>

        <div>
          <label>Tour Date</label> <br />
          <DatePicker
            className={`my-2 text-center ${inputClasses} w-auto`}
            required
            name="tourDate"
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </div>

        <div>
          <label>Tour Guide Name</label> <br />
          <select
            className={`my-2 w-1/2 mx-auto ${inputClasses}`}
            name="guide"
            required
          >
            <option value="">Select a Guide</option>
            {guides?.map((guide, index) => (
              <option key={index} value={guide.name}>
                {guide.name}
              </option>
            ))}
          </select>
        </div>

        <button className={`${customButtonClasses} mt-3`} type="submit">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
