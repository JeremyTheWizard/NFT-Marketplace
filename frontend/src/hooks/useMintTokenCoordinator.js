import axios from "axios";
import useMintToken from "./useMintToken";

const useMintTokenCoordinator = () => {
  const { mintToken, mintStatus } = useMintToken();

  const mintTokenCoordinator = async (formData) => {
    console.log("🚀 ~ formData", formData);
    const tokenURI = await axios.post(
      "http://localhost:8000/api/nfts/nftsforsale/createtokenuri",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    mintToken(tokenURI);
  };
  return { mintTokenCoordinator, mintStatus };
};

export default useMintTokenCoordinator;
