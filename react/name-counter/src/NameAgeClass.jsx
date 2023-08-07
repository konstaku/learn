import React from 'react';
import { DisplayString } from './DisplayString.jsx';

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
        <DisplayString name={this.state.name} age={this.state.age} />
        <input
          type="text"
          defaultValue={this.state.name}
          onChange={this.changeName.bind(this)}
        />
        <br />
        <br />
        <input
          type="button"
          value="-"
          onClick={() =>
            this.setState((currentState) => {
              return { age: currentState.age - 1 };
            })
          }
        />
        {this.state.age}

        <input
          type="button"
          value="+"
          onClick={() =>
            this.setState((currentState) => {
              return { age: currentState.age + 1 };
            })
          }
        />
      </div>
    );
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }
}
