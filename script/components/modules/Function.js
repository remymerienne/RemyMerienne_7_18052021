// ********************************************************

export const formatString = (string) => {
  string = string.toLowerCase();
  string = string.replace(/[éèëê]/g, 'e');
  string = string.replace(/[îï]/g, 'i');
  string = string.replace(/[àâ]/g, 'a');
  string = string.replace(/[ç]/g, 'c');
  return string;
};

// ********************************************************

export const byName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

// ********************************************************


// Supprime de la liste, les items dejà sélectionnés sous
// forme de tag et qui sont stockés dans TagStockList.
export const cleanListBySelectTag = (tagStockList, list) => {
  for (let i in tagStockList) {
    list = list.filter(item => formatString(item) !== formatString(tagStockList[i]));
  }
  return list;
};

// ********************************************************

export const updateRecipesByRemainingTag = (tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag) => {
  for (let j in tagStockIngredient) {
    const byRemainingIngredientTag = (recipe) => {
      for (let i in recipe.ingredients) {
        if (formatString(recipe.ingredients[i].ingredient).match(formatString(tagStockIngredient[j])) !== null) {
          return true;
        }
      }
      return false;
    };
    recipesAfterCloseTag = recipesAfterCloseTag.filter(byRemainingIngredientTag);
  }
  for (let j in tagStockDevice) {
    const byRemainingDeviceTag = (recipe) => {
      if (formatString(recipe.appliance).match(formatString(tagStockDevice[j])) !== null) {
        return true;
      }
      return false;
    };
    recipesAfterCloseTag = recipesAfterCloseTag.filter(byRemainingDeviceTag);
  }
  for (let j in tagStockUtensil) {
    const byRemainingUtensilTag = (recipe) => {
      for (let i in recipe.ustensils) {
        if (formatString(recipe.ustensils[i]).match(formatString(tagStockUtensil[j])) !== null) {
          return true;
        }
      }
      return false;
    };
    recipesAfterCloseTag = recipesAfterCloseTag.filter(byRemainingUtensilTag);
  }
  return recipesAfterCloseTag;
};

// ********************************************************
