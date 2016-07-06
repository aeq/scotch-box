/*
Creating a component

The most simple component has a `render` method that returns some
JSX. `props` are attributes that are passed into the component 
when you instantiate it. 

One caveat is that `render` must return a single parent element;
you can't return multiple adjacent JSX tags but must wrap them
in one parent element.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

var HelloMessage = React.createClass({
  render: function () {
    return <h1>Hello {this.props.message}!</h1>;
  }
});

var Counter = React.createClass({
    render: function () {
        const { value, onIncreaseClick } = this.props;
        return (
          <div>
            <span>{value}</span>
            <button onClick={onIncreaseClick}>Increase</button>
          </div>
        )
    }
});

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>, 
    document.getElementById('root')
);
