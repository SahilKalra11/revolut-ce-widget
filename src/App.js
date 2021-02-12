import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Card from "./components/Card";
import CardHeader from "./components/CardHeader";
import { AVAILABLE_CURRENCY_LIST } from "./constant";
import {
  exchange,
  fetchRates,
  setCurrencyFrom,
  setCurrencyTo,
  setValueFrom,
  setValueTo,
  cancelExchange,
} from "./actions";
import { bindActionCreators } from "redux";
import { formatInputValueToTwoDigitsNumber } from "./helpers";
import Wallet from "./components/Wallet";

export class App extends Component {
  componentDidMount() {
    setInterval(this.getRates(), 10 * 1000);
  }

  getRates = () => {
    const { getRatesFunc, currencyFrom } = this.props;
    getRatesFunc(currencyFrom);
    return this.getRates;
  };

  handleFromValueChange = (event) =>
    this.props.setValueFromFunc(
      formatInputValueToTwoDigitsNumber(event.target.value)
    );

  handleToValueChange = (event) =>
    this.props.setValueToFunc(
      formatInputValueToTwoDigitsNumber(event.target.value)
    );

  handleFromCurrencyChange = (event, value) =>
    this.props.setCurrencyFromFunc(value.props.value);

  handleToCurrencyChange = (event, value) =>
    this.props.setCurrencyToFunc(value.props.value);

  handleExChange = () => this.props.exchangeFunc();

  handelCancel = () => this.props.cancelFunc();

  render() {
    const {
      currencyFrom,
      valueFrom,
      currencyTo,
      valueTo,
      wallet,
      rates,
    } = this.props;
    return (
      <div className="App">
        <div className="container">
          <CardHeader
            currencyTo={currencyTo}
            currencyFrom={currencyFrom}
            rates={rates}
            valueFrom={valueFrom}
            onExchange={this.handleExChange}
            onCancel={this.handelCancel}
          />
          <Wallet wallet={wallet} currencyList={AVAILABLE_CURRENCY_LIST} />

          <main className="currencyExchanger">
            <Card
              autoFocus={true}
              currencyList={AVAILABLE_CURRENCY_LIST}
              cardId="top-card"
              balance={wallet}
              currency={currencyFrom}
              currencyFrom={currencyFrom}
              value={valueFrom}
              rates={rates}
              handleCurrencyChange={this.handleFromCurrencyChange}
              handleValueChange={this.handleFromValueChange}
            />
            <Card
              autoFocus={false}
              currencyList={AVAILABLE_CURRENCY_LIST}
              cardId="bottom-card"
              balance={wallet}
              currency={currencyTo}
              currencyFrom={currencyFrom}
              value={valueTo}
              rates={rates}
              handleCurrencyChange={this.handleToCurrencyChange}
              handleValueChange={this.handleToValueChange}
            />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyFrom: state.user.currencyFrom,
  currencyTo: state.user.currencyTo,
  valueFrom: state.user.valueFrom,
  valueTo: state.user.valueTo,
  wallet: state.user.wallet,
  rates: state.user.rates,
});

const mapDispatchToProps = (dispatch) => ({
  getRatesFunc: bindActionCreators(fetchRates, dispatch),
  exchangeFunc: bindActionCreators(exchange, dispatch),
  setCurrencyFromFunc: bindActionCreators(setCurrencyFrom, dispatch),
  setValueFromFunc: bindActionCreators(setValueFrom, dispatch),
  setCurrencyToFunc: bindActionCreators(setCurrencyTo, dispatch),
  setValueToFunc: bindActionCreators(setValueTo, dispatch),
  cancelFunc: bindActionCreators(cancelExchange, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
