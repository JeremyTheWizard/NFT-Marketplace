import { Button, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormIntro from "../components/create-collection/FormIntro";
import ModifiedDialogActions from "../components/ModifiedMuiComponents/ModifiedDialogActions";
import ModifiedDialogTitle from "../components/ModifiedMuiComponents/ModifiedDialogTitle";

const CreateCollection = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
  };

  return (
    <>
      <div className="w-[90vw] max-w-[1200px] mx-auto my-12">
        <FormIntro setShowSuccessDialog={setShowSuccessDialog} />
        <ItemsActivity />
      </div>
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
          You have create a new collection
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
          Now you can create new NFTs under this collection.
        </DialogContent>
        <ModifiedDialogActions style={{ padding: "1.5rem 0px 0px 0px" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/create")}
          >
            CREATE NFT!
          </Button>
        </ModifiedDialogActions>
      </Dialog>
    </>
  );
};

export default CreateCollection;

const ItemsActivity = () => {
  return (
    <>
      {" "}
      <div className="opacity-30 flex justify-center gap-12 text-onPrimary text-lg mb-3 mt-12">
        <button className="text-buttonSecondary font-semibold :text-xl">
          Items
        </button>
        <button className="text-onPrimary font-semibold :text-xl">
          Activity
        </button>
      </div>
      <hr className="opacity-30 bg-onPrimary w-full border-1" />
    </>
  );
};
