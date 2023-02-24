import { currencyStoreKey } from "./currency.const";
import { CurrencyState } from "./currency.types";

interface State {
  [currencyStoreKey]: CurrencyState;
}
const select = (state: State) => state[currencyStoreKey];

export const getCurrency = (state: State) => select(state);
