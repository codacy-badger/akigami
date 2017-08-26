import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import cx from 'classnames';

import Block from '../Block';
import Icon from '../Icon';

class Categories extends PureComponent {
    static defaultProps = {
        onSelect: () => {},
    }
    static propTypes = {
        items: PropTypes.array.isRequired,
        onSelect: PropTypes.func,
    }
    render() {
        const { items, onSelect } = this.props;
        return (
            <Block bordered shadow size="tiny" title="Фильтр">
                <div className="categories">
                    {items.map(item => (
                        <Button
                            key={item.id}
                            className={cx({ 'category-item': true, active: item.active })}
                            onClick={() => onSelect(item)}
                        >
                            {item.icon && <Icon type={item.icon} />}
                            <span>{item.title}</span>
                        </Button>
                    ))}
                </div>
            </Block>
        );
    }
}

export default Categories;
