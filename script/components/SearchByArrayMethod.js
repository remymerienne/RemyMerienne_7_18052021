import {
  recipes
} from '../../recipes';

const formatString = (string) => {
  string = string.toLowerCase();
  string = string.replace(/[éèëê]/g, 'e');
  string = string.replace(/[îï]/g, 'i');
  string = string.replace(/[à]/g, 'a');
  string = string.replace(/[ç]/g, 'c');
  return string;
};

const userSearch = formatString('fra');

const filterByName = (obj) => {

    if(formatString(obj.name).indexOf(userSearch) !== -1) {

      return true;

    }

};

export const searchByArrayMethod = () => {

  const recipesIdByName = recipes.filter(filterByName);

  console.log(recipesIdByName);

};
