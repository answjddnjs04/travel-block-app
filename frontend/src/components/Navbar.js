import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <Link to="/">여행 블록</Link>
      </h1>
      <ul>
        <li>
          <Link to="/">블록 목록</Link>
        </li>
        <li>
          <Link to="/create">새 블록</Link>
        </li>
        <li>
          <Link to="/plans">여행 계획</Link>
        </li>
        <li>
          <Link to="/plans/create">새 여행 계획</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
