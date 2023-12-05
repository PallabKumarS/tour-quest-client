import CustomSpinner from "../../shared/CustomSpinner";
import { headerClasses, inputClasses } from "../../shared/CustomText";
import { customButtonClasses } from "../../shared/MotionBtn";
import useAuth from "../../shared/useAuth";
import useAxios from "../../shared/useAxios";

const StoryForm = () => {
  const axiosSecure = useAxios();

  const { user, loading, handleAlert } = useAuth();

  if (loading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const story = {
      name: formData.get("name"),
      email: formData.get("email"),
      destination: formData.get("destination"),
      experience: formData.get("experience"),
      image: formData.get("image"),
    };

    axiosSecure
      .post(`/stories?email=${user?.email}`, story)
      .then((res) => {
        if (res.status == 201) {
          handleAlert("success", "Story Posted Successfully");
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  return (
    <div className=" text-center">
      <h1 className={`${headerClasses} mb-10`}>Story Form</h1>
      <form className="" onSubmit={handleSubmit}>
        <div>
          <label>Name</label> <br />
          <input
            className={`${inputClasses}`}
            type="text"
            name="name"
            defaultValue={user?.displayName}
            required
            readOnly
          />
        </div>

        <div>
          <label>Email</label> <br />
          <input
            className={`${inputClasses}`}
            type="email"
            name="email"
            defaultValue={user?.email}
            required
            readOnly
          />
        </div>

        <div>
          <label>Image</label> <br />
          <input
            className={`${inputClasses}`}
            type="text"
            name="image"
            defaultValue={user?.photoURL}
            required
          />
        </div>

        <div>
          <label>Destination</label> <br />
          <input
            className={`${inputClasses}`}
            type="text"
            name="destination"
            required
          />
        </div>

        <div>
          <label>Experience</label> <br />
          <textarea className={`${inputClasses}`} name="experience" required />
        </div>

        <button className={`${customButtonClasses} mt-2`} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StoryForm;
