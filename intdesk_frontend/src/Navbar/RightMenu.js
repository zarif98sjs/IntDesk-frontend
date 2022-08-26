import { Menu } from "antd";
import { Component } from "react";
import { Link } from "react-router-dom";

class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="login">
          <Link to="/login">Log In</Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
