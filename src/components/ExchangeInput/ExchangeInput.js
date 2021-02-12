import React from "react";
import "./ExchangeInput.scss";
import { formatToTwoDigitsNumber, getCurrencySymbol } from "../../helpers";

const ExchangeInput = ({
  value,
  onChange,
  cardId,
  rates,
  currency,
  currencyFrom,
  focus,
}) => {
  const rate = (1 / rates[currency]).toFixed(2);
  let course =
    cardId === "bottom-card"
      ? `${getCurrencySymbol(currency)}1 = ${getCurrencySymbol(
          currencyFrom
        )}${rate}`
      : "";

  return (
    <section className="exchange__action">
      <input
        autoFocus={focus}
        className="exchange__input"
        type="text"
        value={value === "" ? "" : formatToTwoDigitsNumber(value)}
        onChange={onChange}
      />

      <div className="exchange__course">{course}</div>
    </section>
  );
};

export default ExchangeInput;
