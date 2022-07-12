import axios from "axios";
import React, { useState } from "react";
import DeleteButton from "../DeleteButton";

const RemoveAssetFromSale = ({
  tokenContractAddress,
  tokenId,
  setStatus,
  setSeller,
}) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveAssetFromSale = async () => {
    setLoading(true);
    await axios({
      method: "delete",
      url: "http://localhost:8000/api/nfts/nftsforsale/delete",
      data: { tokenContractAddress: tokenContractAddress, tokenId: tokenId },
    });
    setStatus("Sell");
    setSeller(null);
    setLoading(false);
  };

  return (
    <div className="w-full md:w-56 mt-4 mb-6 md:mb-0 flex flex-col gap-3">
      <DeleteButton
        type="button"
        onClick={handleRemoveAssetFromSale}
        loading={loading}
      >
        REMOVE FROM SALE
      </DeleteButton>
    </div>
  );
};

export default RemoveAssetFromSale;
