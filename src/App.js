import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup()
  }

  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout'>
              <Checkout />
            </Route>
            <Route path='/orders'>
              <Orders />
            </Route>
            <Route path='/auth'>
              <Auth />
            </Route>
            <Route path='/logout'>
              <Logout />
            </Route>
            <Route to='/' exact>
              <BurgerBuilder />
            </Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
