import React, { useState, useEffect} from 'react'
import axios from "axios";

export const MongoTryPhases = () => {
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    const fetchResults = async() => {
      const response = await axios.get(`/phase`) 
      const stuffs = response.data
      console.log(stuffs)
    }
    const createPhase = async() => {
      const phaseData = {
        phaseType:"",
        phaseStartDate: new Date(),
        phaseEndDate: new Date(),
        phaseDescription: "hi"
      }
      const phaseData1 = {"status":"ongoing","phaseType":"farming","phaseStartDate":"2022-07-09T16:00:00.000Z","phaseEndDate":"2022-07-16T15:59:59.999Z","phaseDescription":"adf","belongsToRack":"62cd9d84389a537326653eac","belongsToCycle":"62cd9d84389a537326653eb3"}
      
      const response = await axios.post('/phase/new/', phaseData1, { headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
      console.log(response)
    }

    const fetchCycles = async() => {
      const response = await axios.get(`/cycle/avail-cycles`) 
      console.log(response)
      const stuffs = response.data
      console.log(stuffs)
    }
    const fetchAvailRacks = async() => {
      const response = await axios.get(`/rack/avail-racks`) 
      // console.log(response)
      const stuffs = response.data
      console.log(stuffs)
    }

    // create new phase
    const updateCycle = async() => {
      const hardcodedCycleUID = '62cfeb38aef70e44c8d7f4d8'
      const hardcodedPhaseUID = '62cfeb38aef70e44c8d7f4dc'
      const hardcodedRackUID = '62cfeb38aef70e44c8d7f4d4'
      
      const response = await axios.patch(`/cycle/${hardcodedCycleUID}`, {phaseId: hardcodedPhaseUID, cycleId:hardcodedRackUID}) 
      // console.log(response)
      const stuffs = response.data
      console.log(stuffs)
    }

    // create new phase
    const updateRack = async() => {
      const hardcodedCycleUID = '62ce9d47f8bea8a035a4f1c7'
      const hardcodedRackUID = '62ce9d47f8bea8a035a4f1c2'
      
      const response = await axios.patch(`/rack/use-rack/${hardcodedRackUID}`, {cycleId: hardcodedCycleUID, phaseType:"incubation"}) 
      // console.log(response)

      const stuffs = response.data
      console.log(stuffs)
    }

    // retrieve all cycles
    const fetchAllCycles = async() => {
      const response = await axios.get(`/cycle/`)
      // console.log(response)
      const allCyles = response.data
      let cycleList = []
      for (let cycle of allCyles){
        console.log(cycle)
        const {containPhases, _id, cycleName, cycleDescription, cycleStatus} = cycle
        cycleList.push({containPhases, id: _id, cycleName, cycleDescription, cycleStatus})
      }
      console.log(cycleList)
    }
    
    const createCycle = async() => {
     
      const cycleData = {cycleStatus: 'unused', cycleName: 'steph cycle', cycleDescription: 'this cycle sucks'}
      
      const response = await axios.post('/cycle/new/', cycleData)
      
      console.log(response)
    }

    const fetchAllRacks = async() => {
      const response = await axios.get(`/rack`) 
      const stuffs = response.data
      console.log(stuffs)
    }

    
    
    // fetchResults()
    // createPhase()
    // fetchCycles()
    // fetchAvailRacks()
    // updateCycle()
    // updateRack()
    // fetchAllCycles()
    // createCycle()
    fetchAllRacks()

    
 }, []);
  return (
    <div>
      
    hi
    </div>
  )
}
