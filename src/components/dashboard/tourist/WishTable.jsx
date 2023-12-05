import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const WishTable = ({ packages, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <table className="border-collapse w-full mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Package Name</th>
          <th className="border p-2">Package Image</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {packages?.map((packageItem) => (
          <tr key={packageItem.id} className="hover:bg-gray-100">
            <td className="border p-2">{packageItem.tourTitle}</td>
            <td className="border p-2">
              <img
                src={packageItem.tourImage}
                alt={""}
                className="w-20 h-16 mx-auto"
              />
            </td>
            <td className="border p-2">
              <button
                onClick={() => handleDelete(packageItem._id)}
                className="bg-red-500 text-white px-4 py-2 mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/packages/${packageItem.id}`)}
                className="bg-blue-500 text-white px-4 py-2"
              >
                Visit Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WishTable;
