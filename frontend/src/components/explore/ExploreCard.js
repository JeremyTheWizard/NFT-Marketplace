import React, { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { useMoralisWeb3Api } from "react-moralis";
import { useNavigate } from "react-router-dom";
import useGetOwnerOfToken from "../../hooks/useGetOwnerOfToken";
import fixUrl from "../../useful-scripts/fixUrl";
import getTokenContract from "../../useful-scripts/getTokenContract";

function ExploreCard({ tokenContractAddress, tokenId, seller }) {
  const tokenContract = getTokenContract(tokenContractAddress);
  const ownerOfToken = useGetOwnerOfToken(tokenContract, tokenId);
  const Web3Api = useMoralisWeb3Api();
  const [imagePath, setImagePath] = useState("");
  const [collectionName, setCollectionName] = useState();
  const [price, setPrice] = useState(undefined);
  const [creatorName, setCreatorName] = useState(undefined);
  const [creatorImagePath, setCreatorImagePath] = useState(undefined);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  let navigate = useNavigate();

  const fetchTokenIdMetadata = async () => {
    const options = {
      address: tokenContractAddress,
      token_id: tokenId,
      chain: "rinkeby",
    };
    const tokenInfo = await Web3Api.token.getTokenIdMetadata(options);
    setCollectionName(tokenInfo.name);
    const tokenMetadata = JSON.parse(tokenInfo.metadata);
    setImagePath(tokenMetadata.image);
  };

  useEffect(() => {
    fetchTokenIdMetadata();
  }, []);

  function routeChange(path) {
    navigate(path, {
      state: {
        imagePath: imagePath,
        collectionName: collectionName,
        tokenId: tokenId,
        price: price,
        creatorImagePath: creatorImagePath,
        creatorName: creatorName,
        sell: "sell",
        contractAddress: tokenContractAddress,
        attributes: {},
      },
    });
  }

  const render = () => {
    console.log("re rendered");
    return ownerOfToken && ownerOfToken === seller ? (
      <div
        className="bg-onPrimary overflow-hidden rounded-xl flex flex-col cursor-pointer"
        onClick={() =>
          routeChange(
            `/collections/${collectionName ? collectionName : "test"}/nft`
          )
        }
      >
        <div className="w-full">
          <img
            src={imagePath.startsWith("ipfs") ? fixUrl(imagePath) : imagePath}
            alt="NFT image"
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        <div className="p-6 flex flex-col gap-3">
          <h4>{collectionName}</h4>
          <h3 className="text-xl font-semibold">{tokenId}</h3>
          {price && (
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <FaEthereum />
                <p className="text-lg font-semibold">{price}</p>
              </div>
              <p>($63.00)</p>
            </div>
          )}
          <div className="flex justify-between mt-8">
            <div className="flex items-center gap-2">
              {creatorName && (
                <img
                  src={creatorImagePath}
                  alt=""
                  className="w-8 h-8 bg-gray-400 object-cover rounded-full"
                />
              )}
              {creatorName && <h4 className="text-base">{creatorName}</h4>}
            </div>
            <div className="flex gap-2 items-center">
              {likeIcon()}
              <p className="text-base">{likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <p>No Render</p>
    );
  };

  const likeIcon = () => {
    if (isLike) {
      return (
        <BsSuitHeartFill
          size="32px"
          onClick={() => {
            setIsLike(false);
            setLikeCount(likeCount - 1);
          }}
        />
      );
    } else {
      return (
        <BsSuitHeart
          size="32px"
          onClick={() => {
            setIsLike(true);
            setLikeCount(likeCount + 1);
          }}
        />
      );
    }
  };

  return render();
}

export default ExploreCard;
