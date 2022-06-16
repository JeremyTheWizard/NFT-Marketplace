import { utils } from "ethers";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import useSellCoordinator from "../../hooks/useSellCoordinator";
import SecondaryButton from "../SecondaryButton";

const Sell = ({ tokenContractAddress, tokenId }) => {
  const [price, setPrice] = useState();
  const sellCoordinator = useSellCoordinator(tokenContractAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col md:flex-row gap-3 items-center"
      onSubmit={handleSubmit}
    >
      <label className="w-full">
        <div className="flex gap-1 items-center">
          <FaEthereum size="26px" />
          <input
            type="number"
            value={price}
            placeholder="Your price here"
            min="0"
            step="any"
            required
            onChange={(e) => setPrice(e.target.value)}
            className="block rounded-md w-full p-2 border-[1px] border-b-gray-500"
          />
        </div>
      </label>
      <SecondaryButton
        text="Sell"
        onClick={() => {
          sellCoordinator(
            tokenContractAddress,
            tokenId,
            utils.parseEther(price.toString()).toString()
          );
        }}
      />
    </form>
  );
};

export default Sell;
