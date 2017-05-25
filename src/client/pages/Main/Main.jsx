import React, { PureComponent } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import truncate from 'lodash/truncate';

import Carousel from '../../components/Carousel';
import FeatureSlide from '../../components/FeatureSlide';
import Arrow from '../../components/Arrow';

const opts = {
    length: 32,
    separator: /,? +/,
};

const slides = [
    {
        id: 1,
        image: 'http://i.imgur.com/SIlmR6k.jpg',
        title: truncate('Shingeki no Kyojin Season 2', opts),
    },
    {
        id: 2,
        image: 'http://i.imgur.com/hwXD4G5.jpg',
        title: truncate('Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?', opts),
    },
    {
        id: 3,
        image: 'http://i.imgur.com/IHAffhR.jpg',
        title: truncate('Little Witch Academia (TV)', opts),
    },
];

class Main extends PureComponent {
    render() {
        return (
            <section>
                <Carousel
                    nextArrow={<Arrow type="feature" direction="right" />}
                    prevArrow={<Arrow type="feature" direction="left" />}
                >
                    {slides.map(slide => (
                        <div key={slide.id}>
                            <FeatureSlide {...slide} />
                        </div>
                    ))}
                </Carousel>
                <Container>
                    <Row>
                        <Col xs="12">
                            123
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default Main;
