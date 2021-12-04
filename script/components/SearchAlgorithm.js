import { recipes } from '../recipes';
import { displayRecipes } from './display';
import { formatString, sortByName } from './SortAndFormat';

export const selectAndDisplay = () => {

  const uiNodeSearchBar = document.querySelector('.search-bar__input');
  const uiNodeToinject = document.querySelector('main.main');
  let recipesFound = [];

  uiNodeSearchBar.addEventListener('keyup', e => {

    const userSearch = formatString(e.target.value);

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

      // En dessous de 3 caractères saisis, pas de recette affichée
    } else {
      recipesFound = [];
      displayRecipes(uiNodeToinject, recipesFound);
    }

  });

};
