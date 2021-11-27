import {
  recipes
} from '../../recipes';

// = Nettoyage console pour test
const clearConsole = () => {
  const uiNodeSearchBar = document.querySelector('.search-bar__input');
  uiNodeSearchBar.addEventListener('keydown', () => {
    console.clear();
    console.log(recipes);
  });
};

const formatString = (string) => {
  string = string.toLowerCase();
  string = string.replace(/[éèëê]/g, 'e');
  string = string.replace(/[îï]/g, 'i');
  string = string.replace(/[à]/g, 'a');
  string = string.replace(/[ç]/g, 'c');
  return string;
};

export const searchByLoop = () => {

  clearConsole();

  const uiNodeSearchBar = document.querySelector('.search-bar__input');

  uiNodeSearchBar.addEventListener('keyup', e => {

    // - Lancement de la recherche au troisième caractère saisi
    if (e.target.value.length >= 3) {

      console.time('test');

      let recipesFound = [];

      // - Boucle principale inspectant toutes les recettes Id par Id
      for (let i = 0; i < recipes.length; i++) {

        const userSearch = formatString(e.target.value);
        const recipeTested = recipes[i];

        // - Comparaison de la saisi avec le nom de la recette
        const recipeName = formatString(recipeTested.name);
        const testResultByName = recipeName.indexOf(userSearch);

        // = Affichage console pour test ***
        if (testResultByName !== -1) {
          console.log(`Recette N° ${recipeTested.id} - Nom : ${recipeName}`);
        }
        // = Affichage console pour test-END ***

        // - Comparaison de la saisi avec la description de la recette
        const recipeDescription = formatString(recipeTested.description);
        const testResultByDescription = recipeDescription.indexOf(userSearch);

        // - Comparaison de la saisi avec les ingrédients de la recette-START ***
        const ingredients = recipeTested.ingredients;
        let testResultByIngredient;

        for (let i in ingredients) {

          const recipeIngredient = formatString(ingredients[i].ingredient);
          testResultByIngredient = recipeIngredient.indexOf(userSearch);

          if (testResultByIngredient !== -1) {
            // = Affichage console pour test ***
            console.log(`Recette N° ${recipeTested.id} - Ingrédient : ${recipeIngredient}`);
            // = Affichage console pour test-END ***
            break;
          }

        }
        // - Comparaison de la saisi avec les ingrédients de la recette-END ***

        // - Test de correspondance générale
        if (testResultByName !== -1 || testResultByDescription !== -1 || testResultByIngredient !== -1) {

          // - Tableau contenant les Id des recettes ayant correspondance avec la saisie utilisateur
          recipesFound.push(recipeTested.id);

        }

      }

      console.log(recipesFound);
      console.timeEnd('test');

    }

  });

};