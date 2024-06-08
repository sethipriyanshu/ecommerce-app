import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home } from './pages/home';
import { Shop } from './pages/shop';
import { Contact } from './pages/contact';
import { About } from './pages/about';
import { Navbar } from './components/navbar';
import { Profile } from './pages/profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/shop' element = {<Shop/>}/>
          <Route path='/contact' element = {<Contact/>}/>
          <Route path='/about' element = {<About/>}/>
          <Route path='/profile' element = {<Profile/>}/>
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
