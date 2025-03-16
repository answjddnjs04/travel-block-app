import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlockList from './components/BlockList';
import BlockForm from './components/BlockForm';
import BlockDetail from './components/BlockDetail';
import PlanList from './components/PlanList';
import PlanForm from './components/PlanForm';
import PlanDetail from './components/PlanDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            {/* 블록 관련 라우트 */}
            <Route path="/" element={<BlockList />} />
            <Route path="/create" element={<BlockForm />} />
            <Route path="/edit/:id" element={<BlockForm />} />
            <Route path="/block/:id" element={<BlockDetail />} />
            
            {/* 여행 계획 관련 라우트 */}
            <Route path="/plans" element={<PlanList />} />
            <Route path="/plans/create" element={<PlanForm />} />
            <Route path="/plans/edit/:id" element={<PlanForm />} />
            <Route path="/plans/:id" element={<PlanDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
