import React, { PureComponent } from 'react';

import Block from '../Block';
import {
    Cover,
    Title,
} from './Trailer.styled';

class Trailer extends PureComponent {
    render() {
        const { image, url } = this.props;
        return (
            <Block shadow>
                <Cover image={image} href={url} target="_blank">
                    <Title>Смотреть трейлер</Title>
                </Cover>
            </Block>
        );
    }
}

export default Trailer;
