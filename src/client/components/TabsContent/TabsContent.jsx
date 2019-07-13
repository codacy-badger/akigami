import React, { Fragment, useState } from 'react';
import debugNamespace from 'debug';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import find from 'lodash/find';
import Tabs from '../Tabs/Tabs';

const debug = debugNamespace('akigami:client:tabsContent');

const TabsContent = ({ onChange, items: rawItems, active: defaultActive }) => {
  const [active, setActive] = useState(defaultActive);
  const items = rawItems.map(e => omit(e, ['content']));
  const activeItem = find(rawItems, e => e.key === active);
  debug('activeItem', activeItem);
  return (
    <Fragment>
      <Tabs
        items={items}
        active={active}
        onChange={(key) => {
          setActive(key);
          if (onChange) onChange(key);
        }}
      />
      <React.Fragment>
        {activeItem && activeItem.content}
      </React.Fragment>
    </Fragment>
  );
};

TabsContent.propTypes = {
  items: PropTypes.array,
  active: PropTypes.string,
  onChange: PropTypes.func,
};

TabsContent.defaultProps = {
  items: [],
  active: null,
  onChange: null,
};

export default TabsContent;
