import React from 'react';
import PropTypes from 'prop-types';
import UserStore from '../../stores/UserStore';
import Grid, { Row, Col } from '../Grid';
import Image from '../Image';

import { Wrapper, Background, Foreground } from './UserHeader.styles';

const UserHeader = ({ user }) => (
  <Wrapper>
    <Background src={'https://s4.anilist.co/file/anilistcdn/user/banner/b214278-mVganCxB6QHz.jpg' || user.getCover} />
    <Foreground>
      <Grid>
        <Row>
          <Col>
            <Image shape="circle" size={140} src={user.getAvatar} />
            {user.displayName}
          </Col>
        </Row>
      </Grid>
    </Foreground>
  </Wrapper>
);

UserHeader.propTypes = {
  user: PropTypes.instanceOf(UserStore).isRequired,
};

export default UserHeader;
