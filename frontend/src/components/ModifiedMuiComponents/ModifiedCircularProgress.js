import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const StyledCircularProgress = styled(CircularProgress)({
  size: "3rem",
});

const ModifiedCircularProgress = (props) => {
  return <StyledCircularProgress thickness={6} {...props} />;
};

export default ModifiedCircularProgress;
