/* eslint-disable react/prop-types */
const TourTable = ({ bookings, handleAccept, handleReject }) => {
  return (
    <table className="border-collapse w-full mt-4 overflow-x-scroll">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Package Name</th>
          <th className="border p-2">Tourist Name</th>
          <th className="border p-2">Tour Date</th>
          <th className="border p-2">Tour Price</th>
          <th className="border p-2">Tour Status</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings?.map((booking) => (
          <tr key={booking._id} className="hover:bg-gray-100">
            <td className="border p-2">{booking.packageName}</td>
            <td className="border p-2">{booking.touristName}</td>
            <td className="border p-2">{booking.tourDate}</td>
            <td className="border p-2">{booking.price}</td>
            <td className="border p-2">{booking.status}</td>
            <td className="border p-2">
              <button
                onClick={() => handleAccept(booking._id)}
                className="btn bg-green-500 text-white px-4 py-2 mr-2"
                disabled={booking.status === "Accepted"}
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(booking._id)}
                className="btn bg-red-500 text-white px-4 py-2"
                disabled={booking.status === ("Rejected" || "Paid")}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TourTable;
