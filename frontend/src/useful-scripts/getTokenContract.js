import { Contract } from "@ethersproject/contracts";
import ERC721 from "../build/contracts/MockERC721.json";
import { utils } from "ethers";

const getTokenContract = (tokenContractAddress) => {
  const erc721ABI = ERC721.abi;
  const erc721Interface = new utils.Interface(erc721ABI);
  return new Contract(tokenContractAddress, erc721Interface);
};

export default getTokenContract;
