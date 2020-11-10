import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
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
          <Route to='/' exact>
            <BurgerBuilder />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
