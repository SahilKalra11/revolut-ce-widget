import React from "react";
import ReactDOM from "react-dom";
import render from "react-test-renderer";
import ExchangeInput from "./ExchangeInput";
import { unmountComponentAtNode } from "react-dom";

describe("ExchangeInput", () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  const props = {
    value: 10,
    cardId: "cardId",
    currency: "USD",
    currencyFrom: "USD",
    rates: {
      USD: 1,
      EUR: 1.2,
      GBP: 1.3,
    },
    onChange: jest.fn(),
  };

  it("renders component without crashing", () => {
    ReactDOM.render(<ExchangeInput {...props} />, container);
  });

  test("matches to snapshot", () => {
    const component = render.create(<ExchangeInput {...props} />);
    let componentTree = component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });
});
