import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import truncate from 'lodash/truncate';

import Icon from '../Icon';
import {
  Poster,
  ModalContent,
  Info,
  Head,
  Title,
  Meta,
  Genres,
  Genre,
  Tags,
  Studio,
  Content,
  Description,
  More,
  Footer,
  FooterLink,
  FooterButton,
} from './EntityModal.styled';

class EntityModal extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    style: PropTypes.object,
  };
  static defaultProps = {
    style: {},
  };
  render() {
    const { type, id, style, entity, status } = this.props;
    return (
      <ModalContent>
        <Poster src={entity.poster.medium} />
        <Info>
          <Head>
            <Title>{entity.title.romaji}</Title>
            <Meta>
              <Genres>
                {entity.genres.slice(0, 3).map(item => (
                  <Genre
                    key={item.id}
                    href={`/explore/${type}?genres=${item.id}`}
                  >
                    {item.title}
                  </Genre>
                ))}
              </Genres>
              <Tags>
                <Studio href={`/studio/${entity.studio.id}`}>
                  {entity.studio.title}
                </Studio>
              </Tags>
            </Meta>
          </Head>
          <Content>
            <Description>
              {truncate(
                get(entity, 'description.russian') ||
                  get(entity, 'description.english') ||
                  'Нет описания',
                {
                  length: 280,
                  separator: /,? +/,
                },
              )}
            </Description>
            <More href={`/${type}/${entity.id}`}>
              Больше информации <Icon type="arrow-right" />
            </More>
          </Content>
          <Footer>
            <FooterLink href={`/${type}/${entity.id}/watch`}>
              Смотреть <Icon type="play" />
            </FooterLink>
            <FooterButton onClick={e => console.log(e)}>
              В список <Icon type="playlist-plus" />
            </FooterButton>
          </Footer>
        </Info>
      </ModalContent>
    );
  }
}

export default EntityModal;
