/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
(() => {

  let recipesFound = [];
  let ingredientFound = [];
  let deviceFound = [];
  let utensilFound = [];

  let userSearch = formatString('Crème');
  userSearch = new RegExp('\\b' + userSearch, 'gi');

  const filterRecipes = (recipe) => {
    if (formatString(recipe.name).match(userSearch) !== null) {
      return true;
    } else if (formatString(recipe.description).match(userSearch) !== null) {
      return true;
    } else {
      for (let i in recipe.ingredients) {
        if (formatString(recipe.ingredients[i].ingredient).match(userSearch) !== null) {
          return true;
        }
      }
      return false;
    }
  };

  recipesFound = recipes.filter(filterRecipes).sort(byName);
  ingredientFound = Array.from(new Set(recipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();
  deviceFound = Array.from(new Set(recipesFound.map(recipe => recipe.appliance))).sort();
  utensilFound = Array.from(new Set(recipesFound.flatMap(recipe => recipe.ustensils))).sort();

  // console.log(recipesFound);
  // console.log(ingredientFound);
  // console.log(deviceFound);
  // console.log(utensilFound);

})();