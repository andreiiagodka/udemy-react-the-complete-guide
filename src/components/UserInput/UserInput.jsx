import React from 'react';

const UserInput = (props) => {
  const inputStyle = {
    border: '2px solid red'
  }

  return (
    <div>
      <input 
        type='text'
        style={inputStyle}
        defaultValue={props.name}
        onChange={props.onChangeHandler}
      />
    </div>
  )
}

export default UserInput;