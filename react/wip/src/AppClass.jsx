import React from 'react';

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Konsta',
      age: 38,
    };
  }

  render() {
    function handleClick() {
      this.setState({ name: 'Valentin' });

      this.setState((currentState) => {
        return { age: currentState.age + 1 };
      });

      this.setState((currentState) => {
        return { age: currentState.age + 1 };
      });
    }

    const clickHandler = handleClick.bind(this);

    return (
      <h1 onClick={clickHandler}>
        Hi, {this.state.name}! You are {this.state.age}
      </h1>
    );
  }
}
