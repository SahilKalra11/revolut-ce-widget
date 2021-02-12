import reducer from './userReducer'
import * as types from '../actions/actionTypes'
import initialState from './initial.state'
import {TEST_RATES, TEST_WALLET} from "../constant";

describe('user reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle SET_VALUE_FROM action', () => {
        expect(
            reducer({currencyTo: 'USD', rates: TEST_RATES, wallet: TEST_WALLET, currencyFrom: 'EUR'},
                {
                    type: types.SET_VALUE_FROM,
                    valueFrom: 10,
                }
            )
        ).toEqual({
            currencyTo: 'USD',
            rates: TEST_RATES,
            valueTo: 10 * TEST_RATES.USD,
            valueFrom: 10,
            wallet: TEST_WALLET,
            currencyFrom: 'EUR',
        });
    });

    it('should handle SET_VALUE_TO action', () => {
        expect(
            reducer({currencyTo: 'USD', rates: TEST_RATES, wallet: TEST_WALLET, currencyFrom: 'EUR'},
                {
                    type: types.SET_VALUE_TO,
                    valueTo: 10,
                }
            )
        ).toEqual({
            currencyTo: 'USD',
            rates: TEST_RATES,
            valueTo: 10,
            valueFrom: 10 / TEST_RATES.USD,
            wallet: TEST_WALLET,
            currencyFrom: 'EUR',
        });
    });

    it('should handle SET_CURRENCY_FROM action', () => {
        expect(
            reducer({valueFrom: 10, currencyFrom: 'USD', rates: TEST_RATES, currencyTo: 'GBP'},
                {
                    type: types.SET_CURRENCY_FROM,
                    currencyFrom: 'EUR',
                }
            )
        ).toEqual({
            currencyFrom: 'EUR',
            rates: TEST_RATES,
            valueFrom: 10,
            valueTo: 10 * TEST_RATES.GBP,
            currencyTo: 'GBP',
        });
    });

    it('should handle SET_CURRENCY_TO action', () => {
        expect(
            reducer({valueFrom: 10, currencyFrom: 'USD', rates: TEST_RATES, currencyTo: 'GBP'},
                {
                    type: types.SET_CURRENCY_TO,
                    currencyTo: 'EUR',
                }
            )
        ).toEqual({
            currencyFrom: 'USD',
            rates: TEST_RATES,
            valueFrom: 10,
            valueTo: 10 * TEST_RATES.EUR,
            currencyTo: 'EUR',
        });
    });

    it('should handle EXCHANGE_CURRENCY action', () => {
        const wallet = {
            USD: 100,
            EUR: 100,
            GBP: 100,
        };
        const action = {
            type: types.EXCHANGE_CURRENCY,
            valueFrom: 10,
            valueTo: 13,
            currencyFrom: 'GBP',
            currencyTo: 'USD'
        };

        expect(
            reducer({
                    wallet
                }, action
            )
        ).toEqual({
            wallet: {
                USD: 113,
                EUR: 100,
                GBP: 90,
            }
        });
    });

    it('should handle FETCH_CURRENCY_RATES_FAILED action', () => {
        expect(
            reducer({}, {type: 'FETCH_CURRENCY_RATES_FAILED', error: 'Error'},
            )
        ).toEqual({
            errors: 'Error'
        });
    });

    it('should handle FETCH_CURRENCY_RATES_LOADING action', () => {
        expect(
            reducer({}, {type: 'FETCH_CURRENCY_RATES_LOADING', loading: true},
            )
        ).toEqual({
            loading: true,
        });
    });

    it('should handle FETCH_CURRENCY_RATES_SUCCESS action', () => {
        expect(
            reducer({}, {type: 'FETCH_CURRENCY_RATES_SUCCESS', rates: TEST_RATES},
            )
        ).toEqual({
            rates: TEST_RATES,
        });
    });

});
