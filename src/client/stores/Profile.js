import { observable } from 'mobx';

class Profile {
    @observable username = null;
    @observable displayName = null;
    @observable avatar = null;


    constructor(data) {
        Object.assign(data).map((key) => {
            this[key] = data[key];
        });
    }
}

export default Profile;
