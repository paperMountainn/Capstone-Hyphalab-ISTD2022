import React, {useEffect ,useState} from 'react'
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './contaminations.scss';
import { ContamCarousel } from '../../components/contamCarousel/ContamCarousel';
import { ContamFormModal } from '../../components/contamModal/ContamFormModal';
import { incubationNavItems } from '../../components/navbar/navbarLists';

export const Contaminations = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

    return (
        
        <Sidebar>
        <Navbar navItems={incubationNavItems}/>
        <div className="container">
            <div className="top row">

                <h3 className="pt-4">Contamination Observation</h3>

                <div className="row">
                <div className="col-md-4 pb-4"><ContamFormModal modalState={open} closeModal={setOpen}/></div>
                </div>

                  
                <>
                    <div className="row">
                        <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen} rackName="Rack_1" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen} rackName="Rack_2" meta="Growth Date: 10/06/2022"/></div>
                        <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen} rackName="Rack_3" meta="Growth Date: 10/06/2022"/></div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen} rackName="Rack_4" meta="Growth Date: 10/06/2022"/></div>
                    </div>
                </>    
                
         

            </div>
        </div>

        </Sidebar>
    )
}