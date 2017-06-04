import React, { PureComponent } from 'react';
import { Grid } from 'semantic-ui-react';

import UserHeader from '../../containers/UserHeader';

import BackgroundCover from '../../components/BackgroundCover';

const example = {
    user: {
        username: 'yukioru',
        displayName: 'Yukioru',
        status: 'Какие-то мемы',
        avatar: 'https://pp.userapi.com/c638020/v638020296/38174/B5tk5K4xzaM.jpg',
        cover: 'https://pp.userapi.com/c836428/v836428041/3cef5/p5OdX4hpSTA.jpg',
        online: true,
    },
};

class User extends PureComponent {
    render() {
        return (
            <section>
                <BackgroundCover src={example.user.cover} />
                <UserHeader user={example.user} />
                <Grid container stackable columns={3}>
                    <Grid.Column>
                        123
                    </Grid.Column>
                    <Grid.Column>
                        456
                    </Grid.Column>
                    <Grid.Column>
                        789
                    </Grid.Column>
                </Grid>
            </section>
        );
    }
}

export default User;
