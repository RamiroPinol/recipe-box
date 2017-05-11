import React from 'react';
import PropTypes from 'prop-types';
import { Button, Accordion, Panel } from 'react-bootstrap';

function Recipe({ id, name, ingredients, deleteRecipe, editRecipe }) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <Accordion>
        <Panel header={name} eventKey={id}>
          <div className="ingredients">
            <ul>
              {ingredients.map(ingr => <li key={id}>{ingr}</li>)}
            </ul>
          </div>
          <Button
            bsStyle="primary"
            onClick={() => editRecipe(name, ingredients, id)}
          >Edit
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => deleteRecipe(id)}
          >DELETE
          </Button>
        </Panel>
      </Accordion>
    </div>
  );
}

Recipe.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf.isRequired,
};

export default Recipe;
