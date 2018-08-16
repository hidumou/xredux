/**
*
* AddTodo
*
*/

import React from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onButtonClick = (e) => {
    const input = this.input;
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    this.props.onSubmit(input.value);
    input.value = '';
  }
  render() {
    return (
      <div>
        <h1>Todo</h1>
        <input ref={(c) => { this.input = c; }} />
        <button onClick={this.onButtonClick}>
          Add Todo
        </button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddTodo;
