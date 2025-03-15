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
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/create">새 블록 만들기</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
