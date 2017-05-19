import React from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';

function RecipesContainer({ recipes, deleteRecipe, editRecipe }) {
  // Sort recipes alphabetically
  const sortedRecipes = recipes.sort((a, b) => (a.name > b.name) ? 1 : -1);

  return (
    <div className="container recipes">
      <div className="row">
        {sortedRecipes.map(recipe =>
          <Recipe
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            ingredients={recipe.ingredients}
            deleteRecipe={deleteRecipe}
            editRecipe={editRecipe}
          />)}
      </div>
    </div>
  );
}

RecipesContainer.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
};

export default RecipesContainer;
