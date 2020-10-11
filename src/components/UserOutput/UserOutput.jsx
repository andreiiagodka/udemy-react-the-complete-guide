import React from 'react';
import './UserOutput.css';

const UserOutput = (props) => {
  return (
    <div className="UserOutput">
      <p>Username: {props.name}</p>
      <p>Name is good!</p>
    </div>
  )
}

export default UserOutput;