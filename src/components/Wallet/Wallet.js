import React, {Component} from 'react';
import './Wallet.scss';
import {getCurrencySymbol} from "../../helpers";

class Wallet extends Component {
    render() {
        const {wallet, currencyList} = this.props;
        return (
            <section className="wallet">
                <h3>Your wallet:</h3>
                <ul className="wallet__list">
                    {currencyList.map((currencyItem, index) => {
                        const key = `${currencyItem}${index}`;
                        const value = `${getCurrencySymbol(currencyItem)}${wallet[currencyItem]}`;
                        return (
                            <li className="wallet__item" key={key}><b>{currencyItem}</b>:{value}</li>
                        )
                    })
                    }
                </ul>
            </section>
        );
    }
}

export default Wallet;
