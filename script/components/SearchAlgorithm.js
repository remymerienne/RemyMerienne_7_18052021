import { recipes } from '../recipes';
import { displayRecipes } from './display';
import { formatString, sortByName } from './SortAndFormat';
import { setIngredientList, setDeviceList, setUtensilList } from './SetListItem';

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
      setIngredientList(ingredientList);

      // Tri des appareils et stockage dans un tableau dédié
      recipesFound.forEach(e => deviceList.push(e.appliance));
      deviceList = Array.from(new Set(deviceList));
      deviceList = deviceList.sort();
      console.log(deviceList);
      setDeviceList(deviceList);

      // Tri des ustensiles et stockage dans un tableau dédié
      recipesFound.forEach(e => e.ustensils.forEach(el => ustensilList.push(el)));
      ustensilList = Array.from(new Set(ustensilList));
      ustensilList = ustensilList.sort();
      console.log(ustensilList);
      setUtensilList(ustensilList);

      // En dessous de 3 caractères saisis, pas de recette affichée
    } else {
      console.clear();
      recipesFound = [];
      displayRecipes(uiNodeToinject, recipesFound);
    }

  });

};
