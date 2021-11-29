/* eslint-disable no-undef */
(() => {

  const userSearch = formatString('Crème');
  let recipesFound = [];

  const filterByName = (obj) => {
    return formatString(obj.name).indexOf(userSearch) !== -1;
  };

  const filterByDescription = (obj) => {
    return formatString(obj.description).indexOf(userSearch) !== -1;
  };

  const filterByIngredient = (obj) => {
    for (let i in obj.ingredients) {
      if (formatString(obj.ingredients[i].ingredient).indexOf(userSearch) !== -1) {
        return true;
      }
    }
  };

  recipes.filter(filterByName).forEach(e => recipesFound.push(e));

  recipes.filter(filterByDescription).forEach(e => recipesFound.push(e));

  recipes.filter(filterByIngredient).forEach(e => recipesFound.push(e));

  recipesFound = Array.from(new Set(recipesFound));

  recipesFound = recipesFound.sort(sortByName);

})();