import React, {useEffect ,useState} from 'react'
import { projectStorage } from '../../config/firebase-config';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


export const PutImg = () => {
    const [files, setFiles] = useState();
    const [meta, setMeta] = useState();
    
    useEffect(() => {
        const fetchImages = async () => {
    
            let result = await projectStorage.ref('data').listAll();
            // let metadata = await projectStorage.ref('data').getMetadata();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
            return Promise.all(urlPromises);
        }
        
        const loadImages = async () => {
            const urls = await fetchImages();
            console.log(urls)
            setFiles(urls);
        }
        loadImages();
        }, []);

    files && console.log(files)
    // files && console.log(meta)
    return (  
        <div>
            {/* <Segment> */}
              

                {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
            {/* </Segment> */}
            {files ?
            files.map((url)=>{
                return(<img key={url} style={{width:"100px"}} src={url} />)                
            })
            :
            <Dimmer active inverted>
                <Loader />
            </Dimmer>
            }
        </div>
    )
}
