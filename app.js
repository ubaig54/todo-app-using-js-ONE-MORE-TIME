let listItems = document.querySelector('.listItems');
let listInput = document.querySelector('.listInput');

let listInputForm = document.querySelector('.listInputForm');

itemsArray = [];

listInputForm.onsubmit = () => {
    inputValue = listInput.value;
    if (inputValue !== "") {
        itemsArray.unshift(inputValue);

        listItems.innerHTML = "";

        for (i = 0; i < itemsArray.length; i++) {
            listItems.innerHTML += `<li><span>${itemsArray[i]}</span><input type="text" class="editField"><button class="editItem" onclick="editItem(this, ${i})">Edit</button><button class="saveItem" onclick="saveItem(this, ${i})">Save</button><button class="delete" onclick="deleteItem(${i})">Delete</button></li>`;
        }
    } else {
        alert("Are you dumb or what? Write something.")
    }

    listInput.value = "";

    return false;
}


let deleteItem = (index) => {
    itemsArray.splice(index, 1);

    listItems.innerHTML = "";

    for (i = 0; i < itemsArray.length; i++) {
        listItems.innerHTML += `<li><span>${itemsArray[i]}</span><input type="text" class="editField"><button class="editItem" onclick="editItem(this)">Edit</button><button class="saveItem" onclick="saveItem(this, ${i})">Save</button><button class="delete" onclick="deleteItem(${i})">Delete</button></li>`;
    }
}


let editItem = (editItem) => {
    let itemTxt = editItem.previousSibling.previousSibling;
    let editField = editItem.previousSibling;
    let saveBtn = editItem.nextSibling;

    editField.value = itemTxt.innerHTML;

    editItem.style.display = "none";
    saveBtn.style.display = "inline";

    itemTxt.style.display = "none";
    editField.style.display = "inline";
}

let saveItem = (saveItem, index) => {
    let itemTxt = saveItem.previousSibling.previousSibling.previousSibling;
    let editField = saveItem.previousSibling.previousSibling;
    let editBtn = saveItem.previousSibling;

    itemsArray[index] = editField.value;
    itemTxt.innerHTML = editField.value;

    editBtn.style.display = "inline";
    saveItem.style.display = "none";

    itemTxt.style.display = "inline";
    editField.style.display = "none";
}