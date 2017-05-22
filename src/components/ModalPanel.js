import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class ModalPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ingredients: '',
    };

    this.newRecipe = this.newRecipe.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngrChange = this.handleIngrChange.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
    this.clearRecipeValues = this.clearRecipeValues.bind(this);
  }

  newRecipe() {
    this.props.toggle();
    this.props.clear(); // Clear Main component name and ingr states
    this.clearRecipeValues();
  }

  // Clears state to re-check new input
  clearRecipeValues() {
    this.setState({ name: '', ingredients: '' });
  }

  // Updates name state value
  handleNameChange(event) {
    const nameValue = event.target.value;
    this.setState({ name: nameValue });
  }

  // Updates ingredients state value
  handleIngrChange(event) {
    const ingrValue = event.target.value;
    this.setState({ ingredients: ingrValue });
  }

  // Check if entered input is valid
  canBeSubmitted() {
    return {
      name: this.state.name.length > 2,
      ingredients: this.state.ingredients.split(',').filter(igr => igr.length).length > 1,
    };
  }

  render() {
    const { onSubmit, show, ingrs, name } = this.props;
    const validate = this.canBeSubmitted();

    return (
      <div>
        <Button
          className="addRecipeBtn"
          onClick={this.newRecipe}
        >Add recipe
        </Button>

        <Modal
          show={show}
          onHide={this.props.toggle}
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
                  onChange={this.handleNameChange}
                />
              </FormGroup>

              {/* Shows warning alert when input is invalid */}
              { !validate.name && this.state.name.length > 0 &&
                <div className="alert alert-danger" role="alert">
                  Recipe name should be at least 3 characters long.
                </div>
              }

              <FormGroup controlId="formControlIngredient">
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  type="text"
                  name="ingredients"
                  defaultValue={ingrs}
                  placeholder="Enter ingredients"
                  onChange={this.handleIngrChange}
                />
                <HelpBlock>Separate ingredients with commas</HelpBlock>

                { !validate.ingredients && this.state.ingredients.length > 0 &&
                  <div className="alert alert-danger" role="alert">
                    Recipe should have at least 2 ingredients.
                  </div>
                }

              </FormGroup>

            </Modal.Body>

            <Modal.Footer>

              <Button
                type="submit"
                bsStyle="primary"
                onClick={this.props.toggle}
                disabled={!(validate.name && validate.ingredients)}
              >Add Recipe
              </Button>

              <Button bsStyle="danger" onClick={this.props.toggle}>Cancel</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
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
