import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import { GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";

import { IoFileTrayStacked } from "react-icons/io5";
import './navbar.scss'
const { SubMenu } = Menu;

export const Navbar = () => {
    const [mail, setMail] = useState('mail');
    const handleClick = (e) => {
        setMail(e.key)
    }

  return (
    <div>
        <Menu onClick={handleClick} selectedKeys={mail} mode="horizontal">
            {/* empty title */}
            {/* <Menu.Item>
                <h1>Farm</h1>
            </Menu.Item> */}
            {/* <Menu.Item key="home" icon={<AiFillHome />}>
                <Link to="/farm/">Home</Link>
            
            </Menu.Item> */}

            <Menu.Item key="incubation" icon={<GiMushroomGills />}>
            
            <Link to="/incubation">Incubation</Link>
            </Menu.Item>
            <Menu.Item key="farm" icon={<GiMushroomsCluster />}>
            <Link to="/farm">Farm</Link>
            </Menu.Item>
            <Menu.Item key="rackPhases" icon={<IoFileTrayStacked />}>
            <Link to="/rack-phases">Rack Phases</Link>
            </Menu.Item>
            {/* <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
            <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
            </Menu.Item> */}
        </Menu>
    </div>
  )
}
