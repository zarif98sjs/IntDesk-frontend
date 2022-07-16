import { Menu } from "antd";
import { Component } from "react";
import { Link } from "react-router-dom";


class RightUser extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="logout">
          <Link to="/logout">Log Out</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightUser;
