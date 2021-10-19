import {
    BrowserRouter as Router,
    Switch,
    Route, 
    Redirect, 
    useParams
  } from 'react-router-dom'



export default function Details(props){




    const pageName = useParams()
    
console.log(pageName)



    return(
        <div>
            <h1>{pageName.Title} </h1>
        </div>
    )
}