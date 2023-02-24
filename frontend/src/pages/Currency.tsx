import React, { useEffect, useRef } from "react";
import { Footer, Header, Loader, Error } from "../components";
import { fetchCurrency, getCurrency } from "../redux/currency";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { styled } from "@mui/material";
import { CurrencyExchange, CurrencyTable } from "../features";

export const CurrencyWrap = styled("div")({
  height: "calc(100% - 200px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 40px",
});

export const Currency = () => {
  const { currencies, loading, error } = useAppSelector(getCurrency);
  const dispatch = useAppDispatch();
  const shouldLog = useRef(true);

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      dispatch(fetchCurrency());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <CurrencyWrap>
        {loading && <Loader />}
        {error && <Error />}
        {currencies.length ? (
          <>
            <CurrencyTable currencies={currencies} />
            <CurrencyExchange currencies={currencies} />
          </>
        ) : null}
      </CurrencyWrap>
      <Footer />
    </>
  );
};
