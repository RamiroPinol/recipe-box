import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

function ModalPanel({ onSubmit, show, ingrs, name, toggle, clear }) {
  function newRecipe() {
    toggle();
    clear();
  }

  return (
    <div>
      <Button
        className="addRecipeBtn"
        onClick={newRecipe}
      >Add recipe
      </Button>

      <Modal
        show={show}
        onHide={toggle}
        aria-labelledby="ModalHeader"
      >
        <form onSubmit={onSubmit}>
          <Modal.Body>

            <FormGroup controlId="formControlName">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                name="name"
                defaultValue={name}
                placeholder="Enter recipe name"
              />
            </FormGroup>

            <FormGroup controlId="formControlIngredient">
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl
                type="text"
                name="ingredients"
                defaultValue={ingrs}
                placeholder="Enter ingredients"
              />
              <HelpBlock>Separate ingredients with commas</HelpBlock>
            </FormGroup>

          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" bsStyle="primary" onClick={toggle}>Add Recipe</Button>
            <Button bsStyle="danger" onClick={toggle}>Cancel</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

ModalPanel.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  ingrs: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

export default ModalPanel;
