import axios from "axios";
import { useEffect, useState } from "react";
import useMintToken from "./useMintToken";

const useMintTokenCoordinator = (setOpenBackdrop, setBackdropMessage) => {
  const { mintToken, mintStatus } = useMintToken();
  const [imageCID, setImageCID] = useState();
  const [tokenURICID, setTokenURICID] = useState();

  // Remove tokenURI if transaction was not approved
  useEffect(() => {
    console.log(`mintStatus = ${mintStatus}`);
    mintStatus === "Exception" &&
      axios.delete(
        "http://localhost:8000/api/nfts/nftsforsale/removetokenuri",
        {
          data: {
            imageCID: imageCID,
            tokenURICID: tokenURICID,
          },
        }
      ) &&
      setOpenBackdrop(false);
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

    setBackdropMessage(
      <p className="text-onPrimary text-lg font-bold">
        Please, confirm the transaction to create your NFT
      </p>
    );
    setImageCID(data.imageCID);
    setTokenURICID(data.tokenURICID);
  };

  return { mintTokenCoordinator, mintStatus };
};

export default useMintTokenCoordinator;
