import React from 'react';
import ReactDOM from 'react-dom';
import render from 'react-test-renderer';
import Wallet from './Wallet';
import {unmountComponentAtNode} from "react-dom";
import {AVAILABLE_CURRENCY_LIST} from "../../constant";

describe('ExchangeInput', () => {
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
        wallet: {
            USD: 100,
            EUR: 100,
            GBP: 100,
        },
        currencyList: AVAILABLE_CURRENCY_LIST,
    };

    it('renders component without crashing', () => {
        ReactDOM.render(
            <Wallet {...props} />,
            container
        );
    });

    test('matches to snapshot', () => {
        const component = render.create(
            <Wallet {...props} />
        );
        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });
});
