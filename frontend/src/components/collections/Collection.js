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
      className="w-60 flex flex-col cursor-pointer gap-3"
      onClick={() => navigateToCollection(collectionInfo.slug)}
    >
      <div className="w-60 h-60 rounded-md">
        {collectionInfo.bannerImageUrl ? (
          <img
            src={collectionInfo.roundedIconImageUrl}
            alt="collection"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-full h-full bg-gray-700 blur-sm"></div>
            <Typography
              variant="h6"
              component="body1"
              style={{
                position: "absolute",
                width: "15rem",
                overflow: "hidden",
                textAlign: "center",
              }}
              color="onPrimary"
            >
              {collectionInfo.name}
            </Typography>
          </div>
        )}
      </div>
      <Typography
        variant="h5"
        component="h4"
        color="onPrimary"
        sx={{
          textAlign: "center",
          display: "-webkit-box",
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
        }}
      >
        {collectionInfo.name}
      </Typography>
    </div>
  );
};

export default Collection;
