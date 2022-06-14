import React from 'react'
import { taskPageNavItems } from '../../components/navbar/navbarLists'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Datatable } from '../../components/datatable/Datatable';
export const Tasks = () => {
  return (
    <div className='tasks'>
      <div className="tasksContainer">
        <Sidebar>
        <Navbar navItems={taskPageNavItems}/>
        <Datatable />
        </Sidebar>
      </div>
    </div>
  )
}
