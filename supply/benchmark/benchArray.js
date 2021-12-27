/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
(() => {

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

})();