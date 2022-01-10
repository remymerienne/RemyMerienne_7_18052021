import {
  recipes
} from './recipes';
import {
  displayItemBoxes,
  displayRecipes
} from './modules/Display';
import {
  logAfterMainSearch
} from './modules/ConsoleLog';
import {
  formatString,
  byName
} from './modules/Function';

// ========================================================

const ingredientButton = document.querySelector('button.buttons-row__button--ingredient');
const deviceButton = document.querySelector('button.buttons-row__button--device');
const utensilButton = document.querySelector('button.buttons-row__button--utensil');

const ingredientBox = document.querySelector('div.box-ingredient');
const deviceBox = document.querySelector('div.box-device');
const utensilBox = document.querySelector('div.box-utensil');

const contentIngredientList = document.querySelector('ul.box__list--ingredient');
const contentDeviceList = document.querySelector('ul.box__list--device');
const contentUtensilList = document.querySelector('ul.box__list--utensil');

const inputSearchBar = document.querySelector('input.search-bar__input');
const mainContentBlock = document.querySelector('main.main');

let recipesFound = [];
let ingredientList = [];
let deviceList = [];
let utensilList = [];

// ========================================================

const displayAllItemBoxes = (ingredientList, deviceList, utensilList) => {
  displayItemBoxes(ingredientButton, ingredientBox, contentIngredientList, ingredientList);
  displayItemBoxes(deviceButton, deviceBox, contentDeviceList, deviceList);
  displayItemBoxes(utensilButton, utensilBox, contentUtensilList, utensilList);
};

const resetAllList = () => {
  recipesFound = [];
  ingredientList = [];
  deviceList = [];
  utensilList = [];
};

// ========================================================

export const mainAlgorithm = () => {

  // - Affichage par défaut --- START
  recipesFound = recipes;

  // Parcours et stockage des ingrédient trouvés parmi les recettes retenues
  for (let i in recipesFound) {
    for (let j in recipesFound[i].ingredients) {
      ingredientList.push(recipesFound[i].ingredients[j].ingredient);
    }
  }
  // Parcours et stockage des appareils trouvés parmi les recettes retenues
  for (let i in recipesFound) {
    deviceList.push(recipesFound[i].appliance);
  }
  // Parcours et stockage des ustensiles trouvés parmi les recettes retenues
  for (let i in recipesFound) {
    for (let j in recipesFound[i].ustensils) {
      utensilList.push(recipesFound[i].ustensils[j]);
    }
  }

  // Classement et suppression des doublons des données mises à jour
  recipesFound = recipesFound.sort(byName);
  ingredientList = Array.from(new Set(ingredientList)).sort();
  deviceList = Array.from(new Set(deviceList)).sort();
  utensilList = Array.from(new Set(utensilList)).sort();

  displayRecipes(mainContentBlock, recipesFound);
  displayAllItemBoxes(ingredientList, deviceList, utensilList);

  // = Display console
  logAfterMainSearch(recipesFound, ingredientList, deviceList, utensilList);
  // - Affichage par défaut --- END

  // ******************************************************
  // * # 1 Blocs de recherche principale

  // - # 1 Recherche principale --- START
  inputSearchBar.addEventListener('keyup', e => {

    // = Display console
    console.clear();
    console.log('Toutes les recettes:', recipes);

    // Réinitialisation complète de l'affichage si modification de la recherche principale
    resetAllList();
    displayRecipes(mainContentBlock, recipesFound);
    displayAllItemBoxes(ingredientList, deviceList, utensilList);

    const userSearch = new RegExp('\\b' + formatString(e.target.value), 'gi');

    // Déclenchement de la recherche au troisième caractère saisi
    if (e.target.value.length >= 3) {

      for (let i in recipes) {
        const recipeTested = recipes[i];

        // Comparaison de la saisi avec le nom de la recette
        const recipeName = formatString(recipeTested.name);
        const testResultByName = recipeName.match(userSearch);

        // Comparaison de la saisi avec la description de la recette
        const recipeDescription = formatString(recipeTested.description);
        const testResultByDescription = recipeDescription.match(userSearch);

        // Comparaison de la saisi avec les ingrédients de la recette
        const ingredients = recipeTested.ingredients;
        let testResultByIngredient;
        for (let i in ingredients) {
          const recipeIngredient = formatString(ingredients[i].ingredient);
          testResultByIngredient = recipeIngredient.match(userSearch);
          // Arrêt de la boucle For si une correspondance est trouvées
          if (testResultByIngredient !== null) {
            break;
          }
        }

        // Test de correspondance générale
        if (testResultByName !== null || testResultByDescription !== null || testResultByIngredient !== null) {
          // Stockage des recettes ayant correspondance avec la saisie utilisateur
          recipesFound.push(recipeTested);
        }
      }

      // Parcours et stockage des ingrédient trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        for (let j in recipesFound[i].ingredients) {
          ingredientList.push(recipesFound[i].ingredients[j].ingredient);
        }
      }

      // Parcours et stockage des appareils trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        deviceList.push(recipesFound[i].appliance);
      }

      // Parcours et stockage des ustensiles trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        for (let j in recipesFound[i].ustensils) {
          utensilList.push(recipesFound[i].ustensils[j]);
        }
      }

      // Classement et suppression des doublons des données mises à jour
      recipesFound = recipesFound.sort(byName);
      ingredientList = Array.from(new Set(ingredientList)).sort();
      deviceList = Array.from(new Set(deviceList)).sort();
      utensilList = Array.from(new Set(utensilList)).sort();

      // Affichage d'un message d'erreur si aucun élément trouvé
      if (recipesFound.length === 0) {
        resetAllList();
        displayRecipes(mainContentBlock, recipesFound);
        displayAllItemBoxes(ingredientList, deviceList, utensilList);
        mainContentBlock.innerHTML = '<p>Aucune recette ne correspond à votre recherche</p>';

        // Affichage des recettes et des listes trouvées
      } else {

        displayRecipes(mainContentBlock, recipesFound);
        displayAllItemBoxes(ingredientList, deviceList, utensilList);

        // = Display console
        logAfterMainSearch(recipesFound, ingredientList, deviceList, utensilList);

      }

      // En dessous de 3 caractères saisis
    } else {

      // - Affichage par défaut --- START
      recipesFound = recipes;

      // Parcours et stockage des ingrédient trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        for (let j in recipesFound[i].ingredients) {
          ingredientList.push(recipesFound[i].ingredients[j].ingredient);
        }
      }
      // Parcours et stockage des appareils trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        deviceList.push(recipesFound[i].appliance);
      }
      // Parcours et stockage des ustensiles trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        for (let j in recipesFound[i].ustensils) {
          utensilList.push(recipesFound[i].ustensils[j]);
        }
      }

      // Classement et suppression des doublons des données mises à jour
      recipesFound = recipesFound.sort(byName);
      ingredientList = Array.from(new Set(ingredientList)).sort();
      deviceList = Array.from(new Set(deviceList)).sort();
      utensilList = Array.from(new Set(utensilList)).sort();

      displayRecipes(mainContentBlock, recipesFound);
      displayAllItemBoxes(ingredientList, deviceList, utensilList);

      // = Display console
      logAfterMainSearch(recipesFound, ingredientList, deviceList, utensilList);
      // - Affichage par défaut --- END

    }

  });
  // - # 1 Recherche principale --- END

};

// * END
// ****************