import React from 'react';

export class NameAgeClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Konsta',
      age: 38,
    };
  }

  render() {
    return (
      <div>
        <h1>
          Hi, my name is {this.state.name} and I am {this.state.age} years old
        </h1>
        <input
          type="text"
          defaultValue={this.state.name}
          onChange={this.changeName.bind(this)}
        />
        <br />
        <br />
        <span onClick={this.changeAge.bind(this)}>
          <input type="button" value="-" />
          {this.state.age}
          <input type="button" value="+" />
        </span>
      </div>
    );
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeAge(event) {
    switch (event.target.value) {
      case '+':
        this.setState({ age: this.state.age + 1 });
        break;
      case '-':
        this.setState({ age: this.state.age - 1 });
        break;
    }
  }
}
