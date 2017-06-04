import React, { PureComponent } from 'react';

import UserHeader from '../../containers/UserHeader';
import ThreeGrid from '../../containers/ThreeGrid';

import Icon from '../../components/Icon';
import Block from '../../components/Block';
import BackgroundCover from '../../components/BackgroundCover';

const example = {
    user: {
        username: 'yukioru',
        displayName: 'Yukioru',
        name: 'Андрей',
        gender: 'male',
        birthday: 807840000000,
        createdAt: 1382486400000,
        city: 'Тольятти',
        country: 'Россия',
        status: 'Какие-то мемы',
        about: 'Знаю NodeJS, React, ECMAScript 6. Программирую на JavaScript.\n\nУвлекаюсь музыкой и японской мультипликацией.',
        avatar: 'https://pp.userapi.com/c638020/v638020296/38174/B5tk5K4xzaM.jpg',
        cover: 'https://pp.userapi.com/c836428/v836428041/3cef5/p5OdX4hpSTA.jpg',
        online: true,
    },
};

class User extends PureComponent {
    renderDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    }
    render() {
        return (
            <section>
                <BackgroundCover src={example.user.cover} />
                <UserHeader user={example.user} />
                <ThreeGrid>
                    <ThreeGrid.Left>
                        <Block title="О себе">
                            <div className="profile-about">
                                {example.user.about}
                            </div>
                        </Block>
                        <Block title="Информация">
                            <div className="profile-meta-line">
                                <strong>Имя: </strong>
                                <span>{example.user.name}</span>
                            </div>
                            {example.user.gender !== 'none' && (
                                <div className="profile-meta-line">
                                    <strong>Пол: </strong>
                                    <span><Icon type={`gender-${example.user.gender}`} /> {example.user.gender}</span>
                                </div>
                            )}
                            <div className="profile-meta-line">
                                <strong>Откуда: </strong>
                                <span>{`${example.user.country}, ${example.user.city}`}</span>
                            </div>
                            <div className="profile-meta-line">
                                <strong>День рождения: </strong>
                                <span>{this.renderDate(example.user.birthday)}</span>
                            </div>
                            <div className="profile-meta-line">
                                <strong>Зарегистрирован: </strong>
                                <span>{this.renderDate(example.user.createdAt)}</span>
                            </div>
                        </Block>
                    </ThreeGrid.Left>
                    <ThreeGrid.Center>
                        <Block title="Лента">
                            Лента пока не готова
                        </Block>
                    </ThreeGrid.Center>
                    <ThreeGrid.Right>
                        <Block title="История">
                            Контент
                        </Block>
                    </ThreeGrid.Right>
                </ThreeGrid>
            </section>
        );
    }
}

export default User;
