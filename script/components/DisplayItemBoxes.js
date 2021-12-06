const calculateHeightList = (array) => {
  let len = array.length;
  while (len % 3 !== 0) {
    len++;
  }
  return ((len / 3) * 32) + 20;
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
    const selectForClose = '.main, .js-open, .fa-chevron-up';
    const NodesForClose = Array.from(page.querySelectorAll(selectForClose));
    
    NodesForClose.forEach(e => {
      e.addEventListener('click', () => {
        button.style.display = 'flex';
        box.style.display = 'none';
        button.classList.add('js-open');
      });
    });
    
  });

  list.style.height = `${calculateHeightList(array)}px`;
  displayList(list, array);

};