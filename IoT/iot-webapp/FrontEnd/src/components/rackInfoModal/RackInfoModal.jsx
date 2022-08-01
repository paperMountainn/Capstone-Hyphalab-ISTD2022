import React, {useEffect, useState} from 'react'
import './rackInfoModal.scss'
import axios from "axios";
import { Button, Segment, Icon, Card, Image, Modal, Form, Checkbox } from 'semantic-ui-react'
import { IoFileTrayStacked } from "react-icons/io5";
import { db_time_parser } from '../../utils/dateHelper';
export const RackInfoModal = ({rackId, rackName}) => {
    const [open, setOpen] = useState(false);
    const [rack, setRack] = useState(null)
    console.log(rackId)
    useEffect(()=>{
        let isMounted = true; 
        const fetchRackDetails = async()=>{
            const rackDetailResponse = await axios.get(`/rack/${rackId}`)
            console.log(`response from get rack detail: ${rackDetailResponse.data}`)
            const rackDetail = rackDetailResponse.data
            console.log(rackDetail)
            if (isMounted) setRack(rackDetail)
        }
        fetchRackDetails()
        return ()=>{ isMounted = false }
    }, [])


    return (
        <Modal
        className='modalclass'
        size='tiny'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
       <a href="#">{rackName}</a>
       
      }
      
      >
        {rack && 
            <>
            <Modal.Header>
                <h4>Rack Details {<IoFileTrayStacked />}</h4>
                
            </Modal.Header>
            
            <Modal.Content scrolling>
                <Modal.Description>
                    <Segment>
                        <p>
                        <b>Rack Name: </b> {rack.rackName}
                        </p>
                        <p>
                        <b>Rack Id: </b> {rack._id}
                        </p>
                        <p>
                        <b>Created On: </b> {db_time_parser(rack.createdOn)}
                        </p>
                        
                    </Segment>
                    <Segment>
                        <p>
                            <b>Located In: </b> {rack.locatedIn}
                        </p>
                        <p>
                            <b>Currently In Use: </b> {rack.currentlyInUse.toString()}
                        </p>
                    </Segment>
                    <Segment>
                        <p>
                            <b>Contains Cycles: </b>
                            {rack.containCycles.map((cycle)=>{
                                return(
                                    <div>
                                        {cycle.cycleName} - {cycle._id} ({cycle.cycleStatus}) 
                                    </div>
                                )
                            })}
                        </p>
                    </Segment>

                </Modal.Description>
            </Modal.Content>

            </>
        }

        
      </Modal>
    )
}
