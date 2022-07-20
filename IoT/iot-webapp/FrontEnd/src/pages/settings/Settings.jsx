import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { MyCard } from '../../components/card/Card';
import { farmNavItems } from '../../components/navbar/navbarLists';
import { Button, Checkbox, Form, Card, Modal, Grid, Image, Header, Icon } from 'semantic-ui-react'


export const Settings = () => {
  return (
    <div className='paramDetail'>
      <Sidebar>
        <div className="paramDetailContainer">
          {/* <Navbar navItems={farmNavItems}/> */}
          <div className="top">
            <div className="container">
            <div className="stageTitle">Settings</div>
              
              <div className="row">
                <h4>Account details: </h4>
                <p>Premium account and root user</p>
                
                <h4>Type of notification system: </h4>
                <p>Email and app push notifications</p>
                <Button className="pt-3" align="center"> Make Changes </Button>
              </div>

            </div>
          </div>
          
        </div>
      </Sidebar>
    </div>
  )
}
