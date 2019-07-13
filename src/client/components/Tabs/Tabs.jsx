import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Label from '../Label';
import { Wrapper, Item, LabelWrapper, Line } from './Tabs.styles';

const Tabs = ({ items, active, onChange }) => (
  <Wrapper>
    {items.map(item => {
      let Component = Item;
      if (item.as) Component = Item.withComponent(item.as);
      const isActive = item.key === active;
      return (
        <Component
          isActive={isActive}
          isClickable={!isActive && ['button', 'a'].includes(item.as)}
          key={item.key}
          {...omit(item, ['title', 'label', 'as'])}
          onClick={() => {
            if (onChange) onChange(item.key);
            if (item.onClick) item.onClick(item.key);
          }}
        >
          {item.title}
          {item.label && (
            <LabelWrapper>
              <Label type={isActive ? 'solid' : 'border'}>
                {item.label}
              </Label>
            </LabelWrapper>
          )}
          <Line />
        </Component>
      );
    })}
  </Wrapper>
);

Tabs.propTypes = {
  items: PropTypes.array,
  active: PropTypes.string,
  onChange: PropTypes.func,
};

Tabs.defaultProps = {
  items: [],
  active: null,
  onChange: null,
};

export default Tabs;
