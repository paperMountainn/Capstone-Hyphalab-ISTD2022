import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import './sidebar.scss'
import '../../styles/charts.css'
import { GiMushroomGills, GiMushroomsCluster } from "react-icons/gi";
import { IoFileTrayStacked } from "react-icons/io5";
import 'antd/dist/antd.min.css';
// import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
// import { FaCloudversify } from "react-icons/fa";
// import DashboardIcon from '@mui/icons-material/Dashboard';
import hyphaIcon from '../../static/LOGO14px.png'

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const Sidebar = ({children}) => {

    const monitoringSubList = [
      {
        title:"Incubation Area",
        link:"/incubation",
        icon: <GiMushroomGills />
      },
      {
        title:"Fruiting Area",
        link:"/farm",
        icon: <GiMushroomsCluster />
      },
      {
        title:"Rack Phases",
        link:"/rack",
        icon: <IoFileTrayStacked />
      },
    ]
    // const sideBarMainList = [
    //     {
    //         title:"Temperature",
    //         link:"/farm/temperature/",
    //         icon:<Icon circular inverted color='grey'><RiTempHotLine /></Icon>
    
    //     }, 
    //     {
    //         title:"Humidity",
    //         link:"/farm/humidity/",
    //         icon:<Icon name="cloud" circular inverted color='grey'/>
    //     }, 
    //     {
    //         title:"CO2",
    //         link:"/farm/co2/",
    //         icon:<Icon circular inverted color='grey'><FaCloudversify /></Icon>
    //     }, 
    //     {
    //         title:"Observations",
    //         link:"/farm/observations",
    //         icon:<Icon circular inverted color='grey'><AiOutlineCamera /></Icon>
    //     }
    
    // ]
    const sideBarMainList = [
      {
          title:"My Tasks (Operator)",
          link:"/tasks",
          icon:<Icon name="tasks" circular inverted color='blue'/>
      }, 
      {
        title:"Assign Tasks (Engineer)",
        link:"/engineer",
        icon:<Icon name="tasks" circular inverted color='orange'/>
      },
      {
          title:"User",
          link:"/user",
          icon:<Icon name="setting" circular inverted color='grey'></Icon>
      },
      {
        title:"Settings",
        link:"/settings",
        icon:<Icon name="user circle" circular inverted color='grey'></Icon>
      }
  
  ]

    const [collapsed, setCollapsed] = useState(false);
    
        
        return (
          <Layout
            style={{
              minHeight: '100vh',
            }}
          >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div >
               
              </div>
              <Menu theme="light" defaultSelectedKeys={['3']} mode="inline" >

              <Menu.Item icon={<img src={hyphaIcon}/>}> 
                {/* <img src={hyphaIcon}/> */}
                  <Link to="/"><h5>HyphaLab</h5></Link>
                  {/* <h3>HyphaAPP</h3> */}
              </Menu.Item>
              <hr />

              <Menu.Item icon={<Icon circular inverted color='grey' name="home"/>}>
                <Link to="/">Summary</Link>
              </Menu.Item>
              
                <Menu.SubMenu icon={<Icon name="line graph" circular inverted color='grey'/>} title="Monitoring">
                  {/* <Menu.Item>item 3</Menu.Item> */}
                  {monitoringSubList.map((item)=> {
                      return (
                          <Menu.Item key={item.title} icon={item.icon}>
                              <Link to={item.link}>{item.title}</Link>
                          </Menu.Item>
                      );
                })}
                </Menu.SubMenu>
                {sideBarMainList.map((item)=> {
                      return (
                          <Menu.Item key={item.title} icon={item.icon}>
                              <Link to={item.link}>{item.title}</Link>
                          </Menu.Item>
                      );
                })}
              </Menu>
            </Sider>
            <Layout className="site-layout">
              {/* <Header
                className="site-layout-background"
                style={{
                  padding: 0,
                }}
              /> */}
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                {/* <Breadcrumb
                  style={{
                    margin: '16px 0',
                  }}
                >
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Bfreadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    minHeight: 360,
                  }}
                >
                  Bill is a cat.
                </div> */}
                { children}
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                }}
              >
                T-rackerApp ©2022 Created by HyphaLab
              </Footer>
            </Layout>
          </Layout>
    );
}
