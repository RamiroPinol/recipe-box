const storage = window.localStorage;

const recipesData = [
  {"id": "0", "name": "Spaghetti", "ingredients": ["Spaghetti", "Tomato sauce", "Onion", "Pepper", "Meat"]},
  {"id": "1", "name": "Lentil Soup", "ingredients": ["Onion", "Carrots", "Lentils", "Dry tomatoes", "Potatoes"]},
  {"id": "2", "name": "Spinach Pesto Chicken Breasts", "ingredients": ["Spinach", "Pesto", "Chicken breasts", "Parmesan cheese"]},
  {"id": "3", "name": "Mushroom Pork Chops", "ingredients": ["Pork chops", "Garlic", "Onion", "Mushrooms", "Cream"]},
]

export const SaveItem = (key, value) => {
  if (typeof value === 'object') {
    storage[key] = JSON.stringify(value);
  } else {
    storage[key] = value;
  }
}

// Function to get recipes data. If no data on localStorage, add initial recipes.
export const getRecipes = () => {
  if (!storage.recipesData) {
    SaveItem("recipesData", recipesData);
  }
  return JSON.parse(storage.recipesData);
}

export const addRecipe = (obj) => {
  const added = [...JSON.parse(storage.recipesData), obj]
  SaveItem("recipesData", added)
}

export const deleteRecipe = (id) => {
  const filt = JSON.parse(storage.recipesData).filter( recipe => recipe.id !== id.toString());
  SaveItem("recipesData", filt)
}
