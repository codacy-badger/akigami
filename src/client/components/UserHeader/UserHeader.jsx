import React from 'react';
import PropTypes from 'prop-types';
import UserStore from '../../stores/UserStore';
import Grid, { Row, Col } from '../Grid';
import Image from '../Image';
import Button, { StatefulButton } from '../Button';

import { Wrapper, ImageWrapper, Background, Foreground, Content, Title, Info, FlexInfo } from './UserHeader.styles';

const UserHeader = ({ user, myUser, isOwner }) => (
  <Wrapper>
    <Background src={user.getCover} />
    <Foreground>
      <Grid>
        <Row>
          <Col>
            <Content>
              <ImageWrapper>
                <Image shape="circle" size={100} src={user.getAvatar} />
              </ImageWrapper>
              <Info>
                <Title>{user.displayName}</Title>
                <FlexInfo>
                  <div>
                    {isOwner() && (
                      <Button
                        as="a"
                        href={`/@${user.username}/settings`}
                        view="shadow"
                        size="small"
                      >
                        Изменить
                      </Button>
                    )}
                    {myUser.isAuth && !isOwner() && (
                      <React.Fragment>
                        <StatefulButton
                          onClick={async () => {
                            await new Promise(r => setTimeout(r, 600));
                          }}
                          type="button"
                          view="primary"
                          size="small"
                        >
                          Подписаться
                        </StatefulButton>
                        <StatefulButton
                          onClick={async () => {
                            await new Promise(r => setTimeout(r, 600));
                          }}
                          type="button"
                          view="danger"
                          size="small"
                        >
                          Отписаться
                        </StatefulButton>
                      </React.Fragment>
                    )}
                  </div>
                  <div>
                    socials
                  </div>
                </FlexInfo>
              </Info>
            </Content>
          </Col>
        </Row>
      </Grid>
    </Foreground>
  </Wrapper>
);

UserHeader.propTypes = {
  myUser: PropTypes.instanceOf(UserStore).isRequired,
  user: PropTypes.instanceOf(UserStore).isRequired,
  isOwner: PropTypes.func.isRequired,
};

export default UserHeader;
