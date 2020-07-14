const listItems = document.querySelector('.listItems');
const listInput = document.querySelector('.listInput');

const listInputForm = document.querySelector('.listInputForm');

let itemsArray = [];
let arrayInLocalStorage = JSON.parse(localStorage.getItem('itemsArray', itemsArray));

// rendering on load
window.onload = () => {
    itemsArray = arrayInLocalStorage;

    console.log(itemsArray)

    // rendering list 
    for (i = 0; i < itemsArray.length; i++) {
        listItems.innerHTML += `<li><span>${itemsArray[i]}</span><input type="text" class="editField"><button class="editItem" onclick="editItem(this, ${i})">Edit</button><button class="saveItem" onclick="saveItem(this, ${i})">Save</button><button class="delete" onclick="deleteItem(this, ${i})">Delete</button><button class="cancelEdit" onclick="cancelEdit(this)">Cancel</button></li>`;
    }
}

// rendering on submit
listInputForm.onsubmit = () => {
    inputValue = listInput.value;
    if (inputValue !== "") {
        // adding data in itemsArray
        itemsArray.unshift(inputValue);

        // setting and getting data from local storage
        localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
        // arrayInLocalStorage = JSON.parse(localStorage.getItem('itemsArray', itemsArray));

        // clearing list so there won't be any duplicates
        listItems.innerHTML = "";

        // rendering list 
        for (i = 0; i < itemsArray.length; i++) {
            listItems.innerHTML += `<li><span>${itemsArray[i]}</span><input type="text" class="editField"><button class="editItem" onclick="editItem(this, ${i})">Edit</button><button class="saveItem" onclick="saveItem(this, ${i})">Save</button><button class="delete" onclick="deleteItem(this, ${i})">Delete</button><button class="cancelEdit" onclick="cancelEdit(this)">Cancel</button></li>`;
        }

        console.log(itemsArray);
    } else {
        // calling dumb, dumb.
        alert("Sorry to call you dumb. But write something, you dumb.");
    }

    // clearing input when user add item in list
    listInput.value = "";

    // so the <form> don't referesh the website on submit
    return false;
}


const deleteItem = (deleteItem, index) => {
    itemsArray.splice(index, 1);
    
    // clearing list so there won't be any duplicates
    listItems.innerHTML = "";

    // rendering list 
    for (i = 0; i < itemsArray.length; i++) {
        listItems.innerHTML += `<li><span>${itemsArray[i]}</span><input type="text" class="editField"><button class="editItem" onclick="editItem(this, ${i})">Edit</button><button class="saveItem" onclick="saveItem(this, ${i})">Save</button><button class="delete" onclick="deleteItem(this, ${i})">Delete</button><button class="cancelEdit" onclick="cancelEdit(this)">Cancel</button></li>`;
    }

    // setting and getting data again from local storage
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));

}


const editItem = (editItem) => {
    let itemTxt = editItem.previousSibling.previousSibling;
    let editField = editItem.previousSibling;
    let saveBtn = editItem.nextSibling;
    let cancelEdit = editItem.nextSibling.nextSibling.nextSibling;
    let deleteBtn = editItem.nextSibling.nextSibling;

    editField.value = itemTxt.innerHTML;

    editItem.style.display = "none";
    saveBtn.style.display = "inline";
    cancelEdit.style.display = "inline";
    deleteBtn.style.display = "none";

    itemTxt.style.display = "none";
    editField.style.display = "inline";
}

const saveItem = (saveItem, index) => {
    let itemTxt = saveItem.previousSibling.previousSibling.previousSibling;
    let editField = saveItem.previousSibling.previousSibling;
    let editBtn = saveItem.previousSibling;
    let cancelEdit = saveItem.nextSibling.nextSibling;
    let deleteBtn = saveItem.nextSibling;

    itemsArray[index] = editField.value;
    itemTxt.innerHTML = editField.value;

    // setting and getting data again from local storage
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));

    console.log(itemsArray)

    editBtn.style.display = "inline";
    saveItem.style.display = "none";
    cancelEdit.style.display = "none";
    deleteBtn.style.display = "inline";

    itemTxt.style.display = "inline";
    editField.style.display = "none";
}

const cancelEdit = (cancelEdit) => {
    let itemTxt = cancelEdit.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
    let editField = cancelEdit.previousSibling.previousSibling.previousSibling.previousSibling;
    let editBtn = cancelEdit.previousSibling.previousSibling.previousSibling;
    let saveBtn = cancelEdit.previousSibling.previousSibling;
    let deleteBtn = cancelEdit.previousSibling;

    editBtn.style.display = "inline";
    saveBtn.style.display = "none";
    cancelEdit.style.display = "none";
    deleteBtn.style.display = "inline";

    itemTxt.style.display = "inline";
    editField.style.display = "none";
}