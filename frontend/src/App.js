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
