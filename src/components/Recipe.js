import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Accordion, Panel } from 'react-bootstrap';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      buttonText: 'Directions',
    };

    this.flip = this.flip.bind(this);
    this.flipButtonText = this.flipButtonText.bind(this);
    this.flipper = this.flipper.bind(this);
  }

  flip() {
    this.setState({ flipped: !this.state.flipped });
  }

  flipButtonText() {
    this.setState({
      buttonText: this.state.buttonText === 'Directions' ? 'Ingredients' : 'Directions',
    });
  }

  flipper() {
    this.flip();
    this.flipButtonText();
  }

  render() {
    const { id, name, ingredients, instructions, deleteRecipe, editRecipe } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <Accordion>

          <Panel header={name} eventKey={id}>

            <div className={`panelData ${this.state.flipped ? 'flipped' : ''}`}>

              <div className="ingredients">
                <b className="ingredients-header">Ingredients:</b>
                <ul>
                  {ingredients.map(ingr => <li key={`${id}${ingr}`}>{ingr}</li>)}
                </ul>
              </div>

              <div className="instructions">
                <p>{instructions}</p>
              </div>

            </div>

            <Button
              className="delete-button"
              onClick={() => deleteRecipe(id)}
            ><i className="glyphicon glyphicon-remove" aria-hidden="true" />
            </Button>

            <Button
              bsStyle="default"
              onClick={() => this.flipper()}
            ><i className="glyphicon glyphicon-eye-open" aria-hidden="true" />
              <b> {this.state.buttonText}</b>
            </Button>

            <Button
              bsStyle="default"
              onClick={() => editRecipe(name, ingredients, id)}
            ><i className="glyphicon glyphicon-pencil" aria-hidden="true" />
              <b> Edit</b>
            </Button>

          </Panel>
        </Accordion>
      </div>
    );
  }
}

Recipe.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  instructions: PropTypes.string.isRequired,
};

export default Recipe;
