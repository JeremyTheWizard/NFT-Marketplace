import { useEthers } from "@usedapp/core";
import { constants, Contract, utils } from "ethers";
import NFTMinter from "../build/contracts/NFTMinter.json";
import networkMapping from "../build/deployments/map.json";

const useGetNFTMinterContract = () => {
  const { chainId } = useEthers();

  const { abi } = NFTMinter;
  const NFTMinterAddress = chainId
    ? networkMapping[String(chainId)]["NFTMinter"][0]
    : constants.AddressZero;
  const NFTMinterInterface = new utils.Interface(abi);
  return new Contract(NFTMinterAddress, NFTMinterInterface);
};

export default useGetNFTMinterContract;
