/* eslint-disable no-undef */
(() => {

  const userSearch = formatString('Crème');
  let recipesFound = [];

  for (let i = 0; i < recipes.length; i++) {

    const recipeTested = recipes[i];

    const recipeName = formatString(recipeTested.name);
    const testResultByName = recipeName.indexOf(userSearch);

    const recipeDescription = formatString(recipeTested.description);
    const testResultByDescription = recipeDescription.indexOf(userSearch);

    const ingredients = recipeTested.ingredients;
    let testResultByIngredient;
    for (let i in ingredients) {
      const recipeIngredient = formatString(ingredients[i].ingredient);
      testResultByIngredient = recipeIngredient.indexOf(userSearch);
      if (testResultByIngredient !== -1) {
        break;
      }
    }

    if (testResultByName !== -1 || testResultByDescription !== -1 || testResultByIngredient !== -1) {
      recipesFound.push(recipeTested);
      recipesFound = recipesFound.sort(sortByName);
    }

  }

})();