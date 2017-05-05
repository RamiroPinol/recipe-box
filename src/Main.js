import React, { Component } from 'react';
import Header from './components/Header';
import ModalPanel from './components/ModalPanel';
import RecipesContainer from './components/RecipesContainer';
import { getRecipes, addRecipe, deleteRecipe } from './storageAPI';
import { Button } from 'react-bootstrap';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [...getRecipes()],
    }

    this.onRecipeDelete = this.onRecipeDelete.bind(this);
    this.onRecipeAdd = this.onRecipeAdd.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  onRecipeDelete(id) {
    deleteRecipe(id); //delete recipe from localStorage
    this.setState({ recipes: [...getRecipes()] });
  }

  // Function used to add a recipe. Both name and ingr should be strings
  onRecipeAdd(name, ingr) {
    const recipeObj = {
      id: Date.now().toString(),
      name,
      ingredients: [...ingr.split(',').filter(igr => igr.length).map(igr => igr.trim())]
    }

    addRecipe(recipeObj);
    this.setState({ recipes: [...getRecipes()] });
  }

  onRecipeEdit() {
    // Function for edit recipe. Should populate addRecipe modal with recipe info
    // and replace recipe if a value changes (do nothing if no changes)
  }

  handleInputSubmit(event) {
    this.onRecipeAdd(event.target.name.value , event.target.ingredients.value);
    this.setState({ recipes: [...getRecipes()] }); // Get updated data
    event.preventDefault();
  }

  render() {
    return (
      <div className="Main">
        <Header />

        <ModalPanel onSubmit={this.handleInputSubmit}/>

        <RecipesContainer
          recipes={this.state.recipes}
          deleteRecipe={this.onRecipeDelete}
        />
      </div>
    );
  }
}

export default Main;
