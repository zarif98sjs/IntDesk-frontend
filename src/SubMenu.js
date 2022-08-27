import { Menu } from "antd"
import React from "react"
import { Link } from "react-router-dom"

/*
pass in as props: options = [
    {
        name: the text to be shown,
        url: the path
    },
    {
        name: the text to be shown,
        url: the path
    }
]
*/
export default function SubMenu(props){
    
    const options = props.options

    

    const elements = options.map(option => (
        <Menu.Item key={option.name} padding-left="100px">
            <Link to={option.url}>{option.name}</Link>
        </Menu.Item>
    ))
    
    return (
        <Menu mode="horizontal" defaultSelectedKeys={["Description"]}>
            {elements}
        </Menu>
    )

}