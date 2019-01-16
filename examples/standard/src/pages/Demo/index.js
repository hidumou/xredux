/**
 *
 * Demo
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import xredux from 'xredux';
import './index.scss';
import './model.js';

// Page actions
const actions = xredux.actions.demo;

// Get state from store
const mapStateToProps = ({ demo }) => ({
  randomData: demo.randomData,
});

@connect(mapStateToProps)
export class Demo extends React.Component {
  componentDidMount() {
    // Dispatch action to get random data
    actions.getRandomData();
  }
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <p className="app-intro">
          To get started, edit <code>src/index.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Demo;
