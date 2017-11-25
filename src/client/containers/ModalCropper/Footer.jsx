import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Footer extends Component {
    render() {
        return (
            <div>
                <button>Отмена</button>
                <button onClick={this.props.store.ok}>{!this.props.store.loading ? 'Ок' : 'Загрузка' }</button>
            </div>
        );
    }
}