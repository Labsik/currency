import React from "react";
import { TableCell } from "@mui/material";

interface TableCellProps {
  children: React.ReactNode;
  handleCellHover: () => void;
  handleCellUnhover: () => void;
}

export const CustomTableCell = ({
  children,
  handleCellHover,
  handleCellUnhover,
}: TableCellProps) => {
  return (
    <TableCell
      onMouseEnter={handleCellHover}
      onMouseLeave={handleCellUnhover}
      align="center"
      sx={{ padding: "0px", height: "100px" }}
    >
      {children}
    </TableCell>
  );
};
