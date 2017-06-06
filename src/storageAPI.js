const storage = window.localStorage;

const recipesData = [
  {
    id: '0',
    name: 'Spaghetti Italian',
    ingredients: [
      '1 (8 ounce) package spaghetti',
      '1/2 pound Italian sausage',
      '4 (6.5 ounce) cans tomato sauce',
      '1/2 teaspoon garlic powder',
      '1 teaspoon dried basil',
      'salt and pepper to taste',
    ],
    instructions: 'In a large skillet, brown sausage over medium heat; drain and set aside. In a large saucepan over medium heat, combine tomato sauce, diced tomatoes, bay leaves, Italian seasoning, garlic powder, basil, oregano, salt, pepper and Italian sausage; mix well. Simmer over medium-low heat for at least one hour; it is best if simmered all day. Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain. Mix sauce with hot pasta; serve.',
  },
  {
    id: '1',
    name: 'Lentil Soup',
    ingredients: [
      '1 onion, chopped',
      '2 cups dry lentils',
      '2 carrots diced',
      '2 stalks celery chopped',
      '1/4 cup olive oil',
      '1 (14.5 ounce) can crushed tomatoes',
      '1 teaspoon dried oregano',
      'salt and pepper to taste',
    ],
    instructions: 'In a large soup pot, heat oil over medium heat. Add onions, carrots, and celery; cook and stir until onion is tender. Stir in garlic, bay leaf, oregano, and basil; cook for 2 minutes. Stir in lentils, and add water and tomatoes. Bring to a boil. Reduce heat, and simmer for at least 1 hour. When ready to serve stir in spinach, and cook until it wilts. Stir in vinegar, and season to taste with salt and pepper, and more vinegar if desired.',
  },
  {
    id: '2',
    name: 'Spinach Pesto Chicken Breasts',
    ingredients: [
      '1 1/2 cups chopped fresh spinach',
      '4 skinless boneless chicken breast halves',
      '2 tablespoons basil pesto',
      '2 tablespoons grated Parmesan cheese',
    ],
    instructions: 'Preheat an oven to 375 degrees F (190 degrees C). Mix the spinach and pesto together in a bowl; spread half the mixture into the bottom of a glass baking dish. Place the chicken breasts onto the spinach mixture; top with the rest of the mixture. Cover the dish with aluminum foil. Bake in the preheated oven until the chicken is no longer pink in the center and the juices run clear, about 30 minutes. Uncover and sprinkle the Parmesan cheese. Return to the oven and bake until the cheese has begun to melt and brown, about 15 minutes.',
  },
  {
    id: '3',
    name: 'Mushroom Pork Chops',
    ingredients: [
      '4 pork chops',
      '1 onion chopped',
      '1/2 pound fresh mushrooms sliced',
      '1 can condensed cream of mushroom soup',
      '1 pinch garlic salt or to taste',
    ],
    instructions: 'Season pork chops with salt, pepper, and garlic salt to taste. In a large skillet, brown the chops over medium-high heat. Add the onion and mushrooms, and saute for one minute. Pour cream of mushroom soup over chops. Cover skillet, and reduce temperature to medium-low. Simmer 20 to 30 minutes, or until chops are cooked through.',
  },
];

export const SaveItem = (key, value) => {
  if (typeof value === 'object') {
    storage[key] = JSON.stringify(value);
  } else {
    storage[key] = value;
  }
};

// Function to get recipes data. If no data on localStorage, add initial recipes.
export const getRecipes = () => {
  if (!storage.recipesData) {
    SaveItem('recipesData', recipesData);
  }
  return JSON.parse(storage.recipesData);
};

export const addRecipe = (obj) => {
  const added = [...JSON.parse(storage.recipesData), obj];
  SaveItem('recipesData', added);
};

export const deleteRecipe = (id) => {
  const filt = JSON.parse(storage.recipesData).filter(recipe => recipe.id !== id.toString());
  SaveItem('recipesData', filt);
};
