import logo from './logo.svg';
import './App.css';
import Home from './components/Home.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import Profile from './components/Profile.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import axios from 'axios'

import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom'

import {
  useState,
  useEffect
} from 'react'

import Details from './components/Details';









const API_KEY = process.env.REACT_APP_API_KEY




function App() {



    // state holds user data if the user is logged in
  const [currentUser, setCurrentUser] = useState(null)
  const [results, setResults] = useState([])
  const [favs, setFavs] = useState([])
  const [query, setQuery] = useState("")
  const [count, setCount] = useState(0)






  return (
    <Router>
      <header>
        <NavigationBar currentUser={currentUser} />
      </header>

      <div className='App'>
        <Switch>
          <Route
            exact path='/'
            render={() => <Home results = {results} setResults={setResults} favs = {favs} setFavs={setFavs} API_KEY = {API_KEY}
            query = {query} setQuery={setQuery} count = {count} setCount={setCount}/>}
            />
          <Route
            exact path='/details/:Title'
            render={() => <Details results = {results} setResults={setResults} favs = {favs} setFavs={setFavs} API_KEY = {API_KEY}
            query = {query} setQuery={setQuery}/>}
            />
           

        </Switch>

      </div>


      

    </Router>




  );
}

export default App;
