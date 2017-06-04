import React, { PureComponent } from 'react';
import { Button, Grid, Dropdown } from 'semantic-ui-react';
import Responsive from 'react-responsive';

import Logo from '../../components/Logo';
import Avatar from '../../components/Avatar';

import AuthModal from '../AuthModal';

const logged = true;

const user = {
    avatar: 'https://pp.userapi.com/c638020/v638020296/38174/B5tk5K4xzaM.jpg',
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
                            <Responsive maxWidth={767}>
                                <Button.Group size="tiny" basic inverted>
                                    <Dropdown text="Меню" button>
                                        <Dropdown.Menu>
                                            <Dropdown.Header content="Обзор" />
                                            <Dropdown.Item as="a" href="/overview/anime" text="Аниме" />
                                            <Dropdown.Item as="a" href="/overview/manga" text="Манга" />
                                            <Dropdown.Item as="a" href="/overview/ranobe" text="Ранобэ" />
                                            <Dropdown.Divider />
                                            <Dropdown.Item as="a" href="/theater" text="Кинотеатр" />
                                            <Dropdown.Item as="a" href="/collection" text="Подборки" />
                                            <Dropdown.Divider />
                                            <Dropdown.Item as="a" href="/news" text="Новости" />
                                            <Dropdown.Divider />
                                            <Dropdown.Header content="Сообщество" />
                                            <Dropdown.Item as="a" href="/users" text="Пользователи" />
                                            <Dropdown.Item as="a" href="/clubs" text="Клубы" />
                                            <Dropdown.Divider />
                                            <Dropdown.Item as="a" href="/radio" text="Радио" />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Button.Group>
                            </Responsive>
                            <Responsive minWidth={768}>
                                <Dropdown text="Обзор" className="menu-item">
                                    <Dropdown.Menu style={{ marginTop: 10 }}>
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
                                    <Dropdown.Menu style={{ marginTop: 10 }}>
                                        <Dropdown.Item as="a" href="/users" text="Пользователи" />
                                        <Dropdown.Item as="a" href="/clubs" text="Клубы" />
                                    </Dropdown.Menu>
                                </Dropdown>
                                <a href="/radio" className="menu-item">Радио</a>
                            </Responsive>
                        </div>
                        <div className="navbar-right">
                            {!logged ? (
                                <button
                                    className="btn-no-style"
                                    onClick={() => this.onAuth(true)}
                                >
                                    <Responsive minWidth={768}>
                                        Вход / Регистрация
                                    </Responsive>
                                    <Responsive maxWidth={767}>
                                        Вход
                                    </Responsive>
                                </button>
                            ) : (
                                <Dropdown
                                    icon={false}
                                    text={<Avatar src={user.avatar} />}
                                    className="menu-item"
                                >
                                    <Dropdown.Menu style={{ marginTop: 10, left: 'auto', right: 0 }}>
                                        <Dropdown.Header content="Профиль" />
                                        <Dropdown.Item
                                            as="a"
                                            style={{ fontWeight: 'bold' }}
                                            href={`/@${user.username}`}
                                            text={user.displayName}
                                        />
                                        <Dropdown.Header content="Списки" />
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
                <AuthModal
                    onHide={() => this.onAuth(false)}
                    modal={this.state.auth}
                />
            </section>
        );
    }
}

export default Header;
