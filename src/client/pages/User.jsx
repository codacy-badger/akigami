import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Threed from '../containers/Threed';

const { Left, Right, Center } = Threed;

const demo = {
    cover: 'http://i.imgur.com/ycHP6KX.jpg',
    avatar: 'https://pp.userapi.com/c639416/v639416296/2bfdb/XE8roc1owEs.jpg',
    displayName: 'Yukioru',
    status: 'Какие-то мемы',
};

@inject(s => ({
    ui: s.app.ui,
}))
@observer
class User extends PureComponent {
    static propTypes = {
        ui: PropTypes.object.isRequired,
    }
    componentDidMount() {
        this.props.ui.changeTransparented(true);
    }
    componentWillUnmount() {
        this.props.ui.changeTransparented(false);
    }
    render() {
        return (
            <div className="transparented">
                <div
                    className="user-header"
                    style={{
                        backgroundImage: `url(${demo.cover})`,
                    }}
                >
                    <Grid className="user-header-inner">
                        <Row>
                            <Col xs={12}>
                                <div className="user-header-bottom">
                                    <img
                                        className="user-avatar"
                                        src={demo.avatar}
                                        alt={demo.displayName}
                                    />
                                    <div className="user-header-info">
                                        <h2>{demo.displayName}</h2>
                                        {demo.status && <p>{demo.status}</p>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <Threed>
                    <Left>
                        Статистика, музыка ещё что-то
                    </Left>
                    <Center>
                        О себе, что-то в центре, наверное фид
                    </Center>
                    <Right>
                        Избранное, друзья ещё что-то
                    </Right>
                </Threed>
            </div>
        );
    }
}

export default User;
