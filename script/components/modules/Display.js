// ********************************************************

const addJsOpenClassToButton = () => {
  document.querySelectorAll('button').forEach(e => {
    e.classList.add('js-open');
  });
};

// ==========================

const openList = (button, box) => {
  button.style.display = 'none';
  box.style.display = 'initial';
  button.classList.remove('js-open');
  document.querySelector('main').classList.add('js-absolute');
};

// ==========================

const closeList = (button, box) => {

  const page = document.querySelector('.page');
  const selectForClose = '.main, .js-open, .fa-chevron-up, .search-bar, .header, .tags-row, ul';
  const NodesForClose = Array.from(page.querySelectorAll(selectForClose));

  NodesForClose.forEach(e => {
    e.addEventListener('click', () => {
      button.style.display = 'flex';
      box.style.display = 'none';
    });
  });

};

// ==========================

const setMainTop = () => {

  const position = document.querySelector('div.buttons-row').getBoundingClientRect();
  const main = document.querySelector('main.main');
  const isAbsolute = main.classList.contains('js-absolute');

  if (window.innerWidth > 928 && isAbsolute === true) {
    main.style.top = `${window.pageYOffset + position.top + 89}px`;
  } else if (window.innerWidth <= 928 && window.innerWidth > 589 && isAbsolute === true) {
    main.style.top = `${window.pageYOffset + position.top + 70}px`;
  } else if (window.innerWidth <= 589 && window.innerWidth > 399 && isAbsolute === true) {
    main.style.top = `${window.pageYOffset + position.top + 140}px`;
  } else if (window.innerWidth <= 399 && isAbsolute === true) {
    main.style.top = `${window.pageYOffset + position.top + 210}px`;
  }

};

// ==========================

const switchToInitialPosition = () => {

  const page = document.querySelector('.page');
  const selectForSwitch = '.main, .fa-chevron-up, .search-bar, .header, .tags-row, ul';
  const NodesForSwitch = Array.from(page.querySelectorAll(selectForSwitch));

  NodesForSwitch.forEach(e => {
    e.addEventListener('click', () => {
      document.querySelector('main').classList.remove('js-absolute');
      document.querySelector('main').style.top = 'initial';
    });
  });

};

// ==========================

const scrollToTop = () => {

  const items = document.querySelectorAll('ul');

  items.forEach(e => {
    e.addEventListener('click', () => {
      window.scrollTo(0, 0);
    });
  });

};

// ==========================

const setListWidth = (list, array) => {
  if (array.length === 0) {
    list.style.paddingBottom = '0';
    list.style.width = '300px';
  } else if (array.length === 1 || window.innerWidth <= 1029) {
    list.style.paddingBottom = '20px';
    list.style.width = '300px';
  } else if (array.length === 2 || (window.innerWidth <= 1249 && window.innerWidth > 1029)) {
    list.style.paddingBottom = '20px';
    list.style.width = '450px';
  } else {
    list.style.paddingBottom = '20px';
    list.style.width = '670px';
  }
};

// ==========================

const setHeightList = (list, array) => {
  let len = array.length;
  if (window.innerWidth <= 1249 && window.innerWidth > 1029) {
    if (len > 0) {
      while (len % 2 !== 0) {
        len++;
      }
      list.style.height = `${((len / 2) * 32) + 20}px`;
    } else {
      list.style.height = `${0}px`;
    }
  } else if (window.innerWidth <= 1029) {
    if (len > 0) {
      while (len % 1 !== 0) {
        len++;
      }
      list.style.height = `${((len / 1) * 32) + 20}px`;
    } else {
      list.style.height = `${0}px`;
    }
  } else {
    if (len > 0) {
      while (len % 3 !== 0) {
        len++;
      }
      list.style.height = `${((len / 3) * 32) + 20}px`;
    } else {
      list.style.height = `${0}px`;
    }
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

    addJsOpenClassToButton();

    openList(button, box);

    closeList(button, box);

    setMainTop();

    switchToInitialPosition();

  });

  scrollToTop();

  setListWidth(list, array);

  setHeightList(list, array);

  displayList(list, array);

};

// ********************************************************

const displayIngredients = (recipe) => {
  let ingredientsList = '';
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList += `
  <p class="li">
  ${recipe.ingredients[i].ingredient}
  <span class="quantity">
  ${recipe.ingredients[i].quantity !== undefined ? ':&nbsp' : ''}
  ${recipe.ingredients[i].quantity !== undefined ? recipe.ingredients[i].quantity : ''} 
  ${recipe.ingredients[i].unit !== undefined ? recipe.ingredients[i].unit : ''}
  </span>
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

export const displayTags = (element, array) => {

  const ingredientRow = document.querySelector('div.ingredient-row');
  const deviceRow = document.querySelector('div.device-row');
  const utensilRow = document.querySelector('div.utensil-row');

  if (element.target.className === 'li li-ingredient') {
    ingredientRow.innerHTML = (
      array.map(ingredient =>
        `
          <div class="tags-row__tag tags-row__tag--ingredient" data-ingredient="${ingredient}">
            <p>${ingredient}</p>
            <span class="far fa-times-circle circle-ingredient"></span>
          </div>
        `
      ).join('')
    );
  } else if (element.target.className === 'li li-device') {
    deviceRow.innerHTML = (
      array.map(device =>
        `
          <div class="tags-row__tag tags-row__tag--device" data-device="${device}">
            <p>${device}</p>
            <span class="far fa-times-circle circle-device"></span>
          </div>
        `
      ).join('')
    );
  } else if (element.target.className === 'li li-utensil') {
    utensilRow.innerHTML = (
      array.map(utensil =>
        `
          <div class="tags-row__tag tags-row__tag--utensil" data-utensil="${utensil}">
            <p>${utensil}</p>
            <span class="far fa-times-circle circle-utensil"></span>
          </div>
        `
      ).join('')
    );
  }

};

// * END
// ****************