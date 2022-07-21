import React, { useEffect } from 'react'
import axios from 'axios'

export const TestFlask = () => {
  useEffect(()=>{
    const flaskTest = async() => {
      const stuff = await axios.get('http://127.0.0.1:5001').then(
        response => {
          console.log(response.data)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
      // const stuff = response.data
      // console.log(stuff)
    }

    flaskTest()
  }, [])
  return (
    <div>TestFlask</div>
  )
}
