import React, { PureComponent } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('app')
@observer
export default class Counter extends PureComponent {
    static propTypes = {
        app: PropTypes.object.isRequired,
    }
    render() {
        return (
            <h3>{this.props.app.counter}</h3>
        );
    }
}
