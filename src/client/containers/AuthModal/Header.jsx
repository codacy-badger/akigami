import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Step } from 'semantic-ui-react';

import { observer } from 'mobx-react';

@observer
export default class Header extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }
    render() {
        const { step } = this.props.store;
        return (
            <h4 style={{ margin: 0 }}>
                {step === 'notLogged' && 'Вход / Регистрация'}
                {step === 'confirm' && 'Подтверждение входа'}
                {step === 'register' && 'Регистрация'}
            </h4>
        );
    }
}
