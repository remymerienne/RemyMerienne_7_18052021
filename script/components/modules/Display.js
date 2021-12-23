// ********************************************************

const calculateHeightList = (array) => {
  let len = array.length;
  if (len > 0) {
    while (len % 3 !== 0) {
      len++;
    }
    return ((len / 3) * 32) + 20;
  } else {
    return 0;
  }
};

// ==========================

const displayList = (whereToInject, array) => {

  const contentIngredientList = document.querySelector('ul.box__list--ingredient');
  const contentDeviceList = document.querySelector('ul.box__list--device');
  const contentUtensilList = document.querySelector('ul.box__list--utensil');

  if (whereToInject === contentIngredientList) {
    whereToInject.innerHTML = (
      array.map((e) =>
        `  
          <li class="li li-ingredient">${e}</li>
        `
      ).join('')
    );
  } else if (whereToInject === contentDeviceList) {
    whereToInject.innerHTML = (
      array.map((e) =>
        `  
          <li class="li li-device">${e}</li>
        `
      ).join('')
    );
  } else if (whereToInject === contentUtensilList) {
    whereToInject.innerHTML = (
      array.map((e) =>
        `  
          <li class="li li-utensil">${e}</li>
        `
      ).join('')
    );
  }
};

// ==========================

export const displayItemBoxes = (button, box, list, array) => {

  button.addEventListener('click', () => {

    // Ajout de classe # à tous les boutons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(e => {
      e.classList.add('js-open');
    });

    // Ouverture des listes au click sur bouton
    button.style.display = 'none';
    box.style.display = 'initial';
    // box.reset();
    button.classList.remove('js-open');

    // Définition des zones de click et fermeture des listes 
    const page = document.querySelector('.page');
    const selectForClose = '.main, .js-open, .fa-chevron-up, .search-bar__input';
    const NodesForClose = Array.from(page.querySelectorAll(selectForClose));

    NodesForClose.forEach(e => {
      e.addEventListener('click', () => {
        button.style.display = 'flex';
        box.style.display = 'none';
      });
    });

  });

  // Mise en page des liste selon le nombre de résultat
  if (array.length === 0) {
    list.style.paddingBottom = '0';
    list.style.width = '300px';
  } else if (array.length <= 1) {
    list.style.paddingBottom = '20px';
    list.style.width = '300px';
  } else if (array.length === 2) {
    list.style.paddingBottom = '20px';
    list.style.width = '450px';
  } else {
    list.style.paddingBottom = '20px';
    list.style.width = '670px';
  }

  // Calcul de la hauteur de la lise et affichage
  list.style.height = `${calculateHeightList(array)}px`;
  displayList(list, array);

};

// ********************************************************

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

// ==========================

export const displayRecipes = (whereToInject, recipesFound) => {
  whereToInject.innerHTML = (
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

// ********************************************************

export const displayTags = (element) => {

  const ingredientRow = document.querySelector('div.ingredient-row');
  const deviceRow = document.querySelector('div.device-row');
  const utensilRow = document.querySelector('div.utensil-row');

  if (element.target.className === 'li li-ingredient') {
    console.log('true');
    ingredientRow.innerHTML +=
      `
            <div class="tags-row__tag tags-row__tag--ingredient" data-ingredient="${element.target.innerText}">
              <p>${element.target.innerText}</p>
              <span class="far fa-times-circle circle-ingredient"></span>
            </div>
          `;
  } else if (element.target.className === 'li li-device') {
    deviceRow.innerHTML +=
      `
            <div class="tags-row__tag tags-row__tag--device" data-device="${element.target.innerText}">
              <p>${element.target.innerText}</p>
              <span class="far fa-times-circle circle-device"></span>
            </div>
          `;
  } else if (element.target.className === 'li li-utensil') {
    utensilRow.innerHTML +=
      `
            <div class="tags-row__tag tags-row__tag--utensil" data-utensil="${element.target.innerText}">
              <p>${element.target.innerText}</p>
              <span class="far fa-times-circle circle-utensil"></span>
            </div>
          `;
  }

};

// ********************************************************

const checkLength = (list) => {
  if (list.length !== 0) {
    return 1;
  } else {
    return 0;
  }
};

// ==========================

export const setMainTop = (node, tagStockIngredient, tagStockDevice, tagStockUtensil) => {
  const numberOfTagRow = checkLength(tagStockIngredient) + checkLength(tagStockDevice) + checkLength(tagStockUtensil);
  if (numberOfTagRow === 0) {
    node.style.top = '340px';
  } else if (numberOfTagRow === 1) {
    node.style.top = '390px';
  } else if (numberOfTagRow === 2) {
    node.style.top = '443px';
  } else if (numberOfTagRow === 3) {
    node.style.top = '495px';
  }
};

// ********************************************************
