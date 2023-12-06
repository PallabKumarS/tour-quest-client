/* eslint-disable react/prop-types */
import CustomContainer from "../../shared/CustomContainer";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useAuth from "../../shared/useAuth";
import { useRef } from "react";

const BookingTable = ({
  bookings,
  handlePay,
  handleCancel,
  handleApply,
  totalPrice,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const hasTriggeredEffect = useRef(false);
  const { handleAlert } = useAuth();

  const handleDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject?.getFullYear();
    const month = (dateObject?.getMonth() + 1)?.toString()?.padStart(2, "0");
    const day = dateObject?.getDate()?.toString()?.padStart(2, "0");
    // const hours = dateObject.getHours();
    // const minutes = dateObject.getMinutes();
    // const seconds = dateObject.getSeconds();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    if (bookings.length >= 3) {
      !hasTriggeredEffect.current &&
        handleAlert("success", "Congratulations! You got a discount!");

      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      hasTriggeredEffect.current = true;
      return () => clearTimeout(timer);
    }
  }, [bookings.length, handleAlert]);

  totalPrice = bookings
    ?.map((booking) => parseInt(booking?.price?.replace(/,/g, ""), 10))
    .reduce((acc, num) => acc + num, 0);

  return (
    <CustomContainer>
      <div className="overflow-x-scroll">
        {showConfetti && <Confetti />}
        <table className="divide-y divide-gray-200 mx-auto border-collapse w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="py-2 px-4 text-center">Package Name</th>
              <th className="py-2 px-4 text-center">Tour Guide Name</th>
              <th className="py-2 px-4 text-center">Tour Date</th>
              <th className="py-2 px-4 text-center">Tour Price</th>
              <th className="py-2 px-4 text-center">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {bookings?.map((tour, index) => (
              <tr key={index} className="hover">
                <td className="py-2 px-4 text-center">{tour.packageName}</td>
                <td className="py-2 px-4 text-center">{tour.guide}</td>
                <td className="py-2 px-4 text-center">
                  {handleDate(tour.tourDate)}
                </td>
                <td className="py-2 px-4 text-center">{tour.price}</td>
                <td className="py-2 px-4 text-center">{tour.status}</td>
                <td className="py-2 px-4 text-center">
                  <div className="flex space-x-2 justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePay(tour)}
                      disabled={tour.status != "Accepted"}
                    >
                      Pay
                    </button>
                    <button
                      className="btn py-2 px-4 bg-red-300 hover:bg-red-600"
                      onClick={() => handleCancel(tour)}
                      disabled={tour.status != "In Review"}
                    >
                      Cancel
                    </button>
                    {/* <button
                      className={`btn btn-secondary`}
                      onClick={() => handleApply(tour)}
                      disabled={bookings.length < 3}
                    >
                      Apply
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
            {totalPrice > 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="py-2 px-4 font-semibold text-lg text-center"
                >
                  Total Bookings: {bookings.length}
                </td>
                <td colSpan="2" className="py-2 px-4 font-semibold text-lg">
                  Total Price: {totalPrice} BDT
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="btn py-2 px-4 bg-yellow-300 hover:bg-yellow-600"
                    onClick={() => handleApply()}
                    disabled={bookings.length < 3}
                  >
                    Apply
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CustomContainer>
  );
};

export default BookingTable;
