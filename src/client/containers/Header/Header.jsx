import React, { PureComponent } from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';

import Logo from '../../components/Logo';
import Avatar from '../../components/Avatar';

const logged = true;

const user = {
    avatar: 'https://pp.userapi.com/c638421/v638421296/67c1/E_xVha7Gyz0.jpg',
    displayName: 'Yukioru',
    username: 'yukioru',
    id: 1,
};

class Header extends PureComponent {
    state = {
        auth: false,
    };
    onAuth = (action) => {
        this.setState({ auth: action });
    }
    render() {
        return (
            <section className="bg-black">
                <Grid container className="navbar">
                    <Grid.Column>
                        <a href="/">
                            <Logo width={36} height={36} />
                        </a>
                        <div className="navbar-menu">
                            <Dropdown text="Обзор" className="menu-item">
                                <Dropdown.Menu>
                                    <Dropdown.Item as="a" href="/overview/anime" text="Аниме" />
                                    <Dropdown.Item as="a" href="/overview/manga" text="Манга" />
                                    <Dropdown.Item as="a" href="/overview/ranobe" text="Ранобэ" />
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="a" href="/theater" text="Кинотеатр" />
                                    <Dropdown.Item as="a" href="/collection" text="Подборки" />
                                </Dropdown.Menu>
                            </Dropdown>
                            <a href="/news" className="menu-item">Новости</a>
                            <Dropdown text="Сообщество" className="menu-item">
                                <Dropdown.Menu>
                                    <Dropdown.Item as="a" href="/users" text="Пользователи" />
                                    <Dropdown.Item as="a" href="/clubs" text="Клубы" />
                                </Dropdown.Menu>
                            </Dropdown>
                            <a href="/radio" className="menu-item">Радио</a>
                        </div>
                        <div className="navbar-right">
                            {!logged ? (
                                <button
                                    className="btn-no-style"
                                    onClick={() => this.onAuth(true)}
                                >
                                    Вход / Регистрация
                                </button>
                            ) : (
                                <Dropdown
                                    icon={false}
                                    text={<Avatar src={user.avatar} />}
                                    className="menu-item"
                                >
                                    <Dropdown.Menu>
                                        <Dropdown.Item as="a" href={`/@${user.username}`} text={user.displayName} />
                                        <Dropdown.Divider />
                                        <Dropdown.Item as="a" href={`/@${user.username}/anime`} text="Аниме" />
                                        <Dropdown.Item as="a" href={`/@${user.username}/manga`} text="Манга" />
                                        <Dropdown.Item as="a" href={`/@${user.username}/ranobe`} text="Ранобэ" />
                                        <Dropdown.Divider />
                                        <Dropdown.Item as="a" href="/settings" text="Настройки" />
                                        <Dropdown.Item as="a" href="/logout" text="Выход" />

                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>
                    </Grid.Column>
                </Grid>
            </section>
        );
    }
}

export default Header;
