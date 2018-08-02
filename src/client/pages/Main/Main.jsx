import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import ConfirmModal from '../../components/ConfirmModal';

import Feed from '../../containers/Feed';
import Timeline from '../../containers/Timeline';
import Threed from '../../containers/Threed';
import Hello from '../../components/Hello';
import Categories from '../../components/Categories';
import Block from '../../components/Block';
import Wrapper from '../../components/Wrapper';

const { Left, Right, Center } = Threed;

const categories = [
  {
    id: 'followers',
    title: 'Подписки',
    icon: 'account-star',
    active: false,
  },
  {
    id: 'clubs',
    title: 'Клубы',
    icon: 'hexagon-multiple',
    active: false,
  },
  {
    id: 'global',
    title: 'Общее',
    icon: 'earth',
    active: true,
  },
];

@inject(({ app }) => ({ user: app.user, modal: app.modal }))
@observer
class Main extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
  };
  render() {
    const { user, modal } = this.props;
    return (
      <Wrapper opaque>
        <Timeline />
        <Threed inverse>
          <Left>
            <Categories items={categories} onSelect={e => console.log(e)} />
          </Left>
          <Center>
            {user.isAuth && <Hello user={user} />}
            <button
              onClick={() => {
                modal.show({
                  content: {
                    component: ConfirmModal,
                  },
                  isOverlay: true,
                });
              }}
            >
              Test
            </button>
            <Block title="Лента">
              <Feed />
            </Block>
          </Center>
          <Right>123</Right>
        </Threed>
      </Wrapper>
    );
  }
}

export default Main;
