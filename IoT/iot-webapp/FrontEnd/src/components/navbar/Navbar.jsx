import React from 'react'
import { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

import './navbar.scss'
const { SubMenu } = Menu;

export const Navbar = ({navItems}) => {
    const [mail, setMail] = useState('mail');
    const handleClick = (e) => {
        setMail(e.key)
    }

    // function getItem(label, key, icon, children, type) {
    //     return {
    //       key,
    //       icon,
    //       children,
    //       label,
    //       type,
    //     };
    //   }
      
    // //   const items = [
    // //     getItem('Temperature', 'sub1', <RiTempHotLine />, [
    // //       getItem('Option 1', '1'),
    // //       getItem('Option 2', '2'),
    // //       getItem('Option 3', '3'),
    // //       getItem('Option 4', '4'),
    // //     ]),
    // //     getItem('Humidity', 'sub2', <FaCloudversify />, [
    // //       getItem('Option 5', '5'),
    // //       getItem('Option 6', '6'),
    // //       getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    // //     ]),
    // //     getItem('Observation Images', 'sub4', <AiOutlineCamera />, [
    // //       getItem('Option 9', '9'),
    // //       getItem('Option 10', '10'),
    // //       getItem('Option 11', '11'),
    // //       getItem('Option 12', '12'),
    // //     ]),
    // //   ];
    // const farmNavItems = [
    //     getItem(<Link to="/farm/temperature">Temperature</Link>, '1', <RiTempHotLine />),
    //     getItem(<Link to="/farm/humidity">Humidity</Link>, '2', <Icon name="cloud" />),
    //     getItem(<Link to="/farm/observations">Observation Images</Link>, '3', <Icon name="camera" />),
    //   ];

    // const incubationNavItems = [
    //     getItem(<Link to="/incubation/temperature">Temperature</Link>, '1', <RiTempHotLine />),
    //     getItem(<Link to="/incubation/humidity">Humidity</Link>, '2', <Icon name="cloud" />),
    //     getItem(<Link to="/incubation/contaminations">Contamination Checks</Link>, '3', <Icon name="bug" />),
    //     getItem(<Link to="/incubation/observations">Observation Images</Link>, '4', <Icon name="camera" />),
    // ];
    // const rackNavItems = [
    //     getItem(<Link to="/rack-phases">Rack Phases</Link>, '1', <IoFileTrayStacked />),
    //     getItem(<Link to="/rack-phases/new">Add a New Rack</Link>, '2', <Icon  name="add" />),
    //     getItem(<Link to="/rack-phases/rack-cycles">Rack Cycles</Link>, '3', <Icon name="circle notch" />),
    //     // getItem(<Link to="/rack-phases/:rackId">Rack Details</Link>, '4', <Icon name="camera" />),
    // ];
    
    // const mainPageNavItems = [
    //     getItem('hi', '1'),  
        
    // ]
    
    
  return (
    <div>
        <Menu 
            onClick={handleClick} 
            selectedKeys={mail} 
            mode="horizontal" 
            items={navItems}>
            {/* empty title */}
            {/* <Menu.Item>
                <h1>Farm</h1>
            </Menu.Item> */}
            {/* <Menu.Item key="home" icon={<AiFillHome />}>
                <Link to="/farm/">Home</Link>
            
            </Menu.Item> */}

            {/* <Menu.Item key="incubation" icon={<GiMushroomGills />}>
            
            <Link to="/incubation">Incubation</Link>
            </Menu.Item>
            <Menu.Item key="farm" icon={<GiMushroomsCluster />}>
            <Link to="/farm">Farm</Link>
            </Menu.Item>
            <Menu.Item key="rackPhases" icon={<IoFileTrayStacked />}>
            <Link to="/rack-phases">Rack Phases</Link>
            </Menu.Item> */}
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
