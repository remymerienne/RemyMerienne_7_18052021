import { recipes } from '../recipes';
import { displayItemBoxes } from './DisplayItemBoxes';
import { displayRecipes } from './DisplayRecipes';

// ========================================================

const uiNodeIngredientButton = document.querySelector('div.buttons-row__button--ingredient');
const uiNodeDeviceButton = document.querySelector('div.buttons-row__button--device');
const uiNodeUtensilButton = document.querySelector('div.buttons-row__button--utensil');
const uiNodeIngredientBox = document.querySelector('div.box-ingredient');
const uiNodeDeviceBox = document.querySelector('div.box-device');
const uiNodeUtensilBox = document.querySelector('div.box-utensil');
const uiNodeIngredientList = document.querySelector('ul.box__list--ingredient');
const uiNodeDeviceList = document.querySelector('ul.box__list--device');
const uiNodeUtensilList = document.querySelector('ul.box__list--utensil');
const uiNodeSearchBar = document.querySelector('.search-bar__input');
const uiNodeToinject = document.querySelector('main.main');

let recipesFound = [];
let ingredientList = [];
let deviceList = [];
let utensilList = [];

// ========================================================

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

const displayAllList = () => {
  displayRecipes(uiNodeToinject, recipesFound);
  displayItemBoxes(uiNodeIngredientButton, uiNodeIngredientBox, uiNodeIngredientList, ingredientList);
  displayItemBoxes(uiNodeDeviceButton, uiNodeDeviceBox, uiNodeDeviceList, deviceList);
  displayItemBoxes(uiNodeUtensilButton, uiNodeUtensilBox, uiNodeUtensilList, utensilList);
};

const resetAllList = () => {
  recipesFound = [];
  ingredientList = [];
  deviceList = [];
  utensilList = [];
  displayAllList();
};

// ========================================================

export const selectAndDisplay = () => {

  uiNodeSearchBar.addEventListener('keyup', e => {

    const userSearch = formatString(e.target.value);

    resetAllList();

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

      // Tri des ingrédients et stockage dans un tableau dédié
      recipesFound.forEach(e => e.ingredients.forEach(el => ingredientList.push(el.ingredient)));
      ingredientList = Array.from(new Set(ingredientList));
      ingredientList = ingredientList.sort();

      // Tri des appareils et stockage dans un tableau dédié
      recipesFound.forEach(e => deviceList.push(e.appliance));
      deviceList = Array.from(new Set(deviceList));
      deviceList = deviceList.sort();

      // Tri des ustensiles et stockage dans un tableau dédié
      recipesFound.forEach(e => e.ustensils.forEach(el => utensilList.push(el)));
      utensilList = Array.from(new Set(utensilList));
      utensilList = utensilList.sort();

      // Affichage des recettes trouvées si résultat trouvé sinon message d'erreur
      if (recipesFound.length === 0) {
        console.log(recipesFound.length);
        resetAllList();
        uiNodeToinject.innerHTML = '<p>Aucune recette ne correspond à votre recherche</p>';
      } else {
        displayAllList();

        // = Vérif console
        console.log(recipesFound);
        console.log(ingredientList);
        console.log(deviceList);
        console.log(utensilList);
      }

      // En dessous de 3 caractères saisis, pas de recette affichée
    } else {

      resetAllList();

      // = Pour vérif
      console.clear();

    }

  });

  resetAllList();

};
