import React from 'react';
import ResponsiveReverseGrid from '../../../components/ResponsiveReverseGrid';

const UserBrowse = () => (
  <ResponsiveReverseGrid
    left={(
      <div>
        left
      </div>
    )}
    center={(
      <div>
        center
      </div>
    )}
    right={(
      <div>
        right
      </div>
    )}
  />
);

export default UserBrowse;
