import { ReactNode } from "react";
import { StringComponent, TArray } from "./string";
import { render, fireEvent, RenderResult, waitFor, getByTestId, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { TIMEOUT } from "dns";

describe("StringComponent", () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(<BrowserRouter><StringComponent /></BrowserRouter>);
  });
  it("correctly reverses a string with even number of characters", async () => {
    const onClickMock = jest.fn();
    const input = screen.getByTestId('inputString');
    const button = screen.getByTestId('button');
    const result = screen.getByTestId('result')
    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByTestId('inputString')).not.toBeDisabled()
      const resultString = Array.from(result.childNodes).map((item) => item.textContent);
    expect(resultString).toBe('dcba');
    }, {timeout: 1000});
    // const resultString = Array.from(result.childNodes).map((item) => item.textContent).join('');
  
    // expect(resultString).toBe('dcba');
  }, 10000);
  it('с НЕчётным количеством символов', async () => {
    const input = screen.getByTestId('inputString');
    const button = screen.getByTestId('button');
    const result = screen.getByTestId('result');

    // 1. Insert input value
    fireEvent.change(input, { target: { value: "123" } });
    // 2. Click on submit button
    fireEvent.click(button);
    // 3. Wait for an animation to finish
    await waitFor(() => expect(screen.getByTestId('inputString')).not.toBeDisabled(), {
        timeout: 1000
    });
    // 3. Get DOM elements of circles
    const resultString = Array.from(result.childNodes).map((item) => item.textContent).join('');
    // 4. Compare input and output
    expect(resultString).toBe('321');
  }, 10000);

});