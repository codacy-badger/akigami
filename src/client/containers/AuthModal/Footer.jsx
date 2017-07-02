import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'semantic-ui-react';

@observer
export default class Footer extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }
    renderNotLogged = () => {
        const { handleSend, isValidEmail } = this.props.store;
        return (
            <div style={{ textAlign: 'center' }}>
                <Button
                    inverted
                    basic
                    color="grey"
                // onClick={onHide}
                >
                    Закрыть
                    </Button>
                <Button
                    inverted
                    color="red"
                    disabled={!isValidEmail}
                    onClick={handleSend}
                    style={{ width: '30%' }}
                >
                    Войти
                    </Button>
            </div>
        );
    }
    renderConfirm() {
        return (
                <div style={{ textAlign: 'center' }}>
                    <Button
                        inverted
                        basic
                        color="grey"
                    // onClick={this.reset}
                    >
                        Отменить авторизацию
                    </Button>
                </div>
            );
    }
    render() {
        const { step } = this.props.store;
        if (step === 'notLogged') {
            return this.renderNotLogged();
        } else if (step === 'confirm') {
            return this.renderConfirm();
        } else if (step === 'register') {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Button
                        inverted
                        basic
                        color="grey"
                    // onClick={this.reset}
                    >
                        Отменить
                    </Button>
                    <Button
                        inverted
                        color="red"
                    // onClick={this.handleRegister}
                    // disabled={!username && usernameError}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            );
        }
        return false;
    }
}
