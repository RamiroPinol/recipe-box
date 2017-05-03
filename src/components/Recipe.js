import React from 'react';

function Recipe({ id, name, ingredients, deleteRecipe }) {
  return (
    <div>
      <div className="recipeHeader">{name}</div>
      <div className="ingredients">
        <ul>
          {ingredients.map( (ingr, index) => <li key={index}>{ingr}</li>)}
        </ul>
      </div>
      <button>Edit</button>
      <button onClick={ () => deleteRecipe(id) }>DELETE</button>
    </div>
  )
}

export default Recipe;
