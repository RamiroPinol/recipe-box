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
      recipes: [...getRecipes()],
      showModal: false,
      modalNameVal: '',
      modalIngrVal: '',
      modalInstrVal: '',
      editingRecipeId: '',
    };

    this.onRecipeDelete = this.onRecipeDelete.bind(this);
    this.onRecipeAdd = this.onRecipeAdd.bind(this);
    this.onRecipeEdit = this.onRecipeEdit.bind(this);
    this.toggleModalShow = this.toggleModalShow.bind(this);
    this.clearModalFields = this.clearModalFields.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  onRecipeDelete(id) {
    deleteRecipe(id); // Delete recipe from localStorage
    return this.setState({ recipes: [...getRecipes()] });
  }

  // Function used to add a recipe. Both name and ingr should be strings
  onRecipeAdd(name, ingr, instructions) {
    const recipeObj = {
      id: Date.now().toString(),
      name,
      ingredients: [...ingr.split(',').filter(igr => igr.length).map(igr => igr.trim())],
      instructions,
    };

    addRecipe(recipeObj);
    this.setState({ recipes: [...getRecipes()] });
  }

  // Function for set state when editing recipe.
  onRecipeEdit(name, ingrsArray, id, instructions) {
    this.setState({
      modalNameVal: name,
      modalIngrVal: ingrsArray.join(),
      modalInstrVal: instructions,
      editingRecipeId: id,
    });

    this.toggleModalShow();
  }

  toggleModalShow() {
    return this.setState({ showModal: !this.state.showModal });
  }

  clearModalFields() {
    return this.setState({ modalNameVal: '', modalIngrVal: '', modalInstrVal: '' });
  }

  handleInputSubmit(event) {
    const [name, ingrs, instructions] =
      [event.target.name.value, event.target.ingredients.value, event.target.instructions.value];
    event.preventDefault();

    // Check for unchanged info submit
    if (name === this.state.modalNameVal && ingrs === this.state.modalIngrVal) {
      toastr.warning('No changes, nothing edited.');

    // If editing a recipe (modalNameVal & modalIngrVal != '')
    } else if (this.state.modalNameVal !== '' && this.state.modalIngrVal !== '') {
      this.onRecipeAdd(name, ingrs, instructions); // Add new recipe
      this.onRecipeDelete(this.state.editingRecipeId); // Delete old recipe
      toastr.success('Recipe successfully edited!');
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
