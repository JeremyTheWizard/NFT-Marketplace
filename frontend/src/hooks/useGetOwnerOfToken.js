import { useCall } from "@usedapp/core";

const useGetOwnerOfToken = (tokenContract, tokenId) => {
  const { value, error } =
    useCall({
      contract: tokenContract,
      method: "ownerOf",
      args: [tokenId],
    }) ?? {};
  if (error) {
    console.error(error);
    return undefined;
  }
  return value?.[0];
};

export default useGetOwnerOfToken;
