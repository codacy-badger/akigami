import React, { Component } from 'react';
import { Flex, Box } from '@rebass/grid/emotion';
import ContentWrapper from '../../components/ContentWrapper';

class Auth extends Component {
  render() {
    return (
      <Flex flex="1">
        <ContentWrapper>
          <Box
            css={{
              margin: 'auto',
            }}
          >
            Авторизация
          </Box>
        </ContentWrapper>
      </Flex>
    );
  }
}

export default Auth;
