import React from "react";

export class ClickOutside extends React.Component {
  wrapper = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (!this.wrapper.current.contains(event.target)) {
      if (this.props.show) {
        this.props.clickHandler();
      }
    }
  };

  render() {
    return <div ref={this.wrapper}>{this.props.children}</div>;
  }
}
