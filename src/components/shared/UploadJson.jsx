import { useEffect, useState } from "react";
import { axiosSecure } from "../shared/useAxios";

const UploadJson = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/stories.json")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleUpload = () => {
    axiosSecure.post("upload-packages", data).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div className="">
      <button onClick={handleUpload}>Click</button>
    </div>
  );
};

export default UploadJson;
