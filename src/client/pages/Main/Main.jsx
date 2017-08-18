import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Feed from '../../containers/Feed';
import Timeline from '../../containers/Timeline';
import Threed from '../../containers/Threed';
import Hello from '../../components/Hello';
import Categories from '../../components/Categories';
import Block from '../../components/Block';

const { Left, Right, Center } = Threed;

const categories = [{
    id: 'followers',
    title: 'Подписки',
    icon: 'account-star',
    active: false,
}, {
    id: 'clubs',
    title: 'Клубы',
    icon: 'hexagon-multiple',
    active: false,
}, {
    id: 'global',
    title: 'Общее',
    icon: 'earth',
    active: true,
}];

@inject(({ app }) => ({ user: app.user }))
@observer
class Main extends PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }
    render() {
        const { user } = this.props;
        return (
            <div className="opaque">
                <Timeline />
                <Threed inverse>
                    <Left>
                        <Categories
                            items={categories}
                            onSelect={e => console.log(e)}
                        />
                    </Left>
                    <Center>
                        {user.isAuth && <Hello user={user} />}
                        <Block title="Лента">
                            <Feed />
                        </Block>
                    </Center>
                    <Right>
                        123
                    </Right>
                </Threed>
            </div>
        );
    }
}

export default Main;
