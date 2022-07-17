import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AssetCard from "../components/Asset/AssetCard";
import Tabs from "../components/Asset/offers-history/Tabs";
import ModifiedCircularProgress from "../components/ModifiedMuiComponents/ModifiedCircularProgress";

function Asset() {
  const [tokenInfo, setTokenInfo] = useState();
  const { tokenContractAddress, tokenId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setTokenInfo(location.state);
    } else {
      fetchTokenData();
    }
  }, []);

  useEffect(() => {
    if (tokenInfo && tokenInfo.seller === undefined) {
      fetchSeller();
    }
  }, [tokenInfo]);

  const fetchTokenData = async () => {
    let data;

    // Check if the token is on sale on the db if not get info from opensea
    try {
      data = await axios({
        method: "get",
        url: "http://localhost:8000/api/nfts/nftsforsale/getnft",
        params: {
          contractAddress: tokenContractAddress,
          tokenId: tokenId,
        },
      }).then((res) => res.data.nftForSale[0]);
    } catch (err) {
      console.log(err);
    }

    if (data) {
      setTokenInfo((previous) => ({
        ...previous,
        collectionName: data.collectionName,
        seller: data.seller,
        imageUrl: data.imageUrl,
        tokenId: data.tokenId,
        assetContractAddress: data.tokenContractAddress,
        attributes: data.attributes,
        name: data.name,
        description: data.description,
      }));
    } else {
      try {
        data = await axios({
          method: "get",
          url: `https://testnets-api.opensea.io/api/v1/asset/${tokenContractAddress}/${tokenId}/`,
        }).then((res) => res.data);
      } catch (err) {
        console.log(err);
      }
      if (data) {
        setTokenInfo({
          collectionName: data.asset_contract.name,
          imageUrl: data.image_url,
          tokenId: data.token_id,
          assetContractAddress: data.asset_contract.address,
          attributes: data.traits,
          name: data.name,
          description: data.description,
          owner: data.owner.address,
        });
      }
    }
  };

  const fetchSeller = async () => {
    let seller;

    try {
      seller = await axios({
        method: "get",
        url: "http://localhost:8000/api/nfts/nftsforsale/getnft",
        params: {
          contractAddress: tokenContractAddress,
          tokenId: tokenId,
        },
      }).then((res) => res.data.nftForSale[0].seller);
    } catch (err) {
      console.log(err);
    }
    if (seller) {
      setTokenInfo((previous) => ({ ...previous, seller: seller }));
    } else {
      setTokenInfo((previous) => ({ ...previous, seller: null }));
    }
  };

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      {tokenInfo && tokenInfo.seller !== undefined ? (
        <>
          <AssetCard
            tokenInfo={tokenInfo}
            _originalAccount={tokenInfo.seller || tokenInfo.owner}
          />
          <Tabs tokenInfo={tokenInfo} />
        </>
      ) : (
        <ModifiedCircularProgress />
      )}
    </div>
  );
}

export default Asset;
