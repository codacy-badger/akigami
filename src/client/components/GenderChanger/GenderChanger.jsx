import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';

class GenderChanger extends PureComponent {
    static defaultProps = {
        selected: null,
        onSelect: () => {},
    }
    static propTypes = {
        selected: PropTypes.oneOf(['', 'none', 'male', 'female']),
        onSelect: PropTypes.func,
    }
    selectGender = (gender) => {
        this.props.onSelect(gender);
    }
    render() {
        const { selected } = this.props;
        return (
            <div className="gender-changer">
                <button
                    onClick={() => this.selectGender('male')}
                    className={cx({
                        'gender-changer-male': true,
                        active: selected === 'male',
                    })}
                >
                    <Icon type="gender-male" />
                    <p>Парень</p>
                </button>
                <div className="gender-divider">
                    <div className="gender-divider-line" />
                    <p className="gender-divider-text">или</p>
                </div>
                <button
                    onClick={() => this.selectGender('female')}
                    className={cx({
                        'gender-changer-female': true,
                        active: selected === 'female',
                    })}
                >
                    <Icon type="gender-female" />
                    <p>Девушка</p>
                </button>
            </div>
        );
    }
}

export default GenderChanger;
