import React, { Component } from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class ModalPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(){
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <Button onClick={this.open} bsStyle="primary">Add recipe</Button>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
          aria-labelledby="ModalHeader"
        >
          <form onSubmit={this.props.onSubmit}>
            <Modal.Body>

              <FormGroup controlId="formControlName">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  name="name"
                  // value={this.state.value}
                  placeholder="Enter recipe name"
                />
              </FormGroup>

              <FormGroup controlId="formControlIngredient">
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  type="text"
                  name="ingredients"
                  // value={this.state.value}
                  placeholder="Enter ingredients"
                />
                <HelpBlock>Separate ingredients with commas</HelpBlock>
              </FormGroup>

            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" bsStyle="primary" onClick={this.close}>Add Recipe</Button>
              <Button bsStyle="danger" onClick={this.close}>Cancel</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    )
  }
}

export default ModalPanel;
