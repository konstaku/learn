import React from 'react';

export class ChildClass extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = null;

    this.state = {
      name: '',
      age: 0,
    };
  }

  componentDidMount() {
    console.log('**Hi**');
    console.log('**Render**');
  }

  componentWillUnmount() {
    console.log('**Bye**');

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('**Render**');

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.state.name != prevState.name) {
      this.logNameChangeMessage();
      this.changeTitle(this.state.name);
      this.timeout = setTimeout(() => console.log(this.state.name), 1000);
    } else if (this.state.age != prevState.age) {
      this.logNameChangeMessage();
    }
  }

  logNameChangeMessage() {
    console.log(
      `**My name is ${this.state.name} and I am ${this.state.age} years old**`
    );
  }

  changeTitle(value) {
    document.title = value;
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <br />
        <br />
        <button
          onClick={() =>
            this.setState((currentState) => {
              return {
                age: currentState.age - 1,
              };
            })
          }
        >
          -
        </button>
        {this.state.age}
        <button
          onClick={() =>
            this.setState((currentState) => {
              return {
                age: currentState.age + 1,
              };
            })
          }
        >
          +
        </button>
        <br />
        <br />
        My name is {this.state.name} and I am {this.state.age} years old.
      </div>
    );
  }
}
