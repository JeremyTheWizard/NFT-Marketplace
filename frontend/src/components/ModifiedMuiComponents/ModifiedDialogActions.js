import { DialogActions, styled } from "@mui/material";

const ModifiedDialogActions = styled(DialogActions, {
  shouldForwardProp: (prop) => prop !== "normalPadding",
})(({ normalPadding }) => ({
  paddingLeft: normalPadding ? "24px" : "8px",
  paddingRight: normalPadding ? "24px" : "8px",
}));

export default ModifiedDialogActions;
