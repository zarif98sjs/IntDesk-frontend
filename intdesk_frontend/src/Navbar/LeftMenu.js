import { Menu } from "antd";
import { Component } from "react";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="problems">
          <Link to="/problems">Problems</Link>
        </Menu.Item>
        <Menu.Item key="discussions">
          <a href="/discussions">Discussions</a>
        </Menu.Item>
        <Menu.Item key="assessments">
          <a href="/assessments">Assessments</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
