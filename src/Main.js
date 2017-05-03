import React, { Component } from 'react';
import Header from './components/Header';
import RecipesContainer from './components/RecipesContainer';
import { getRecipes, addRecipe, deleteRecipe } from './storageAPI';

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
      id: Date.now(),
      name,
      ingredients: [...ingr.replace(/\s+/g, '').split(',')]
    }

    addRecipe(recipeObj);
    this.setState({ recipes: [...getRecipes()] });
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

        <form onSubmit={this.handleInputSubmit}>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Ingredients:
            <input type="text" name="ingredients" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <RecipesContainer
          recipes={this.state.recipes}
          deleteRecipe={this.onRecipeDelete}
        />
      </div>
    );
  }
}

export default Main;
