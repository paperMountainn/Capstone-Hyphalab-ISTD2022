import React, {useEffect ,useState} from 'react'
import { projectStorage, projectFirestore } from '../../config/firebase-config';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import axios from 'axios';

export const PutImg = () => {
    
    useEffect(() => {
        const fetchImages = async () => {
            
            let result = await projectStorage.ref().child('Rack_1').child('uploaded_images').listAll()
            // let metadata = await projectStorage.ref('data').getMetadata();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
            return Promise.all(urlPromises);
        }

        const fetchBlobs = async(imgUrlArr) => {
            let promises = imgUrlArr.map(url => fetch(url)
            .then(
                res => {return res.blob()}
            )
            )
            return Promise.all(promises)
        }

        const fetchBlobsAndTurnIntoFormData = async(imgUrlArr) => {
            let promises = imgUrlArr.map(url => fetch(url)
            .then(
                res =>res.blob()
            )
            .then(
                blob => {
                    var data = new FormData()
                    data.append('file', blob , 'file')
                    return data
                }
            )
            
            )
            return Promise.all(promises)
        }

        const callBEAPIwithBlobs = async(blobArr) => {
            // console.log(blobArr)
            let promises = blobArr.map(
                (blob)=>{
                    var data = new FormData()
                    data.append('file', blob , 'file')
                    // console.log(data)
                    axios.post('http://127.0.0.1:5001/receive', data)
                    .then(
                        (res=>res.data)
                    )
                    
                }
            )
            return Promise.all(promises)
        }

        const postToApi = async (formData) => {
            const res = await axios.post('http://127.0.0.1:5001/receive', formData)
            return res.data
        }

        const obtainPred = async(formDataArr) => {
            let promises = formDataArr.map(
                (formData) =>{
                    const predRes = postToApi(formData)
                    return predRes
                }
            )
            return Promise.all(promises)
        }

        
        const putInFolderAndDelete = async(pred, url, blob)=>{
            let httpRef = projectStorage.refFromURL(url)
            let name = httpRef.name

            if (pred == "contam"){
                let contamRef = projectStorage.ref(`Rack_1/contam/${name}`)
                contamRef.put(blob).then(
                    httpRef.delete().then(
                        ()=> console.log("deleted and placed into contam")
                    )
                )
            }
            else if (pred == "no_contam"){
                let noContamRef = projectStorage.ref(`Rack_1/no_contam/${name}`)
                noContamRef.put(blob).then(
                    httpRef.delete().then(
                        ()=> console.log("deleted and placed into no contam")
                    )
                )

            }
        }

        const processAllData = async(preds, urls, blobs) => {
            const friggingSphagettArr = []
            preds.forEach((key, i) => friggingSphagettArr[i] = {
                "predResult":preds[i],
                "url": urls[i],
                "blob": blobs[i]
            });

            
            const promises = friggingSphagettArr.map((data)=>{
                let httpRef = projectStorage.refFromURL(data['url'])
                let name = httpRef.name
                if (data['predResult'] == "contam"){
                    let contamRef = projectStorage.ref(`Rack_1/contam/${name}`)
                    contamRef.put(data['blob']).then(
                        httpRef.delete().then(
                            ()=> console.log("deleted and placed into contam")
                        )
                    )
                    
                }
                else if (data['predResult'] == "no_contam"){
                    let contamRef = projectStorage.ref(`Rack_1/no_contam/${name}`)
                    contamRef.put(data['blob']).then(
                        httpRef.delete().then(
                            ()=> console.log("deleted and placed into no contam")
                        )
                    )
                    
                }
            })
            return Promise.all(promises)

        }

        const retrieveFromFbContamImgs = async() => {
            let result = await projectStorage.ref().child('Rack_1').child('contam').listAll()
            // let metadata = await projectStorage.ref('data').getMetadata();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
            console.log("hieeeeloo last")
            return Promise.all(urlPromises);
        }

        






        
        
        // const test = async() =>{
        //     const urls = await fetchImages()
            

        //     if (urls.length == 0){
        //         console.log("no new images now")
        //         return
        //     }
        //     console.log(urls)

        // }
        // test()


        

        const loadImages = async () => {
            
            const urls = await fetchImages();

            if (urls.length == 0){
                console.log("no new images now")
                return
            }
            // console.log(urls)
            const blobs = await fetchBlobs(urls)
            console.log(blobs)
            const formDataArr = await fetchBlobsAndTurnIntoFormData(urls)
            console.log(formDataArr)
            const predRes = await obtainPred(formDataArr)
            console.log(predRes)
            const stuffs = await processAllData(predRes, urls, blobs)
            console.log(stuffs)
            const newContamUrls = await retrieveFromFbContamImgs()
            console.log(newContamUrls)

            
     
            
            


      
            // console.log(blobs)


            // const res = await callBEAPIwithBlobs(blobs)
            // console.log(res)


            

            // for (let file_url of urls){
            //     // download image directly via url
            //     // console.log(file_url)
            //     fetch(file_url).then(
            //         response => response.blob()
                    
            //         // (response) => {
            //         //     response.arrayBuffer()
            //         // }
            //     )
            //     .then(
            //         (blob) =>  {

            //             var data = new FormData()
            //             data.append('file', blob , 'file')
            //             // data.append('filename', name)
            
            //             const stuff =  axios.post('http://127.0.0.1:5001/receive', data).then(
            //                 (response) => {
            //                     // console.log(response.data)
            //                     // console.log(file_url)
            //                     const isContam = response.data
            //                     var httpRef = projectStorage.refFromURL(file_url)
            //                     let name = httpRef.name


            //                     var contamRef = projectStorage.ref(`Rack_1/contam/${name}`)
            //                     var noContamRef = projectStorage.ref(`Rack_1/no_contam/${name}`)
            //                     // console.log(name)
            //                     // var storeRef = projectFirestore.collection('rack2').doc('contam')

            //                     if (isContam == 'contam'){
                                
            //                         contamRef.put(blob).then(
            //                             httpRef.delete().then(
            //                                 () => console.log("deleted from original place")
            //                             )
            //                         )
                                    
            //                         console.log("contam!")
            //                     }
            //                     else if (isContam == 'no_contam'){
            //                         console.log("nocon!")
            //                         noContamRef.put(blob).then(
            //                             httpRef.delete().then(
            //                                 () => console.log("deleted from original place")
            //                             )
            //                         )
            //                     }
                                

                                




                                
                                
            //                 }
            //             )
            //             .catch(error=>console.log(error))
                        
                        
                       
  
            //         }
            //     )
             
            //     }
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
