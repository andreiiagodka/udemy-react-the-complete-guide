import React, { Component } from 'react';

import Course from '../../components/Course/Course';

import classes from './Courses.module.css';

class Courses extends Component {
  state = {
    courses: [
      { id: '1', title: 'Test course 1' },
      { id: '2', title: 'Test course 2' },
      { id: '3', title: 'Test course 3' },
      { id: '4', title: 'Test course 4' },
      { id: '5', title: 'Test course 5' }
    ]
  }

  render() {
    const courses = this.state.courses.map(course => {
      return <Course key={course.id} id={course.id} title={course.title} />
    })

    return (
      <div className={classes.Courses}>{courses}</div>
    )
  }
}

export default Courses;