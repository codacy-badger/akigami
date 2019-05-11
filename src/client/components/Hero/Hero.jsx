import React, { Component } from 'react';
import truncate from 'lodash/truncate';
import Paper from '../Paper';
import Button from '../Button';
import { Row, Col } from '../Grid';
import { Wrapper, Title, Foreground, Item, Image } from './Hero.styles';

class Hero extends Component {
  render() {
    const { items } = this.props;
    return (
      <Paper>
        <Wrapper>
          {items.map((item, index) => {
            return (
              <Item key={index}> {/* eslint-disable-line */}
                <Foreground>
                  <Row>
                    <Col width={[1 / 1.5]}>
                      <Title mode="multi" throttle={300}>
                        {truncate(item.title, {
                          length: 165,
                          separator: /,? +/,
                        })}
                      </Title>
                      <Row>
                        <Col>
                          <Button as="a" href={item.href} view="danger">
                            Подробнее
                          </Button>
                          {' '}
                          <Button view="borderless">
                            Добавить в список
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Foreground>
                <Image alt={item.title} src={item.image} />
              </Item>
            );
          })}
        </Wrapper>
      </Paper>
    );
  }
}

export default Hero;
