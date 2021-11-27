// import { recipes } from '../../recipes';

// const formatString = (string) => {
//   string = string.toLowerCase();
//   string = string.replace(/[éèëê]/g, 'e');
//   string = string.replace(/[îï]/g, 'i');
//   string = string.replace(/[à]/g, 'a');
//   string = string.replace(/[ç]/g, 'c');
//   return string;
// };

export const searchByArrayMethod = () => {

  const uiNodeSearchBar = document.querySelector('.search-bar__input');

  uiNodeSearchBar.addEventListener('keyup', e => {

    // Lancement de la recherche au troisième caractère saisi
    if (e.target.value.length >= 3) {

      let recipesFound = [];

      console.log(recipesFound);

    }

  });

};