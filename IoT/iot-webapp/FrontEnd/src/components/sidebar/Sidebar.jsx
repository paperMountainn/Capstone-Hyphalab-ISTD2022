import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react';
import { RiTempHotLine } from "react-icons/ri";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './sidebar.scss'
import '../../styles/charts.css'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import 'antd/dist/antd.css';
// import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { FaCloudversify } from "react-icons/fa";
import DashboardIcon from '@mui/icons-material/Dashboard';

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];

const { Header, Content, Footer, Sider } = Layout;
export const Sidebar = ({children}) => {
    const sideBarList = [
        {
            title:"Temperature",
            link:"/farm/temperature/",
            icon:<Icon circular inverted color='grey'><RiTempHotLine /></Icon>
    
        }, 
        {
            title:"Humidity",
            link:"/farm/humidity/",
            icon:<Icon name="cloud" circular inverted color='grey'/>
        }, 
        {
            title:"CO2",
            link:"/farm/co2/",
            icon:<Icon circular inverted color='grey'><FaCloudversify /></Icon>
        }, 
        {
            title:"Observations",
            link:"/farm/observations",
            icon:<Icon circular inverted color='grey'><AiOutlineCamera /></Icon>
        }
    
    ]

    const [collapsed, setCollapsed] = useState(true);
    
        
        return (
          <Layout
            style={{
              minHeight: '100vh',
            }}
          >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div >
               
              </div>
              <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" >
              <Menu.Item icon={<DashboardIcon />}> 

                  <Link to="/">HomePage</Link>
                  {/* <DashboardIcon />  */}
                  {/* <h3>HyphaAPP</h3> */}
                
              </Menu.Item>
              {/* <Menu.Item >
                  <p className='title'></p>
              </Menu.Item> */}
              <hr />
                {sideBarList.map((item)=> {
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
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
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
