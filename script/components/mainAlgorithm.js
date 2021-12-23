import {
  recipes
} from '../recipes';

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

export const mainAlgorithm = () => {

  const uiNodeSearchBar = document.querySelector('.search-bar__input');

  uiNodeSearchBar.addEventListener('keyup', e => {

    // Lancement de la recherche au troisième caractère saisi
    if (e.target.value.length >= 3) {

      let recipesFound = [];
      let ingredientFound = [];
      let deviceFound = [];
      let utensilFound = [];

      // Boucle principale inspectant toutes les recettes
      for (let i = 0; i < recipes.length; i++) {

        const userSearch = formatString(e.target.value);
        const recipeTested = recipes[i];

        // Comparaison de la saisi avec le nom de la recette
        const recipeName = formatString(recipeTested.name);
        const testResultByName = recipeName.indexOf(userSearch);

        // Comparaison de la saisi avec la description de la recette
        const recipeDescription = formatString(recipeTested.description);
        const testResultByDescription = recipeDescription.indexOf(userSearch);

        // Comparaison de la saisi avec les ingrédients de la recette
        const ingredients = recipeTested.ingredients;
        let testResultByIngredient;
        for (let i in ingredients) {
          const recipeIngredient = formatString(ingredients[i].ingredient);
          testResultByIngredient = recipeIngredient.indexOf(userSearch);
          // Arrêt de la boucle For si une correspondance est trouvées
          if (testResultByIngredient !== -1) {
            break;
          }
        }

        // Test de correspondance générale
        if (testResultByName !== -1 || testResultByDescription !== -1 || testResultByIngredient !== -1) {
          // Stockage des recettes ayant correspondance avec la saisie utilisateur
          recipesFound.push(recipeTested);
        }

      }

      // Parcours et stockage des ingrédient trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        for (let j in recipesFound[i].ingredients) {
          ingredientFound.push(recipesFound[i].ingredients[j].ingredient);
        }
      }

      // Parcours et stockage des appareils trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        deviceFound.push(recipesFound[i].appliance);
      }

      // Parcours et stockage des ustensiles trouvés parmi les recettes retenues
      for (let i in recipesFound) {
        for (let j in recipesFound[i].ustensils) {
          utensilFound.push(recipesFound[i].ustensils[j]);
        }
      }

      // Classement et suppression des doublons des données mises à jour
      recipesFound = recipesFound.sort(sortByName);
      ingredientFound = Array.from(new Set(ingredientFound)).sort();
      deviceFound = Array.from(new Set(deviceFound)).sort();
      utensilFound = Array.from(new Set(utensilFound)).sort();

      // Vérification dans la console
      console.log(recipesFound);
      console.log(ingredientFound);
      console.log(deviceFound);
      console.log(utensilFound);

    }

  });

};