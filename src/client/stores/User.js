import { computed, action, observable } from 'mobx';

import { socket } from '../lib/modules';

const defaultAvatar = '/no-photo.jpg';
const defaultCover = '/no-cover.jpg';

export default class User {
    @observable id = null;
    @observable username = null;
    @observable displayName = null;
    @observable avatar = null;
    @observable cover = null;
    @observable email = null;
    @observable gender = null;
    @observable birthday = null;

    constructor(app) {
        this.app = app;
        if (typeof window != 'undefined') {
            socket.on('test', () => {

            });
        }
    }

    setUser = ({
        id = this.id,
        username = this.username,
        displayName = this.displayName,
        avatar = defaultAvatar,
        cover = defaultCover,
        email = this.email,
        gender = this.gender,
        birthday = this.birthday,
        // link = this.link
    } = {}) => {
        this.setUserData({
            id,
            username,
            displayName,
            avatar,
            cover,
            email,
            gender,
            birthday,
        });
        // this.setSocket();
    }

    @action clearUserData = () => {
        this.id = null;
        this.username = null;
        this.displayName = null;
        this.avatar = null;
        this.cover = null;
        this.email = null;
        this.gender = null;
        this.birthday = null;
    }

    logout = () => {
        fetch('/api/logout', {
            method: 'POST',
            credentials: 'same-origin',
        }).then(() => {
            this.clearUserData();
            this.app.router.go(document.location.href, false);
        });
    }

    @action setUserData = ({
        id = this.id,
        username = this.username,
        displayName = this.displayName,
        avatar = defaultAvatar,
        cover = defaultCover,
        email = this.email,
        gender = this.gender,
        birthday = this.birthday,
        // link = this.link
    } = {}) => {
        this.id = id;
        this.username = username;
        this.displayName = displayName;
        this.avatar = avatar;
        this.cover = cover;
        this.email = email;
        this.gender = gender;
        this.birthday = birthday;
        // this.link = link;
    }

    @computed get isAuth() {
        return this.id != null && this.username != null && this.displayName != null;
    }

    @computed get getAvatar() {
        return !this.avatar ? defaultAvatar : this.avatar;
    }

    @computed get getCover() {
        return !this.cover ? defaultCover : this.cover;
    }
}
