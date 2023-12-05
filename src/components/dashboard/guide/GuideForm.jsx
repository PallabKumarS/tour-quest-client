/* eslint-disable react/no-unescaped-entities */

import CustomSpinner from "../../shared/CustomSpinner";
import { headerClasses, inputClasses } from "../../shared/CustomText";
import { customButtonClasses } from "../../shared/MotionBtn";
import useAuth from "../../shared/useAuth";
import useAxios from "../../shared/useAxios";

const GuideForm = () => {
  const axiosSecure = useAxios();
  const { user, handleAlert, loading } = useAuth();

  if (loading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const guide = {
      guideImage: formData.get("guideImage"),
      contactInfo: {
        email: formData.get("email"),
        phone: formData.get("phone"),
      },
      name: formData.get("name"),
      education: formData.get("education"),
      skills: {
        languages: formData.getAll("languages"),
        specialties: formData.getAll("specialties"),
      },
      workInfo: formData.getAll("workInfo").map((experience) => {
        const [experienceYears, company] = experience.split("|");
        return {
          experience: experienceYears.trim(),
          company: company.trim(),
        };
      }),
    };

    axiosSecure
      .post(`/guides?email=${user?.email}`, guide)
      .then((res) => {
        if (res.status == 201) {
          handleAlert("success", "Guide Profile Has Been Created");
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  return (
    <div className="text-center">
      <h1 className={`${headerClasses} mb-10`}>Guide Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Guide Image</label> <br />
          <input
            className={`${inputClasses}`}
            type="text"
            defaultValue={user?.photoURL}
            name="guideImage"
            required
          />
        </div>
        <div>
          <label>Email</label> <br />
          <input
            className={`${inputClasses}`}
            type="email"
            defaultValue={user?.email}
            name="email"
            required
            readOnly
          />
        </div>
        <div>
          <label>Phone</label> <br />
          <input
            className={`${inputClasses}`}
            type="text"
            name="phone"
            required
          />
        </div>
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
          <label>Education</label> <br />
          <input
            className={`${inputClasses}`}
            type="text"
            name="education"
            required
          />
        </div>
        <div>
          <label>Languages</label> <br />
          <input
            className={`${inputClasses}`}
            type="text"
            name="languages"
            required
          />
        </div>
        <div>
          <label>Specialties</label> <br />
          <input
            className={`${inputClasses}`}
            type="text"
            name="specialties"
            required
          />
        </div>
        <div className="">
          <label>Work Experience</label> <br />
          <textarea
            className={`${inputClasses} text-center`}
            name="workInfo"
            required
            placeholder="Format: 5 years | city Tours Inc."
          />
        </div>
        <button className={`${customButtonClasses} mt-2`} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GuideForm;
