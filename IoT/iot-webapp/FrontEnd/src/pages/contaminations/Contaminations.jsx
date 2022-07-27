import React, {useEffect ,useState} from 'react'
import axios from 'axios';
import { Navbar } from '../../components/navbar/Navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import './contaminations.scss';
import { Icon } from 'semantic-ui-react';
import { projectStorage, projectFirestore } from '../../config/firebase-config';
import { ContamCarousel } from '../../components/contamCarousel/ContamCarousel';
import { ContamFormModal } from '../../components/contamModal/ContamFormModal';
import { incubationNavItems } from '../../components/navbar/navbarLists';

export const Contaminations = () => {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    // const handleClose1 = () => setOpen1(false);
    const handleOpen2 = () => setOpen2(true);
    // const handleClose2 = () => setOpen2(false);
    const handleOpen3 = () => setOpen3(true);
    // const handleClose3 = () => setOpen3(false);
    const handleOpen4 = () => setOpen4(true);
    // const handleClose4 = () => setOpen4(false);


    const rackNames = ['Rack_1','Rack_2', 'Rack_3', 'Rack_4']

    useEffect(()=>{
        
        
        const fetchImages = async (rackName) => {
            
            let result = await projectStorage.ref().child(rackName).child('uploaded_images').listAll()
            // let metadata = await projectStorage.ref('data').getMetadata();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
            return Promise.all(urlPromises);
        }
    
        const contamAPIProcess = async (rackName) => {
        console.log("being called")
            
            const urls = await fetchImages(rackName);
            // 
            console.log("uploaded img urls")
            console.log(urls)
    
            if (urls.length == 0){
                console.log("no new images now")
                return
            }
    
            
    
            for (let file_url of urls){
                
                fetch(file_url).then(
                    response => response.blob()
            
                )
                .then(
                    (blob) =>  {
                        // console.log(blob)
                        var data = new FormData()
                        data.append('file', blob , 'file')
                        
                        const stuff =  axios.post('http://127.0.0.1:5001/receive', data).then(
                        (response) => {
                            const isContam = response.data
                            // console.log(isContam)
    
                            let httpRef = projectStorage.refFromURL(file_url)
                            let name = httpRef.name
                            // console.log(name)
    
                            
                            let contamStorageRef = projectStorage.ref(`${rackName}/contam/${name}`)
                            let noContamStorageRef = projectStorage.ref(`${rackName}/no_contam/${name}`)
                            let contamCollectionRef = projectFirestore.collection(`${rackName}`).doc('26-06-2022').collection('contam')
                            let noContamCollectionRef = projectFirestore.collection(`${rackName}`).doc('26-06-2022').collection('no_contam')
                            
                            if (isContam == "contam"){
                            contamStorageRef.put(blob).on('state_changed', (snap)=>{
                                // console.log(snap)
                            },
                            (err) => {console.log(err)
                            },
                            async() => {
                                const url = await contamStorageRef.getDownloadURL()
                                const createdAt = new Date()
                                contamCollectionRef.add(
                                {
                                    url:url,
                                    createdAt: createdAt
                                }
                                )
                                console.log("added 1 contam")
                                await httpRef.delete().then(
                                ()=>{console.log("contam image deleted")}
                                )
    
                                // console.log(url)
                            },
                            
                            )
                            }
                            else if (isContam == "no_contam"){
                            noContamStorageRef.put(blob).on('state_changed', (snap)=>{
                                console.log(snap)
                            },
                            (err) => {console.log(err)
                            },
                            async() => {
                                const url = await noContamStorageRef.getDownloadURL()
                                const createdAt = new Date()
                                noContamCollectionRef.add(
                                {
                                    url:url,
                                    createdAt: createdAt
                                }
                                )
                                console.log("added 1 no contam")
                                await httpRef.delete().then(
                                ()=>{console.log("no contam img deleted")}
                                )
    
                                // console.log(url)
                            },
                            
                            )
                            }
    
    
    
                        }
                        )
                    
                    
    
                    }
                )
            
                }
    }
 
    for (let rackName of rackNames){
        contamAPIProcess(rackName)
    }

    }
    
    , 
    [])
  



    return (
        
        <Sidebar>
        <Navbar navItems={incubationNavItems}/>
        <div className="container">
            <div className="top row">

                {/* <h3 className="pt-4">Contamination Observation</h3> */}
                <h3 className='pb-2 pt-4'><Icon name="bug" />Contamination Observation</h3>

                <div className="row">
                    <div className="col-md-4 pb-4"><ContamFormModal modalState={open1} closeModal={setOpen1} rackName="Rack_1"/></div>
                    <div className="col-md-4 pb-4"><ContamFormModal modalState={open2} closeModal={setOpen2} rackName="Rack_2"/></div>
                    <div className="col-md-4 pb-4"><ContamFormModal modalState={open3} closeModal={setOpen3} rackName="Rack_3"/></div>
                    <div className="col-md-4 pb-4"><ContamFormModal modalState={open4} closeModal={setOpen4} rackName="Rack_4"/></div>
                </div>

                  
                
                <div className="row">
                    <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen1} rackName="Rack_1"/></div>
                    <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen2} rackName="Rack_2" /></div>
                    <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen3} rackName="Rack_3"/></div>
                    <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen4} rackName="Rack_4" /></div>
                    {/* <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen} rackName="Rack_3" /></div>
                    <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen} rackName="Rack_4" /></div> */}
                    {/* <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen} rackName="Rack_2" meta="Growth Date: 10/06/2022"/></div>
                    <div className="col-md-4 pb-4"><ContamCarousel openModal={handleOpen} rackName="Rack_3" meta="Growth Date: 10/06/2022"/></div> */}
                </div>

            
                
                
         

            </div>
        </div>

        </Sidebar>
    )
}