import React, { PureComponent } from 'react';

import Cube from './Cube';

class Loading extends PureComponent {
    render() {
        return (
            <section className="loading">
                <Cube />
            </section>
        );
    }
}

export default Loading;
