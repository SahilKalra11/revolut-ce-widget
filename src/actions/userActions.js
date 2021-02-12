import * as ActionTypes from './actionTypes';
import {fetchRates} from "../actions";

export const setValueFrom = valueFrom => (dispatch, getState) => {
    return dispatch({
        type: ActionTypes.SET_VALUE_FROM,
        valueFrom,
        rates: getState().user.rates,
    });
};

export const setValueTo = valueTo => (dispatch, getState) => {
    return dispatch({
        type: ActionTypes.SET_VALUE_TO,
        valueTo,
        rates: getState().user.rates,
    });
};

export const setCurrencyFrom = currencyFrom => (dispatch) => {
    return dispatch(fetchRates(currencyFrom))
        .then(() => {
            return dispatch({
                type: ActionTypes.SET_CURRENCY_FROM,
                currencyFrom,
            });
        });
};

export const setCurrencyTo = currencyTo => (dispatch, getState) => {
    const currencyFrom = getState().user.currencyFrom;
    return dispatch(fetchRates(currencyFrom))
        .then(() => {
            return dispatch({
                type: ActionTypes.SET_CURRENCY_TO,
                currencyFrom,
                currencyTo,
            });
        });
};

export const exchange = () => (dispatch, getState) => {
    const state = getState().user;
    dispatch({
        type: ActionTypes.EXCHANGE_CURRENCY,
        currencyFrom: state.currencyFrom,
        currencyTo: state.currencyTo,
        valueTo: state.valueTo,
        valueFrom: state.valueFrom,
    });
    dispatch(setValueFrom(''));
};


export const cancelExchange = () => (dispatch) => {
    dispatch(setValueFrom(''));
    dispatch(setValueTo(''));
};
