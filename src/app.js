const tbody = document.querySelector("#tbody");
const saveButton = document.querySelector('#savebutton');
const nameInput = document.querySelector('#name');
const quantityInput = document.querySelector('#quantity');
const priceInput = document.querySelector('#price');

const idEdit = document.querySelector('#editid');
const nameEdit = document.querySelector('#editname');
const quantityEdit = document.querySelector('#editquantity');
const priceEdit = document.querySelector('#editprice');
const editButton = document.querySelector('#saveEditButton');

const gyumolcsok = [
    { id: 1, name: 'szilva', quantity: 35, price: 8 },
    { id: 2, name: 'alma', quantity: 45, price: 8.3 },
    { id: 3, name: 'körte', quantity: 25, price: 9.5 },
    { id: 4, name: 'barack', quantity: 37, price: 12 }
];


function generateTbody() {
    gyumolcsok.forEach((gyumolcs) => {
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdQuantity = document.createElement('td');
        let tdPrice = document.createElement('td');

        tdName.textContent = gyumolcs.name;
        tdQuantity.textContent = gyumolcs.quantity;
        tdPrice.textContent = gyumolcs.price;

        tbody.append(tr);
        tr.append(tdName);
        tr.append(tdQuantity);
        tr.append(tdPrice);
        tr.append(generateTdDelete(gyumolcs.id));
        tr.append(generateTdEdit(gyumolcs));
    });
}
generateTbody();

function generateTdDelete(id) {
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = "Törlés";
    button.classList = "btn btn-warning";
    button.addEventListener('click', () => {
        console.log(id);
        let index = 0;
        let count = 0;
        gyumolcsok.forEach((gy) => {
            if (gy.id == id) {
                index = count;
            }
            count++;
        });
        console.log(index);
        gyumolcsok.splice(index, 1);
        tbody.textContent = "";
        generateTbody();
    });
    td.append(button);
    return td;
}

saveButton.addEventListener('click', () => {
    console.log('működik');
    let name = nameInput.value;
    let quantity = quantityInput.value;
    let price = priceInput.value;
    let gyumolcs = {
        name: name,
        quantity: quantity,
        price: price
    };

    gyumolcsok.push(gyumolcs);
    console.log(gyumolcsok);
    tbody.textContent = '';
    generateTbody();
    clearInputOnAddModal();
});

function clearInputOnAddModal() {

    nameInput.value = '';
    quantityInput.value = '';
    priceInput.value = '';
}

editButton.addEventListener('click', () => {
    let id = idEdit.value;
    let name = nameEdit.value;
    let quantity = quantityEdit.value;
    let price = priceEdit.value;

    gyumolcsok.forEach(gyumolcs => {
        if ((gyumolcs.id == id)) {
            gyumolcs.name = name;
            gyumolcs.price = price;
            gyumolcs.quantity = quantity;
        }
    });
    tbody.textContent = '';
    generateTbody();
});


function generateTdEdit(fruit) {
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = "Módosítás";
    button.classList = "btn btn-secondary";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', "#editModal");
    button.addEventListener('click', () => { 
        idEdit.value = fruit.id;
        nameEdit.value = fruit.name;
        quantityEdit.value = fruit.quantity;
        priceEdit.value = fruit.price;

    });
    td.append(button);
    return td;
}