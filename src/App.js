import React, { useEffect, useState, useReducer } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { getParkPosts, getParkPost, getPosts, getPost } from './services/parkPostServices';
import { GlobalStyle } from './styled-components/globalStyles';
import { StateContext } from './utils/stateContext';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
import MapView from './component/MapView';
import About from './component/About';
import SignIn from './component/SignIn';
import Park from './component/Park';
import SignUp from './component/SignUp';
import reducer from './utils/reducer';
import Dropdown from './component/Dropdown';
import ParkPosts from './component/ParkPosts';
import './style.css';
import initialState from './config/initialState';

const App = () => {

  const [store, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const { posts, parkPosts } = store;
  const [park, setPark] = useState(null);
  const {id} = useParams();

  // hamburger menu toggle
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect( () => {
    // hides dropdown menu when screen expands
    const hideMenu = () => {
      if(window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        console.log('resized');
      }
    };

    window.addEventListener('resize', hideMenu);
    return () => {
      window.removeEventListener('resize', hideMenu);
    }
  }) 
  // END hamburger menu toggle


  // Parks data from parkServices.js
  useEffect(() => {
    getParkPosts()
      .then(parks => { 
        console.log(parks)
        dispatch({
          type: 'setParkPosts',
          data: parks
        })
      })
      .catch(err => console.log(err))
      .finally(() => 
        dispatch({
          type: 'setLoading',
          data: false
        })  
      )
  }, [])

  // Park data from parkServices.js
  useEffect(() => {
    getParkPost()
      .then(parks => {
        dispatch({
          type: 'setParkPost',
          data: parks
        })
      })
      .catch(err => console.log(err))
      .finally(() => 
        dispatch({
          type: 'setLoading',
          data: false
        })  
      )
  }, [])

  useEffect(() => {
    getPosts()
      .then(posts => {
        console.log(posts)
        dispatch({
          type: 'setPosts',
          data: posts
        })
      })
      .catch(err => console.log(err))
      .finally(() => 
        dispatch({
          type: 'setLoading',
          data: false
        })  
      )
  }, [])

  useEffect(() => {
    getPost()
      .then(posts => {
        dispatch({
          type: 'setPost',
          data: posts
        })
      })
      .catch(err => console.log(err))
      .finally(() => 
        dispatch({
          type: 'setLoading',
          data: false
        })  
      )
  }, [])

  // getParkPosts by params id
  useEffect(() => {
    getParkPost(parkPosts, id)
      .then(park => setPark(park))
      .catch(error => console.log(error))
      .finally(() => setLoading(false)
      )
  }, [parkPosts, id])

  // get parkComment 
  useEffect(() => {
    getPosts()
      .then(posts => {
        console.log(posts)
        dispatch({
          type: 'setPost',
          data: posts
        })
      })
      .catch(err => console.log(err))
      .finally(() => 
        dispatch({
          type: 'setLoading',
          data: false
        })  
      )
  }, [posts])

  // useEffect(() => {
  //   retrieveUserFromJWT()
  //     .then(response => dispatch({type:"setLoggedInUser", data: response.username}))
  // }, [token])

  return (
    <>
      <StateContext.Provider value={{ store: store, dispatch }}>
        <GlobalStyle />
        <BrowserRouter>
          <NavBar toggle={toggle} />
          <Dropdown isOpen={isOpen} toggle={toggle} />
          <Routes>
            <Route path="/" element={<MapView />}></Route>
            <Route path="/parks" element={<ParkPosts />}></Route>
            <Route path="/parks/:id" element={<Park/>} />
              {/* <Route path="/newcomment" element={<NewParkComment  />} /> */}
            {/* </Route> */}
            <Route path="/about" element={<About />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </StateContext.Provider>
    </>
  )
}

export default App
