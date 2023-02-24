import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { CustomTableCell } from "../../components/TableCell/TableCell";
import { CurrencyData, CurrencyExchangeType } from "../../redux/currency";
import { TableCellData } from "../../components/TableCell/TableCellData";
import { formatCurrencyValue } from "../../helpers";
import { StyledTableCell } from "../../styled";


interface CurrencyTableProps {
  currencies: CurrencyData[];
}

export const CurrencyTable = ({ currencies }: CurrencyTableProps) => {
  const [hoveredCell, setHoveredCell] = useState("");

  const handleCellHover = (cellId: string) => {
    setHoveredCell(cellId);
  };

  const handleCellUnhover = () => {
    setHoveredCell("");
  };

  return (
    <TableContainer component={Paper} sx={{ m: 3 }}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Currency</StyledTableCell>
            <StyledTableCell align="center">Buy</StyledTableCell>
            <StyledTableCell align="center">Sale</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencies.map((c) => (
            <TableRow key={c.ccy}>
              <StyledTableCell>
                {c.ccy}/{c.base_ccy}
              </StyledTableCell>
              <CustomTableCell
                handleCellHover={() => handleCellHover(c.buy)}
                handleCellUnhover={() => handleCellUnhover()}
              >
                <TableCellData
                  numValue={formatCurrencyValue(c.buy)}
                  hoveredCell={formatCurrencyValue(hoveredCell)}
                  code={c.ccy}
                  type={CurrencyExchangeType.BUY}
                />
              </CustomTableCell>
              <CustomTableCell
                handleCellHover={() => handleCellHover(c.sale)}
                handleCellUnhover={() => handleCellUnhover()}
              >
                <TableCellData
                  numValue={formatCurrencyValue(c.sale)}
                  hoveredCell={formatCurrencyValue(hoveredCell)}
                  code={c.ccy}
                  type={CurrencyExchangeType.SALE}
                />
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
