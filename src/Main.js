import React, { Component } from 'react';
import toastr from 'toastr';
import Header from './components/Header';
import ModalPanel from './components/ModalPanel';
import RecipesContainer from './components/RecipesContainer';
import { getRecipes, addRecipe, deleteRecipe } from './storageAPI';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [...getRecipes()], // Get recipes data.
      showModal: false, // Boolean to manage display of ModalPanel.
      modalNameVal: '', // State to populate recipe name field when editing.
      modalIngrVal: '', // Same as above but for ingredients.
      modalInstrVal: '', // Same for instructions.
      editingRecipeId: '', // State to keep track of what recipe is being edited.
    };

    this.onRecipeDelete = this.onRecipeDelete.bind(this);
    this.onRecipeAdd = this.onRecipeAdd.bind(this);
    this.onRecipeEdit = this.onRecipeEdit.bind(this);
    this.toggleModalShow = this.toggleModalShow.bind(this);
    this.clearModalFields = this.clearModalFields.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  // Function to manage the deletion of a recipe.
  onRecipeDelete(id) {
    deleteRecipe(id); // Delete recipe from localStorage
    return this.setState({ recipes: [...getRecipes()] }); // Set state with updated data.
  }

  // Function to manage the adding of a recipe. Params should be strings.
  // It returns an abject that represents a recipe.
  // ID for the recipe will be epoch time string.
  // Ingredients string sanitization is done here to end up with a clean array.
  onRecipeAdd(name, ingr, instructions) {
    const recipeObj = {
      id: Date.now().toString(),
      name,
      ingredients: [...ingr.split(',').filter(igr => igr.length).map(igr => igr.trim())],
      instructions,
    };

    addRecipe(recipeObj); // Add recipe using storageAPI.
    this.setState({ recipes: [...getRecipes()] }); // Set state with updated data.
  }

  // Function for set state when editing a recipe. Used in Recipe component.
  onRecipeEdit(name, ingrsArray, id, instructions) {
    this.setState({
      modalNameVal: name,
      modalIngrVal: ingrsArray.join(),
      modalInstrVal: instructions,
      editingRecipeId: id,
    });

    this.toggleModalShow();
  }

  // Toggles showModal state.
  toggleModalShow() {
    return this.setState({ showModal: !this.state.showModal });
  }

  // Clear modal fields states. Used when adding a new recipe.
  clearModalFields() {
    return this.setState({ modalNameVal: '', modalIngrVal: '', modalInstrVal: '' });
  }

  // Handle submit of ModalPanel form.
  handleInputSubmit(event) {
    const [name, ingrs, instructions] = [
      event.target.name.value,
      event.target.ingredients.value,
      event.target.instructions.value];

    event.preventDefault();
    // Check for unchanged info submit. If nothing changed, no editing.
    if (name === this.state.modalNameVal
      && ingrs === this.state.modalIngrVal
      && instructions === this.state.modalInstrVal) {
      toastr.warning('No changes, nothing edited.');

    // Manage the editing of a recipe (modalNameVal & modalIngrVal != '').
    } else if (this.state.modalNameVal !== '' && this.state.modalIngrVal !== '') {
      this.onRecipeAdd(name, ingrs, instructions); // Add new recipe
      this.onRecipeDelete(this.state.editingRecipeId); // Delete old recipe
      toastr.success('Recipe successfully edited!');

    // Manage the adding of a new recipe (modalNameVal & modalIngrVal === '').
    } else {
      this.onRecipeAdd(name, ingrs, instructions);
      this.setState({ recipes: [...getRecipes()] }); // Get updated data
      toastr.success('New recipe added!');
    }
  }

  render() {
    return (
      <div className="Main">
        <Header />

        <ModalPanel
          onSubmit={this.handleInputSubmit}
          show={this.state.showModal}
          name={this.state.modalNameVal}
          ingrs={this.state.modalIngrVal}
          instructions={this.state.modalInstrVal}
          toggle={this.toggleModalShow}
          clear={this.clearModalFields}
        />

        <RecipesContainer
          recipes={this.state.recipes}
          deleteRecipe={this.onRecipeDelete}
          editRecipe={this.onRecipeEdit}
        />
      </div>
    );
  }
}

export default Main;
