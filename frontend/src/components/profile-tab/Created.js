import { Typography } from "@mui/material";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";
import SecondaryButton from "../SecondaryButton";
import CreatedCollectionsBox from "./CreatedCollectionsBox";

const Created = () => {
  const { account } = useEthers();
  const [userCollectionsCreated, setUserCollectionsCreated] = useState();

  useEffect(() => {
    fetchUserCollectionsCreated();
  }, []);

  const navigate = useNavigate();

  const handleNavigateToCollection = (collection) => {
    navigate(`/collections/${collection.slug}`, {
      state: {
        assetContractAddress: collection.assetContractAddress,
        editable: true,
      },
    });
  };

  const handleNavigateToCreateCollection = () => {
    navigate(`/create/collection`);
  };

  const fetchUserCollectionsCreated = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/users/user/${account}`
    );
    setUserCollectionsCreated(response.data.user.collectionsCreated);
  };

  return (
    <>
      <ul className="flex gap-12 flex-wrap justify-center">
        {userCollectionsCreated ? (
          userCollectionsCreated.length ? (
            userCollectionsCreated.map((collection, key) => {
              return (
                <div
                  onClick={() => handleNavigateToCollection(collection)}
                  className="text-onPrimary text-center space-y-3 cursor-pointer w-24 md:w-36 overflow-hidden truncate"
                >
                  <Typography variant="h6" component="subtitle1">
                    {collection.name}
                  </Typography>
                  <li key={key}>
                    <CreatedCollectionsBox
                      key={key}
                      _roundedIcon={collection.roundedIconImageUrl}
                    />
                  </li>
                </div>
              );
            })
          ) : (
            <Typography
              variant="h6"
              component="paragraph"
              color="white"
              style={{ margin: "1.5rem auto 0 auto" }}
            >
              No collections were found
            </Typography>
          )
        ) : (
          <div className="w-full flex flex-col items-center mt-6">
            <ModifiedCircularProgress />
          </div>
        )}
      </ul>
      <div className="flex flex-col items-center mt-12">
        <SecondaryButton
          onClick={handleNavigateToCreateCollection}
          styles={"w-auto grow-0"}
        >
          CREATE NEW COLLECTION
        </SecondaryButton>
      </div>
    </>
  );
};

export default Created;
