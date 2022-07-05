import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useRef } from "react";

const CreateCollectionDialog = ({
  setValue,
  open,
  setOpenCreateCollectionDialog,
}) => {
  const collectionValue = useRef();
  const loading = useRef(false);
  const { account } = useEthers();

  const handleClose = () => {
    setOpenCreateCollectionDialog(false);
  };

  const handleCreateCollection = async () => {
    console.log("collection value = ", collectionValue.current);
    setValue({
      name: collectionValue.current,
    });

    loading.current = true;
    await axios.post("http://localhost:8000/api/users/user/collection", {
      account: account,
      collectionName: collectionValue.current,
    });
    loading.current = false;

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form>
        <DialogTitle>Create a new collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a quick creation.<br></br>You'll be able to fill the
            collection's details later on your profile.
          </DialogContentText>
          <TextField
            fullWidth
            sx={{ marginTop: "0.75rem" }}
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Collection Name"
            type="text"
            variant="standard"
            onChange={(e) => (collectionValue.current = e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={loading.current}
            type="button"
            onClick={handleCreateCollection}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCollectionDialog;
