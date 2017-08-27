import React, { PureComponent } from 'react';

class FilterBlock extends PureComponent {
    render() {
        const { title, children } = this.props;
        return (
            <div className="filter-item">
                {title && <h5>{title}</h5>}
                <div className="filter-item-inner">
                    {children}
                </div>
            </div>
        );
    }
}

export default FilterBlock;
