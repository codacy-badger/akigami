import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
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
    Divider,
    Content,
    Description,
    More,
    Footer,
    FooterLink,
    FooterButton,
} from './EntityModal.styled';

class EntityModal extends PureComponent {
    constructor() {
        super();
        this.state = {
            showModal: false,
        };
    }
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }
    render() {
        const { showModal } = this.state;
        const { children, type, id, style = {}, entity, status } = this.props;
        return (
            <div>
                <button
                    type="button"
                    className="akg-modal-trigger"
                    onClick={this.handleOpenModal}
                    style={style}
                >
                    {children}
                </button>
                <ReactModal
                    isOpen={showModal}
                    contentLabel={`${type}-${id}`}
                    onRequestClose={this.handleCloseModal}
                    closeTimeoutMS={300}
                    className={{
                        base: 'akg-modal',
                        afterOpen: 'akg-modal-open',
                        beforeClose: 'akg-modal-close',
                    }}
                    overlayClassName={{
                        base: 'akg-overlay',
                        afterOpen: 'akg-overlay-open',
                        beforeClose: 'akg-overlay-close',
                    }}
                    bodyOpenClassName="akg-strict"
                >
                    <div className="akg-modal-inner">
                        <div className="akg-modal-bitmap-2" />
                        <div className="akg-modal-bitmap-1" />
                        <div className="akg-modal-content">
                            <button
                                type="button"
                                className="akg-modal-button"
                                onClick={this.handleCloseModal}
                            >
                                <Icon type="close" />
                            </button>
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
                                            {truncate(get(entity, 'description.russian') || get(entity, 'description.english') || 'Нет описания', {
                                                'length': 280,
                                                'separator': /,? +/
                                            })}
                                        </Description>
                                        <More href={`/${type}/${entity.id}`}>Больше информации <Icon type="arrow-right" /></More>
                                    </Content>
                                    <Footer>
                                        <FooterLink href={`/${type}/${entity.id}/watch`}>Смотреть <Icon type="play" /></FooterLink>
                                        <FooterButton onClick={e => console.log(e)}>В список <Icon type="playlist-plus" /></FooterButton>
                                    </Footer>
                                </Info>
                            </ModalContent>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default EntityModal;
