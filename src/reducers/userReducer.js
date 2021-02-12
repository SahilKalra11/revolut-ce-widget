import initialState from './initial.state';
import * as ActionTypes from '../actions/actionTypes';
import {formatToTwoDigitsNumber} from "../helpers";

const setValueFrom = (state, action) => {
    const {currencyTo, rates, wallet, currencyFrom} = state;
    let valueFrom = +action.valueFrom > +wallet[currencyFrom] ? wallet[currencyFrom] : action.valueFrom;
    return Object.assign({}, state, {
        valueFrom: valueFrom,
        valueTo: valueFrom * rates[currencyTo]
    });
};

const setValueTo = (state, action) => {
    const {currencyTo, rates, wallet, currencyFrom} = state;
    let valueFrom = action.valueTo / rates[currencyTo];
    valueFrom = +valueFrom > +wallet[currencyFrom] ? wallet[currencyFrom] : valueFrom;

    return Object.assign({}, state, {
        valueTo: valueFrom * rates[currencyTo],
        valueFrom: valueFrom
    });
};

const setCurrencyFrom = (state, action) => {
    const {valueFrom, currencyFrom, rates} = state;

    const currencyTo = state.currencyTo === currencyFrom ?
        state.currencyFrom :
        state.currencyTo;
    const valueTo = valueFrom * rates[currencyTo];

    return Object.assign({}, state, {
        currencyFrom: action.currencyFrom,
        valueTo,
        currencyTo
    });
};

const setCurrencyTo = (state, action) => {
    const {valueFrom, currencyFrom, rates} = state;

    const valueTo = valueFrom * rates[action.currencyTo];

    return Object.assign({}, state, {
        currencyTo: action.currencyTo,
        valueTo,
        currencyFrom
    });
};

const exchange = (state, action) => {
    const {valueFrom, valueTo, currencyFrom, currencyTo} = action;
    const wallet = {...state.wallet};
    wallet[currencyFrom] = formatToTwoDigitsNumber(wallet[currencyFrom] - valueFrom);
    wallet[currencyTo] = formatToTwoDigitsNumber(wallet[currencyTo] + valueTo);
    return Object.assign({}, state, {
        wallet,
    });
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_VALUE_TO:
            return setValueTo(state, action);
        case ActionTypes.SET_VALUE_FROM:
            return setValueFrom(state, action);
        case ActionTypes.SET_CURRENCY_FROM:
            return setCurrencyFrom(state, action);
        case ActionTypes.SET_CURRENCY_TO:
            return setCurrencyTo(state, action);
        case ActionTypes.EXCHANGE_CURRENCY:
            return exchange(state, action);
        case ActionTypes.FETCH_CURRENCY_RATES_FAILED:
            return Object.assign({}, state, {errors: action.error});
        case ActionTypes.FETCH_CURRENCY_RATES_LOADING:
            return Object.assign({}, state, {loading: action.loading});
        case ActionTypes.FETCH_CURRENCY_RATES_SUCCESS:
            return Object.assign({}, state, {rates: action.rates});
        default:
            return state;
    }
}
