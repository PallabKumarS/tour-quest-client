import Banner from "./Banner";
import CustomTabs from "./CustomTabs";
import HomeStories from "./HomeStories";
import TourType from "./TourType";

const Home = () => {
  return (
    <div>
      {/* banner section  */}
      <section className="mb-20 relative h-screen bg-cover bg-center bg-homeBanner">
        {/* Blue overlay for the background */}
        {/* <div className="absolute inset-0 bg-[#f6f655ca] opacity-40"></div> */}

        {/* Content inside the section */}
        <div className="relative z-10">
          <Banner></Banner>
        </div>
      </section>
      {/* tabs here  */}
      <section className="mb-20 mx-auto text-center">
        <CustomTabs></CustomTabs>
      </section>

      {/* tour type here  */}
      <section>
        <TourType></TourType>
      </section>

      {/* story section here  */}
      <section className="mt-20">
        <HomeStories></HomeStories>
      </section>
    </div>
  );
};

export default Home;
