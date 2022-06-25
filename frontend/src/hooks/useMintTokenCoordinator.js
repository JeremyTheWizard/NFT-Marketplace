import axios from "axios";
import useMintToken from "./useMintToken";

const useMintTokenCoordinator = () => {
  const { mintToken, mintStatus } = useMintToken();

  const mintTokenCoordinator = async (formData) => {
    const tokenURI = await axios
      .post(
        "http://localhost:8000/api/nfts/nftsforsale/createtokenuri",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => res.data.tokenURI);
    mintToken(tokenURI);
  };
  return { mintTokenCoordinator, mintStatus };
};

export default useMintTokenCoordinator;
