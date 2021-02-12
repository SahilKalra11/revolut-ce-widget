import {AVAILABLE_CURRENCY_LIST} from "../constant";

export default {
    rates: {},
    currencyFrom: AVAILABLE_CURRENCY_LIST[0],
    currencyTo: AVAILABLE_CURRENCY_LIST[1],
    valueFrom: "",
    valueTo: "",
    wallet: {
        USD: 100.00,
        GBP: 100.00,
        EUR: 100.00,
    },
    loading: false,
    errors: null,
};
