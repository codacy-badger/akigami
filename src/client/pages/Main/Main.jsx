import React, { PureComponent } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import Responsive from 'react-responsive';

import Carousel from '../../components/Carousel';
import FeatureSlide from '../../components/FeatureSlide';
import Arrow from '../../components/Arrow';
import Block from '../../components/Block';

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
        description: 'Эта история о прошлом Земли, когда на ней существовала раса под названием человечество. Как и многие другие, она вела войны с другими расами, такими как орки или демоны. Помогали людям в этой борьбе магические клинки, владеть которыми могли лишь избранные. Однако сражения продолжались до тех пор, пока на Земле не объявились загадочные существа, которые быстро истребили человечество, а затем принялись и за другие расы. Из-за этого выжившим ничего не оставалось, кроме как перебраться на парящие в небе острова. Многие расы считали, что виноваты в этой катастрофе именно люди, хотя достоверных сведений не сохранилось. \n Человек по имени Уильям — единственный, кто пережил истребление человечества. Теперь он живет среди других рас, с которыми люди когда-то враждовали. Ему поручают присматривать за детьми лепреконов. Из всех рас только она способна использовать оставленные людьми магические клинки и с их помощью защищать парящие острова.',
    },
    {
        id: 3,
        image: 'http://i.imgur.com/IHAffhR.jpg',
        title: 'Little Witch Academia (TV)',
        description: 'Акко Кагари в детстве попала на магическое шоу ведьмы Шайни Чариот. Это представление так воодушевило маленькую Акко, что у нее появилась мечта — стать ведьмой, такой как Чариот. \n Спустя несколько лет Акко получает письмо о том, что она зачислена в одну из самых престижных школ магии — академию «Новая Луна». Однако, как только начинающая ведьма попадает в академию, новая жизнь сразу омрачается. Большинство студенток считает, что такая, как Кагари — в семье которой нет магов — не имеет права находиться в столь престижном месте. Кроме того, никто из ее однокурсниц не разделяет восхищения в адрес Шайни Чариот. Но Акко не падает духом, ведь она поставила себе цель — стать знаменитой волшебницей! \n И хоть Чариот не является примером для подражания в академии, Акко ни за что не предаст ее, так как на пути к своей мечте ей еще многому предстоит научиться.',
    },
];

class Main extends PureComponent {
    renderRightColumn() {
        return (
            <div>
                <Block title="Новости">
                    Контент
                </Block>
            </div>
        );
    }
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
                <Container className="with-top">
                    <Row>
                        <Col xs="12">
                            <Block title="Новинки">
                                Контент
                            </Block>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Responsive minWidth={768}>
                            <Col md="4" lg="3">
                                
                                <Block title="Аккаунт">
                                    Контент
                                </Block>

                                <Responsive maxWidth={991}>
                                    {this.renderRightColumn()}
                                </Responsive>
                            </Col>
                        </Responsive>
                        <Col sm="12" md="8" lg="6">
                            <Block title="Лента">
                                Контент
                            </Block>
                        </Col>
                        <Responsive minWidth={992}>
                            <Col xs="12" lg="3">
                                {this.renderRightColumn()}
                            </Col>
                        </Responsive>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default Main;
