import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { currencySlice, currencyStoreKey } from "./currency";

export const store = configureStore({
  reducer: {
    [currencyStoreKey]: currencySlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
