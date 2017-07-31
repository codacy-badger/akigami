import { computed, action, observable } from 'mobx';

const defaultAvatar = '/no-photo.jpg';

export default class User {
    @observable username = null;
    @observable displayName = null;
    @observable avatar = null;

    constructor(app) {
        this.app = app;
        // if (typeof window != 'undefined') {
        //     this.lang = Cookies.get('lang') || 'ru';
        //     if (this.isAuth) {
        //         this.setSocket();
        //     }
        // }
    }

    setUser = ({
        // id = this.id,
        username = this.username,
        displayName = this.displayName,
        // avatar = this.avatar,
        // link = this.link
    } = {}) => {
        this.setUserData({ username, displayName });
        //this.setSocket();
    }

    @action clearUserData = () => {
        this.username = null;
        this.displayName = null;
        this.avatar = null;
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
        // id = this.id,
        username = this.username,
        displayName = this.displayName,
        // avatar = this.avatar,
        // link = this.link
    } = {}) => {
        // this.id = id;
        this.username = username;
        this.displayName = displayName;
        // this.avatar = avatar;
        // this.link = link;
    }

    @computed get isAuth() {
        return this.username != null && this.displayName != null;
    }

    @computed get getAvatar() {
        return !this.avatar ? defaultAvatar : this.avatar;
    }
}
