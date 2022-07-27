import { Component } from "react";
import "./styles.css";

// Using a class because this is what Fluxible uses internally
export default class App extends Component {
  state = {
    count: 0,
    buttonClicked: false
  };

  componentDidUpdatesSinceLastClick = 0;
  componentDidUpdate() {
    this.componentDidUpdatesSinceLastClick++;
    console.log(
      `componentDidUpdate: ${this.props.name}`,
      this.componentDidUpdatesSinceLastClick
    );
  }

  onClick = () => {
    this.rendersSinceClick = 0;
    this.componentDidUpdatesSinceLastClick = 0;

    setImmediate(() => {
      setImmediate(() => {
        this.setState((state) => ({
          count: state.count + 1,
          buttonClicked: true
        }));
      });

      setImmediate(() => {
        this.setState((state) => ({
          count: state.count + 1,
          buttonClicked: true
        }));
      });

      setImmediate(() => {
        this.setState((state) => ({
          count: state.count + 1,
          buttonClicked: true
        }));
      });
    });
  };

  rendersSinceClick = 0;
  render() {
    this.rendersSinceClick++;

    return (
      <div style={{ marginBottom: "2rem" }}>
        <button onClick={this.onClick}>
          {this.props.name} Click Me {this.state.count}
        </button>

        <div>
          {this.state.buttonClicked
            ? `I rendered ${this.rendersSinceClick} times since the last click`
            : "Click the button to see how many times I render"}
        </div>
      </div>
    );
  }
}
