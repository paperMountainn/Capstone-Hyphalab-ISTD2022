import React from 'react'
import { engineerPageNavItems } from '../../components/navbar/navbarLists'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Datatable } from '../../components/datatable/Datatable';
export const TasksEngineer = () => {
  return (
    <div className='tasks'>
    <div className="tasksContainer">
      <Sidebar>
      <Navbar navItems={engineerPageNavItems}/>
      <Datatable />
      </Sidebar>
    </div>
  </div>
  )
}
