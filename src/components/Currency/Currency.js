import React, {Component} from 'react';
import './Currency.scss';

class Currency extends Component {
    render() {
        return (
            <section className="exchange__currency">
                <div className="exchange__currency-name">
                    {this.props.currency}
                </div>
            </section>
        );
    }
}

export default Currency;
