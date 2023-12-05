import CustomContainer from "../../shared/CustomContainer";
import CustomSpinner from "../../shared/CustomSpinner";
import Loader from "../../shared/Loader";
import PackageCard from "../../home/PackageCard";

const AllPackages = () => {
  const { isLoading, data: packages } = Loader(`/packages`, "packages");
  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  return (
    <CustomContainer>
      <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5 mb-20">
        {packages?.map((card) => (
          <PackageCard key={card._id} card={card}></PackageCard>
        ))}
      </div>
    </CustomContainer>
  );
};

export default AllPackages;
