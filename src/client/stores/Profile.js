import { computed, observable } from 'mobx';
import set from 'lodash/set';

const defaultAvatar = '/no-photo.jpg';

class Profile {
    @observable username = null;
    @observable displayName = null;
    @observable avatar = null;


    constructor(data) {
        Object.keys(data).map((key) => {
            set(this, key, data[key]);
        });
    }

    @computed get getAvatar() {
        return !this.avatar ? defaultAvatar : this.avatar;
    }
}

export default Profile;
