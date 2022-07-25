import React, {useEffect, useState} from 'react';
import './contamFormModal.scss'
import { Button, Checkbox, Form, Card, Modal, Grid, Image, Header, Icon } from 'semantic-ui-react'
import './contamFormModal.css';
import { projectStorage } from '../../config/firebase-config';

export const ContamFormModal = ({modalState, closeModal}) => {
  const [contamImg, setContamImg] = useState();
  const [noContamImg, setNoContamImg] = useState();
  // const [files, setFiles] = useState();
  const [selectedContamImgUrls, setSelectedContamImgUrls] = useState([]);
  const [selectedNoContamImgUrls, setSelectedNoContamImgUrls] = useState([]);
  const [button, setButton] = useState("contam-button")
  // const [checked, setChecked] = useState(false)
  
  useEffect(() => {
    const fetchContam = async() => {
      let result = await projectStorage.ref('/Rack_1/contam/').listAll();
      // let metadata = await projectStorage.ref('data').getMetadata();
      let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
      return Promise.all(urlPromises)

    }
    const fetchNoContam = async() => {
      let result = await projectStorage.ref('/Rack_1/no_contam/').listAll();
      let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
      return Promise.all(urlPromises)
      
    }
    
    const loadImages = async () => {
        const urlsContam = await fetchContam();
        const urlsNoContam = await fetchNoContam();
        // urls.forEach(function(item, index){
        //   // console.log(item, index)
        // });
        setContamImg(urlsContam)
        setNoContamImg(urlsNoContam)
        // setFiles(urlsContam.concat(urlsNoContam));
    }
    loadImages();
    }, []);

    
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (button == "contam-button"){
      
      console.log("button 0 ")
      if (selectedContamImgUrls.length != 0){
        console.log("not 0 con")
        // create refs from selected urls
        
        for (let contamUrl of selectedContamImgUrls){
          fetch(contamUrl).then(
            response => response.blob()
          )
          .then(
            (blob) =>{
              var httpRef = projectStorage.refFromURL(contamUrl)
              let name = httpRef.name
              console.log(name)
              var contamRef = projectStorage.ref(`/Rack_1/contam/${name}`)

              contamRef.put(blob).then(
                httpRef.delete().then(
                  () => {
                    console.log("Transferred image to contam folder!")
                    // setSelectedContamImgUrls(selectedContamImgUrls.filter((url)=>{
                    //   return (url !== contamUrl)
                    // }))
                  }

                )
              )

            }
          )
        }
        

      }
    }
    else if (button == "no-contam-button"){
      console.log("button 1 clicked")
      if (selectedNoContamImgUrls.length != 0){
        console.log("not 0!! no con")
        // create refs from selected urls

      }
    }



  }


  // general form inputs
  const handleChange = (event, data) => {
    // let value = event.target.value;
    // console.log(value)
    // console.log(data)
    

    if (data) {
      // const checked = data.checked
      // setChecked(!data.checked) 
      const checked = data.checked
      const name = data.name // contam 
      const selectedUrl = data.value
      // console.log(checked)
      // console.log(data.value)
      
      if (name == "contam"){
        if (checked){
          setSelectedContamImgUrls(current => [...current, selectedUrl])
        
        }
        else {
          if (selectedContamImgUrls.includes(selectedUrl)){
            setSelectedContamImgUrls(selectedContamImgUrls.filter((url)=>{
              return (url !== selectedUrl)
            }))

          }
        }

      }

      else if (name == "no-contam"){
        if (checked){
          setSelectedNoContamImgUrls(current => [...current, selectedUrl])
        
        }
        else {
          if (selectedNoContamImgUrls.includes(selectedUrl)){
            setSelectedNoContamImgUrls(selectedNoContamImgUrls.filter((url)=>{
              return (url != selectedUrl)
            }))
  
          }

        }



      }

    }
    
  }

    


  return (
    <div>
      {console.log(selectedContamImgUrls)}
      {console.log(selectedNoContamImgUrls)}
      {/* <Button onClick={handleOpen}>Select Racks to be Checked</Button> */}
      <Modal
        open={modalState}
        onClose={()=>closeModal(false)}
        className='modalclass'
        size='large'
      >
      <Modal.Header>
        <h4>
          Check Contaminations <Icon name="bug" />
        </h4>
      </Modal.Header>
      <Modal.Content scrolling >

      <Modal.Description>
        
        <h4>Description</h4>
        <p>Click open each image to observe more closely.</p>
        <p>Check Images that are indeed Contaminated.</p>
        <p>For images that are red but not contaminated, please check them and click "False Alarm".</p>
        
        
        
      </Modal.Description>
      <hr />
      <Form onSubmit={(e)=> handleSubmit(e)}>
        <Card.Group itemsPerRow={4}>
        {contamImg && 
        contamImg.map((url)=>{
          return(
          <>
            <Card color='red' className='contam-card'>
              <Image fluid src={url} alt="contamination image" />
              <Card.Content>
                <Card.Header>image</Card.Header>
                <Card.Meta><span>Senpai</span></Card.Meta>
                
              </Card.Content>

              
              <Card.Content>
                {/* <Form.Group >
                   <Form.Radio name="contam" label="Contaminated" onChange={handleChange}/>
                   <Form.Radio name="no-contam" label="Not Contaminated" onChange={handleChange}/>

                </Form.Group> */}
                <Form.Field>
                  <Checkbox value={url} onChange={handleChange} name="contam" control="input" label="contaminated"/> <Icon name="bug" color='red'></Icon>
                  <Checkbox value={url} onChange={handleChange} name="no-contam" control="input" label="not contaminated"/> <Icon name="thumbs up outline" color='green'></Icon>
                </Form.Field>
              </Card.Content>
            </Card>
          
          
          </>
          )
   
        })}

        {noContamImg && 
        noContamImg.map((url)=>{
          return(
          <>
            <Card color='green' className='no-contam-card'>
              <Image fluid src={url} alt="contamination image" />
              <Card.Content>
                <Card.Header>image</Card.Header>
                <Card.Meta><span>Senpai</span></Card.Meta>
                
              </Card.Content>

              
              <Card.Content>
                <Form.Field>
                <Checkbox value={url} onChange={handleChange} name="contam" control="input" label="Contaminated"/> <Icon name="bug" color='red'></Icon>
                <Checkbox value={url} onChange={handleChange} name="no-contam" control="input" label="Not Contaminated"/> <Icon name="thumbs up outline" color='green'></Icon>
                </Form.Field>
              </Card.Content>
            </Card>
          
          
          </>
          )
   
        })}

        </Card.Group>
        <hr />
        <Button onClick={()=>setButton("contam-button")} color="red"basic icon labelPosition='left'>
        <Icon name='bug' />
          Contaminated
        </Button>
        <Button onClick={()=>setButton("no-contam-button")} color="green" basic icon labelPosition='left'>
          <Icon name='thumbs up outline' />
            Not Contaminated
        </Button>
        



        
        


      </Form>
      <br />
          
      
   
      </Modal.Content>
      </Modal>


    </div>
  )
}
