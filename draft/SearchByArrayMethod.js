import { recipes } from '../../recipes';

const formatString = (string) => {
  string = string.toLowerCase();
  string = string.replace(/[éèëê]/g, 'e');
  string = string.replace(/[îï]/g, 'i');
  string = string.replace(/[à]/g, 'a');
  string = string.replace(/[ç]/g, 'c');
  return string;
};

export const searchByArrayMethod = () => {

  const uiNodeSearchBar = document.querySelector('.search-bar__input');

  uiNodeSearchBar.addEventListener('keyup', e => {

    const userSearch = formatString(e.target.value);

    let recipesFound = [];

    if (e.target.value.length >= 3) {

      const filterByName = (obj) => {
        if (formatString(obj.name).indexOf(userSearch) !== -1) {
          return true;
        }
      };

      const filterByDescription = (obj) => {
        if (formatString(obj.description).indexOf(userSearch) !== -1) {
          return true;
        }
      };

      const filterByIngredient = (obj) => {
        for (let i in obj.ingredients) {
          if (formatString(obj.ingredients[i].ingredient).indexOf(userSearch) !== -1) {
            return true;
          }
        }
      };

      recipes.filter(filterByName).forEach(e => {
        recipesFound.push(e.id);
      });

      recipes.filter(filterByDescription).forEach(e => {
        recipesFound.push(e.id);
      });

      recipes.filter(filterByIngredient).forEach(e => {
        recipesFound.push(e.id);
      });

      // Suppression des Id en double
      recipesFound = Array.from(new Set(recipesFound));

      // Mise en ordre croissant des Id
      recipesFound.sort((a, b) => a - b);

      console.log(recipesFound);
      
    }

  });

};