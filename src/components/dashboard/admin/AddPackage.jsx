/* eslint-disable no-undef */
import { useState } from "react";
import CustomContainer from "../../shared/CustomContainer";
import useAuth from "../../shared/useAuth";
import { headerClasses, inputClasses } from "../../shared/CustomText";
import { customButtonClasses } from "../../shared/MotionBtn";
import useAxios from "../../shared/useAxios";
import CustomSpinner from "../../shared/CustomSpinner";

const AddPackage = () => {
  const axiosSecure = useAxios();
  const { handleAlert, user, loading } = useAuth();
  const [tourPlan, setTourPlan] = useState([
    { day: 1, title: "", details: "" },
  ]);
  const [imageInputFields, setImageInputFields] = useState([""]);

  if (loading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const handleAddDay = () => {
    setTourPlan([
      ...tourPlan,
      { day: tourPlan.length + 1, title: "", details: "" },
    ]);
  };

  const handleRemoveDay = (index) => {
    const updatedTourPlan = tourPlan.filter((day, i) => i !== index);
    setTourPlan(updatedTourPlan);
  };

  const handlePlanChange = (index, field, value) => {
    const updatedTourPlan = tourPlan.map((day, i) =>
      i === index ? { ...day, [field]: value } : day
    );
    setTourPlan(updatedTourPlan);
  };

  const handleAddImageField = () => {
    setImageInputFields([...imageInputFields, ""]);
  };

  const handleImageInputChange = (index, value) => {
    const updatedImageInputFields = [...imageInputFields];
    updatedImageInputFields[index] = value;
    setImageInputFields(updatedImageInputFields);
  };

  const handleRemoveImageField = (index) => {
    const updatedImageInputFields = [...imageInputFields];
    updatedImageInputFields.splice(index, 1);
    setImageInputFields(updatedImageInputFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const tour = {
      tourImage: formData.get("tourImage"),
      tourDestination: formData.get("tourDestination"),
      tourTitle: formData.get("tourTitle"),
      tourType: formData.get("tourType"),
      tourTypeImage: formData.get("tourTypeImage"),
      price: formData.get("price"),
      tourInfo: formData.get("tourInfo"),
      tourPlan: tourPlan.map((day) => ({
        day: day.day,
        title: day.title,
        details: day.details,
      })),
      images: imageInputFields.filter((img) => img.trim() !== ""),
    };

    console.log("Tour Data:", tour);

    axiosSecure.post(`/packages?email=${user?.email}`, tour).then((res) => {
      if (res.status == 201) {
        handleAlert("success", "Package Added Successfully");
      }
    });
  };

  return (
    <CustomContainer className={`mt-20`}>
      <h1 className={`${headerClasses}`}>Tour Package Form</h1>
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tour Image</label> <br />
            <input
              className={`${inputClasses}`}
              type="text"
              name="tourImage"
              required
            />
          </div>

          <div>
            <label>Tour Destination</label> <br />
            <input
              className={`${inputClasses}`}
              type="text"
              name="tourDestination"
              required
            />
          </div>

          <div>
            <label>Tour Title</label> <br />
            <input
              className={`${inputClasses}`}
              type="text"
              name="tourTitle"
              required
            />
          </div>

          <div>
            <label>Tour Type</label> <br />
            <input
              className={`${inputClasses}`}
              type="text"
              name="tourType"
              required
            />
          </div>

          <div>
            <label>Tour Type Image</label> <br />
            <input
              className={`${inputClasses}`}
              type="text"
              name="tourTypeImage"
              required
            />
          </div>

          <div>
            <label>Price</label> <br />
            <input
              className={`${inputClasses}`}
              type="number"
              name="price"
              required
            />
          </div>

          <div>
            <label>Tour Info</label> <br />
            <textarea className={`${inputClasses}`} name="tourInfo" required />
          </div>

          <div>
            <label>Images</label>
            {imageInputFields.map((imageUrl, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <input
                  className={`${inputClasses}`}
                  type="text"
                  placeholder="Enter Image URL"
                  value={imageUrl}
                  onChange={(e) =>
                    handleImageInputChange(index, e.target.value)
                  }
                />
                {index >= 1 && (
                  <button
                    className="btn btn-neutral my-3"
                    type="button"
                    onClick={() => handleRemoveImageField(index)}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            ))}
            <button
              className="btn btn-neutral my-3"
              type="button"
              onClick={handleAddImageField}
            >
              Add Image
            </button>
          </div>

          <div>
            <label>Tour Plan</label> <br />
            {tourPlan.map((day, index) => (
              <div
                className="text-center mx-auto flex flex-col justify-center items-center gap-y-5"
                key={index}
              >
                <p className="mt-4">Day {day.day}</p>
                <input
                  className={`${inputClasses}`}
                  type="text"
                  name={`day_${index}_title`}
                  value={day.title}
                  placeholder="Title"
                  onChange={(e) =>
                    handlePlanChange(index, "title", e.target.value)
                  }
                />{" "}
                <textarea
                  className={`${inputClasses}`}
                  name={`day_${index}_details`}
                  value={day.details}
                  placeholder="Details"
                  onChange={(e) =>
                    handlePlanChange(index, "details", e.target.value)
                  }
                />
                <button
                  className="btn btn-neutral"
                  type="button"
                  onClick={() => handleRemoveDay(index)}
                >
                  Remove Day
                </button>
              </div>
            ))}
            <button
              className="btn btn-neutral my-3"
              type="button"
              onClick={handleAddDay}
            >
              Add Day
            </button>
          </div>

          <button className={`${customButtonClasses} mt-3 w-1/4`} type="submit">
            Submit
          </button>
        </form>
      </div>
    </CustomContainer>
  );
};

export default AddPackage;
