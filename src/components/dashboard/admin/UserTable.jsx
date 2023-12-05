/* eslint-disable react/prop-types */
import CustomContainer from "../../shared/CustomContainer";
// import { customButtonClasses } from "../../shared/MotionBtn";

const UserTable = ({ users, admin, guide }) => {
  return (
    <CustomContainer>
      <div className="overflow-x-auto">
        <table className="table-sm mx-auto overflow-x-auto">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {users?.map((user, index) => (
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      className={`btn btn-primary `}
                      onClick={() => admin(user?.email)}
                      disabled={user?.role !== "tourist"}
                    >
                      Make Admin
                    </button>
                    <button
                      className={`btn btn-secondary`}
                      onClick={() => guide(user?.email)}
                      disabled={user?.role !== "tourist"}
                    >
                      Make Guide
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

export default UserTable;
