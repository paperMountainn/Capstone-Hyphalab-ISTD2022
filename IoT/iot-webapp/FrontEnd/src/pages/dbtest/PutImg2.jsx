import React, {useEffect ,useState} from 'react'
import { projectStorage, projectFirestore, timestamp } from '../../config/firebase-config';
import axios from 'axios';

export const PutImg2 = () => {
    
    useEffect(() => {
        const fetchImages = async () => {
            
            let result = await projectStorage.ref().child('Rack_1').child('uploaded_images').listAll()
            // let metadata = await projectStorage.ref('data').getMetadata();
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
        
            return Promise.all(urlPromises);
        }

       
        

        const loadImages = async () => {
            
            const urls = await fetchImages();
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
                        console.log(blob)
                        var data = new FormData()
                        data.append('file', blob , 'file')
                        
                        const stuff =  axios.post('http://127.0.0.1:5001/receive', data).then(
                          (response) => {
                            const isContam = response.data
                            console.log(isContam)

                            let httpRef = projectStorage.refFromURL(file_url)
                            let name = httpRef.name
                            console.log(name)

                            
                            let contamStorageRef = projectStorage.ref(`Rack_1/contam/${name}`)
                            let noContamStorageRef = projectStorage.ref(`Rack_1/no_contam/${name}`)
                            let contamCollectionRef = projectFirestore.collection('Rack_1').doc('26-06-2022').collection('contam')
                            let noContamCollectionRef = projectFirestore.collection('Rack_1').doc('26-06-2022').collection('no_contam')
                            
                            if (isContam == "contam"){
                              contamStorageRef.put(blob).on('state_changed', (snap)=>{
                                console.log(snap)
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
                        // data.append('filename', name)
            
                        // const stuff =  axios.post('http://127.0.0.1:5001/receive', data).then(
                        //     (response) => {
                        //         // console.log(response.data)
                        //         // console.log(file_url)
                        //         const isContam = response.data
                        //         var httpRef = projectStorage.refFromURL(file_url)
                        //         let name = httpRef.name


                        //         const contamStorageRef = projectStorage.ref(`Rack_1/contam/${name}`)
                        //         const noContamStorageRef = projectStorage.ref(`Rack_1/no_contam/${name}`)

                        //         const contamCollRef = projectFirestore.collection('Rack_1').doc('26-06-2022').collection('no_contam')
                        //         const noContamCollRef = projectFirestore.collection('Rack_1').doc('26-06-2022').collection('no_contam')

                        //         if (isContam == 'contam'){
                        //           contamStorageRef.put(blob).on('state_changed', (snap)=>{

                        //           }),
                        //           (err) =>{
                        //             console.log(err)
                        //           },
                        //           async() => {
                        //             const url = await contamStorageRef.getDownloadURL()
                        //             const createdAt = new Date()
                        //             contamCollRef.add(
                        //               {
                        //                 url: url,
                        //                 createdAt: createdAt
                        //               }
                        //             )
                        //             console.log("Added 1 img")
                        //           }
                                  
                        //         }
                                

                        //         // if (isContam == 'contam'){
                                
                        //         //     contamRef.put(blob).then(
                        //         //         httpRef.delete().then(
                        //         //             () => console.log("deleted from original place")
                        //         //         )
                        //         //     )
                                    
                        //         //     console.log("contam!")
                        //         // }
                        //         // else if (isContam == 'no_contam'){
                        //         //     console.log("nocon!")
                        //         //     noContamRef.put(blob).then(
                        //         //         httpRef.delete().then(
                        //         //             () => console.log("deleted from original place")
                        //         //         )
                        //         //     )
                        //         // }
                                

                                




                                
                                
                        //     }
                        // )
                        // .catch(error=>console.log(error))
                        
                        
                       
  
                    }
                )
             
                }
        }
        
        
        // loadImages()

        
    }, []);
    
 
    return (  
        
        <div>

        </div>
    )
}
