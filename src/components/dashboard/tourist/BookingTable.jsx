/* eslint-disable react/prop-types */
import CustomContainer from "../../shared/CustomContainer";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useAuth from "../../shared/useAuth";
import { useRef } from "react";

const BookingTable = ({ bookings, handlePay, handleCancel, handleApply }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const hasTriggeredEffect = useRef(false);
  const { handleAlert } = useAuth();

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

  return (
    <CustomContainer>
      <div className="overflow-x-scroll">
        {showConfetti && <Confetti />}
        <table className="divide-y divide-gray-200 mx-auto border-collapse w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="py-2 px-4">Package Name</th>
              <th className="py-2 px-4">Tour Guide Name</th>
              <th className="py-2 px-4">Tour Date</th>
              <th className="py-2 px-4">Tour Price</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {bookings?.map((tour, index) => (
              <tr key={index} className="hover">
                <td className="py-2 px-4">{tour.packageName}</td>
                <td className="py-2 px-4">{tour.guide}</td>
                <td className="py-2 px-4">{tour.tourDate}</td>
                <td className="py-2 px-4">{tour.price}</td>
                <td className="py-2 px-4">{tour.status}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button
                      className={`btn btn-primary`}
                      onClick={() => handlePay(tour)}
                      disabled={tour.status != "Accepted"}
                    >
                      Pay
                    </button>
                    <button
                      className={`btn btn-warning`}
                      onClick={() => handleCancel(tour)}
                      disabled={tour.status != "In Review"}
                    >
                      Cancel
                    </button>
                    <button
                      className={`btn btn-secondary`}
                      onClick={() => handleApply(tour)}
                      disabled={bookings.length < 3}
                    >
                      Apply
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomContainer>
  );
};

export default BookingTable;
