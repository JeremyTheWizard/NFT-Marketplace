import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const ModifiedTextField = styled(TextField)(({ theme }) => ({
  "& input": { backgroundColor: "transparent" },

  "& .MuiInputBase-root": {
    "border-radius": "0.5rem",

    fieldset: {
      border: "1px solid",
      "border-bottom": "2px solid",
    },

    "&.Mui-focused fieldset": {
      border: "1px solid",
      "border-bottom": "2px solid",
      "border-color": "#1976d2",
    },
  },
}));

export default ModifiedTextField;
