import React from 'react';
import ReactDOM from 'react-dom';
import render from 'react-test-renderer';
import CardHeader from './CardHeader';
import {unmountComponentAtNode} from "react-dom";

describe('CardHeader', () => {
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
        currencyFrom: 'USD',
        currencyTo: 'EUR',
        valueTo: 10,
        rates: {
            USD: 1,
            EUR: 1.20,
            GBP: 1.3
        },
        onExchange: jest.fn(),
        onCancel: jest.fn()
    };

    it('renders component without crashing', () => {
        ReactDOM.render(
            <CardHeader {...props} />,
            container
        );
    });

    test('matches to snapshot', () => {
        const component = render.create(
            <CardHeader {...props} />
        );
        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });
});
