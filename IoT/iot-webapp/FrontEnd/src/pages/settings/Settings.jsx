import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { MyCard } from '../../components/card/Card';
import { farmNavItems } from '../../components/navbar/navbarLists';
import { Button, Checkbox, Form, Card, Modal, Grid, Image, Header, Icon } from 'semantic-ui-react'


export const Settings = () => {
  return (
    <div >
      <Sidebar>
        <div className='ms-4'>
        <h3 className="pb-2 pt-4">
          {' '}Settings
        </h3>
          {/* <Navbar navItems={farmNavItems}/> */}
              <div className="row">
                <h4>Account details: </h4>
                <p>Premium account and root user</p>
                
                <h4>Type of notification system: </h4>
                <p>Email and app push notifications</p>
                <div className='sm=1'>
                <Button className="pt-3 " align="center"> Edit Settings </Button>
                </div>
              </div>
          
        </div>
      </Sidebar>
    </div>
  )
}
