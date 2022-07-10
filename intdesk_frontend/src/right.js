import { Menu } from "antd";
import { Component } from "react";

class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="www.marca.com">Log In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="www.marca.com">Sign Up</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default RightMenu;
