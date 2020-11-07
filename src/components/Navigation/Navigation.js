import React from 'react';
import { Link } from 'react-router-dom';

const navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to='/users'>Users</Link>
      </li>
      <li>
        <Link to='/courses'>Courses</Link>
      </li>
    </ul>
  </nav>
)

export default navigation;