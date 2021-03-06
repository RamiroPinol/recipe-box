import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class ModalPanel extends Component {
  constructor(props) {
    super(props);

    // State to validate correct input. Receives recipe info when editing.
    this.state = {
      name: '',
      ingredients: '',
      instructions: '',
    };

    this.newRecipe = this.newRecipe.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngrChange = this.handleIngrChange.bind(this);
    this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
  }

  // Update state when props change (editing or adding a new recipe).
  // TO CHECK: This is uselessly called when show (modal) prop change, it should do nothing.
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.state.props) {
      this.setState({
        name: nextProps.name,
        ingredients: nextProps.ingrs,
        instructions: nextProps.instructions,
      });
    }
  }

  // Show Modal and clear Main modal fields states.
  newRecipe() {
    this.props.toggle();
    this.props.clear();
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

  // Updates instructions state value
  handleInstructionsChange(event) {
    const instrValue = event.target.value;
    this.setState({ instructions: instrValue });
  }

  // Check if entered input is valid. Name >= 3 chars long and >= 2 ingredients.
  canBeSubmitted() {
    return {
      name: this.state.name.length > 2,
      ingredients: this.state.ingredients.split(',').filter(igr => igr.length).length > 1,
    };
  }

  render() {
    const { onSubmit, show, ingrs, name, instructions } = this.props;
    const validate = this.canBeSubmitted();

    return (
      <div>
        <Button
          bsStyle="success"
          className="addRecipeBtn"
          onClick={this.newRecipe}
        ><i className="glyphicon glyphicon-plus" aria-hidden="true" /> Add recipe
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

                <FormGroup controlId="formControlInstructions">
                  <ControlLabel>Instructions</ControlLabel>
                  <FormControl
                    type="text"
                    componentClass="textarea"
                    name="instructions"
                    defaultValue={instructions}
                    placeholder="Enter recipe instructions"
                    onChange={this.handleInstructionsChange}
                  />
                </FormGroup>
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>

              <button
                type="submit"
                className={`btn btn-primary
                  ${(validate.name && validate.ingredients) ? '' : 'disabled'}`}
                onClick={this.props.toggle}
              >Add Recipe
              </button>

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
  instructions: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

export default ModalPanel;
