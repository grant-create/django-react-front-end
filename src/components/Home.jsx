import { variables } from "../Variables"
import {Container, Row, Col, Image, Form} from 'react-bootstrap'
import axios from "axios"
import {
    useState,
    useEffect
  } from 'react'
import Button from "@restart/ui/esm/Button"

 

export default function Home(props){

    
    // Pulls data from OMDB API KEY whenever props.query is updated aka when typing in search bar

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

   
// ---------------------------------------------------------------

// use useEffect to reload the info when it's updated.
// also grabs the results from the postgres db
let count = 0
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
        // page updates when props.favs is changed 
        console.log(count)
    }, [count])


   // ---------------------------------------------------------------

   // TESTS
   console.log(props.favs)
   console.log(props.query)
   console.log(props.results)

   // ---------------------------------------------------------------
    // FROM BACKEND
    // add the names and DB info to a new array as list items
    let allNames = props.favs.map((x, index) =>
            
            <li>
                <Image style={{}} src={x.image}/>
                {x.name}
                <br/>
                {x.runtime}
                <br/>
                
                <button onClick={(e) => handleDelete(e, x.id)}>Remove from favorites</button>

            </li>

       
    
    )
    // ---------------------------------------------------------------

    // how to only have the search items show up if they are present
    
    // need to define ahead of time
    let images, title, runtime

    // if they exsist show them, otherwise show nothing.
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

// ---------------------------------------------------------------

// FAVORITE BUTTON

    async function handleFavorite(e, title, images, runtime) {
        e.preventDefault()
        
        // USING COUNT TO RELOAD PAGE EVERY TIME NEW FAV ADDED
        count ++
        console.log("count", count)

        // check if movie is already in favorites
        let inFavorites = false
        let addDelete = 'add'

        // for(favorite of props.favs){
        //     if(favorite.name == title){
        //         inFavorites = True
        //     }
        // }
        // add the appropriate end to the put route
        // console.log(title, runtime)

        await axios.post(`http://127.0.0.1:8000/api/movies/`, 
        {name: title,
        runtime: runtime,
        image: images
    })
       
      }
// ---------------------------------------------------------------
// UNFAVORITE BUTTON

async function handleDelete(e, id) {
    e.preventDefault()
    
    // USING COUNT TO RELOAD PAGE EVERY TIME NEW FAV ADDED
    count ++
    console.log("count", count)

    // check if movie is already in favorites
    let inFavorites = false
    let addDelete = 'add'

    // add the appropriate end to the put route
    // console.log(title, runtime)

    await axios.delete(`http://127.0.0.1:8000/api/movies/${id}/`, 
    {id: id})
   
  }









// ---------------------------------------------------------------


      
    return(
        <div className="main">

            <h1>Your Favorites:</h1>
            <div className='scrollable'>

            <ul>
                {allNames}

            </ul>
            </div>

        <h3>Search for a movie</h3>
    {/* search bar and button below */}
    <Form className="d-flex searchbox" >
      <input
        type="search"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
        placeholder="Type something here!"
        className="mr-2"
        aria-label="Search for Movies"
        onSubmit={(e) => e.preventDefault}
      />
      
    </Form>

        <div>
            
        </div>

           {title}
           {runtime}
           <Image src={images}/>
           <button onClick={(e) => handleFavorite(e, title, images, runtime)}>Add to favorites</button>
           
           
        <style>{`
        ul {
            list-style-type: none;
            display: flex;
            margin-right: 1%;
        }

        li {
            margin: 1%;
        }
        
        .main{
            margin-bottom: 10%;
        }

        Form{
            display: grid;
            justify-content: center;
        }

        .scrollable {
            height: 100%; /* or any value */
            overflow-y: auto;
        }
        
        .searchbox{
            margin: .5%
        }

        `}</style>


        </div>
    )}

    