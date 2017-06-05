import React from 'react';
import PropTypes from 'prop-types';
import { Button, Accordion, Panel } from 'react-bootstrap';

function Recipe({ id, name, ingredients, deleteRecipe, editRecipe }) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <Accordion>

        <Panel header={name} eventKey={id}>

          <Button
            className="delete-button"
            onClick={() => deleteRecipe(id)}
          ><i className="glyphicon glyphicon-remove" aria-hidden="true" />
          </Button>

          <div className="ingredients">
            <ul>
              {ingredients.map(ingr => <li key={`${id}${ingr}`}>{ingr}</li>)}
            </ul>
          </div>
          <Button
            bsStyle="default"
            onClick={() => editRecipe(name, ingredients, id)}
          ><i className="glyphicon glyphicon-pencil" aria-hidden="true" /> <b>Edit</b>
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
  ingredients: PropTypes.array.isRequired,
};

export default Recipe;
