import axios from "axios";
import { currencyStoreKey } from "./currency.const";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencyData } from "../../api";
import { errorImitation } from "../../helpers";

export const fetchCurrency = createAsyncThunk(currencyStoreKey, async () => {
  errorImitation();
  try {
    const response = await axios.get(getCurrencyData());
    if (window.localStorage.getItem("requestCount") === "5") {
      throw new Error();
    }
    return response.data;
  } catch (err) {
    throw new Error(String(err));
  }
});
