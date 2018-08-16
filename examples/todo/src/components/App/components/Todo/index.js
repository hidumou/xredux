/**
*
* Todo
*
*/

import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, completed, text }) => (
  <li
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    <div onClick={onClick}>
      {text}
    </div>
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;
