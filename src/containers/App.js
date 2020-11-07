import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navigation from '../components/Navigation/Navigation'; 
import Users from '../components/Users/Users'; 
import NoMatch from '../components/NoMatch/NoMatch'; 
import Courses from './Courses/Courses'; 

import classes from './App.module.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Navigation />

          <Switch>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/courses'>
              <Courses />
            </Route>
            <Route path='/all-courses'>
              <Redirect to='/courses' />
            </Route>
            <Route path='*'>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App