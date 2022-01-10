// ********************************************************

export const fullLogAfterCloseTag = (tagStockIngredient, tagStockDevice, tagStockUtensil, recipesAfterCloseTag, ingredientList, deviceList, utensilList) => {
  console.clear();
  console.log('Tags ingrédient sélectionnés:', tagStockIngredient);
  console.log('Tags appareil sélectionnés:', tagStockDevice);
  console.log('Tags ustensiles sélectionnés:', tagStockUtensil);
  console.log('Recettes trouvées:', recipesAfterCloseTag);
  console.log('Ingrédients mis à jour:', ingredientList);
  console.log('Appareils mis à jour:', deviceList);
  console.log('Ustensiles mis à jour:', utensilList);
};

// ********************************************************

export const logAfterMainSearch = (recipesFound, ingredientList, deviceList, utensilList) => {
  console.log('Recettes triées:', recipesFound);
  console.log('Ingrédients nécessaires:', ingredientList);
  console.log('Appareils nécessaires:', deviceList);
  console.log('Ustensiles nécessaires:', utensilList);
};

// ********************************************************

export const logTagStock = (tagStockIngredient, tagStockDevice, tagStockUtensil) => {
  console.clear();
  console.log('Tags ingrédient sélectionnés:', tagStockIngredient);
  console.log('Tags appareil sélectionnés:', tagStockDevice);
  console.log('Tags ustensiles sélectionnés:', tagStockUtensil);
};

// ********************************************************

export const logFullRefine = (refineRecipesFound, refineIngredientList, refineDeviceList, refineUtensilList) => {
  console.log('Recettes trouvées:', refineRecipesFound);
  console.log('Ingrédients mis à jour:', refineIngredientList);
  console.log('Appareils mis à jour:', refineDeviceList);
  console.log('Ustensiles mis à jour:', refineUtensilList);
};

// * END
// ****************
