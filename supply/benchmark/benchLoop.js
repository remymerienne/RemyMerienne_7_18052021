/* eslint-disable no-undef */
(() => {

  let recipesFound = [];
  let ingredientFound = [];
  let deviceFound = [];
  let utensilFound = [];

  let userSearch = formatString('Crème');
  userSearch = new RegExp('\\b' + userSearch, 'gi');

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

  for (let i in recipesFound) {
    for (let j in recipesFound[i].ingredients) {
      ingredientFound.push(recipesFound[i].ingredients[j].ingredient);
    }
  }

  for (let i in recipesFound) {
    deviceFound.push(recipesFound[i].appliance);
  }

  for (let i in recipesFound) {
    for (let j in recipesFound[i].ustensils) {
      utensilFound.push(recipesFound[i].ustensils[j]);
    }
  }

  recipesFound = recipesFound.sort(byName);
  ingredientFound = Array.from(new Set(ingredientFound)).sort();
  deviceFound = Array.from(new Set(deviceFound)).sort();
  utensilFound = Array.from(new Set(utensilFound)).sort();

  // console.log(recipesFound);
  // console.log(ingredientFound);
  // console.log(deviceFound);
  // console.log(utensilFound);

})();