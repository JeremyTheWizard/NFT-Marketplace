import { Alert, Dialog, DialogContent, Snackbar } from "@mui/material";
import { addressEqual, useEthers } from "@usedapp/core";
import axios from "axios";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import useBuyCoordinator from "../../hooks/useBuyCoordinator";
import ModifiedDialogTitle from "../ModifiedMuiComponents/ModifiedDialogTitle";
import SecondaryButton from "../SecondaryButton";
import RemoveAssetFromSale from "./RemoveAssetFromSale";
import Sell from "./Sell";

function AssetCard({ originalAccount }) {
  const { tokenContractAddress, tokenId } = useParams();

  const [tokenInfo, setTokenInfo] = useState();

  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 25));
  const [ethUsd, setEthUsd] = useState();
  const [seller, setSeller] = useState(undefined);
  const [transactionFailureAlert, setTransactionFailureAlert] = useState(false);
  const [removalSuccessAlert, setRemovalSuccessAlert] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [status, setStatus] = useState();
  const location = useLocation();
  const { account } = useEthers();

  useEffect(() => {
    if (location.state) {
      setTokenInfo(location.state);
      setStatus(location.state.status);
      if (location.state.seller === undefined) {
        fetchSeller();
      }
    } else {
      fetchTokenData();
    }
  }, []);

  useEffect(() => {
    if (tokenInfo && !tokenInfo.ethUsd) {
      fetchEthPrice();
    }
  }, [tokenInfo]);

  const { buyCoordinator, buyStatus } = useBuyCoordinator(
    tokenContractAddress,
    tokenId
  );

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
      setTokenInfo({
        collectionName: data.collectionName,
        seller: data.seller,
        imageUrl: data.imageUrl,
        tokenId: data.tokenId,
        assetContractAddress: data.tokenContractAddress,
        attributes: data.attributes,
        name: data.name,
        description: data.description,
      });
      setStatus("Buy");
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

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
  };

  const fetchEthPrice = async () => {
    const data = await fetch(
      "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2TK8NI1JT3WXC7WCCFQP8V3Q22J347ZC5F"
    ).then((res) => res.json());
    setEthUsd(data.result.ethUsd);
  };

  const handleTransactionFailureAlertClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setTransactionFailureAlert(false);
  };

  const handleRemovalSuccessAlertClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRemovalSuccessAlert(false);
  };

  function likeIcon() {
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
  }

  const renderActionButton = () => {
    if (account && tokenInfo.seller !== undefined) {
      const buyButton = (
        <div className="w-full md:w-56 mt-4 mb-6 md:mb-0 flex flex-col gap-3">
          <SecondaryButton
            text="Buy"
            onClick={() => {
              buyCoordinator();
            }}
          />
        </div>
      );

      if (tokenInfo.seller) {
        if (tokenInfo.seller === account) {
          return (
            <RemoveAssetFromSale
              tokenContractAddress={tokenInfo.contractAddress}
              tokenId={tokenInfo.tokenId}
              setStatus={setStatus}
              setSeller={setSeller}
              setRemovalSuccessAlert={setRemovalSuccessAlert}
            />
          );
        } else {
          return buyButton;
        }
      } else {
        if (tokenInfo.owner && addressEqual(tokenInfo.owner, account)) {
          return (
            <Sell
              tokenContractAddress={
                tokenInfo.assetContractAddress || tokenInfo.contractAddress
              }
              collectionName={tokenInfo.collectionName}
              description={tokenInfo.description}
              name={tokenInfo.name}
              imageUrl={tokenInfo.imageUrl}
              tokenId={tokenInfo.tokenId}
              attributes={tokenInfo.attributes}
              setTransactionFailureAlert={setTransactionFailureAlert}
              setShowSuccessDialog={setShowSuccessDialog}
              setStatus={setStatus}
              setSeller={setSeller}
              originalAccount={originalAccount || tokenInfo.originalAccount}
            />
          );
        }
      }
    }
  };

  const render = () => {
    if (tokenInfo) {
      return (
        <>
          <div className="w-full overflow-hidden rounded-xl flex flex-col md:grid md:grid-cols-2">
            <div className="w-full bg-onPrimary">
              <img
                src={tokenInfo.imageUrl}
                alt="NFT image"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
            <div className="bg-onPrimary p-6 flex flex-col gap-6">
              <h4>{tokenInfo.collectionName}</h4>
              <h3 className="text-2xl font-bold text-left">
                {tokenInfo.name ? tokenInfo.name : `#${tokenInfo.tokenId}`}
              </h3>

              {tokenInfo.seller === null && (
                <p className="text-sm text-gray-500">Not for sale</p>
              )}

              {tokenInfo.price && (
                <div className="flex gap-3 items-center">
                  <div className="flex items-center">
                    <FaEthereum />
                    <p className="text-left text-xl font-semibold">
                      {utils.formatEther(tokenInfo.price)}
                    </p>
                  </div>
                  <p>
                    {tokenInfo.ethUsd
                      ? `$${tokenInfo.ethUsd}`
                      : ethUsd
                      ? `$${ethUsd}`
                      : ""}
                  </p>
                </div>
              )}
              <p className="text-left line-clamp-[10] md:line-clamp-5 lg:line-clamp-[10]">
                {tokenInfo.description
                  ? tokenInfo.description
                  : "This item has no description."}
              </p>
              {renderActionButton()}

              <div className="flex justify-between mt-auto">
                <div className="flex items-center gap-2 ">
                  {tokenInfo.creatorImagePath && (
                    <img
                      src={tokenInfo.creatorImagePath}
                      alt=""
                      className="w-8 h-8 bg-gray-500 object-cover rounded-full"
                    />
                  )}
                  {tokenInfo.creatorName && (
                    <h4 className="text-base">{tokenInfo.creatorName}</h4>
                  )}
                </div>
                <div className="flex gap-2 items-center cursor-pointer">
                  {likeIcon()}
                  <p className="text-base">{likeCount}</p>
                </div>
              </div>
            </div>
          </div>
          <Snackbar
            open={transactionFailureAlert}
            autoHideDuration={6000}
            onClose={handleTransactionFailureAlertClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              severity="error"
              variant="filled"
              onClose={handleTransactionFailureAlertClose}
            >
              The transaction has been canceled!
            </Alert>
          </Snackbar>
          <Snackbar
            open={removalSuccessAlert}
            autoHideDuration={6000}
            onClose={handleRemovalSuccessAlertClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              severity="success"
              variant="filled"
              onClose={handleRemovalSuccessAlertClose}
            >
              Your NFT has been removed from sale.
            </Alert>
          </Snackbar>
          <Dialog
            onClose={handleSuccessDialogClose}
            open={showSuccessDialog}
            PaperProps={{
              style: { padding: "1.5rem" },
            }}
          >
            <ModifiedDialogTitle
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              onClose={handleSuccessDialogClose}
            >
              Congratulations!
              <br />
              Your NFT was listed for sale.
            </ModifiedDialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignItems: "center",
                padding: "0px",
              }}
            >
              Your NFT will be shown on the marketplace accordingly to user
              interest.
            </DialogContent>
          </Dialog>
        </>
      );
    }
  };

  return tokenInfo && render();
}

export default AssetCard;
