import { variables } from "../Variables"
import {Container, Row, Col, Image, Form, } from 'react-bootstrap'
import axios from "axios"
import {
    useState,
    useEffect
  } from 'react'
import Button from "@restart/ui/esm/Button"
import { Link } from "react-router-dom"

 

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
let s =props.count
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
        // page updates when count is changed 
        
    }, [props.count])


   // ---------------------------------------------------------------

   // TEST OUTPUT
   console.log(props.favs)
   console.log(props.query)
   console.log(props.results)

   // ---------------------------------------------------------------
    // Display FROM BACKEND

    // FAVORITES: 

    // add the names and DB info to a new array as list items
    let allNames = props.favs.map((x, index) =>
            
            <li>
                <Link to={`/details/${x.name}`}>
                    <Image style={{}} src={x.image}/>
                    {x.name}
                </Link>
                <br/>
                {x.runtime}
                <br/>
                
                <Button variant="outline-danger" onClick={(e) => handleDelete(e, x.id)}>Remove from favorites</Button>

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
    // add description page

// ---------------------------------------------------------------

// FAVORITE BUTTON

    async function handleFavorite(e, title, images, runtime) {
        e.preventDefault()
        // USING COUNT AND S TO RELOAD PAGE EVERY TIME NEW FAV ADDED
        s++
        props.setCount(s)
        console.log("count", props.count)

        // check if movie is already in favorites
        let inFavorites = false
        

        // for(let favorite of props.favs){
        //     if(favorite.name == title){
        //         inFavorites = true
        //     }
        // }
        //add the appropriate end to the put route
        console.log(title, runtime)

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
    // USING COUNT AND S TO RELOAD PAGE EVERY TIME NEW FAV ADDED
    s++
    props.setCount(s)
    console.log("count", props.count)

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

        <div className='searchresults'>
            

           <Button onClick={(e) => handleFavorite(e, title, images, runtime)}>Add to Favorites</Button>
            <br/>
            <Link to={`/details/${title}`}>
           <h4>{title} </h4>
            </Link>
           
           {runtime}
           <Image src={images}/>
        </div>
           
           
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
            margin-bottom: 40%;
        }

        Form{
            display: grid;
            justify-content: center;
        }

        .scrollable {
            height: 100%; /* or any value */
            width: 100%;
            overflow-y: auto;
            
            
        }
        
        .searchbox{
            margin: .5%
        }

        .searchresults{
            display: grid;
            justify-content: center;
        }


        `}</style>


        </div>
    )}

    