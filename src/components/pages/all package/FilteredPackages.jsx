import { useParams } from "react-router-dom";
import Loader from "../../shared/Loader";
import CustomSpinner from "../../shared/CustomSpinner";
import CustomContainer from "../../shared/CustomContainer";
import PackageCard from "../../home/PackageCard";

const FilteredPackages = () => {
  const { id } = useParams();

  const { isLoading, data: packages } = Loader(
    `/package-types?type=${id}`,
    `package-${id}`
  );

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  return (
    <CustomContainer className={"mb-20 mt-20"}>
      <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5">
        {packages?.map((card) => (
          <PackageCard key={card._id} card={card}></PackageCard>
        ))}
      </div>
    </CustomContainer>
  );
};

export default FilteredPackages;
