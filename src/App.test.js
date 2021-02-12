import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "../src/store/config";

const store = configureStore();

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Your wallet/i);
  expect(linkElement).toBeInTheDocument();
});
