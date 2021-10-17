import logo from './logo.svg';
import './App.css';
import Home from './components/Home.jsx'

import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom'

import {
  useState,
  useEffect
} from 'react'




let API_KEY = process.env.REACT_APP_API_KEY









function App() {



    // state holds user data if the user is logged in
  const [currentUser, setCurrentUser] = useState(null)

  useEffect (() => {
    async function getPost() {
      try{
        const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${api_key}`)
        setResults(response.data.data)
        
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPost()
  }, [])




  return (
    <Router>
      <header>
        <Navigation currentUser={currentUser} />
      </header>

      <div className='App'>
        <Switch>
          <Route
            exact path='/'
            render={() => <Home results = {results} setResults={setResults}/>}
            />
           <Route 
            path="/register"
            render={ props => <Register {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser }/> }
          />

          <Route 
            path="/login"
            render={ props => <Login {...props} currentUser={ currentUser } setCurrentUser={ setCurrentUser }/> }
          />

          {/* eventually we will do a condintional render here */}
          <Route 
            path="/profile"
            render={ props => currentUser ? <Profile {...props} results={results} currentUser={ currentUser } setCurrentUser={ setCurrentUser } handleLogout={handleLogout}/> : <Redirect to="/login"/> }
          />

        </Switch>

      </div>


      

    </Router>




  );
}

export default App;
