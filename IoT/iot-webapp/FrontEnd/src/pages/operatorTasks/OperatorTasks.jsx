import React from 'react'
import { taskPageNavItems } from '../../components/navbar/navbarLists'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar';
// import { Datatable } from '../../components/datatable/Datatable';
import { OperatorDatatable } from '../../components/operatorDatatable/OperatorDatatable';
import { Icon } from 'semantic-ui-react';
import './operatorTasks.scss'
export const OperatorTasks = () => {
  return (
      <div className="operatorTask">
        <Sidebar>
        
        <Navbar navItems={taskPageNavItems}/>
        <div className='stuffs'>
        <h4>
            <Icon name="sticky note outline" />My Tasks
        </h4>
        </div>
        <OperatorDatatable />
        </Sidebar>
        
        
      </div>
  )
}