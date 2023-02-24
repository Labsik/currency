import { createSlice } from "@reduxjs/toolkit";
import { currencyStoreKey } from "./currency.const";
import { fetchCurrency } from "./currency.thunks";
import { CurrencyExchangeType, CurrencyState } from "./currency.types";

const initialState: CurrencyState = {
  currencies: [],
  loading: true,
  error: null,
};

export const currencySlice = createSlice({
  name: currencyStoreKey,
  initialState,
  reducers: {
    updateRate: (state, action) => {
      const { code, currencyValue, type } = action.payload;
      state.currencies = state.currencies.map((c) => {
        if (c.ccy === code) {
          type === CurrencyExchangeType.BUY ? (c.buy = currencyValue) : (c.sale = currencyValue);
        }
        return c;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload;
      })
      .addCase(fetchCurrency.rejected, (state) => {
        state.loading = false;
        state.error = new Error();
      });
  },
});

export const { updateRate } = currencySlice.actions;
