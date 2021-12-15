import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getParkPosts } from './services/parkPostServices';
import './style.css';
import { GlobalStyle } from './styled-components/globalStyles';
import { ListView } from './component/ListView';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
import MapView from './component/MapView';
import About from './component/About';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';


const App = () => {
  const [parkPosts, setParkPosts] = useState([]);
  // first things first, load
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getParkPosts()
      .then(posts => {
        console.log(posts)
        setParkPosts(posts)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <GlobalStyle />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MapView />}></Route>
          <Route path="/list" element={<ListView loading={loading} posts={parkPosts} />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
