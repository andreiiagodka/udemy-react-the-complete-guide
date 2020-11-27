import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('https://burger-builder-34ea0.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data})
    //   })
    //   .catch(error => {
    //     this.setState({error: true})
    //   })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((sum, element) => {
        return sum + element
      }, 0)
    
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount

    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const updatedCount = oldCount - 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount

    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHadnler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disabledInfo = { ...this.props.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = <Spinner />
    let orderSummary = null

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            price={this.state.totalPrice}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHadnler}
          />
        </Aux>
      )

      orderSummary = (
        <OrderSummary 
          ingredients={this.props.ingredients}
          price={this.state.totalPrice.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} 
        />
      )
    }

    if (this.state.loading) {
      orderSummary = this.state.error ? <p>Ingredients can't be loaded!</p>  : <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHadnler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
    onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)))