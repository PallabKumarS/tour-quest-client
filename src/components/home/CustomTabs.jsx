import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomContainer from "../shared/CustomContainer";
import CustomReactPlayer from "../shared/CustomReactPlayer";
import { gradientTextClasses } from "../shared/CustomText";
import HomePackages from "./HomePackages";
import MotionBtn from "../shared/MotionBtn";
import { Link } from "react-router-dom";
import TourGuide from "./TourGuide";

const CustomTabs = () => {
  return (
    <CustomContainer>
      <Tabs>
        <TabList>
          <Tab>
            <p className={`${gradientTextClasses} font-bold text-lg`}>
              Overview
            </p>
          </Tab>
          <Tab>
            <p className={`${gradientTextClasses} font-bold text-lg`}>
              Our Packages
            </p>
          </Tab>
          <Tab>
            <p className={`${gradientTextClasses} font-bold text-lg`}>
              Meet Our Tour Guides
            </p>
          </Tab>
        </TabList>

        {/* first panel content  */}
        <TabPanel>
          <h2
            className={`"text-white bg-customBG w-fit mx-auto px-3 py-2 text-3xl font-semibold mt-5 mb-10" ${gradientTextClasses}`}
          >
            Popular Destinations
          </h2>
          <CustomContainer>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <CustomReactPlayer
                name={"Nikhli Haor"}
                url={"https://www.youtube.com/watch?v=n5SLIAnjXx4"}
              ></CustomReactPlayer>
              <CustomReactPlayer
                name={"Tangua Haor"}
                url={"https://www.youtube.com/watch?v=avAQshAfYvE"}
              ></CustomReactPlayer>
              <CustomReactPlayer
                name={"Kuakata"}
                url={"https://www.youtube.com/watch?v=k3rydWbFZAI"}
              ></CustomReactPlayer>
              <CustomReactPlayer
                name={"Rangamati"}
                url={"https://www.youtube.com/watch?v=8yXReWYa5Ak"}
              ></CustomReactPlayer>
            </div>
          </CustomContainer>

          {/* second panel content  */}
        </TabPanel>
        <TabPanel>
          <CustomContainer className={`text-center`}>
            <HomePackages></HomePackages>
            <Link to="/packages">
              <MotionBtn text={"All Packages"}></MotionBtn>
            </Link>
          </CustomContainer>
        </TabPanel>

        {/* third panel content  */}
        <TabPanel>
          <CustomContainer>
            <TourGuide></TourGuide>
          </CustomContainer>
        </TabPanel>
      </Tabs>
    </CustomContainer>
  );
};

export default CustomTabs;
