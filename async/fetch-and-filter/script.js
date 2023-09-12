const input = document.getElementById('input');
let filterValue;
let infoToDisplay;

const wrapperDiv = document.createElement('div');
wrapperDiv.style.display = 'grid';
wrapperDiv.style.gridTemplateRows = 'auto';
wrapperDiv.style.gridTemplateColumns = '200px 200px 200px 200px';

document.body.append(wrapperDiv);

const users = fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) => {
    infoToDisplay = users.map((el) => {
      return { name: el.name, username: el.username, website: el.website };
    });
  });

input.addEventListener('keyup', () => {
  filterValue = input.value;

  const updatedInfo = infoToDisplay.filter((el) =>
    el.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  displayItems(updatedInfo);
});

function displayItems(items) {
  wrapperDiv.innerHTML = null;

  for (const item of items) {
    const card = document.createElement('div');
    card.style.height = '300px';
    card.style.width = '200px';
    const nameField = document.createElement('p');
    nameField.innerHTML = `<b>Name:</b> ${item.name}<br><b>Username:</b> ${item.username}<br><b>Website:</b> ${item.website}</>`;
    card.append(nameField);
    wrapperDiv.append(card);
  }
}
