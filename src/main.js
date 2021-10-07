// Fetch the items from JSON file
function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter(item => item[key] === value));
}

function setEventListners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', () => onButtonClick(event, items));
}

// main
loadItems()
  .then(items => {
    displayItems(items);
    setEventListners(items);
  })
  .catch(console.log);

// 단점 : 클릭할 때 마다 다시 요소들을 만들어서 다시 컨테이너에 innerHTML을 수정하니까
// 버튼을 클릭할 때 마다 새로운 요소들을 만들어야 되고 컨테이너가 전체적으로 업데이트되는
// 문제점이 있다.
// 개선하기 위해서는
// displayItems(items.filter(item => item[key] === value));
// 이렇게 필터링된 부분을 다시 보여주기 보다는 display : visible을 이용하여
// 해당하는 요소만 visible 해당하지 않으면 unvisible하게 할 수 있다.