import React, { useState } from "react";
import {
  StyledConverter,
  StyledTextField,
  StyledConverterItem,
} from "../../styled";
import { CurrencyData } from "../../redux/currency";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem, Button, IconButton } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";

interface CurrencyExchangeProps {
  currencies: CurrencyData[];
}

export const CurrencyExchange = ({ currencies }: CurrencyExchangeProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");

  const currencyCcy = currencies.map((c) => c.ccy);
  const currencyBase = currencies.map((c) => c.base_ccy);
  const allCurrencies = Array.from(new Set([...currencyCcy, ...currencyBase]));

  const convert = () => {
    const fromCurrencyRate =
      currencies.find((c) => c.ccy === fromCurrency)?.buy ?? 1;

    const toCurrencyRate =
      currencies.find((c) => c.ccy === toCurrency)?.buy ?? 1;

    const toUAH = currencies.find((c) => c.ccy === toCurrency)?.sale ?? 1;

    if (fromCurrency !== "UAH" && toCurrency !== "UAH") {
      const res = isToggled
        ? (Number(amount) / Number(fromCurrencyRate)) * Number(toCurrencyRate)
        : (Number(amount) / Number(toCurrencyRate)) * Number(fromCurrencyRate);
      setConvertedAmount(res);
    } else if (fromCurrency !== "UAH" && toCurrency === "UAH") {
      const res = Number(amount) * Number(fromCurrencyRate);
      setConvertedAmount(res);
    } else if (fromCurrency === "UAH" && toCurrency !== "UAH") {
      const res = Number(amount) / Number(toUAH);
      setConvertedAmount(res);
    } else {
      setConvertedAmount(amount);
    }
  };

  const handleFromCurrencyChange = (event: SelectChangeEvent) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event: SelectChangeEvent) => {
    setToCurrency(event.target.value);
  };

  const handleSwitch = () => {
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setIsToggled((prev) => !prev);
    convert();
  };

  const disabledBtn = Number(amount) <= 0;

  return (
    <StyledConverter
      onSubmit={(e) => {
        e.preventDefault();
        convert();
      }}
    >
      <StyledConverterItem>
        <StyledTextField
          id="change"
          variant="filled"
          type="number"
          label="Change"
          value={Math.round(amount * 100) / 100}
          onChange={(e) => setAmount(+e.target.value)}
          InputProps={{ inputProps: { min: 0, 'data-testid': 'from-value', step: "any" }, }}
        />

        <Select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label", 'data-testid': 'from-currency' }}
        >
          {allCurrencies.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </StyledConverterItem>

      <StyledConverterItem>
        <IconButton type="submit" onClick={handleSwitch} disabled={disabledBtn} data-testid="swap">
          <SwapHoriz />
        </IconButton>

        <Button disabled={disabledBtn} variant="contained" type="submit" data-testid='convert'>
          convert
        </Button>
      </StyledConverterItem>

      <StyledConverterItem>
        <StyledTextField
          type="number"
          label="Get"
          variant="filled"
          value={convertedAmount.toFixed(2)}
          disabled={true}
          InputProps={{ inputProps: { 'data-testid': 'to-value' } }}
        />
        <Select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label", 'data-testid': 'to-currency' }}
        >
          {allCurrencies.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </StyledConverterItem>
    </StyledConverter>
  );
};
