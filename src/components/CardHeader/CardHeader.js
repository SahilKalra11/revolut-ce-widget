import React from 'react';
import './CardHeader.scss';
import {getCurrencySymbol} from '../../helpers';

const CardHeader = ({rates, currencyTo, currencyFrom, onExchange, onCancel, valueFrom}) => {
    let course = `${getCurrencySymbol(currencyFrom)}1 = ${getCurrencySymbol(currencyTo)}${rates[currencyTo]}`;
    const isDisabled = (currencyTo === currencyFrom) || !valueFrom;
    return (
        <header className="card-header">
            <button
                disabled={isDisabled}
                type="button"
                className="btn"
                onClick={onCancel}>Cancel
            </button>
            <div className="card-header_rate">{course}</div>
            <button
                disabled={isDisabled}
                type="submit"
                className="btn"
                onClick={onExchange}>Exchange
            </button>
        </header>
    )
};
export default CardHeader;
