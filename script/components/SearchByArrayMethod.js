import { recipes } from '../recipes';
import { displayRecipes } from './DisplayRecipes';
import { formatString, sortByName } from './SortAndFormat';

export const searchByArrayMethod = () => {

  console.log(recipes);

  const uiNodeSearchBar = document.querySelector('.search-bar__input');
  const uiNodeToinject = document.querySelector('main.main');

  uiNodeSearchBar.addEventListener('keyup', e => {

    const userSearch = formatString(e.target.value);

    let recipesFound = [];
    let ingredientList = [];
    let applianceList = [];
    let ustensilList = [];

    if (e.target.value.length >= 3) {
 
      // Fonctions de tri par critère
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

      // Remplissage du tableau 'recipesFound' avec les recettes correspondant à la recherche
      recipes.filter(filterByName).forEach(e => recipesFound.push(e));
      recipes.filter(filterByDescription).forEach(e => recipesFound.push(e));
      recipes.filter(filterByIngredient).forEach(e => recipesFound.push(e));

      // Suppression des doublons et classement par ordre alphabétique des recettes dans le tableau
      recipesFound = Array.from(new Set(recipesFound));
      recipesFound = recipesFound.sort(sortByName);

      // Affichage des recettes trouvées si résultat trouvé
      recipesFound[0] === undefined ? uiNodeToinject.innerHTML = '<p>Aucune recette ne correspond à votre recherche</p>' : displayRecipes(uiNodeToinject, recipesFound);
      console.log(recipesFound);

      // Tri des ingrédients et stockage dans un tableau dédié
      recipesFound.forEach(e => e.ingredients.forEach(el => ingredientList.push(el.ingredient)));
      ingredientList = Array.from(new Set(ingredientList));
      ingredientList = ingredientList.sort();
      console.log(ingredientList);

      // Tri des appareils et stockage dans un tableau dédié
      recipesFound.forEach(e => applianceList.push(e.appliance));
      applianceList = Array.from(new Set(applianceList));
      applianceList = applianceList.sort();
      console.log(applianceList);

      // Tri des ustensiles et stockage dans un tableau dédié
      recipesFound.forEach(e => e.ustensils.forEach(el => ustensilList.push(el)));
      ustensilList = Array.from(new Set(ustensilList));
      ustensilList = ustensilList.sort();
      console.log(ustensilList);

    } else {

      recipesFound = [];

      displayRecipes(uiNodeToinject, recipesFound);

    }

  });

};
