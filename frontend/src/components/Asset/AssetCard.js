import {
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  Snackbar,
  Typography,
} from "@mui/material";
import { addressEqual, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { MdCheckCircleOutline, MdHighlightOff } from "react-icons/md";
import { useParams } from "react-router-dom";
import useBuyCoordinator from "../../hooks/useBuyCoordinator";
import useSellCoordinator from "../../hooks/useSellCoordinator";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";
import ModifiedDialogTitle from "../ModifiedMuiComponents/ModifiedDialogTitle";
import SecondaryButton from "../SecondaryButton";
import RemoveAssetFromSale from "./RemoveAssetFromSale";

function AssetCard({ tokenInfo }) {
  const { tokenContractAddress, tokenId } = useParams();

  const { account } = useEthers();
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 25));
  const [ethUsd, setEthUsd] = useState();
  const [seller, setSeller] = useState(tokenInfo.seller);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [owner, setOwner] = useState(tokenInfo.owner);
  const [transactionFailureAlert, setTransactionFailureAlert] = useState(false);
  const [removalSuccessAlert, setRemovalSuccessAlert] = useState(false);
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [openPurchaseSuccessfulDialog, setOpenPurchaseSuccessfulDialog] =
    useState();

  useEffect(() => {
    if (tokenInfo && !tokenInfo.ethUsd) {
      fetchEthPrice();
    }
  }, [tokenInfo]);

  const { buyCoordinator, buyStatus, resetBuyStatus } = useBuyCoordinator(
    tokenContractAddress,
    tokenId
  );

  const {
    sellCoordinator,
    approveSaleStatus,
    resetApproveSaleStatus,
    approveCollectionStatus,
    isApproved,
  } = useSellCoordinator(
    tokenContractAddress,
    setLoading,
    setTransactionFailureAlert,
    owner,
    setSeller
  );

  useEffect(() => {
    if (buyStatus === "PendingSignature") {
      setOpenPurchaseSuccessfulDialog(true);
    }
    if (buyStatus === "Success") {
      setSeller(null);
      setOwner(account);
    }
    if (buyStatus === "Exception") {
      setOpenPurchaseSuccessfulDialog(false);
      setTransactionFailureAlert(true);
    }
  }, [buyStatus]);

  useEffect(() => {
    if (approveSaleStatus === "Exception") {
      setShowSuccessDialog(false);
      resetApproveSaleStatus();
    }
  }, [approveSaleStatus]);

  useEffect(() => {
    if (approveCollectionStatus === "Exception") {
      setShowSuccessDialog(false);
    }
  }, [approveCollectionStatus]);

  const handleSuccessDialogClose = () => {
    if (
      (isApproved[0] || approveCollectionStatus === "Success") &&
      approveSaleStatus === "Success"
    ) {
      setShowSuccessDialog(false);
      resetApproveSaleStatus();
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sellCoordinator(
      tokenInfo.assetContractAddress || tokenInfo.contractAddress,
      tokenInfo.tokenId,
      utils.parseEther(price.toString()).toString(),
      tokenInfo.name,
      tokenInfo.imageUrl,
      tokenInfo.attributes,
      tokenInfo.collectionName,
      tokenInfo.description
    );
    setShowSuccessDialog(true);
  };

  const fetchEthPrice = async () => {
    let data;
    try {
      data = await fetch(
        "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2TK8NI1JT3WXC7WCCFQP8V3Q22J347ZC5F"
      ).then((res) => res.json());
    } catch (err) {
      console.log(err);
    }
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

  const handlePurchaseSuccessfulDialogClose = () => {
    if (buyStatus === "Success") {
      setOpenPurchaseSuccessfulDialog(false);
      resetBuyStatus();
    } else {
      return;
    }
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
    if (account && seller !== undefined) {
      const buyButton = (
        <div className="w-full md:w-56 mt-4 mb-6 md:mb-0 flex flex-col gap-3">
          <SecondaryButton
            text="Buy"
            loading={!["Exception", "None", "Success"].includes(buyStatus)}
            onClick={() => {
              buyCoordinator();
            }}
          />
        </div>
      );

      if (seller) {
        if (addressEqual(seller, account)) {
          return (
            <RemoveAssetFromSale
              tokenContractAddress={tokenInfo.contractAddress}
              tokenId={tokenInfo.tokenId}
              setSeller={setSeller}
              setRemovalSuccessAlert={setRemovalSuccessAlert}
            />
          );
        } else {
          return buyButton;
        }
      } else {
        if (owner && addressEqual(owner, account)) {
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
                    placeholder="Your price"
                    min="0"
                    step="any"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    className="block rounded-md w-full p-2 border-[1px] border-b-gray-500"
                  />
                </div>
              </label>
              <SecondaryButton text="Sell" loading={loading} />
            </form>
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
              {tokenInfo.imageUrl ? (
                <img
                  src={tokenInfo.imageUrl}
                  alt="NFT image"
                  className="w-full h-full object-cover aspect-square rounded-lg"
                />
              ) : (
                <div className="bg-gray-700 w-full aspect-square max-w-[600px] blur-md"></div>
              )}
            </div>
            <div className="bg-onPrimary p-6 flex flex-col gap-6">
              <h4>{tokenInfo.collectionName}</h4>
              <h3 className="text-2xl font-bold text-left">
                {tokenInfo.name ? tokenInfo.name : `#${tokenInfo.tokenId}`}
              </h3>

              {seller === null && (
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
            onClose={handlePurchaseSuccessfulDialogClose}
            open={openPurchaseSuccessfulDialog}
            PaperProps={{
              style: { maxWidth: "24rem", width: "100%", alignItems: "center" },
            }}
          >
            {!["Success", "Exception"].includes(buyStatus) && (
              <>
                <ModifiedDialogTitle
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ModifiedCircularProgress />
                </ModifiedDialogTitle>
                <DialogContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {buyStatus === "PendingSignature" ? (
                    <Typography variant="h6" content="subtitle1" align="center">
                      Please, confirm the transaction to buy the NFT.
                    </Typography>
                  ) : (
                    <Typography variant="h6" content="subtitle1" align="center">
                      We are transferring you the NFT. This will take a few
                      moments...
                    </Typography>
                  )}
                </DialogContent>
              </>
            )}
            {buyStatus === "Success" && (
              <>
                <ModifiedDialogTitle
                  sx={{ textAlign: "center" }}
                  onClose={handlePurchaseSuccessfulDialogClose}
                >
                  Congratulations!
                  <br />
                  <Typography variant="subtitle1" color="initial">
                    You have purchased...
                  </Typography>
                </ModifiedDialogTitle>
                <DialogContent style={{ maxWidth: "24rem" }}>
                  <DialogContentText
                    gutterBottom
                    color=""
                    style={{ textAlign: "center" }}
                  >
                    {tokenInfo.name || tokenInfo.tokenId}
                  </DialogContentText>

                  {tokenInfo.imageUrl ? (
                    <img
                      src={tokenInfo.imageUrl}
                      className="object-cover aspect-square "
                    />
                  ) : (
                    <div className="w-60 h-60 bg-gray blur-md"></div>
                  )}
                </DialogContent>
              </>
            )}
          </Dialog>

          <Dialog
            onClose={handleSuccessDialogClose}
            open={showSuccessDialog}
            PaperProps={{
              style: { padding: "1.5rem" },
            }}
          >
            {(approveCollectionStatus !== "Success" &&
              isApproved &&
              !isApproved[0]) ||
            approveSaleStatus !== "Success" ? (
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0px",
                  rowGap: "1.25rem",
                }}
              >
                <div className="flex gap-3 items-center">
                  {approveCollectionStatus !== "Success" &&
                  isApproved &&
                  !isApproved[0] ? (
                    approveCollectionStatus !== "PendingSignature" ? (
                      <CircularProgress size={18} sx={{ minWidth: "18px" }} />
                    ) : (
                      <MdHighlightOff
                        size="18px"
                        style={{ minWidth: "18px" }}
                      />
                    )
                  ) : (
                    <MdCheckCircleOutline
                      size="18px"
                      style={{ minWidth: "18px" }}
                      color="green"
                    />
                  )}
                  <div>
                    <Typography component="span" variant="h6">
                      Approve
                    </Typography>
                    <p className="w-full">
                      This transaction is done only once for collection.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  {(isApproved && isApproved[0]) ||
                  approveCollectionStatus === "Success" ? (
                    <CircularProgress size={18} sx={{ minWidth: "18px" }} />
                  ) : (
                    <MdHighlightOff size="18px" style={{ minWidth: "18px" }} />
                  )}
                  <div>
                    <Typography component="span" variant="h6">
                      Put on sale
                    </Typography>
                    <p className="w-full">Sign message. This is FREE.</p>
                  </div>
                </div>
              </DialogContent>
            ) : (
              <>
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
              </>
            )}
          </Dialog>
        </>
      );
    }
  };

  return tokenInfo && render();
}

export default AssetCard;
