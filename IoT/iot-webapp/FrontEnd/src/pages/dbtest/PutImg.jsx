import React, {useEffect ,useState} from 'react'
import { projectStorage, projectFirestore } from '../../config/firebase-config';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { saveAs } from 'file-saver'
import axios from 'axios';

export const PutImg = () => {
    
    useEffect(() => {
        const fetchImages = async () => {
            
            let result = await projectStorage.ref().child('rack2').child('uploaded_images').listAll();
            // let metadata = await projectStorage.ref('data').getMetadata();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
            return Promise.all(urlPromises);
        }


        

        const loadImages = async () => {
            
            const urls = await fetchImages();

            if (urls.length == 0){
                console.log("no new images now")
                return
            }
            

            for (let file_url of urls){
                // download image directly via url
                // console.log(file_url)
                fetch(file_url).then(
                    response => response.blob()
                    
                    // (response) => {
                    //     response.arrayBuffer()
                    // }
                )
                .then(
                    (blob) =>  {

                        var data = new FormData()
                        data.append('file', blob , 'file')
                        // data.append('filename', name)
            
                        const stuff =  axios.post('http://127.0.0.1:5001/receive', data).then(
                            (response) => {
                                // console.log(response.data)
                                // console.log(file_url)
                                const isContam = response.data
                                var httpRef = projectStorage.refFromURL(file_url)
                                let name = httpRef.name


                                var contamRef = projectStorage.ref(`rack2/contam/${name}`)
                                var noContamRef = projectStorage.ref(`rack2/no_contam/${name}`)
                                // console.log(name)
                                // var storeRef = projectFirestore.collection('rack2').doc('contam')

                                if (isContam == 'contam'){
                                
                                    contamRef.put(blob).then(
                                        httpRef.delete().then(
                                            () => console.log("deleted from original place")
                                        )
                                    )
                                    
                                    console.log("contam!")
                                }
                                else if (isContam == 'no_contam'){
                                    console.log("nocon!")
                                    noContamRef.put(blob).then(
                                        httpRef.delete().then(
                                            () => console.log("deleted from original place")
                                        )
                                    )
                                }
                                

                                




                                
                                
                            }
                        )
                        .catch(error=>console.log(error))
                        
                        
                       
  
                    }
                )
             
                }
        }
        
        loadImages()

        
    }, []);
    
 
    return (  
        
        <div>
            

            {/* <Segment> */}
              

                {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
            {/* </Segment> */}
            {/* {files ?
            files.map((url)=>{
                return(<img key={url} style={{width:"100px"}} src={url} />)                
            })
            :
            <Dimmer active inverted>
                <Loader />
            </Dimmer>
            } */}
        </div>
    )
}
