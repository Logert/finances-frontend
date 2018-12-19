import React from 'react';
import PT from 'prop-types';

import './index.less';

const Widget = ({ children }) => <div className="widget">{ children }</div>;

Widget.propTypes = {
  children: PT.element.isRequired,
};

export default Widget;
