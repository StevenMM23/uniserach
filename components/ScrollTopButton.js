import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTopButton = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label="scroll to top"
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollTopButton;