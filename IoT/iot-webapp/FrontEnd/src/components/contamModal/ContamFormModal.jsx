import React, {useEffect, useState} from 'react';
import './contamFormModal.scss'
import { Button, Checkbox, Form, Card, Modal, Grid, Image, Header, Icon } from 'semantic-ui-react'
import './contamFormModal.css';
import { projectStorage } from '../../config/firebase-config';

export const ContamFormModal = ({modalState, closeModal}) => {
  // constructor(props); {
  //   super(props);
  //   this.state = {value: ''};
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // const handleChange = async(e) => {
  //   this.setState({value: e.target.value});
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

  }
  
  const [files, setFiles] = useState();

  useEffect(() => {
    const fetchImages = async () => {

        let result = await projectStorage.ref('/data/rack1/contaminationCheck/contam').listAll();
        // let metadata = await projectStorage.ref('data').getMetadata();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
        return Promise.all(urlPromises);
    }
    
    const loadImages = async () => {
        const urls = await fetchImages();
        urls.forEach(function(item, index){
          // console.log(item, index)
        });
        // console.log(urls[1])
        setFiles(urls);
    }
    loadImages();
    }, []);

    // console.log(files)


  return (
    <div>
      {/* <Button onClick={handleOpen}>Select Racks to be Checked</Button> */}
      <Modal
        as={Form}
        open={modalState}
        onClose={()=>closeModal(false)}
        // onSubmit = {this.handleSubmit}
      >
        <h1>CLOSE ME</h1>
      <Modal.Header>Select Racks to be Checked</Modal.Header>
      <i class="close icon"></i>
      <Modal.Content image scrolling >
        <Modal.Description>
          <Form.Input label="Name" required type="text" placeholder="Your name" />

          <label>Select the racks:</label>

          {files &&
            files.map((url)=>(
                  <>
                  {/* <div className='ui container'> */}
                  <div className='col-8 md-4'> 
                    <img 
                    className="d-block w-25" 
                    key={url} 
                    style={{width:"50px"}} 
                    src={url} />
                  </div>

                  <div className='col-8 md-4'> 
                    <Form.Field label={url} control='input' type='checkbox' />
                  </div>
                  {/* <br/> */}

                  <div class="ui divider"></div>
                  
                  {/* </div> */}
                  

                  </>
                )                
            )}

          
          <Form.Input label="Assign" type="text" placeholder="Assign operator" />
          <br />
          <Modal.Actions>
          <label>Select Action:</label>
            <Button type='False Alarm' onClick={()=>{console.log(Form)}}>False Alarm</Button>
            <Button type='Are Contaminated' onClick={()=>{console.log(Form)}}>Are Contaminated</Button>
          </Modal.Actions>
        </Modal.Description>
      </Modal.Content>
      </Modal>
      {/* <Modal as={Form}>
      <Header icon="pencil" content="This is my header" as="h2" />
      <Modal.Content>
        <Form.Input label="Name" required type="text" placeholder="Your name" /> */}
        {/* {saved ? <div>Saved!</div> : null} */}
      {/* </Modal.Content>
      <Modal.Actions>
        <Button type="submit" color="red" icon="times" content="Close" />
        <Button type="submit" color="green" icon="save" content="Save" />
        <Button type='submit' color="green" onClick={()=>{console.log(Form)}}>Submit</Button>
      </Modal.Actions>
    </Modal> */}


    </div>
  )
}
