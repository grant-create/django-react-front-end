
import axios from "axios"
import {
    useState,
    useEffect
  } from 'react'

 

export default function Home(props){

    const test = () => {
        console.log("TESTTTTTing")
        return(
            
            <p>test</p>
            )
    }
    console.log(props.API_KEY)

    useEffect (() => {
        async function getPost() {
          try{
            const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${props.API_KEY}`)
            console.log(response)
            props.setResults(response.data)
            
            console.log(response.data)
          } catch (err) {
            console.log(err, "not working")
          }
        } 
        getPost() 
      }, [])
    
    //   props.setResults("")

    console.log(props.results)
    console.log(props.results)

    async function getback() {
        try{
          const response = await axios.get(`localhost:8000/api/movies/`)
          console.log(response)
        //   props.setResults(response.data)
          
          console.log(response.data)
        } catch (err) {
          console.log(err, "not working")
        }
      } 
      getback()
      


 






      
    return(
        <div>

            <h1>Hello</h1>
            {test()}
    



        </div>
    )}