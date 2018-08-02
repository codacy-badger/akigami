import React, { PureComponent } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Content from '../../components/Content';
import Wrapper from '../../components/Wrapper';

import { Block, Code, Help } from './Error.styled';

class Error extends PureComponent {
  render() {
    return (
      <Wrapper opaque>
        <Content>
          <Row>
            <Col xs={12}>
              <Block>
                <Code>404</Code>
                <Help>Такой страницы не существует!</Help>
              </Block>
            </Col>
          </Row>
        </Content>
      </Wrapper>
    );
  }
}

export default Error;
