import React from 'react';
import { Icon } from 'rmwc/Icon';
import cx from 'classnames';

export default function iconRenderHandler({ content, className, ...rest }) {
  return (
    <Icon
      strategy="className"
      basename={cx(['mdi', className])}
      prefix="mdi-"
      use={content}
      {...rest}
    />
  );
}
