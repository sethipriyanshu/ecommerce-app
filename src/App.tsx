import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home } from './pages/home';
import { Shop } from './pages/shop';
import { Contact } from './pages/contact';
import { About } from './pages/about';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/shop' element = {<Shop/>}/>
          <Route path='/contact' element = {<Contact/>}/>
          <Route path='/about' element = {<About/>}/>
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
