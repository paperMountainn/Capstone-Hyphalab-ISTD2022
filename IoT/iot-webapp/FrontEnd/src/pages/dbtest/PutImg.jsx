import React, {useEffect ,useState} from 'react'
import { projectStorage } from '../../config/firebase-config';

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
            setFiles(urls);
        }
        loadImages();
        }, []);

    files && console.log(files)
    // files && console.log(meta)
    return (  
        <div>
            {files && 
            files.map((url)=>{
                return(<img key={url} style={{width:"100px"}} src={url} />)                
            })
            }
        </div>
    )
}
