import React, { PureComponent } from 'react';

import Timeline from '../containers/Timeline';
import Threed from '../containers/Threed';
import Hello from '../components/Hello';

const { Left, Right, Center } = Threed;

const demo = {
    displayName: 'Yukioru',
    link: '/@yukioru',
};

class Main extends PureComponent {
    render() {
        return (
            <div>
                <Timeline />
                <Threed>
                    <Left>
                        123
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
