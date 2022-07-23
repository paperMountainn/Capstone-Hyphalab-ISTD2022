import React from 'react'
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { MyCard } from '../../components/card/Card';
import { farmNavItems } from '../../components/navbar/navbarLists';
import sj from '../../static/TSJ_1004691.JPG';

export const UserProfile = () => {
  return (
    <div >
      <Sidebar>
      <div className='ms-4'>
        <h3 className="pb-2 pt-4">
          {' '}User Profile
        </h3>
        <div >
          {/* <Navbar navItems={farmNavItems}/> */}
              
              <div className="row">

              <div className="col-md-5 pb-4">
                <img
                className="d-block w-100"
                src={sj}
                alt="Third slide"/>
              </div>
              <div className="col-md-5 pb-4">
                <br></br>
                <h4>Name: </h4>
                <p>Teo Sze Jia</p>
                
                <h4>Role: </h4>
                <p>Engineer</p>


              </div>
              
              </div>          
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
