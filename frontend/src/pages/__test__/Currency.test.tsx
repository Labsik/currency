import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from "../../redux/store";
import { Currency } from "../Currency";


describe('Currency', () => {
  it('fetch currencies', () => {
    render(
      <Provider
        store={store}
      >
        <Currency />
      </Provider>
    )
  })
})