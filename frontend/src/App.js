import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlockList from './components/BlockList';
import BlockForm from './components/BlockForm';
import BlockDetail from './components/BlockDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<BlockList />} />
            <Route path="/create" element={<BlockForm />} />
            <Route path="/edit/:id" element={<BlockForm />} />
            <Route path="/block/:id" element={<BlockDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
