import React from 'react';
import ReactDOM from 'react-dom';
import render from 'react-test-renderer';
import Card from './Card';
import {unmountComponentAtNode} from "react-dom";
import {AVAILABLE_CURRENCY_LIST} from "../../constant";

describe('Card', () => {
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
        currencyList: AVAILABLE_CURRENCY_LIST,
        cardId: "cardId",
        balance: {
            USD: 100,
            EUR: 100,
            GBP: 100,
        },
        currency: 'USD',
        currencyFrom: "USD",
        value: 10,
        rates: {
            USD: 1,
            EUR: 1.20,
            GBP: 1.3
        },
        handleCurrencyChange: jest.fn(),
        handleValueChange: jest.fn(),
    };

    it('renders component without crashing', () => {
        ReactDOM.render(
            <Card {...props} />,
            container
        );
    });

    test('matches to snapshot', () => {
        const component = render.create(
            <Card {...props} />
        );
        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });
});
