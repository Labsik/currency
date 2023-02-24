import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: "100%",
    borderRadius: ".4rem",
  },
  "& .MuiFilledInput-root, & .MuiSelect-filled": {
    backgroundColor: "white",
    border: "none",
  },
  "& .MuiInputBase-root::before, & .MuiInputBase-root::after": {
    display: "none",
  },
  "& input": {
    color: theme.palette.primary.main,
    textFillColor: theme.palette.primary.dark,
    fontSize: "1rem",
    border: `1px solid grey`,
    borderRadius: "5px",
  },
  "& .MuiSelect-select.MuiInputBase-input": {
    background: "none",
    border: "none",
  },
  // disabled styles
  "& .MuiFilledInput-root.Mui-disabled": {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
  },
  "& .MuiFilledInput-root.Mui-disabled::before": {
    border: "none",
  },
  "& input.Mui-disabled": {
    color: "grey",
    textFillColor: theme.palette.primary.main,
    fontSize: "1rem",
    border: "none",
  },
}));
