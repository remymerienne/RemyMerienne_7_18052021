const displayIngredients = (recipe) => {
  let ingredientsList = '';
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList += `
      <p class="li">
        ${recipe.ingredients[i].ingredient}
        ${recipe.ingredients[i].quantity !== undefined ? ':&nbsp' : ''}
        ${recipe.ingredients[i].quantity !== undefined ? recipe.ingredients[i].quantity : ''} 
        ${recipe.ingredients[i].unit !== undefined ? recipe.ingredients[i].unit : ''} 
      </p>`;
  }
  return ingredientsList;
};

export const displayRecipes = (uiNodeToinject, recipesFound) => {
  uiNodeToinject.innerHTML = (
    recipesFound.map(recipe =>
      `  
        <article class="recipe">
          <div class="recipe__photo"></div>
          <div class="recipe__details">
            <div class="high-group-recipe">
              <h2 class="high-group-recipe__title">${recipe.name}</h2>
              <p class="high-group-recipe__time">${recipe.time}</p>
            </div>
            <div class="low-group-recipe">
              <div class="low-group-recipe__list">
                ${displayIngredients(recipe)}
              </div>
              <p class="low-group-recipe__task">${recipe.description}</p>
            </div>
          </div>
        </article>
      `
    ).join('')
  );
};
