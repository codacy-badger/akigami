import React, { PureComponent } from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Collapse,
    NavDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import AuthModal from '../AuthModal';

import Logo from '../../components/Logo';
import Icon from '../../components/Icon';

class Header extends PureComponent {
    state = {
        collapse: false,
        overview: false,
        community: false,
        auth: false,
    };
    onAuth = (action) => {
        this.setState({ auth: action });
    }
    toggle = (state) => {
        this.setState({
            [state]: !this.state[state],
        });
    }
    render() {
        const { collapse, overview, community, auth } = this.state;
        return (
            <Navbar inverse toggleable color="black">
                <div className="container container-nav">
                    <NavbarToggler right onClick={() => this.toggle('collapse')} />
                    <NavbarBrand href="/">
                        <Logo width={36} height={36} />
                    </NavbarBrand>
                    <Collapse isOpen={collapse} navbar>
                        <Nav navbar>
                            <NavDropdown isOpen={overview} toggle={() => this.toggle('overview')}>
                                <DropdownToggle className="menu-item" nav caret>
                                    Обзор
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="/anime">Аниме</DropdownItem>
                                    <DropdownItem href="/manga">Манга</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="/collections">Подборки</DropdownItem>
                                </DropdownMenu>
                            </NavDropdown>
                            <NavDropdown isOpen={community} toggle={() => this.toggle('community')}>
                                <DropdownToggle className="menu-item" nav caret>
                                    Сообщество
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="/users">Пользователи</DropdownItem>
                                    <DropdownItem href="/clubs">Клубы</DropdownItem>
                                </DropdownMenu>
                            </NavDropdown>
                            <NavItem className="menu-item">
                                <NavLink href="/theater">Кинотеатр</NavLink>
                            </NavItem>
                            <NavItem className="menu-item">
                                <NavLink href="/radio">Радио</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="navbar-search">
                                <NavLink className="navbar-search-link" href="/search">
                                    <Icon type="magnify" /><span className="navbar-search-title">Поиск</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    tag="button"
                                    className="btn-no-style"
                                    onClick={() => this.onAuth(true)}
                                >
                                    Вход / Регистрация
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
                <AuthModal step={null} backdrop={null} modal={auth} onHide={() => this.onAuth(false)} />
            </Navbar>
        );
    }
}

export default Header;
