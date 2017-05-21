import React, { PureComponent } from 'react';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import DotsList from '../../components/DotsList';
import SidebarUser from '../../components/SidebarUser';
import SidebarMenu from '../../components/SidebarMenu';

const DotsItem = DotsList.Item;
const SidebarItem = SidebarMenu.Item;

class Sidebar extends PureComponent {
    render() {
        return (
            <aside className="nav-sidebar">
                <div className="logo">
                    <Logo />
                </div>
                <div className="user">
                    <SidebarUser
                        user={{
                            avatar: 'https://pp.userapi.com/c638020/v638020296/38174/B5tk5K4xzaM.jpg',
                            username: 'Yukioru',
                            link: '/@yukioru',
                        }}
                    />
                </div>
                <SidebarMenu>
                    <SidebarItem active href="/feed" title="Лента" />
                    <SidebarItem href="/overview" title="Обзор" />
                    <SidebarItem href="/news" title="Новости" />
                    <SidebarItem href="/clubs" title="Клубы" />
                    <SidebarItem href="/radio" title="Радио" />
                </SidebarMenu>
                {/*<div className="list">
                    list
                </div>*/}
                <div className="nav-footer">
                    <Button>Выход</Button>
                    <DotsList>
                        <DotsItem><a href="#">О нас</a></DotsItem>
                        <DotsItem><a href="#">Поддержка</a></DotsItem>
                        <DotsItem><a href="#">Правообладателям</a></DotsItem>
                    </DotsList>
                    <p className="copyright">Акигами &copy; {`${new Date().getFullYear()} г.`}</p>
                </div>
            </aside>
        );
    }
}

export default Sidebar;
