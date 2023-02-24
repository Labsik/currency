import React, { useState, useEffect, useMemo } from "react";
import { IconButton } from "@mui/material";
import { Edit, Check, Close } from "@mui/icons-material";
import { StyledCellData, StyledTextField } from "../../styled";
import { updateRate } from "../../redux/currency";
import { useAppDispatch } from "../../redux/hooks";
import { getDifference } from "../../helpers";

interface TableCellDataProps {
  numValue: string;
  hoveredCell: string;
  code: string;
  type: string;
}

export const TableCellData = ({
  numValue,
  hoveredCell,
  code,
  type,
}: TableCellDataProps) => {
  const [isEditableMode, setIsEditableMode] = useState(false);
  const [currencyValue, setCurrencyValue] = useState(numValue || 1);
  const [currentHoveredCell, setCurrentHoveredCell] = useState(hoveredCell);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrencyValue(numValue);
  }, [numValue]);

  useEffect(() => {
    setCurrentHoveredCell(hoveredCell);
  }, [hoveredCell]);

  const toggleEditMode = (value: boolean) => {
    setIsEditableMode((state) => (state === value ? false : value));
  };

  const percantageValue = useMemo(() =>  10 * (Number(numValue) / 100),[numValue]);
  const diffValue = getDifference(Number(numValue), Number(currencyValue))
  const isPermittedValue = diffValue >= percantageValue;

  return (
    <StyledCellData
      onMouseLeave={() => {
        setIsEditableMode(false);
        setCurrencyValue(numValue);
      }}
    >
      <StyledTextField
        disabled={!isEditableMode}
        variant="filled"
        type="number"
        value={currencyValue}
        onChange={(evt) => {
          setCurrencyValue(evt.target.value);
          setCurrentHoveredCell(evt.target.value);
        }}
        InputProps={{ inputProps: { min: 0,  'data-testid': 'currency-value', step: "any" }, }}
      />
      {!isEditableMode ? (
        currentHoveredCell === currencyValue && (
          <IconButton
            size="small"
            style={{ position: "absolute", marginTop: "16px" }}
            onClick={() => toggleEditMode(!!currencyValue)}
            aria-label="editBtn"
            data-testid='edit'
          >
            <Edit />
          </IconButton>
        )
      ) : (
        <>
          {currentHoveredCell === currencyValue && (
            <>
              <IconButton
                size="small"
                sx={{ color: isPermittedValue ? "inherit" : "green" }}
                onClick={() => {
                  dispatch(updateRate({ code, currencyValue, type }));
                  toggleEditMode(!!currencyValue);
                }}
                disabled={currencyValue === "0" || isPermittedValue}
                aria-label="checkBtn"
                data-testid='check'
              >
                <Check />
              </IconButton>
              <IconButton
                onClick={() => {
                  setCurrencyValue(numValue);
                  toggleEditMode(!!currencyValue);
                }}
                color="error"
                aria-label="closeBtn"
                data-testid='close'
              >
                <Close />
              </IconButton>
            </>
          )}
        </>
      )}
    </StyledCellData>
  );
};
