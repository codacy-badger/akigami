import { computed, observable } from 'mobx';
import set from 'lodash/set';

const defaultAvatar = '/no-photo.jpg';
const defaultCover = '/no-cover.jpg';

class Profile {
    @observable username = null;
    @observable displayName = null;
    @observable avatar = null;
    @observable cover = null;

    constructor(data) {
        Object.keys(data).map((key) => {
            set(this, key, data[key]);
        });
    }

    @computed get getAvatar() {
        return !this.avatar ? defaultAvatar : this.avatar;
    }

    @computed get getCover() {
        return !this.cover ? defaultCover : this.cover;
    }
}

export default Profile;
