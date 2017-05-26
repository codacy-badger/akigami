import React, { PureComponent } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import Carousel from '../../components/Carousel';
import FeatureSlide from '../../components/FeatureSlide';
import Arrow from '../../components/Arrow';

const slides = [
    {
        id: 1,
        image: 'http://i.imgur.com/SIlmR6k.jpg',
        title: 'Shingeki no Kyojin Season 2',
        description: 'Люди и гиганты. Кто из них охотник, а кто жертва? Для того, чтобы понять это, был создан корпус разведки под командованием Эрвина Смита. Но последние загадочные события, во многих из которых были замешаны кадеты 104 корпуса, поставили командира разведки в трудное положение.',
    },
    {
        id: 2,
        image: 'http://i.imgur.com/hwXD4G5.jpg',
        title: 'Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?',
    },
    {
        id: 3,
        image: 'http://i.imgur.com/IHAffhR.jpg',
        title: 'Little Witch Academia (TV)',
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
