/**
 *
 * App
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import xredux from 'xredux';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Filter from './components/Filter';

const { actions } = xredux;

let nextTodoId = -1;

xredux.model({
  namespace: 'todos',
  initialState: {
    todoList: [],
    visibilityFilter: 'all',
  },
  reducers: {
    addTodo(state, action) {
      nextTodoId += 1;
      const { payload } = action;
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: nextTodoId,
            text: payload.text,
            completed: false,
          },
        ],
      };
    },
    toggleTodo(state, action) {
      const { payload } = action;
      const todoList = state.todoList.map((todo) => {
        if (todo.id === payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return {
        ...state,
        todoList,
      };
    },
    setVisibilityFilter(state, action) {
      const { payload } = action;
      return {
        ...state,
        visibilityFilter: payload.filter,
      };
    },
  },
  effects: {
  },
});

export class App extends React.PureComponent {
  render() {
    const { todoList, visibilityFilter } = this.props;
    const { addTodo, toggleTodo, setVisibilityFilter } = actions.todos;
    return (
      <div className="app">
        <AddTodo onSubmit={value => addTodo({ text: value })} />
        <TodoList todos={todoList} onTodoClick={id => toggleTodo({ id })} />
        <Filter visibilityFilter={visibilityFilter} onFilterClick={filter => setVisibilityFilter({ filter })} />
      </div>
    );
  }
}

App.propTypes = {
  todoList: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

function getVisibleTodos(todos, filter) {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
}

export default connect(({ todos }) => {
  return {
    todoList: getVisibleTodos(todos.todoList, todos.visibilityFilter),
    visibilityFilter: todos.visibilityFilter,
  };
})(App);
