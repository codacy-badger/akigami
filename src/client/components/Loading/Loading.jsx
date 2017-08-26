import React, { PureComponent } from 'react';

import Cube from './Cube';

class Loading extends PureComponent {
    render() {
        return (
            <section className="loading">
                <div className="lds-css ng-scope">
                    <div className="lds-spinner">
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            </section>
        );
    }
}

export default Loading;
