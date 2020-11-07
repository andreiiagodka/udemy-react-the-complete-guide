import React from 'react';

import classes from './Course.module.css';

const course = props => (
  <div className={classes.Course} >
    <h3>Course #{props.id}</h3>
    <p>{props.title}</p>
  </div>
)

export default course;
