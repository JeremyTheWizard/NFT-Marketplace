import axios from "axios";
import { useEffect, useState } from "react";
import useMintToken from "./useMintToken";

const useMintTokenCoordinator = () => {
  const { mintToken, mintStatus } = useMintToken();
  const [imageCID, setImageCID] = useState();
  const [tokenURICID, setTokenURICID] = useState();

  // Remove tokenURI if transaction was not approved
  useEffect(() => {
    mintStatus === "Exception" &&
      axios.delete(
        "http://localhost:8000/api/nfts/nftsforsale/removetokenuri",
        {
          data: {
            imageCID: imageCID,
            tokenURICID: tokenURICID,
          },
        }
      );
  }, [mintStatus]);

  const mintTokenCoordinator = async (formData) => {
    const data = await axios
      .post(
        "http://localhost:8000/api/nfts/nftsforsale/createtokenuri",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => res.data);
    mintToken(data.tokenURI);
    setImageCID(data.imageCID);
    setTokenURICID(data.tokenURICID);
  };

  return { mintTokenCoordinator, mintStatus };
};

export default useMintTokenCoordinator;
