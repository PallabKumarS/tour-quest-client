import PackageCard from "./PackageCard";
import CustomContainer from "../shared/CustomContainer";
import CustomSpinner from "../shared/CustomSpinner";
import Loader from "../shared/Loader";

const HomePackages = () => {
  const { isLoading, data: packages } = Loader(`/packages`, "packages");

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  return (
    <CustomContainer className={"mb-20 mt-20"}>
      <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5">
        {packages?.slice(0, 3)?.map((card) => (
          <PackageCard key={card._id} card={card}></PackageCard>
        ))}
      </div>
    </CustomContainer>
  );
};

export default HomePackages;
