import {
  recipes
} from '../../recipes';

export const search = () => {

  console.log(recipes);

  const uiNodeSearchBar = document.querySelector('.search-bar__input');

  uiNodeSearchBar.addEventListener('keyup', e => {

    if (e.target.value.length >= 3) {

      let recipeId = 1;
      let recipesFound = [];

      while (recipeId != (recipes.length + 1)) {

        const userSearch = e.target.value.toLowerCase();
        const recipeTested = recipes.filter(p => p.id === recipeId);

        const recipeTestedByName = recipeTested[0].name.toLowerCase();
        const resultName = recipeTestedByName.indexOf(userSearch);

        const recipeTestedByDescription = recipeTested[0].description.toLowerCase();
        const resultDescription = recipeTestedByDescription.indexOf(userSearch);

        // const chose = recipeTested[0].ingredients;
        // console.log(chose);


        if (resultName !== -1 || resultDescription !== -1) {
          recipesFound.push(recipeId);


        }

        recipeId++;

      }

      console.log(recipesFound);

    }

  });

};