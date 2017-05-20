
import React, { PureComponent } from 'react';
import Counter from '../../components/Counter';

export default class Group extends PureComponent {
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <h2>This is counter</h2>
                <Counter />
            </div>
        );
    }
}
