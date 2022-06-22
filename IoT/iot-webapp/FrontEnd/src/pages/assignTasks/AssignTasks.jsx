import React from 'react'
import { engineerPageNavItems } from '../../components/navbar/navbarLists'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar';
import { TaskFormModal } from '../../components/taskFormModal/TaskFormModal';
export const AssignTasks = () => {
  return (
    <div className='tasks'>
    <div className="tasksContainer">
      <Sidebar>
      <Navbar navItems={engineerPageNavItems}/>
      <TaskFormModal/>
      </Sidebar>
    </div>
  </div>
  )
}
