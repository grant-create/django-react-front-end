import { variables } from "../Variables"
import {
    BrowserRouter as Router,
    Switch,
    Route, 
    Redirect, 
    useParams, 
    Link
  } from 'react-router-dom'
  import axios from "axios"
  import {
      useState,
      useEffect
    } from 'react'
  import Button from "@restart/ui/esm/Button"
  import {Container, Row, Col, Image, Form} from 'react-bootstrap'
 
  


export default function Details(props){
    
    // Use the name in the url to get the info
    const pageName = useParams()



// ---------------------------------------------------------------
    // Make another axios call to get all the details to supply on the page
    // FROM API
    useEffect (() => {
        async function getPost() {
          try{
            const response = await axios.get(`http://www.omdbapi.com/?t=${pageName.Title}&plot=full&apikey=${props.API_KEY}`)
            // console.log(response)
            props.setResults(response.data)
            
            // console.log(response.data)
          } catch (err) {
            console.log(err, "not working")
          }
        } 
        getPost() 
      },[])
// ---------------------------------------------------------------

      // THIS CALL GETS INFO FROM OUR DB

      useEffect(() => {
        async function getinfoback() {
            try{
                const response = await axios.get(variables.API_URL)
 
                props.setFavs(response.data)
                // console.log(response.data)
            } catch (err) { 
                console.log(err)
            }
            
        } 

        getinfoback()
        // page updates when count is changed 
        
    }, [props.count])
// ---------------------------------------------------------------

console.log(props.favs)
console.log(pageName)
console.log(props.results)
// ---------------------------------------------------------------

 // filter and map to find if movie is in db

 let isFavorite = "Nope"
    const filterMovies = props.favs.filter((movie) => {
        console.log(movie.name, pageName.Title)
        if (movie.name == pageName.Title){
            isFavorite = "YEP"
        }
        return movie.name.toString().toLowerCase().includes(pageName.toString().toLowerCase()) 
    })
    


// ---------------------------------------------------------------
    return(
        <div>
            <Container>
                <br/>
                <h1>{pageName.Title} </h1>
                <h4>Favorite: {isFavorite}</h4>
                <br/>
                <br/>
                

                <Row>
                    <Col>
                    <Image style={{}} src={props.results.Poster}/>
                    </Col>
                    <Col>
                    <h5>Director: {props.results.Director}</h5>
                    <h5>Actors: {props.results.Actors}</h5>
                    <h5>Genre: {props.results.Genre}</h5>
                    <h6>Rated: {props.results.Rated}</h6>
                    <h6>Runtime: {props.results.Runtime}</h6>
                    <h6>IMDB Rating: {props.results.imdbRating}</h6>
                    <h6>Released: {props.results.Released}</h6>
                    <p> {props.results.Plot}</p>
                    <br/>
                    <br/>
                    <br/>
                    </Col>
                </Row>
            </Container>





        <style>{`
        
        p{
            text-align: left;
        }
        h5{
            text-align: left;
        }
        h6{
            text-align: left;
        }
        
        
        
        `}</style>










       
        </div>
    )
}

