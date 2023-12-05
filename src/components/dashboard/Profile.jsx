import CustomContainer from "../shared/CustomContainer";
import CustomSpinner from "../shared/CustomSpinner";
import useAuth from "../shared/useAuth";
import GuideForm from "./guide/GuideForm";
import StoryForm from "./tourist/StoryForm";

const Profile = () => {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return <CustomSpinner></CustomSpinner>;
  }

  return (
    <CustomContainer>
      <div className="card w-96 bg-base-300 shadow-xl mx-auto mt-20">
        <figure className="px-10 pt-10">
          <img src={user?.photoURL} alt="" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Role : {userData?.role}</h2>
          <p>{userData?.name}</p>
          <p>{userData?.email}</p>
        </div>
      </div>

      <div className="mt-20">
        {userData?.role == "tourist" && <StoryForm></StoryForm>}
      </div>

      <div className="mt-20">
        {userData?.role == "guide" && <GuideForm></GuideForm>}
      </div>
    </CustomContainer>
  );
};

export default Profile;
