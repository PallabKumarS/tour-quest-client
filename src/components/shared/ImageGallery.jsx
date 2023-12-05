/* eslint-disable react/prop-types */
import PhotoAlbum from "react-photo-album";
import { headerClasses } from "./CustomText";

const ImageGallery = ({ images }) => {
  const photos = images.map((item, idx) => ({
    src: item,
    id: idx,
    width: 800,
    height: 600,
  }));

  const columns = (containerWidth) => {
    if (containerWidth > 400) return 2;
    if (containerWidth > 800) return 2;
    if (containerWidth > 1200) return 3;
    return 1;
  };

  return (
    <div>
      <h2 className={`my-20 ${headerClasses}`}>Tour Gallery</h2>
      <PhotoAlbum layout="rows" photos={photos} columns={columns}></PhotoAlbum>
    </div>
  );
};

export default ImageGallery;
