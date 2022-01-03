import {
  recipes
} from './recipes';
import {
  displayItemBoxes,
  displayRecipes,
  displayTags,
  setMainTop
} from './modules/Display';
import {
  fullLogAfterCloseTag,
  logAfterMainSearch,
  logTagStock,
  logFullRefine
} from './modules/ConsoleLog';
import {
  formatString,
  byName,
  cleanListBySelectTag,
  updateRecipesByRemainingTag
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

let firstRecipesFound = [];

let refineRecipesFound = [];
let refineIngredientList = [];
let refineDeviceList = [];
let refineUtensilList = [];

let recipesAfterCloseTag = [];

let tagStockIngredient = [];
let tagStockDevice = [];
let tagStockUtensil = [];

// ! Projet error message
// const inputZone = document.querySelectorAll('.box__search');

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
  recipesFound = recipesFound.sort(byName);
  // Tri des ingrédients et stockage dans un tableau dédié
  ingredientList = Array.from(new Set(recipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();
  // Tri des appareils et stockage dans un tableau dédié
  deviceList = Array.from(new Set(recipesFound.map(recipe => recipe.appliance))).sort();
  // Tri des ustensiles et stockage dans un tableau dédié
  utensilList = Array.from(new Set(recipesFound.flatMap(recipe => recipe.ustensils))).sort();
  displayRecipes(mainContentBlock, recipesFound);
  displayAllItemBoxes(ingredientList, deviceList, utensilList);
  firstRecipesFound = recipesFound;
  // = Display console
  logAfterMainSearch(recipesFound, ingredientList, deviceList, utensilList);
  // - Affichage par défaut --- END

  // ******************************************************
  // * # 1 Blocs de recherche principale

  // - # 1 Recherche principale --- START
  inputSearchBar.addEventListener('keyup', e => {

    // Réinitialisation du tableau contenant les tags si modification de la recherche principale
    tagStockIngredient = [];
    tagStockDevice = [];
    tagStockUtensil = [];

    // Suppression visuelle des tags si modification de la recherche principale
    document.querySelectorAll('div.tags-row__tag').forEach((e) => e.style.display = 'none');

    // Placement du block principal
    setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

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

      const filterRecipes = (recipe) => {
        if (formatString(recipe.name).match(userSearch) !== null) {
          return true;
        } else if (formatString(recipe.description).match(userSearch) !== null) {
          return true;
        } else {
          for (let i in recipe.ingredients) {
            if (formatString(recipe.ingredients[i].ingredient).match(userSearch) !== null) {
              return true;
            }
          }
          return false;
        }
      };

      // Tri des recettes ayant correspondance et classement par ordre alphabétique
      recipesFound = recipes.filter(filterRecipes);
      recipesFound = recipesFound.sort(byName);

      // Tri des ingrédients et stockage dans un tableau dédié
      ingredientList = Array.from(new Set(recipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

      // Tri des appareils et stockage dans un tableau dédié
      deviceList = Array.from(new Set(recipesFound.map(recipe => recipe.appliance))).sort();

      // Tri des ustensiles et stockage dans un tableau dédié
      utensilList = Array.from(new Set(recipesFound.flatMap(recipe => recipe.ustensils))).sort();

      // Affichage d'un message d'erreur si aucun élément trouvé
      if (recipesFound.length === 0) {
        resetAllList();
        displayRecipes(mainContentBlock, recipesFound);
        displayAllItemBoxes(ingredientList, deviceList, utensilList);
        mainContentBlock.innerHTML = '<p>Aucune recette ne correspond à votre recherche</p>';

        // ! Projet error message
        // inputZone.forEach(e=> {
        //   e.innerHTML = '<p class="error">Aucun résultat</p>';
        // });

        // Affichage des recettes et des listes trouvées
      } else {

        displayRecipes(mainContentBlock, recipesFound);
        displayAllItemBoxes(ingredientList, deviceList, utensilList);

        // Mise en mémoire des recettes trouvées avec la recherche principale
        firstRecipesFound = recipesFound;

        // = Display console
        logAfterMainSearch(recipesFound, ingredientList, deviceList, utensilList);

      }

      // En dessous de 3 caractères saisis
    } else {

      // - Affichage par défaut --- START
      recipesFound = recipes;
      recipesFound = recipesFound.sort(byName);
      // Tri des ingrédients et stockage dans un tableau dédié
      ingredientList = Array.from(new Set(recipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();
      // Tri des appareils et stockage dans un tableau dédié
      deviceList = Array.from(new Set(recipesFound.map(recipe => recipe.appliance))).sort();
      // Tri des ustensiles et stockage dans un tableau dédié
      utensilList = Array.from(new Set(recipesFound.flatMap(recipe => recipe.ustensils))).sort();
      displayRecipes(mainContentBlock, recipesFound);
      displayAllItemBoxes(ingredientList, deviceList, utensilList);
      firstRecipesFound = recipesFound;
      // = Display console
      logAfterMainSearch(recipesFound, ingredientList, deviceList, utensilList);
      // - Affichage par défaut --- END

    }

  });
  // - # 1 Recherche principale --- END

  // ******************************************************
  // * # 2 Blocs de recherche avec saisie dans les input

  // - # 2.1 Précision de la recherche avec saisie dans input list-boxes *** Ingrédient --- START
  document.getElementById('ingredient').addEventListener('keyup', () => {

    const userRefineSearch = new RegExp('\\b' + formatString(document.getElementById('ingredient').value), 'gi');

    const byUserInput = (element) => {
      if (formatString(element).match(userRefineSearch) !== null) {
        return true;
      }
      return false;
    };

    // Affichage de la liste des ingrédients en fonction de la saisie dans  l'input
    refineIngredientList = ingredientList.filter(byUserInput).sort();
    displayItemBoxes(ingredientButton, ingredientBox, contentIngredientList, refineIngredientList);

    // #.select-tag - Actions au click sur un list item --- START
    document.querySelectorAll('li.li-ingredient').forEach(e => {
      e.addEventListener('click', el => {

        // Stockage des tags sélectionnés (noms d'ingrédients) dans le tableau dédié
        tagStockIngredient.push(el.target.innerText);

        // Affichage des tags
        displayTags(el, tagStockIngredient);

        // Placement du block principal
        setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

        // = Display console
        logTagStock(tagStockIngredient, tagStockDevice, tagStockUtensil);

        const byIngredient = (recipe) => {
          for (let i in recipe.ingredients) {
            if (formatString(recipe.ingredients[i].ingredient).match(formatString(el.target.innerText)) !== null) {
              return true;
            }
          }
          return false;
        };

        // Recettes actualisées par le choix du tag
        refineRecipesFound = recipesFound.filter(byIngredient);

        // Ingrédients actualisés par le choix du tag
        refineIngredientList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

        // Appareils actualisés par le choix du tag
        refineDeviceList = Array.from(new Set(refineRecipesFound.map(recipe => recipe.appliance))).sort();

        // Ustensiles actualisés par le choix du tag
        refineUtensilList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ustensils))).sort();

        // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
        refineIngredientList = cleanListBySelectTag(tagStockIngredient, refineIngredientList);
        refineDeviceList = cleanListBySelectTag(tagStockDevice, refineDeviceList);
        refineUtensilList = cleanListBySelectTag(tagStockUtensil, refineUtensilList);

        // Affichage global mit à jour
        displayRecipes(mainContentBlock, refineRecipesFound);
        displayAllItemBoxes(refineIngredientList, refineDeviceList, refineUtensilList);

        // Fermeture et reset de la box au choix d'un item
        document.querySelectorAll('form.box__search').forEach(e => e.reset());
        ingredientButton.style.display = 'flex';
        ingredientBox.style.display = 'none';

        // Fixe le résultat si affinage de la recherche
        recipesFound = refineRecipesFound;
        ingredientList = refineIngredientList;
        deviceList = refineDeviceList;
        utensilList = refineUtensilList;

        // = Display console
        logFullRefine(refineRecipesFound, refineIngredientList, refineDeviceList, refineUtensilList);

        // Actions à la suppression de tag
        const crossesForCloseTag = document.querySelectorAll('span.circle-ingredient');
        crossesForCloseTag.forEach(e => {
          e.addEventListener('click', el => {

            // Reset de la box au choix d'un item
            document.querySelectorAll('form.box__search').forEach(e => e.reset());
            
            // Récupération à chaque suppression de tag, des recettes trouvées avec la recherche principale
            recipesAfterCloseTag = firstRecipesFound;

            // Suppression de l'ingrédient de la liste des tags choisis
            tagStockIngredient = tagStockIngredient.filter(ingredient => formatString(ingredient) !== formatString(el.target.parentElement.dataset.ingredient));

            // Placement du block principal
            setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

            // Replacement de l'ingrédient dans la liste affiché
            refineIngredientList.push(el.target.parentElement.dataset.ingredient);

            // Reclassement des items
            refineIngredientList = refineIngredientList.sort();

            // Affichage de la liste mise à jour
            displayItemBoxes(ingredientButton, ingredientBox, contentIngredientList, refineIngredientList);

            // Suppression visuelle du tag
            el.target.parentElement.style.display = 'none';

            // Boucles qui actualise les recettes trouvées en fonction des tags restant dans la liste (tags selectionnés)
            recipesAfterCloseTag = updateRecipesByRemainingTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag);

            // Fixe la liste initiale si nouvelles recherches
            recipesFound = recipesAfterCloseTag;

            // Tri des ingrédients et stockage dans un tableau dédié
            ingredientList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

            // Tri des appareils et stockage dans un tableau dédié
            deviceList = Array.from(new Set(recipesAfterCloseTag.map(recipe => recipe.appliance))).sort();

            // Tri des ustensiles et stockage dans un tableau dédié
            utensilList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ustensils))).sort();

            // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
            ingredientList = cleanListBySelectTag(tagStockIngredient, ingredientList);
            deviceList = cleanListBySelectTag(tagStockDevice, deviceList);
            utensilList = cleanListBySelectTag(tagStockUtensil, utensilList);

            displayRecipes(mainContentBlock, recipesAfterCloseTag);
            displayAllItemBoxes(ingredientList, deviceList, utensilList);

            // = Display console
            fullLogAfterCloseTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag, ingredientList, deviceList, utensilList);

          });
        });
      });
    });
    // #.select-tag - Actions au click sur un list item --- END

  });
  // - # 2.1 Précision de la recherche avec saisie dans input list-boxes *** Ingrédient --- END

  // - # 2.2 Précision de la recherche avec saisie dans input list-boxes *** Appareil --- START
  document.getElementById('device').addEventListener('keyup', () => {

    const userRefineSearch = new RegExp('\\b' + formatString(document.getElementById('device').value), 'gi');

    const byUserInput = (element) => {
      if (formatString(element).match(userRefineSearch) !== null) {
        return true;
      }
      return false;
    };

    // Affichage de la liste des ingrédients en fonction de la saisie dans  l'input
    refineDeviceList = deviceList.filter(byUserInput).sort();
    displayItemBoxes(deviceButton, deviceBox, contentDeviceList, refineDeviceList);

    // #.select-tag - Actions au click sur un list item --- START
    document.querySelectorAll('li.li-device').forEach(e => {
      e.addEventListener('click', el => {

        // Stockage des tags sélectionnés (noms d'appareils) dans le tableau dédié
        tagStockDevice.push(el.target.innerText);

        // Affichage des tags
        displayTags(el, tagStockDevice);

        // Placement du block principal
        setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

        // = Display console
        logTagStock(tagStockIngredient, tagStockDevice, tagStockUtensil);

        const byDevice = (recipe) => {
          if (formatString(recipe.appliance).match(formatString(el.target.innerText)) !== null) {
            return true;
          }
          return false;
        };

        // Recettes actualisées par le choix du tag
        refineRecipesFound = recipesFound.filter(byDevice);

        // Ingrédients actualisés par le choix du tag
        refineIngredientList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

        // Appareils actualisés par le choix du tag
        refineDeviceList = Array.from(new Set(refineRecipesFound.map(recipe => recipe.appliance))).sort();

        // Ustensiles actualisés par le choix du tag
        refineUtensilList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ustensils))).sort();

        // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
        refineIngredientList = cleanListBySelectTag(tagStockIngredient, refineIngredientList);
        refineDeviceList = cleanListBySelectTag(tagStockDevice, refineDeviceList);
        refineUtensilList = cleanListBySelectTag(tagStockUtensil, refineUtensilList);

        // Affichage global mit à jour
        displayRecipes(mainContentBlock, refineRecipesFound);
        displayAllItemBoxes(refineIngredientList, refineDeviceList, refineUtensilList);

        // Reset de la box au choix d'un item
        document.querySelectorAll('form.box__search').forEach(e => e.reset());
        deviceButton.style.display = 'flex';
        deviceBox.style.display = 'none';

        // Fixe le résultat si affinage de la recherche
        recipesFound = refineRecipesFound;
        ingredientList = refineIngredientList;
        deviceList = refineDeviceList;
        utensilList = refineUtensilList;

        // = Display console
        logFullRefine(refineRecipesFound, refineIngredientList, refineDeviceList, refineUtensilList);

        // Actions à la suppression de tag
        const crossesForCloseTag = document.querySelectorAll('span.circle-device');
        crossesForCloseTag.forEach(e => {
          e.addEventListener('click', el => {

            // Reset de la box au choix d'un item
            document.querySelectorAll('form.box__search').forEach(e => e.reset());

            // Récupération à chaque suppression de tag, des recettes trouvées avec la recherche principale
            recipesAfterCloseTag = firstRecipesFound;

            // Suppression de l'appareil de la liste des tags choisis
            tagStockDevice = tagStockDevice.filter(appareil => formatString(appareil) !== formatString(el.target.parentElement.dataset.device));

            // Placement du block principal
            setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

            // Replacement de l'appareil dans la liste affiché
            refineDeviceList.push(el.target.parentElement.dataset.device);

            // Reclassement des items
            refineDeviceList = refineDeviceList.sort();

            // Affichage de la liste mise à jour
            displayItemBoxes(deviceButton, deviceBox, contentDeviceList, refineDeviceList);

            // Suppression visuelle du tag
            el.target.parentElement.style.display = 'none';

            // Boucles qui actualise les recettes trouvées en fonction des tags restant dans la liste (tags selectionnés)
            recipesAfterCloseTag = updateRecipesByRemainingTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag);

            // Fixe la liste initiale si nouvelles recherches
            recipesFound = recipesAfterCloseTag;

            // Tri des ingrédients et stockage dans un tableau dédié
            ingredientList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

            // Tri des appareils et stockage dans un tableau dédié
            deviceList = Array.from(new Set(recipesAfterCloseTag.map(recipe => recipe.appliance))).sort();

            // Tri des ustensiles et stockage dans un tableau dédié
            utensilList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ustensils))).sort();

            // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
            ingredientList = cleanListBySelectTag(tagStockIngredient, ingredientList);
            deviceList = cleanListBySelectTag(tagStockDevice, deviceList);
            utensilList = cleanListBySelectTag(tagStockUtensil, utensilList);

            displayRecipes(mainContentBlock, recipesAfterCloseTag);
            displayAllItemBoxes(ingredientList, deviceList, utensilList);

            // = Display console
            fullLogAfterCloseTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag, ingredientList, deviceList, utensilList);

          });
        });
      });
    });
    // #.select-tag - Actions au click sur un list item --- END

  });
  // - # 2.2 Précision de la recherche avec saisie dans input list-boxes *** Appareil --- END

  // - # 2.3 Précision de la recherche avec saisie dans input list-boxes *** Ustensile --- START
  document.getElementById('utensil').addEventListener('keyup', () => {

    const userRefineSearch = new RegExp('\\b' + formatString(document.getElementById('utensil').value), 'gi');

    const byUserInput = (element) => {
      if (formatString(element).match(userRefineSearch) !== null) {
        return true;
      }
      return false;
    };

    // Affichage de la liste des ingrédients en fonction de la saisie dans  l'input
    refineUtensilList = utensilList.filter(byUserInput).sort();
    displayItemBoxes(utensilButton, utensilBox, contentUtensilList, refineUtensilList);

    // #.select-tag - Actions au click sur un list item --- START
    document.querySelectorAll('li.li-utensil').forEach(e => {
      e.addEventListener('click', el => {

        // Stockage des tags sélectionnés (noms d'ustensiles) dans le tableau dédié
        tagStockUtensil.push(el.target.innerText);

        // Affichage des tags
        displayTags(el, tagStockUtensil);

        // Placement du block principal
        setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

        // = Display console
        logTagStock(tagStockIngredient, tagStockDevice, tagStockUtensil);

        const byUtensil = (recipe) => {
          for (let i in recipe.ustensils) {
            if (formatString(recipe.ustensils[i]).match(formatString(el.target.innerText)) !== null) {
              return true;
            }
          }
          return false;
        };

        // Recettes actualisées par le choix du tag
        refineRecipesFound = recipesFound.filter(byUtensil);

        // Ingrédients actualisés par le choix du tag
        refineIngredientList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

        // Appareils actualisés par le choix du tag
        refineDeviceList = Array.from(new Set(refineRecipesFound.map(recipe => recipe.appliance))).sort();

        // Ustensiles actualisés par le choix du tag
        refineUtensilList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ustensils))).sort();

        // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
        refineIngredientList = cleanListBySelectTag(tagStockIngredient, refineIngredientList);
        refineDeviceList = cleanListBySelectTag(tagStockDevice, refineDeviceList);
        refineUtensilList = cleanListBySelectTag(tagStockUtensil, refineUtensilList);

        // Affichage global mit à jour
        displayRecipes(mainContentBlock, refineRecipesFound);
        displayAllItemBoxes(refineIngredientList, refineDeviceList, refineUtensilList);

        // Reset de la box au choix d'un item
        document.querySelectorAll('form.box__search').forEach(e => e.reset());
        utensilButton.style.display = 'flex';
        utensilBox.style.display = 'none';

        // Fixe le résultat si affinage de la recherche
        recipesFound = refineRecipesFound;
        ingredientList = refineIngredientList;
        deviceList = refineDeviceList;
        utensilList = refineUtensilList;

        // = Display console
        logFullRefine(refineRecipesFound, refineIngredientList, refineDeviceList, refineUtensilList);

        // Actions à la suppression de tag
        const crossesForCloseTag = document.querySelectorAll('span.circle-utensil');
        crossesForCloseTag.forEach(e => {
          e.addEventListener('click', el => {

            // Reset de la box au choix d'un item
            document.querySelectorAll('form.box__search').forEach(e => e.reset());

            // Récupération à chaque suppression de tag, des recettes trouvées avec la recherche principale
            recipesAfterCloseTag = firstRecipesFound;

            // Suppression de l'ustensile de la liste des tags choisis
            tagStockUtensil = tagStockUtensil.filter(ustensile => formatString(ustensile) !== formatString(el.target.parentElement.dataset.utensil));

            // Placement du block principal
            setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

            // Replacement de l'ustensile dans la liste affiché
            refineUtensilList.push(el.target.parentElement.dataset.utensil);

            // Reclassement des items
            refineUtensilList = refineUtensilList.sort();

            // Affichage de la liste mise à jour
            displayItemBoxes(utensilButton, utensilBox, contentUtensilList, refineUtensilList);

            // Suppression visuelle du tag
            el.target.parentElement.style.display = 'none';

            // Boucles qui actualise les recettes trouvées en fonction des tags restant dans la liste (tags selectionnés)
            recipesAfterCloseTag = updateRecipesByRemainingTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag);

            // Fixe la liste initiale si nouvelles recherches
            recipesFound = recipesAfterCloseTag;

            // Tri des ingrédients et stockage dans un tableau dédié
            ingredientList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

            // Tri des appareils et stockage dans un tableau dédié
            deviceList = Array.from(new Set(recipesAfterCloseTag.map(recipe => recipe.appliance))).sort();

            // Tri des ustensiles et stockage dans un tableau dédié
            utensilList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ustensils))).sort();

            // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
            ingredientList = cleanListBySelectTag(tagStockIngredient, ingredientList);
            deviceList = cleanListBySelectTag(tagStockDevice, deviceList);
            utensilList = cleanListBySelectTag(tagStockUtensil, utensilList);

            displayRecipes(mainContentBlock, recipesAfterCloseTag);
            displayAllItemBoxes(ingredientList, deviceList, utensilList);

            // = Display console
            fullLogAfterCloseTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag, ingredientList, deviceList, utensilList);

          });
        });
      });
    });
    // #.select-tag - Actions au click sur un list item --- END

  });
  // - # 2.3 Précision de la recherche avec saisie dans input list-boxes *** Ustensile --- END

  // ******************************************************
  // * # 3 Blocs de recherche directement au click sur un item

  // - # 3.1 Précision de la recherche directement au click sur un item dans list-boxes *** Ingredient --- START
  ingredientButton.addEventListener('click', () => {

    // #.select-tag - Actions au click sur un list item --- START
    document.querySelectorAll('li.li-ingredient').forEach(e => {
      e.addEventListener('click', el => {

        const userRefineSearch = new RegExp('\\b' + formatString(el.target.innerText), 'gi');

        const byUserInput = (element) => {
          if (formatString(element).match(userRefineSearch) !== null) {
            return true;
          }
          return false;
        };

        // Affichage de la liste des ingrédients en fonction de la saisie dans  l'input
        refineIngredientList = ingredientList.filter(byUserInput).sort();
        displayItemBoxes(ingredientButton, ingredientBox, contentIngredientList, refineIngredientList);

        // Stockage des tags sélectionnés (noms d'ingrédients) dans le tableau dédié
        tagStockIngredient.push(el.target.innerText);

        tagStockIngredient = Array.from(new Set(tagStockIngredient));

        // Affichage des tags
        displayTags(el, tagStockIngredient);

        // Placement du block principal
        setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

        // = Display console
        logTagStock(tagStockIngredient, tagStockDevice, tagStockUtensil);

        const byIngredient = (recipe) => {
          for (let i in recipe.ingredients) {
            if (formatString(recipe.ingredients[i].ingredient).match(formatString(el.target.innerText)) !== null) {
              return true;
            }
          }
          return false;
        };

        // Recettes actualisées par le choix du tag
        refineRecipesFound = recipesFound.filter(byIngredient);

        // Ingrédients actualisés par le choix du tag
        refineIngredientList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

        // Appareils actualisés par le choix du tag
        refineDeviceList = Array.from(new Set(refineRecipesFound.map(recipe => recipe.appliance))).sort();

        // Ustensiles actualisés par le choix du tag
        refineUtensilList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ustensils))).sort();

        // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
        refineIngredientList = cleanListBySelectTag(tagStockIngredient, refineIngredientList);
        refineDeviceList = cleanListBySelectTag(tagStockDevice, refineDeviceList);
        refineUtensilList = cleanListBySelectTag(tagStockUtensil, refineUtensilList);

        // Affichage global mit à jour
        displayRecipes(mainContentBlock, refineRecipesFound);
        displayAllItemBoxes(refineIngredientList, refineDeviceList, refineUtensilList);

        // Reset de la box au choix d'un item
        document.querySelectorAll('form.box__search').forEach(e => e.reset());

        // Fixe le résultat si affinage de la recherche
        recipesFound = refineRecipesFound;
        ingredientList = refineIngredientList;
        deviceList = refineDeviceList;
        utensilList = refineUtensilList;

        // = Display console
        logFullRefine(refineRecipesFound, refineIngredientList, refineDeviceList, refineUtensilList);

        // Actions à la suppression de tag
        const crossesForCloseTag = document.querySelectorAll('span.circle-ingredient');
        crossesForCloseTag.forEach(e => {
          e.addEventListener('click', el => {

            // Reset de la box au choix d'un item
            document.querySelectorAll('form.box__search').forEach(e => e.reset());

            // Récupération à chaque suppression de tag, des recettes trouvées avec la recherche principale
            recipesAfterCloseTag = firstRecipesFound;

            // Suppression de l'ingrédient de la liste des tags choisis
            tagStockIngredient = tagStockIngredient.filter(ingredient => formatString(ingredient) !== formatString(el.target.parentElement.dataset.ingredient));

            tagStockIngredient = Array.from(new Set(tagStockIngredient));

            // Placement du block principal
            setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

            // Replacement de l'ingrédient dans la liste affiché
            refineIngredientList.push(el.target.parentElement.dataset.ingredient);

            // Reclassement des items
            refineIngredientList = refineIngredientList.sort();

            // Affichage de la liste mise à jour
            displayItemBoxes(ingredientButton, ingredientBox, contentIngredientList, refineIngredientList);

            // Suppression visuelle du tag
            el.target.parentElement.style.display = 'none';

            // Boucles qui actualise les recettes trouvées en fonction des tags restant dans la liste (tags selectionnés)
            recipesAfterCloseTag = updateRecipesByRemainingTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag);

            // Fixe la liste initiale si nouvelles recherches
            recipesFound = recipesAfterCloseTag;

            // Tri des ingrédients et stockage dans un tableau dédié
            ingredientList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

            // Tri des appareils et stockage dans un tableau dédié
            deviceList = Array.from(new Set(recipesAfterCloseTag.map(recipe => recipe.appliance))).sort();

            // Tri des ustensiles et stockage dans un tableau dédié
            utensilList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ustensils))).sort();

            // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
            ingredientList = cleanListBySelectTag(tagStockIngredient, ingredientList);
            deviceList = cleanListBySelectTag(tagStockDevice, deviceList);
            utensilList = cleanListBySelectTag(tagStockUtensil, utensilList);

            displayRecipes(mainContentBlock, recipesAfterCloseTag);
            displayAllItemBoxes(ingredientList, deviceList, utensilList);

            // = Display console
            fullLogAfterCloseTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag, ingredientList, deviceList, utensilList);

          });
        });
      });
    });
    // #.select-tag - Actions au click sur un list item --- END

  });
  // - # 3.1 Précision de la recherche directement au click sur un item dans list-boxes *** Ingredient --- END

  // - # 3.2 Précision de la recherche directement au click sur un item dans list-boxes *** Appareil --- START
  deviceButton.addEventListener('click', () => {

    // #.select-tag - Actions au click sur un list item --- START
    document.querySelectorAll('li.li-device').forEach(e => {
      e.addEventListener('click', el => {

        const userRefineSearch = new RegExp('\\b' + formatString(el.target.innerText), 'gi');

        const byUserInput = (element) => {
          if (formatString(element).match(userRefineSearch) !== null) {
            return true;
          }
          return false;
        };

        // Affichage de la liste des ingrédients en fonction de la saisie dans  l'input
        refineDeviceList = deviceList.filter(byUserInput).sort();
        displayItemBoxes(deviceButton, deviceBox, contentDeviceList, refineDeviceList);

        // Stockage des tags sélectionnés (noms d'appareils) dans le tableau dédié
        tagStockDevice.push(el.target.innerText);

        tagStockDevice = Array.from(new Set(tagStockDevice));

        // Affichage des tags
        displayTags(el, tagStockDevice);

        // Placement du block principal
        setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

        // = Display console
        logTagStock(tagStockIngredient, tagStockDevice, tagStockUtensil);

        const byDevice = (recipe) => {
          if (formatString(recipe.appliance).match(formatString(el.target.innerText)) !== null) {
            return true;
          }
          return false;
        };

        // Recettes actualisées par le choix du tag
        refineRecipesFound = recipesFound.filter(byDevice);

        // Ingrédients actualisés par le choix du tag
        refineIngredientList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

        // Appareils actualisés par le choix du tag
        refineDeviceList = Array.from(new Set(refineRecipesFound.map(recipe => recipe.appliance))).sort();

        // Ustensiles actualisés par le choix du tag
        refineUtensilList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ustensils))).sort();

        // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
        refineIngredientList = cleanListBySelectTag(tagStockIngredient, refineIngredientList);
        refineDeviceList = cleanListBySelectTag(tagStockDevice, refineDeviceList);
        refineUtensilList = cleanListBySelectTag(tagStockUtensil, refineUtensilList);

        // Affichage global mit à jour
        displayRecipes(mainContentBlock, refineRecipesFound);
        displayAllItemBoxes(refineIngredientList, refineDeviceList, refineUtensilList);

        // Reset de la box au choix d'un item
        document.querySelectorAll('form.box__search').forEach(e => e.reset());

        // Fixe le résultat si affinage de la recherche
        recipesFound = refineRecipesFound;
        ingredientList = refineIngredientList;
        deviceList = refineDeviceList;
        utensilList = refineUtensilList;

        // = Display console
        logFullRefine(refineRecipesFound, refineIngredientList, refineDeviceList, refineUtensilList);

        // Actions à la suppression de tag
        const crossesForCloseTag = document.querySelectorAll('span.circle-device');
        crossesForCloseTag.forEach(e => {
          e.addEventListener('click', el => {

            // Reset de la box au choix d'un item
            document.querySelectorAll('form.box__search').forEach(e => e.reset());

            // Récupération à chaque suppression de tag, des recettes trouvées avec la recherche principale
            recipesAfterCloseTag = firstRecipesFound;

            // Suppression de l'appareil de la liste des tags choisis
            tagStockDevice = tagStockDevice.filter(appareil => formatString(appareil) !== formatString(el.target.parentElement.dataset.device));

            tagStockDevice = Array.from(new Set(tagStockDevice));

            // Placement du block principal
            setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

            // Replacement de l'appareil dans la liste affiché
            refineDeviceList.push(el.target.parentElement.dataset.device);

            // Reclassement des items
            refineDeviceList = refineDeviceList.sort();

            // Affichage de la liste mise à jour
            displayItemBoxes(deviceButton, deviceBox, contentDeviceList, refineDeviceList);

            // Suppression visuelle du tag
            el.target.parentElement.style.display = 'none';

            // Boucles qui actualise les recettes trouvées en fonction des tags restant dans la liste (tags selectionnés)
            recipesAfterCloseTag = updateRecipesByRemainingTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag);

            // Fixe la liste initiale si nouvelles recherches
            recipesFound = recipesAfterCloseTag;

            // Tri des ingrédients et stockage dans un tableau dédié
            ingredientList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

            // Tri des appareils et stockage dans un tableau dédié
            deviceList = Array.from(new Set(recipesAfterCloseTag.map(recipe => recipe.appliance))).sort();

            // Tri des ustensiles et stockage dans un tableau dédié
            utensilList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ustensils))).sort();

            // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
            ingredientList = cleanListBySelectTag(tagStockIngredient, ingredientList);
            deviceList = cleanListBySelectTag(tagStockDevice, deviceList);
            utensilList = cleanListBySelectTag(tagStockUtensil, utensilList);

            displayRecipes(mainContentBlock, recipesAfterCloseTag);
            displayAllItemBoxes(ingredientList, deviceList, utensilList);

            // = Display console
            fullLogAfterCloseTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag, ingredientList, deviceList, utensilList);

          });
        });
      });
    });
    // #.select-tag - Actions au click sur un list item --- END

  });
  // - # 3.2 Précision de la recherche directement au click sur un item dans list-boxes *** Appareil --- END

  // - # 3.3 Précision de la recherche directement au click sur un item dans list-boxes *** Ustensile --- START
  utensilButton.addEventListener('click', () => {

    // #.select-tag - Actions au click sur un list item --- START
    document.querySelectorAll('li.li-utensil').forEach(e => {
      e.addEventListener('click', el => {

        const userRefineSearch = new RegExp('\\b' + formatString(el.target.innerText), 'gi');

        const byUserInput = (element) => {
          if (formatString(element).match(userRefineSearch) !== null) {
            return true;
          }
          return false;
        };

        // Affichage de la liste des ingrédients en fonction de la saisie dans  l'input
        refineUtensilList = utensilList.filter(byUserInput).sort();
        displayItemBoxes(utensilButton, utensilBox, contentUtensilList, refineUtensilList);

        // Stockage des tags sélectionnés (noms d'ustensiles) dans le tableau dédié
        tagStockUtensil.push(el.target.innerText);

        tagStockUtensil = Array.from(new Set(tagStockUtensil));

        // Affichage des tags
        displayTags(el, tagStockUtensil);

        // Placement du block principal
        setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

        // = Display console
        logTagStock(tagStockIngredient, tagStockDevice, tagStockUtensil);

        const byUtensil = (recipe) => {
          for (let i in recipe.ustensils) {
            if (formatString(recipe.ustensils[i]).match(formatString(el.target.innerText)) !== null) {
              return true;
            }
          }
          return false;
        };

        // Recettes actualisées par le choix du tag
        refineRecipesFound = recipesFound.filter(byUtensil);

        // Ingrédients actualisés par le choix du tag
        refineIngredientList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

        // Appareils actualisés par le choix du tag
        refineDeviceList = Array.from(new Set(refineRecipesFound.map(recipe => recipe.appliance))).sort();

        // Ustensiles actualisés par le choix du tag
        refineUtensilList = Array.from(new Set(refineRecipesFound.flatMap(recipe => recipe.ustensils))).sort();

        // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
        refineIngredientList = cleanListBySelectTag(tagStockIngredient, refineIngredientList);
        refineDeviceList = cleanListBySelectTag(tagStockDevice, refineDeviceList);
        refineUtensilList = cleanListBySelectTag(tagStockUtensil, refineUtensilList);

        // Affichage global mit à jour
        displayRecipes(mainContentBlock, refineRecipesFound);
        displayAllItemBoxes(refineIngredientList, refineDeviceList, refineUtensilList);

        // Reset de la box au choix d'un item
        document.querySelectorAll('form.box__search').forEach(e => e.reset());

        // Fixe le résultat si affinage de la recherche
        recipesFound = refineRecipesFound;
        ingredientList = refineIngredientList;
        deviceList = refineDeviceList;
        utensilList = refineUtensilList;

        // = Display console
        logFullRefine(refineRecipesFound, refineIngredientList, refineDeviceList, refineUtensilList);

        // Actions à la suppression de tag
        const crossesForCloseTag = document.querySelectorAll('span.circle-utensil');
        crossesForCloseTag.forEach(e => {
          e.addEventListener('click', el => {

            // Reset de la box au choix d'un item
            document.querySelectorAll('form.box__search').forEach(e => e.reset());

            // Récupération à chaque suppression de tag, des recettes trouvées avec la recherche principale
            recipesAfterCloseTag = firstRecipesFound;

            // Suppression de l'ustensile de la liste des tags choisis
            tagStockUtensil = tagStockUtensil.filter(ustensile => formatString(ustensile) !== formatString(el.target.parentElement.dataset.utensil));

            tagStockDevice = Array.from(new Set(tagStockDevice));

            // Placement du block principal
            setMainTop(mainContentBlock, tagStockIngredient, tagStockDevice, tagStockUtensil);

            // Replacement de l'ustensile dans la liste affiché
            refineUtensilList.push(el.target.parentElement.dataset.utensil);

            // Reclassement des items
            refineUtensilList = refineUtensilList.sort();

            // Affichage de la liste mise à jour
            displayItemBoxes(utensilButton, utensilBox, contentUtensilList, refineUtensilList);

            // Suppression visuelle du tag
            el.target.parentElement.style.display = 'none';

            // Boucles qui actualise les recettes trouvées en fonction des tags restant dans la liste (tags selectionnés)
            recipesAfterCloseTag = updateRecipesByRemainingTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag);

            // Fixe la liste initiale si nouvelles recherches
            recipesFound = recipesAfterCloseTag;

            // Tri des ingrédients et stockage dans un tableau dédié
            ingredientList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ingredients).map(ingredient => ingredient.ingredient))).sort();

            // Tri des appareils et stockage dans un tableau dédié
            deviceList = Array.from(new Set(recipesAfterCloseTag.map(recipe => recipe.appliance))).sort();

            // Tri des ustensiles et stockage dans un tableau dédié
            utensilList = Array.from(new Set(recipesAfterCloseTag.flatMap(recipe => recipe.ustensils))).sort();

            // Parcours les listes de tags sélectionnés et suppression dans les listes d'items restants pour éviter les doublons
            ingredientList = cleanListBySelectTag(tagStockIngredient, ingredientList);
            deviceList = cleanListBySelectTag(tagStockDevice, deviceList);
            utensilList = cleanListBySelectTag(tagStockUtensil, utensilList);

            displayRecipes(mainContentBlock, recipesAfterCloseTag);
            displayAllItemBoxes(ingredientList, deviceList, utensilList);

            // = Display console
            fullLogAfterCloseTag(tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag, ingredientList, deviceList, utensilList);

          });
        });
      });
    });
    // #.select-tag - Actions au click sur un list item --- END

  });
  // - # 3.3 Précision de la recherche directement au click sur un item dans list-boxes *** Ustensile --- END

};

// * END
// ****************