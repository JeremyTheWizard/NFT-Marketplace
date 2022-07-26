import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import FormData from "form-data";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Attributes from "../components/Asset/offers-history/Attributes";
import AttributesModal from "../components/Create/AttributesModal";
import CollectionComboBox from "../components/Create/CollectionComboBox";
import ModifiedCircularProgress from "../components/ModifiedMuiComponents/ModifiedCircularProgress";
import ModifiedDialogActions from "../components/ModifiedMuiComponents/ModifiedDialogActions";
import ModifiedDialogTitle from "../components/ModifiedMuiComponents/ModifiedDialogTitle";
import ModifiedTextField from "../components/ModifiedTextField";
import useGetNFTMinterContract from "../hooks/useGetNFTMinterContract";
import useMintTokenCoordinator from "../hooks/useMintTokenCoordinator";

const Create = () => {
  const [attributes, setAttributes] = useState();
  const [file, setFile] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionFailureAlert, setTransactionFailureAlert] = useState(false);
  const account = useSelector((state) => state.account.account);
  const tokenName = useRef();
  const collectionName = useRef();
  const collectionSlug = useRef();

  const loadingMessages = [
    "Building the transaction...",
    "Please, confirm the transaction to create your NFT",
    <span>
      Creating your NFT.
      <br />
      We'll be done in a few moments...
    </span>,
  ];
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const { mintTokenCoordinator, mintStatus, resetMintState, mintEvents } =
    useMintTokenCoordinator();

  useEffect(() => {
    if (mintStatus === "PendingSignature") {
      setLoadingMessage(loadingMessages[1]);
    }
    if (mintStatus === "Exception") {
      setOpenDialog(false);
      setTransactionFailureAlert(true);
      setLoadingMessage(loadingMessages[0]);
    }
    if (mintStatus === "Mining") {
      setLoadingMessage(loadingMessages[2]);
    }
    if (mintStatus === "Success") {
      // Update token metadata on opensea
      axios.get(
        `https://testnets.opensea.io/assets/rinkeby/${NFTMinterContractAddress}/${String(
          parseInt(mintEvents[0].args[2]._hex, 16)
        )}/?force_update=true`
      );
      setLoadingMessage(loadingMessages[0]);
      axios.post("http://localhost:8000/api/collections/collection/token", {
        collectionSlug: collectionSlug.current,
        tokenName: tokenName.current,
        tokenId: String(parseInt(mintEvents[0].args[2]._hex, 16)),
      });
    }
  }, [mintStatus]);

  const theme = useTheme();

  const NFTMinterContractAddress = useGetNFTMinterContract().address;
  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path, {
      state: {
        imageUrl: URL.createObjectURL(file),
        collectionName: collectionName.current,
        name: tokenName.current,
        tokenId: parseInt(mintEvents[0].args[2]._hex, 16),
        creator: mintEvents[0].args[1],
        contractAddress: NFTMinterContractAddress,
        attributes: attributes,
        owner: account,
      },
    });
  };

  const changeImage = (e) => {
    e.persist();
    setFile(e.target.files[0]);
  };

  const handleDialogClose = (_, reason) => {
    if (
      (reason === "backdropClick" || reason === "escapeKeyDown") &&
      mintStatus !== "Success"
    ) {
      return;
    } else {
      setOpenDialog(false);
      resetMintState();
    }
  };

  const handleTransactionFailureAlertClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setTransactionFailureAlert(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(true);
    var formData = new FormData(e.target);
    formData.append("attributes", JSON.stringify(attributes));
    formData.append("file", file);
    mintTokenCoordinator(formData);
    tokenName.current = e.target.name.value;
    collectionName.current = e.target.collection.value;
  };

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto">
      <form
        id="form"
        onSubmit={handleSubmit}
        className="bg-onPrimary overflow-hidden flex flex-col lg:grid md:grid-cols-2 rounded-lg mt-12"
      >
        <label
          for="dropzone-file"
          className="relative flex flex-col self-center justify-center items-center w-full lg:m-3 xl:m-0 aspect-square border-2 border-dashed cursor-pointer  bg-gray-700  border-gray-500 hover:border-gray-400 hover:bg-gray-600"
        >
          <div className="w-full flex flex-col justify-center items-center p-3">
            {file ? (
              <div className="w-full relative">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    setFile(null);
                  }}
                  className="z-10 absolute top-3 right-3"
                >
                  <AiOutlineCloseCircle size="32px" />
                </div>
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full object-cover aspect-square"
                ></img>
              </div>
            ) : (
              <>
                <svg
                  className="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            name="dropzone-file"
            type="file"
            className="opacity-0 pointer-events-none cursor-pointer absolute "
            required
            onChange={changeImage}
          />
        </label>
        <div className="bg-onPrimary p-6 lg:p-12 flex flex-col gap-6">
          <ModifiedTextField
            required="Name"
            name="name"
            id="name"
            label="Name"
            sx={{ "& .MuiOutlinedInput-input:focus": { boxShadow: "none" } }}
          />

          <div className="flex flex-col gap-1">
            <CollectionComboBox collectionSlug={collectionSlug} />
          </div>

          {useMediaQuery(theme.breakpoints.down("xl")) && (
            <ModifiedTextField
              multiline
              label="Description"
              rows="2"
              name="description"
              id="description"
              sx={{ "& textarea": { boxShadow: "none" } }}
            ></ModifiedTextField>
          )}

          {useMediaQuery(theme.breakpoints.up("xl")) && (
            <ModifiedTextField
              multiline
              label="Description"
              minRows="3"
              maxRows="8"
              name="description"
              id="description"
              sx={{ "& textarea": { boxShadow: "none" } }}
            ></ModifiedTextField>
          )}

          <div>
            <AttributesModal
              createAttributes={attributes}
              setCreateAttributes={setAttributes}
            />
          </div>

          <div className="mt-auto">
            <button
              type="submit"
              className=" inline-flex items-center justify-center w-full px-5 py-3 text-white bg-[#1676BA] hover:bg-buttonSecondary  rounded-lg sm:w-auto"
            >
              {" "}
              <span className="font-medium"> CREATE! </span>
            </button>
          </div>
        </div>
      </form>
      <div className="mb-3 mt-12">
        <div className="flex justify-center gap-12 text-onPrimary text-lg">
          <h5 className="flex items-center gap-3 cursor-pointer text-buttonSecondary font-bold">
            Attributes
          </h5>
        </div>
      </div>
      <hr className="bg-onPrimary w-full border-1" />
      <div className="w-full mt-6 mb-12">
        {<Attributes attributes={attributes} />}
      </div>

      <Dialog
        onClose={handleDialogClose}
        open={openDialog}
        PaperProps={{
          style: { maxWidth: "24rem", width: "100%", alignItems: "center" },
        }}
      >
        {mintStatus !== "Success" && (
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
              <Typography variant="h6" content="subtitle1" align="center">
                {loadingMessage}
              </Typography>
            </DialogContent>
          </>
        )}
        {mintStatus === "Success" && (
          <>
            <ModifiedDialogTitle
              sx={{ textAlign: "center" }}
              onClose={handleDialogClose}
            >
              Congratulations!
              <br />
              <Typography variant="subtitle1" color="initial">
                You have created...
              </Typography>
            </ModifiedDialogTitle>
            <DialogContent style={{ maxWidth: "24rem" }}>
              <DialogContentText
                gutterBottom
                color=""
                style={{ textAlign: "center" }}
              >
                {tokenName.current && tokenName.current}
              </DialogContentText>

              <img
                src={file && URL.createObjectURL(file)}
                className="object-cover aspect-square "
              />
            </DialogContent>
            <ModifiedDialogActions style={{ width: "100%" }} normalPadding>
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  routeChange(
                    `/assets/${NFTMinterContractAddress}/${String(
                      parseInt(mintEvents[0].args[2]._hex, 16)
                    )}`
                  )
                }
              >
                CHECK IT OUT!
              </Button>
            </ModifiedDialogActions>
          </>
        )}
      </Dialog>
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
    </div>
  );
};

export default Create;
