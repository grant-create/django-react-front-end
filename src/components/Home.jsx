import { variables } from "../Variables"
import {Container, Row, Col, Image, Form} from 'react-bootstrap'
import axios from "axios"
import {
    useState,
    useEffect
  } from 'react'
import Button from "@restart/ui/esm/Button"

 

export default function Home(props){

    
    

    useEffect (() => {
        async function getPost() {
          try{
            const response = await axios.get(`http://www.omdbapi.com/?t=${props.query}&apikey=${props.API_KEY}`)
            console.log(response)
            props.setResults(response.data)
            
            console.log(response.data)
          } catch (err) {
            console.log(err, "not working")
          }
        } 
        getPost() 
      },[props.query])
    
      console.log(props.query)
      console.log()

   
    

// use useEffect to only pull the info on page load.
// also grabs the results from the postgres db

    useEffect(() => {
        async function getinfoback() {
            try{
                const response = await axios.get(variables.API_URL)
 
                props.setFavs(response.data)
 
            } catch (err) { 
                console.log(err)
            }
            
        } 

        getinfoback()
    }, [])
    
   console.log(props.favs)
   console.log(props.query)
   console.log(props.results)

    // add the names to a new array as list items
    let allNames = props.favs.map((x, index) =>
   
    <li>
        <ul>
            <li><Image style={{}} src={x.image}/></li>
            <li>{x.name}</li>
            <li>{x.runtime}</li>

        </ul>
    </li>
    )
    

    let images, title, runtime

    if(props.results){


        images = props.results.Poster
        title = props.results.Title
        runtime = props.results.Runtime
    
    // )
}

    // Show user favorite movies
    // let user search for and favorite movie
    // if not in favorites, it will add to db
    // if movie already in favorites, it will remove



    async function handleFavorite(e, title, images, runtime) {
        e.preventDefault()
        // console.log('add to faves')

        // check if movie is already in favorites
        let inFavorites = false
        let addDelete = 'add'
        // for(favorite of props.favs){
        //     if(favorite.name == title){
        //         inFavorites = True
        //     }
        // }
        // add the appropriate end to the put route
        console.log(title, runtime)
        await axios.post(`http://127.0.0.1:8000/api/movies/`, 
        {name: title,
        runtime: runtime,
        image: images
    })
       
      }




      
    return(
        <div>

            <h1>Hello</h1>
            <ul>
                {allNames}

            </ul>
            <Form className="d-flex" >
      <input
        type="search"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
        onSubmit={(e) => e.preventDefault}
      />
      
    </Form>

        <div>
            
        </div>

           {title}
           {runtime}
           <Image src={images}/>
           <button onClick={(e) => handleFavorite(e, title, images, runtime)}>Add to favorites</button>
           



        </div>
    )}