import React, { PureComponent } from 'react';

import Logo from '../../components/Logo';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import DotsList from '../../components/DotsList';

const Item = DotsList.Item;

class Sidebar extends PureComponent {
    render() {
        return (
            <nav className="nav-sidebar">
                <div className="logo">
                    <Logo />
                </div>
                <div className="user">
                    <Avatar
                        src="https://pp.userapi.com/c638020/v638020296/38174/B5tk5K4xzaM.jpg"
                        size={40}
                    />
                </div>
                <div className="menu">
                    menu
                </div>
                <div className="list">
                    list
                </div>
                <div className="nav-footer">
                    <Button>Выход</Button>
                    <DotsList>
                        <Item><a href="#">О нас</a></Item>
                        <Item><a href="#">Поддержка</a></Item>
                        <Item><a href="#">Правообладателям</a></Item>
                    </DotsList>
                    <p className="copyright">Акигами &copy; {`${new Date().getFullYear()} г.`}</p>
                </div>
            </nav>
        );
    }
}

export default Sidebar;
