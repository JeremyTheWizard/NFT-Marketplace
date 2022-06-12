import Marketplace from "../build/contracts/Marketplace.json";
import networkMapping from "../build/deployments/map.json";
import { useEthers } from "@usedapp/core";
import { constants, utils, Contract } from "ethers";

const useGetMarketplaceContract = () => {
  const { chainId } = useEthers();

  const { abi } = Marketplace;
  const marketplaceAddress = chainId
    ? networkMapping[String(chainId)]["Marketplace"][0]
    : constants.AddressZero;
  const marketplaceInterface = new utils.Interface(abi);
  return new Contract(marketplaceAddress, marketplaceInterface);
};

export default useGetMarketplaceContract;
