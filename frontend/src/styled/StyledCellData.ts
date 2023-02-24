import { styled, TableCell } from "@mui/material";

export const StyledTableCell = styled(TableCell)({
  maxHeight: "100px",
  height: "100%",
});


export const StyledCellData = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "32px",
  height: "100%",
});
