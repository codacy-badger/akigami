import { observable, action, isObservableArray, isObservableMap } from 'mobx';
import { createViewModel } from 'mobx-utils';
import merge from 'lodash/merge';
import { socket } from '../../lib/modules';

class Settings {
    @observable username = 'Test'
    @observable usernameEdit = false;
    @observable usernameValidate = 'success';

    @observable displayName = 'Test'
    @observable displayNameEdit = false;
    constructor(props) {
        this.viewModel = createViewModel(this);
        merge(this, props);
    }

    @action
    enableEdit = (key, state) => {
        if (state === false) {
            this.viewModel.resetProperty(key);
            this.viewModel.resetProperty(`${key}Validate`);
        }
        this[`${key}Edit`] = state;
    }

    handleChange = (key, value) => {
        if (key === 'username') {
            // здесь будет асинхронная проверка
            if (/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/m.test(value)) {
                this.viewModel[`${key}Validate`] = true;
            } else {
                this.viewModel[`${key}Validate`] = false;
            }
        }
        this.viewModel[key] = value;
    }

    handleSave = (key) => {
        this.submitProperty(key);
        this.enableEdit(key, false);
        socket.emit('settings:edit', { [key]: this[key] });
    }
    // maybe transfer to separate class
    submitProperty = (key) => {
        const t = this.viewModel;
        const source = t.localValues.get(key);
        const destination = t.model[key];
        if (isObservableArray(destination)) {
            destination.replace(source);
        } else if (isObservableMap(destination)) {
            destination.clear();
            destination.merge(source);
        } else {
            t.model[key] = source;
        }
        this.viewModel.resetProperty(key);
    }
}

export default Settings;
