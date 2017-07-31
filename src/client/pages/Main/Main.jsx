import React, { PureComponent } from 'react';

import Timeline from '../../containers/Timeline';
import Threed from '../../containers/Threed';
import Hello from '../../components/Hello';
import Categories from '../../components/Categories';

const { Left, Right, Center } = Threed;

const demo = {
    displayName: 'Yukioru',
    link: '/@yukioru',
};

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

class Main extends PureComponent {
    render() {
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
                        <Hello user={demo} />
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
