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

const displayList = (uiNodeToInject, array) => {
  uiNodeToInject.innerHTML = (
    array.map((e) =>
      `  
        <li class="li">${e}</li>
      `
    ).join('')
  );
};

export const displayItemBoxes = (button, box, list, array) => {

  button.addEventListener('click', () => {

    button.style.display = 'none';
    box.style.display = 'initial';
    button.classList.remove('js-open');

    const page = document.querySelector('.page');
    const selectForClose = '.main, .js-open, .fa-chevron-up, .search-bar__input';
    const NodesForClose = Array.from(page.querySelectorAll(selectForClose));

    NodesForClose.forEach(e => {
      e.addEventListener('click', () => {
        button.style.display = 'flex';
        box.style.display = 'none';
        button.classList.add('js-open');
      });
    });

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

    list.style.height = `${calculateHeightList(array)}px`;
    displayList(list, array);

  });

};