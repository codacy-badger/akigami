import React, { PureComponent } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Grid as BsGrid, Row, Col } from 'react-bootstrap';

import Wrapper from '../../components/Wrapper';
import Entity from '../../components/Entity';
import Switcher from '../../components/Switcher';
import Filter from '../../containers/Filter';
import {
  Content,
  Header,
  Title,
  Grid,
  Fixer,
  Settings,
} from './Explore.styled';
import data from './Explore.mock';

@inject('app')
class Explore extends PureComponent {
  static convertToSearchType(type) {
    switch (type) {
    case 'manga':
      return 'манге';
    case 'novel':
      return 'новеллам';
    default:
      return 'аниме';
    }
  }
  static propTypes = {
    type: PropTypes.string,
    app: PropTypes.object.isRequired,
  };
  static defaultProps = {
    type: null,
  };
  render() {
    const { type, app } = this.props;
    return (
      <Wrapper opaque>
        <BsGrid>
          <Row>
            <Col xs={12}>
              <Header>
                <Title>
                  Обзор
                  <Switcher
                    inline
                    options={[
                      {
                        value: 'anime',
                        title: 'аниме',
                      },
                      {
                        value: 'manga',
                        title: 'манги',
                      },
                      {
                        value: 'novel',
                        title: 'новелл',
                      },
                    ]}
                    value={type}
                    onChange={async newType => {
                      await app.router.go(`/explore/${newType}`);
                    }}
                  />
                </Title>
              </Header>
              <Settings>
                <Filter type={this.constructor.convertToSearchType(type)} />
              </Settings>
              <Content>
                <Grid>
                  {data.map((item, index) => (
                    <Fixer key={index}>
                      <Entity
                        type={item.type}
                        status={item.status}
                        entity={item.entity}
                      />
                    </Fixer>
                  ))}
                </Grid>
              </Content>
            </Col>
          </Row>
        </BsGrid>
      </Wrapper>
    );
  }
}

export default Explore;
