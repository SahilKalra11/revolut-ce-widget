import React from 'react';
import ReactDOM from 'react-dom';
import render from 'react-test-renderer';
import Currency from './Currency';
import {unmountComponentAtNode} from "react-dom";


describe('Currency', () => {
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
        currency: 'USD',
    };

    it('renders component without crashing', () => {
        ReactDOM.render(
            <Currency {...props} />,
            container
        );
    });

    test('matches to snapshot', () => {
        const component = render.create(
            <Currency {...props} />
        );
        let componentTree = component.toJSON();
        expect(componentTree).toMatchSnapshot();
    });
});
