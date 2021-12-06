import { recipes } from '../recipes';
import { displayIngredientsList, displayDevicesList, displayUtensilsList } from './DisplayListItems';

const formatString = (string) => {
  string = string.toLowerCase();
  string = string.replace(/[éèëê]/g, 'e');
  string = string.replace(/[îï]/g, 'i');
  string = string.replace(/[àâ]/g, 'a');
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

export const selectAndDisplay = () => {

  const uiNodeSearchBar = document.querySelector('.search-bar__input');
  const uiNodeToinject = document.querySelector('main.main');
  
  uiNodeSearchBar.addEventListener('keyup', e => {
    
    const userSearch = formatString(e.target.value);
    let recipesFound = [];
    let ingredientList = [];
    let deviceList = [];
    let ustensilList = [];

    if (e.target.value.length >= 3) {

      const filterRecipes = (recipe) => {
        if (formatString(recipe.name).indexOf(userSearch) !== -1) {
          return true;
        } else if (formatString(recipe.description).indexOf(userSearch) !== -1) {
          return true;
        } else {
          for (let i in recipe.ingredients) {
            if (formatString(recipe.ingredients[i].ingredient).indexOf(userSearch) !== -1) {
              return true;
            }
          }
          return false;
        }
      };

      // Tri des recettes ayant correspondance et classement par ordre alphabétique
      recipesFound = recipes.filter(filterRecipes);
      recipesFound = recipesFound.sort(sortByName);

      // Affichage des recettes trouvées si résultat trouvé sinon message d'erreur
      if (recipesFound[0] === undefined) {
        uiNodeToinject.innerHTML = '<p>Aucune recette ne correspond à votre recherche</p>';
      } else {
        displayRecipes(uiNodeToinject, recipesFound);
      }

      console.log(recipesFound);

      // Tri des ingrédients et stockage dans un tableau dédié
      recipesFound.forEach(e => e.ingredients.forEach(el => ingredientList.push(el.ingredient)));
      ingredientList = Array.from(new Set(ingredientList));
      ingredientList = ingredientList.sort();
      console.log(ingredientList);
      displayIngredientsList(ingredientList);

      // Tri des appareils et stockage dans un tableau dédié
      recipesFound.forEach(e => deviceList.push(e.appliance));
      deviceList = Array.from(new Set(deviceList));
      deviceList = deviceList.sort();
      console.log(deviceList);
      displayDevicesList(deviceList);

      // Tri des ustensiles et stockage dans un tableau dédié
      recipesFound.forEach(e => e.ustensils.forEach(el => ustensilList.push(el)));
      ustensilList = Array.from(new Set(ustensilList));
      ustensilList = ustensilList.sort();
      console.log(ustensilList);
      displayUtensilsList(ustensilList);

      // En dessous de 3 caractères saisis, pas de recette affichée
    } else {
      console.clear();
      recipesFound = [];
      displayRecipes(uiNodeToinject, recipesFound);
    }

  });

};
