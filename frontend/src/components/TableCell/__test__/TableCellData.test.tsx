import { TableCellData } from "../TableCellData";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from "../../../redux/store";

describe("test TableCellData component", () => {
  it('disable if input value equal to 0', () => {
    render(
      <Provider store={store}>
        <TableCellData numValue='41' hoveredCell='41' code="USD" type="BUY" />
      </Provider>
    );
    const currencyInput = screen.getByTestId<HTMLInputElement>('currency-value')
    expect(currencyInput).toBeInTheDocument();

    const buttonEditElement = screen.getByTestId('edit');

    fireEvent.click(buttonEditElement)

    const buttonCheckElement = screen.getByTestId('check');
    expect(buttonCheckElement).toBeInTheDocument();

    fireEvent.change(currencyInput, { target: { value: "0"} })
    expect(buttonCheckElement).toBeDisabled();
  })

  it('disable if input value more than 10% from init value', () => {
    render(
      <Provider store={store}>
        <TableCellData numValue='41' hoveredCell='41' code="USD" type="BUY" />
      </Provider>
    );
    const currencyInput = screen.getByTestId<HTMLInputElement>('currency-value')
    expect(currencyInput).toBeInTheDocument();

    const buttonEditElement = screen.getByTestId('edit');

    fireEvent.click(buttonEditElement)

    const buttonCheckElement = screen.getByTestId('check');
    expect(buttonCheckElement).toBeInTheDocument();

    fireEvent.change(currencyInput, { target: { value: 30} })
    expect(buttonCheckElement).toBeDisabled();

    fireEvent.change(currencyInput, { target: { value: 40} })
    expect(buttonCheckElement).toBeEnabled();

  })
});
