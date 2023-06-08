// Create Food

const formEl = document.querySelector('form');
const inputEl = formEl.elements.create_food;
const ulEl = document.querySelector('ul');

const noDataEl = document.getElementById('noData');
localStorage.setItem("foodItems", JSON.stringify(JSON.parse(localStorage.getItem("foodItems") || "[]")));

document.addEventListener('DOMContentLoaded', () => {
    const fooItems = [...JSON.parse(localStorage.getItem('foodItems'))];

    fooItems.forEach((element) => {
        const createLi = document.createElement('li');
        const span = document.createElement('span');
        span.className = 'remove';
        createLi.textContent = element.foodItem;
        span.setAttribute("onclick", "removeItem(event)");
        span.innerHTML = ' X';
        ulEl.append(createLi);
        createLi.append(span);
    });
    refreshUI();
});

formEl.addEventListener('submit', (el) => {
    el.preventDefault();

    const createLi = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'remove';
    createLi.textContent = inputEl.value;
    span.setAttribute("onclick", "removeItem(event)");
    span.innerHTML = ' X';
    ulEl.append(createLi);
    createLi.append(span);

    localStorage.setItem("foodItems", JSON.stringify([...JSON.parse(localStorage.getItem("foodItems") || "[]"), {
        foodItem: inputEl.value
    }, ]));
    refreshUI();
});


function removeItem(event) {

    const removeElement = event.target.parentNode;
    const jsonFoodItems = [...JSON.parse(localStorage.getItem('foodItems'))];

    jsonFoodItems.forEach((removeElements) => {
        if ((removeElements.foodItem) == removeElement.innerText.replace(' X', '')) {
            jsonFoodItems.splice(jsonFoodItems.indexOf(removeElements), 1);
        }
    });
    removeElement.remove();
    localStorage.setItem('foodItems', JSON.stringify(jsonFoodItems));
    refreshUI();

}

function refreshUI() {
    if (ulEl.children.length > 0) {
        noDataEl.hidden = true;
    } else {
        noDataEl.hidden = false;
    }
}