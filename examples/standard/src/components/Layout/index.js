/**
 *
 * Layout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app-layout">
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
