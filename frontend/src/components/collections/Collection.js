import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Collection = ({ collectionInfo }) => {
  const navigate = useNavigate();

  const navigateToCollection = (slug) => {
    navigate(`/collections/nft-palace-collections-${slug}`, {
      state: {
        collectionInfo: collectionInfo,
      },
    });
  };

  return (
    <div
      className="h-[270px] flex flex-col cursor-pointer"
      onClick={() => navigateToCollection(collectionInfo.slug)}
    >
      <div className="h-48 bg-gray-700 rounded-md">
        {collectionInfo.bannerImageUrl && (
          <img
            src={collectionInfo.bannerImageUrl}
            alt="collection"
            className="w-full h-48 object-cover rounded-md"
          />
        )}
      </div>
      <div className="my-auto flex flex-col items-center gap-3">
        <Typography variant="h5" component="h4" color="onPrimary">
          {collectionInfo.name}
        </Typography>
      </div>
    </div>
  );
};

export default Collection;
