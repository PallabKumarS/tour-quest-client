import { useParams } from "react-router-dom";
import CustomSpinner from "../../shared/CustomSpinner";
import Loader from "../../shared/Loader";
import Faq from "react-faq-component";
import { headerClasses } from "../../shared/CustomText";

const TourPlan = () => {
  const { id } = useParams();
  const { isLoading, data: tourPlan } = Loader(
    `/tour-plans/${id}`,
    "tour-plans"
  );

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const rows = tourPlan?.tourPlan?.map((plan) => ({
    title: `Day ${plan.day} - ${plan.title}`,
    content: plan.details,
  }));

  const data = {
    title: "",
    rows: rows,
  };

  const styles = {
    bgColor: "",
    titleTextColor: "blue",
    titleBackgroundColor: "#5566",
    rowTitleColor: "blue",
    rowContentColor: "grey",
    arrowColor: "red",
  };

  const config = {
    animate: true,
    arrowIcon: "V",
    tabFocus: true,
  };

  return (
    <div className="mt-20">
      <h2 className={`my-20 ${headerClasses}`}>Tour Plan</h2>
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
};

export default TourPlan;
