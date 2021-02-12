import * as ActionTypes from "./actionTypes";
import axios from "axios";
import { AVAILABLE_CURRENCY_LIST, BASE_URL, APP_ID } from "../constant";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 100000;
const base = "USD";

export const fetchRatesFromApi = (currencies) =>
  axios
    .get(`${BASE_URL}${APP_ID}&base=${base}&symbols=${currencies}`)
    .then((res) => res.data);

export const setFetchedRates = (rates) => ({
  type: ActionTypes.FETCH_CURRENCY_RATES_SUCCESS,
  rates,
});

export const setFetchRatesLoading = (isLoading) => ({
  type: ActionTypes.FETCH_CURRENCY_RATES_LOADING,
  isLoading,
});

export const setFetchRatesError = (error) => ({
  type: ActionTypes.FETCH_CURRENCY_RATES_FAILED,
  error,
});

export const fetchRates = (currencyFrom) => (dispatch) => {
  const currencies = AVAILABLE_CURRENCY_LIST.join();
  dispatch(setFetchRatesLoading(true));
  dispatch(setFetchRatesError(null));

  return fetchRatesFromApi(currencies)
    .then((rates) => {
      dispatch(setFetchRatesLoading(false));
      let formattedRates = { ...rates.rates };
      if (currencyFrom !== base) {
        const currencies = AVAILABLE_CURRENCY_LIST.filter(
          (currency) => currency !== currencyFrom
        );

        currencies.forEach((item) => {
          if (item === base) {
            formattedRates[item] = +(1 / formattedRates[currencyFrom]).toFixed(
              2
            );
          } else {
            formattedRates[item] = +(
              formattedRates[item] / formattedRates[currencyFrom]
            ).toFixed(2);
          }
        });
        formattedRates[currencyFrom] = 1.0;
      }
      dispatch(setFetchedRates(formattedRates));
    })
    .catch((error) => {
      dispatch(setFetchRatesLoading(false));
      dispatch(setFetchRatesError(error.message));
    });
};
