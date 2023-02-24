import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from 'react-redux';
import { Currency } from "../../../pages";
import { store } from "../../../redux/store";

describe('CurrencyExchange', () => {
  it('calculate exchange rate correctly on default currencies - from USD to UAH', async () => {
    render(
      <Provider store={store}>
        <Currency/>
      </Provider>
    )

    await waitFor(() => {
      const fromAmountInput = screen.getByTestId<HTMLInputElement>('from-value')
      expect(fromAmountInput).toBeInTheDocument();

      const toAmountInput = screen.getByTestId<HTMLInputElement>('to-value')
      expect(toAmountInput).toBeInTheDocument();

      const convertButton = screen.getByTestId("convert")
      expect(convertButton).toBeInTheDocument();

      fireEvent.change(fromAmountInput, { target: { value: "10"} })
      fireEvent.click(convertButton)
      expect(toAmountInput.value).toBe('390.00');
    })
  })


  it('calculate exchange rate correctly from USD to EURO', async () => {
    render(
      <Provider store={store}>
        <Currency/>
      </Provider>
    )

    await waitFor(async () => {
      const fromAmountInput = screen.getByTestId<HTMLInputElement>('from-value')
      expect(fromAmountInput).toBeInTheDocument();

      const toAmountInput = screen.getByTestId<HTMLInputElement>('to-value')
      expect(toAmountInput).toBeInTheDocument();

      const convertButton = screen.getByTestId("convert")
      expect(convertButton).toBeInTheDocument();

      const swapButton = screen.getByTestId("swap")
      expect(swapButton).toBeInTheDocument();

      const fromSelectCurrency = screen.getByTestId<HTMLInputElement>('from-currency')
      expect(fromSelectCurrency).toBeInTheDocument();

      const toSelectCurrency = screen.getByTestId<HTMLInputElement>('to-currency')
      expect(toSelectCurrency).toBeInTheDocument();

      fireEvent.change(toSelectCurrency, { target: { value: 'EUR' } })

      fireEvent.change(fromAmountInput, { target: { value: "10"} })

      fireEvent.click(convertButton)

      await waitFor(() => {
        expect(toAmountInput.value).toBe("9.75");

        fireEvent.click(swapButton)
        expect(fromSelectCurrency.value).toBe("EUR")
        expect(toSelectCurrency.value).toBe("USD")
      })
    }, {timeout: 14000})
  })



  it('disable buttons if amount is equal to 0', async () => {
    render(
      <Provider store={store}>
        <Currency/>
      </Provider>
    )

    await waitFor(() => {
      const fromAmountInput = screen.getByTestId<HTMLInputElement>('from-value')
      expect(fromAmountInput).toBeInTheDocument();

      const convertButton = screen.getByTestId("convert")
      expect(convertButton).toBeInTheDocument();

      const swapButton = screen.getByTestId("swap")
      expect(swapButton).toBeInTheDocument();

      fireEvent.change(fromAmountInput, { target: { value: "0"} })
      expect(convertButton).toBeDisabled();
      expect(swapButton).toBeDisabled()
    })
  })
})