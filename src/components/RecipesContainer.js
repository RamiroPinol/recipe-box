import React from 'react';
import Recipe from './Recipe';

function RecipesContainer({ recipes, deleteRecipe }) {
  return (
    <div className="recipes">
      {recipes.map( recipe => {
        return <Recipe
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          ingredients={recipe.ingredients}
          deleteRecipe={deleteRecipe}
        />
      })}
    </div>
  )
}

export default RecipesContainer;
