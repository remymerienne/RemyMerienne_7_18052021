const uiNodeIngredientButton = document.querySelector('div.buttons-row__button--ingredient');
const uiNodeDeviceButton = document.querySelector('div.buttons-row__button--device');
const uiNodeUtensilButton = document.querySelector('div.buttons-row__button--utensil');
const uiNodeIngredientList = document.querySelector('ul.js-list-ingredient');
const uiNodeDeviceList = document.querySelector('ul.js-list-device');
const uiNodeUtensilList = document.querySelector('ul.js-list-utensil');

const calculateHeightList = (array) => {
  let len = array.length;
  while (len % 3 !== 0) {
    len++;
  }
  return ((len / 3) * 32) + 40;
};

const displayList = (uiNodeToInject, array) => {
  uiNodeToInject.innerHTML = (
    array.map((e) =>
      `  
        <li class="li">${e}</li>
      `
    ).join('')
  );
};

export const setIngredientList = (array) => {
  uiNodeIngredientButton.addEventListener('click', () => {
    uiNodeIngredientButton.style.display = 'none';
    uiNodeIngredientList.style.display = 'flex';
    uiNodeDeviceButton.style.marginLeft = '690px';
    uiNodeUtensilButton.style.marginLeft = '880px';
  });

  uiNodeIngredientList.style.height = `${calculateHeightList(array)}px`;
  displayList(uiNodeIngredientList, array);

  uiNodeIngredientList.addEventListener('mouseleave', () => {
    uiNodeIngredientList.style.display = 'none';
    uiNodeIngredientButton.style.display = 'flex';
    uiNodeDeviceButton.style.marginLeft = '190px';
    uiNodeUtensilButton.style.marginLeft = '380px';
  });
};

export const setDeviceList = (array) => {
  uiNodeDeviceButton.addEventListener('click', () => {
    uiNodeDeviceButton.style.display = 'none';
    uiNodeDeviceList.style.display = 'flex';
    uiNodeDeviceList.style.marginLeft = '190px';
    uiNodeUtensilButton.style.marginLeft = '880px';
  });

  uiNodeDeviceList.style.height = `${calculateHeightList(array)}px`;
  displayList(uiNodeDeviceList, array);

  uiNodeDeviceList.addEventListener('mouseleave', () => {
    uiNodeDeviceList.style.display = 'none';
    uiNodeDeviceButton.style.display = 'flex';
    uiNodeUtensilButton.style.marginLeft = '380px';
  });
};

export const setUtensilList = (array) => {
  uiNodeUtensilButton.addEventListener('click', () => {
    uiNodeUtensilButton.style.display = 'none';
    uiNodeUtensilList.style.display = 'flex';
    uiNodeUtensilList.style.marginLeft = '380px';
  });

  uiNodeUtensilList.style.height = `${calculateHeightList(array)}px`;
  displayList(uiNodeUtensilList, array);

  uiNodeUtensilList.addEventListener('mouseleave', () => {
    uiNodeUtensilList.style.display = 'none';
    uiNodeUtensilButton.style.display = 'flex';
  });
};
