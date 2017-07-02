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
        const steps = [
            { active: step === 'notLogged', title: 'Вход / Регистрация' },
            { active: step === 'confirm', title: 'Подтверждение входа' },
        ];
        if (step === 'register') steps.push({ active: step === 'register', title: 'Регистрация' });
        return (
            <Step.Group fluid size="small" items={steps} />
        );
    }
}
