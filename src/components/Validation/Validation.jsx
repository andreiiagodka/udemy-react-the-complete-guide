import React from 'react';

const Validation = (props) => {
  const error_short = props.length < 5 ? 'Text too short' : null
  const error_long = props.length > 10 ? 'Text long enough' : null

  return <p>{error_short || error_long}</p>
}

export default Validation;
