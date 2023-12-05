import CustomContainer from "../shared/CustomContainer";

const Banner = () => {
  return (
    <div className="">
      {/* <div className="absolute inset-0 bg-blue-500 opacity-40"></div> */}
      <CustomContainer>
        <div className="pt-20 z-20">
          <p className="bg-customTextBG text-white py-2 px-3 w-fit mb-5">
            One Of The Best Travel Agency
          </p>
          <h2 className=" text-white py-2 px-3 w-fit text-4xl font-semibold">
            Lets Get{" "}
            <span className="text-yellow-400 mb-5">The New Experience</span>{" "}
            <br /> Traveling With Us
          </h2>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Banner;
