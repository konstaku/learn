import React from 'react';

export default class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const increment = () => {
      this.setState({ count: this.state.count + 1 });
    };

    return <h1 onClick={increment}>Count: {this.state.count}</h1>;
  }
}
