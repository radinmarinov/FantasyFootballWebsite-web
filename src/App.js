import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import Team from './pages/team';

function App() {
    return (
        <Router>
        <Navbar />
        <Routes>
            <Route exact path='/' exact element={<Home />} />
            <Route path='/team' element={<Team/>} />
        </Routes>
        </Router>
    );
    }
      
    export default App;
