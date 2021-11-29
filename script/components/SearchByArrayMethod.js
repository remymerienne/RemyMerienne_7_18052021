import { recipes } from '../recipes';

const formatString = (string) => {
  string = string.toLowerCase();
  string = string.replace(/[éèëê]/g, 'e');
  string = string.replace(/[îï]/g, 'i');
  string = string.replace(/[à]/g, 'a');
  string = string.replace(/[ç]/g, 'c');
  return string;
};

const sortByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const displayIngredients = (recipe) => {
  let ingredientsList = '';
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList += `
      <p class="li">
        ${recipe.ingredients[i].ingredient}
        ${recipe.ingredients[i].quantity !== undefined ? ':&nbsp' : ''}
        ${recipe.ingredients[i].quantity !== undefined ? recipe.ingredients[i].quantity : ''} 
        ${recipe.ingredients[i].unit !== undefined ? recipe.ingredients[i].unit : ''} 
      </p>`;
  }
  return ingredientsList;
};

const displayRecipes = (uiNodeToinject, recipesFound) => {
  uiNodeToinject.innerHTML = (
    recipesFound.map(recipe =>
      `  
        <article class="recipe">
          <div class="recipe__photo"></div>
          <div class="recipe__details">
            <div class="high-group-recipe">
              <h2 class="high-group-recipe__title">${recipe.name}</h2>
              <p class="high-group-recipe__time">${recipe.time}</p>
            </div>
            <div class="low-group-recipe">
              <div class="low-group-recipe__list">
                ${displayIngredients(recipe)}
              </div>
              <p class="low-group-recipe__task">${recipe.description}</p>
            </div>
          </div>
        </article>
      `
    ).join('')
  );
};

export const searchByArrayMethod = () => {

  const uiNodeSearchBar = document.querySelector('.search-bar__input');
  const uiNodeToinject = document.querySelector('main.main');

  uiNodeSearchBar.addEventListener('keyup', e => {

    const userSearch = formatString(e.target.value);

    let recipesFound = [];

    if (e.target.value.length >= 3) {

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

      recipesFound[0] === undefined ? uiNodeToinject.innerHTML = '<p>Aucune recette ne correspond à votre recherche</p>' : displayRecipes(uiNodeToinject, recipesFound);

    } else {

      recipesFound = [];

      displayRecipes(uiNodeToinject, recipesFound);

    }

  });

};
