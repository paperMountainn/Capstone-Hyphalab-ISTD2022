import React, {useEffect ,useState} from 'react'
import { projectStorage } from '../../config/firebase-config';
import { Chart } from '../../components/chart/Chart';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './contaminations.scss';
import { ContamCarousel } from '../../components/contamCarousel/ContamCarousel';
import { ActuatorForm } from '../../components/actuatorForm/ActuatorForm';

import { RiTempHotLine } from "react-icons";
import { Icon } from 'semantic-ui-react';
import { ContamFormModal } from '../../components/contamModal/ContamFormModal';
import { incubationNavItems } from '../../components/navbar/navbarLists';

export const Contaminations = () => {

 
    return (
        
        <Sidebar>
        <Navbar navItems={incubationNavItems}/>
        <div className="container">
            <div className="top row">

                <div className="stageTitle">Contamination images</div>

                <div className="row">
                <div className="col-md-4 pb-4"><ContamFormModal/></div>
                </div>

                  
                <>
                    <div className="row">
                        <div className="col-md-4 pb-4"><ContamCarousel header="Rack 4" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ContamCarousel header="Rack 5" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ContamCarousel header="Rack 6" meta="Growth Date: 10/06/2022"/></div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 pb-4"><ContamCarousel header="Rack 7" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ContamCarousel header="Rack 8" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ContamCarousel header="Rack 9" meta="Growth Date: 10/06/2022"/></div>
                    </div>
                </>    
                
         

            </div>
        </div>

        </Sidebar>
    )
}