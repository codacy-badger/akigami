import React, { PureComponent } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { Block, Code, Help } from './Error.styled';

class Error extends PureComponent {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Block>
            <Code>404</Code>
            <Help>Такой страницы не существует!</Help>
          </Block>
        </Col>
      </Row>
    );
  }
}

export default Error;
