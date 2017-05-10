import React from 'react';
import Recipe from './Recipe';

function RecipesContainer({ recipes, deleteRecipe, editRecipe}) {
  return (
    <div className="container recipes">
      {/* <div className="row"> */}
      {recipes.map( recipe => {
        return <Recipe
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          ingredients={recipe.ingredients}
          deleteRecipe={deleteRecipe}
          editRecipe={editRecipe}
        />
      })}
      {/* </div> */}
    </div>
  )
}

export default RecipesContainer;
