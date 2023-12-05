import { useParams } from "react-router-dom";
import CustomContainer from "../../shared/CustomContainer";
import Loader from "../../shared/Loader";
import CustomSpinner from "../../shared/CustomSpinner";
import { headerClasses } from "../../shared/CustomText";
import ReviewGuide from "./ReviewGuide";

const GuideDetails = () => {
  const { id } = useParams();

  const { isLoading, data: guide,refetch } = Loader(`/guides/${id}`, `/guides/${id}`);

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }
  // else if (loading2) {
  //   return <CustomSpinner></CustomSpinner>;
  // }

  const { guideImage, contactInfo, name, education, skills, workInfo } = guide;

  return (
    <CustomContainer className={`mt-20 text-center mb-20`}>
      <h2 className={`${headerClasses} mb-10`}>
        Details About <span className="underline">{name}</span>
      </h2>
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <figure>
          <img
            className="w-[700px] h-[600px] rounded-3xl p-2 ml-7"
            src={guideImage}
            alt=""
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <h2 className="card-title">{education}</h2>

          {/* language skill here  */}
          <div>
            <h3 className="text-xl font-bold mb-2">Languages:</h3>
            <ul className=" pl-5">
              {skills?.languages?.map((language, index) => (
                <li key={index} className="underline">
                  {language}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {/* specialties here  */}
            <h3 className="text-xl font-bold mb-2">Specialties:</h3>
            <ul className=" pl-5">
              {skills?.specialties?.map((specialty, index) => (
                <li key={index} className="underline">
                  {specialty}
                </li>
              ))}
            </ul>
          </div>

          {/* work info here  */}
          <div>
            <h3 className="text-xl font-bold mb-2">Work Experience:</h3>
            <ul className=" pl-5">
              {workInfo?.map((work, index) => (
                <li key={index} className="underline">
                  {work.experience} at {work.company}
                </li>
              ))}
            </ul>
          </div>

          {/* contact info here  */}
          <h3 className="text-xl font-bold mt-4">Contact Info</h3>
          <div className="flex justify-center text-center">
            <p>Email: {contactInfo.email}</p>
            <p className="ml-4">Phone: {contactInfo.phone}</p>
          </div>
        </div>
      </div>

      <h2 className={`${headerClasses} mt-20 mb-10`}>
        Reviews About <span className="underline">{name}</span>
      </h2>
      <ReviewGuide id={id} refetch={refetch}></ReviewGuide>
    </CustomContainer>
  );
};

export default GuideDetails;
