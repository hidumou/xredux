/**
*
* Filter
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

class Filter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { visibilityFilter, onFilterClick } = this.props;
    return (
      <p>
        Show:
        {' '}
        <Link
          active={visibilityFilter === 'SHOW_ALL'}
          onClick={() => onFilterClick('SHOW_ALL')}
        >
          All
        </Link>
        {', '}
        <Link
          active={visibilityFilter === 'SHOW_ACTIVE'}
          onClick={() => onFilterClick('SHOW_ACTIVE')}
        >
          Active
        </Link>
        {', '}
        <Link
          active={visibilityFilter === 'SHOW_COMPLETED'}
          onClick={() => onFilterClick('SHOW_COMPLETED')}
        >
          Completed
        </Link>
      </p>
    );
  }
}

Filter.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default Filter;
