import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";

const CreateCollectionDialog = ({ setValue, open, toggleOpen }) => {
  const [dialogValue, setDialogValue] = useState({
    title: "",
    year: "",
  });

  const handleClose = () => {
    setDialogValue({
      title: "",
      year: "",
    });

    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
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
            value={dialogValue.title}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                title: event.target.value,
              })
            }
            label="Collection Name"
            type="text"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCollectionDialog;
