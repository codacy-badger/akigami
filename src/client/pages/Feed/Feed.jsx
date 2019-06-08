import React, { Component } from 'react';
import range from 'lodash/range';
import sample from 'lodash/sample';
import { Container, Row, Col } from '../../components/Grid';
// import Hero from '../../components/Hero';
import AnimeCard from '../../components/AnimeCard';
import { animes } from '../mock';
import Glide from '../../components/Glide/Glide';

const demoData = range(10).map(e => ({ id: e, children: `Элементъ №${e}` }));


class Feed extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Hero
          items={animes}
          // items={range(40).map(e => ({ id: e, ...animes[0] })).slice(0, 20)}
        /> */}
        <Container>
          <Row>
            <Col>
              <Glide
                effect
                horizontalScroll
                ItemComponent={AnimeCard}
                items={range(20).map(e => ({ id: e, ...animes[sample(range(5))] }))}
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col width={[1 / 2]}>
              Half width
            </Col>
            <Col width={[1 / 2]}>
              <div style={{ fontSize: 24, lineHeight: 4 }}>
                <div style={{ fontWeight: 300 }}>Проверка шрифта 300 / Test font 300 Light</div>
                <div style={{ fontWeight: 400 }}>Проверка шрифта 400 / Test font 400 Book</div>
                <div style={{ fontWeight: 500 }}>Проверка шрифта 500 / Test font 500 Medium</div>
                <div style={{ fontWeight: 600 }}>Проверка шрифта 600 / Test font 600 Demi</div>
                <div style={{ fontWeight: 700 }}>Проверка шрифта 700 / Test font 700 Heavy</div>
                <div style={{ fontWeight: 800 }}>Проверка шрифта 800 / Test font 800 Bold</div>
                <div style={{ fontWeight: 900 }}>Проверка шрифта 900 / Test font 900 Extra Bold</div>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Feed;
