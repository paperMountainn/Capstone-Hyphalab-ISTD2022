import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './contamFormModal.scss'
import { Button, Checkbox, Label, Form, Card, Modal, Grid, Image, Header, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react'
import './contamFormModal.css';
import { projectStorage, projectFirestore } from '../../config/firebase-config';
import { db_time_parser } from '../../utils/dateHelper';
export const ContamFormModal = ({modalState, closeModal, rackName}) => {
  const [contamImgDocs, setContamImgDocs] = useState();
  const [noContamImgDocs, setNoContamImgDocs] = useState();
  const [button, setButton] = useState("contam-button")
  const [selectedContamDocs, setSelectedContamDocs] = useState([]);
  const [selectedNoContamDocs, setSelectedNoContamDocs] = useState([]);
  const [loading, setLoading] = useState(false)

  console.log(rackName)
  useEffect(() => {
    const unsub1 = projectFirestore.collection(rackName).doc('26-06-2022').collection('contam')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot)=> {
      let documents = []
      snapshot.forEach( doc => {
          // want to store data + id in the array
          documents.push({...doc.data(), id: doc.id})
      })
      // console.log(documents)
      setContamImgDocs(documents)
    })

    const unsub2 = projectFirestore.collection(rackName).doc('26-06-2022').collection('no_contam')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot)=> {
      let documents = []
      snapshot.forEach( doc => {
          // want to store data + id in the array
          documents.push({...doc.data(), id: doc.id})
      })
      // console.log(documents)
      setNoContamImgDocs(documents)
    })

    // clean up 
    return ()=> {
      // stuff()
      unsub1()
      unsub2()
      
    }

    }, []);

    
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("updating respective stuffs")
    
    if (button == "update-button"){
      console.log("update button pressed")
      if (selectedContamDocs.length != 0 || selectedNoContamDocs.length != 0){

        console.log("not 0 con")
        // while (deletionCount != selectedContamDocs.length){
          
        // }
        let deletionCount = 0
        let total = selectedContamDocs.length + selectedNoContamDocs.length
        setLoading(true)


        
        if (selectedContamDocs.length != 0){
          for (let selectedContamDoc of selectedContamDocs){
            const contamUrl = selectedContamDoc.url
            const contamDocId = selectedContamDoc.id
            // console.log(contamUrl)
            fetch(contamUrl).then(
              response => response.blob()
            )
            .then(
              (blob) => {
                // console.log(blob)
                let httpRef = projectStorage.refFromURL(contamUrl)
                let name = httpRef.name
                console.log(name)
                console.log(selectedContamDoc.id)
                let contamRef = projectStorage.ref(`/${rackName}/contam/${name}`)
                // add to here
                let contamCollectionRef = projectFirestore.collection(rackName).doc('26-06-2022').collection('contam')
                // delete from here
                let noContamCollectionRef = projectFirestore.collection(rackName).doc('26-06-2022').collection('no_contam')
                // put in contam folder
                contamRef.put(blob).on('state_changed', 
                (snap)=>{},
                (err)=>{console.log(err)},
                async()=>{
                  const url = await contamRef.getDownloadURL()
                  const createdAt = new Date()
                  contamCollectionRef.add(
                    {
                    url:url,
                    createdAt: createdAt
                    }
                  ).then(()=>console.log("added to contam collection"))
  
                  noContamCollectionRef.doc(contamDocId).delete().then(
                    ()=>console.log("deleted from no comtam collection")
                  )
                  console.log("shift img to contam folders")
                  
                  // delete image at original location
                  await httpRef.delete().then(
                    ()=>{
                      console.log("deleted and placed img in Storage")
                      // setDeletionCount(deletionCount+1)
                      // console.log("hi")
                      deletionCount += 1
                      if (deletionCount == total){
                        // setLoading(false)
                        setSelectedNoContamDocs([])
                        setSelectedContamDocs([])
                        console.log(selectedContamDoc.length)
                        setLoading(false)
                        console.log("hi")
                      }
                    }
                  )
                  // console.log(deletionCount)
  
                  
  
                }
  
                )
              }
            )
            
          }

        }
        if (selectedNoContamDocs.length != 0){
          for (let selectedNoContamDoc of selectedNoContamDocs){
            const noContamUrl = selectedNoContamDoc.url
            const noContamDocId = selectedNoContamDoc.id
            // console.log(contamUrl)
            fetch(noContamUrl).then(
              response => response.blob()
            )
            .then(
              (blob) => {
                // console.log(blob)
                let httpRef = projectStorage.refFromURL(noContamUrl)
                let name = httpRef.name
                console.log(name)
                console.log(selectedNoContamDoc.id)
                let noContamRef = projectStorage.ref(`/${rackName}/no_contam/${name}`)
                // add to here
                let noContamCollectionRef = projectFirestore.collection(rackName).doc('26-06-2022').collection('no_contam')
                // delete from here
                let contamCollectionRef = projectFirestore.collection(rackName).doc('26-06-2022').collection('contam')
                // put in contam folder
                noContamRef.put(blob).on('state_changed', 
                (snap)=>{},
                (err)=>{console.log(err)},
                async()=>{
                  const url = await noContamRef.getDownloadURL()
                  const createdAt = new Date()
                  noContamCollectionRef.add(
                    {
                    url:url,
                    createdAt: createdAt
                    }
                  ).then(()=>console.log("added to no contam collection"))
  
                  contamCollectionRef.doc(noContamDocId).delete().then(
                    ()=>console.log("deleted from comtam collection")
                  )
                  console.log("shift img to no contam folders")
                  
                  // delete image at original location
                  await httpRef.delete().then(
                    ()=>{
                      console.log("deleted and placed img in Storage")
                      // setDeletionCount(deletionCount+1)
                      // console.log("hi")
                      deletionCount += 1
                      if (deletionCount == total){
                        // setLoading(false)
                        setSelectedNoContamDocs([])
                        setSelectedContamDocs([])
                        console.log(selectedNoContamDocs.length)
                        setLoading(false)
                        console.log("hi")
                      }
                    }
                  )
                  // console.log(deletionCount)
  
                  
  
                }
  
                )
              }
            )
            
          }
          

        }

  
        
       
      }

    }


    
  }


  // general form inputs
  const handleChange = (event, data) => {


    if (data) {

      const checked = data.checked
      const name = data.name // contam 
      const selectedDoc = data.value
      
      // these images are contaminated and need to shift from no-contam to contam
      if (name == "contam"){
        if (checked){
          setSelectedContamDocs(current => [...current, selectedDoc])

        
        }
        else {
          if (selectedContamDocs.includes(selectedDoc)){
            setSelectedContamDocs(selectedContamDocs.filter((doc)=>{
              return (doc !== selectedDoc)
            }))

          }
        }

      }
    // these images are not contam and need to shift from contam to nocontam
      else if (name == "no-contam"){
        if (checked){
          setSelectedNoContamDocs(current => [...current, selectedDoc])
        
        }
        else {
          if (selectedNoContamDocs.includes(selectedDoc)){
            setSelectedNoContamDocs(selectedNoContamDocs.filter((doc)=>{
              return (doc != selectedDoc)
            }))
  
          }

        }

      }

    }
    
  }

  return (
    <div>
      {console.log(selectedContamDocs)}
      
      {console.log(selectedNoContamDocs)}
      
      <Modal
        open={modalState}
        onClose={()=>closeModal(false)}
        className='modalclass'
        size='fullscreen'
      >
      <Modal.Header>
        <h4>
          Check Contaminations <Icon name="bug" />
        </h4>
      </Modal.Header>
      <Modal.Content scrolling >

      <Modal.Description>
        
        <h4><u>Instructions</u></h4>
        Red images indicates that contamination has been detected.
        <br />
        Green images indicates no contamination.
        <br />
        Please check the tickbox if the image has been classified wrongly, and press confirm to update.
        <br />
        <br />
        If this tray is indeed contaminated, please assign an Operator to check the Rack accordingly with the "Assign Task" Button.
        
        
        
      </Modal.Description>
      <hr />
      
      <Form onSubmit={(e)=> handleSubmit(e)}>
    
        {loading ?    
        <Segment>
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>

          
          
        </Segment>
        :
        <div>
        <Card.Group itemsPerRow={7}>
        {contamImgDocs && 
        contamImgDocs.map((contamDoc)=>{
          return(
          <>
            <Card color='red' className='contam-card'>
            <Label as='a' color='red' attached=''>
              Contamination
            </Label>
              <Image fluid src={contamDoc.url} alt="contamination image" />
              <Card.Content>
                {/* <Card.Header>id: {contamDoc.id}</Card.Header> */}
                {/* <p style={{color: "black"}}>{contamDoc.id}</p> */}
                {/* id: {contamDoc.id} */}
                <Card.Header>Date: <span> {db_time_parser(new Date(contamDoc.createdAt.seconds*1000))}</span></Card.Header>
                
              </Card.Content>

              
              <Card.Content extra> 
                {/* <Form.Group >
                   <Form.Radio name="contam" label="Contaminated" onChange={handleChange}/>
                   <Form.Radio name="no-contam" label="Not Contaminated" onChange={handleChange}/>

                </Form.Group> */}
                <Form.Field>
                  <Checkbox value={contamDoc} onChange={handleChange} name="no-contam" control="input" label="misclassified"/> <Icon color="green" name="bug" size='small' ></Icon>
                  {/* <Checkbox value={contamDoc.url} onChange={handleChange} name="no-contam" control="input" label="not contaminated"/> <Icon name="thumbs up outline" color='green'></Icon> */}
                </Form.Field>
              </Card.Content>
            </Card>
          
          
          </>
          )
   
        })}
        {noContamImgDocs && 
        noContamImgDocs.map((noContamDoc)=>{
          return(
          <>
            <Card color='green' className='no-contam-card'>
              <Label as='a' color='green' attached>
                No Contamination
              </Label>
              <Image fluid src={noContamDoc.url} alt="contamination image" />
              <Card.Content>
                {/* <Card.Header>{noContamDoc.id}</Card.Header> */}
                <Card.Header>Date: <span> {db_time_parser(new Date(noContamDoc.createdAt.seconds*1000))}</span></Card.Header>
                {/* <Card.Meta><span>{noContamDoc.createdAt.toString()}</span></Card.Meta> */}
                
              </Card.Content>

              
              <Card.Content extra>
                {/* <Form.Group >
                   <Form.Radio name="contam" label="Contaminated" onChange={handleChange}/>
                   <Form.Radio name="no-contam" label="Not Contaminated" onChange={handleChange}/>

                </Form.Group> */}
                <Form.Field>
                  {/* <Checkbox value={noContamDoc.url} onChange={handleChange} name="contam" control="input" label="contaminated"/> <Icon name="bug" color='red'></Icon> */}
                  <Checkbox value={noContamDoc} onChange={handleChange} name="contam" control="input" label="misclassified"/> <Icon size="small" name="bug" color='red'></Icon>
                </Form.Field>
              </Card.Content>
            </Card>
          
          
          </>
          )
   
        })}

        </Card.Group>
        <hr />
        <Button onClick={()=>setButton("update-button")} color="blue"basic icon labelPosition='left'>
        <Icon name='check' />
          Confirm
        </Button>
        <Button onClick={()=>setButton("stuff")} color="grey" basic icon labelPosition='left'>
          <Icon name='sticky note outline' />
            Assign Task
        </Button>
        
        </div>
        
        }
        



        
        


      </Form>
      <br />
          
      
   
      </Modal.Content>
      </Modal>


    </div>
  )
}
