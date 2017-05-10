import React from 'react';
import { Button, Accordion, Panel } from 'react-bootstrap';

function Recipe({ id, name, ingredients, deleteRecipe, editRecipe }) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <Accordion>
        <Panel header={name} eventKey={id}>
          <div className="ingredients">
            <ul>
              {ingredients.map( (ingr, index) => <li key={index}>{ingr}</li>)}
            </ul>
          </div>
          <Button
            bsStyle="primary"
            onClick={ () => editRecipe(name, ingredients, id) }>
            Edit
          </Button>
          <Button
            bsStyle="danger"
            onClick={ () => deleteRecipe(id) }>
            DELETE
          </Button>
        </Panel>
      </Accordion>
    </div>
  )
}

export default Recipe;
