/* eslint-disable no-undef */
(() => {

  for (let i in recipes) {

    const recipeTested = recipes[i];

    const recipeName = formatString(recipeTested.name);
    const testResultByName = recipeName.match(userSearch);

    const recipeDescription = formatString(recipeTested.description);
    const testResultByDescription = recipeDescription.match(userSearch);

    const ingredients = recipeTested.ingredients;
    let testResultByIngredient;
    for (let i in ingredients) {
      const recipeIngredient = formatString(ingredients[i].ingredient);
      testResultByIngredient = recipeIngredient.match(userSearch);
      if (testResultByIngredient !== null) {
        break;
      }
    }

    if (testResultByName !== null || testResultByDescription !== null || testResultByIngredient !== null) {
      recipesFound.push(recipeTested);
    }

  }

  recipesFound = recipesFound.sort(byName);

})();