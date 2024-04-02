let button1 = document.getElementById("btn1");
let button2 = document.getElementById("btn2");
let darkMode = document.getElementById("darkMode");
let inputText = document.getElementById("Produсt");
let inputNumber = document.getElementById("quantity");
let addButton = document.getElementById("btn1");

button2.addEventListener("click", () => {
    ClearAll()
});

button1.addEventListener("click", () => {
    CreateList()
});

darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    sessionStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
});

inputText.addEventListener('keydown', handleEnterKey);

inputNumber.addEventListener('keydown', handleEnterKey);

function CreateList() {
    let product1 = document.getElementById("Produсt").value;
    let quantity = document.getElementById("quantity").value;

    if (product1 == '' || quantity == '') {
        alert('Зачем вам "ничего" в списке?');
    }
    else if(localStorage.getItem(product1) !== null){
        alert("Элемент с таким названием уже существует!");
    }
    else {

        localStorage.setItem(product1, quantity);
        loadList();
        document.getElementById("Produсt").value = '';
        document.getElementById("quantity").value = '';
        // Устанавливаем курсор ввода на текстовое поле "Название"
        document.getElementById("Produсt").focus();
        let messageElement = document.querySelector("h3");
        messageElement.remove();
    }
};

function loadList() {
    let length = localStorage.length;
    // После этого элемента появятся новые <p>
    let orgDiv = document.getElementById("org_div1");

    // итерируемся по всему хранилищу
    for (let i = 0; i < length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        // если <p> по совпадению есть, то пропускаем его создание
        let existingPElement = document.querySelector(`p[data-key="${key}"]`);
        if (existingPElement) {
            continue;
        }

        let pElement = document.createElement("p");
        // Добавляем атрибут data-key для идентификации элемента
        pElement.setAttribute("data-key", key);
        pElement.innerHTML = `Продукт: ${key}, Количество: ${value}`;
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", function () {
            localStorage.removeItem(key);
            pElement.remove();
            main()
        });

        pElement.appendChild(deleteButton);
        // добавляем <p> после orgDiv
        orgDiv.parentNode.insertBefore(pElement, orgDiv.nextSibling);
    }
};

function ClearAll() {
    if (localStorage.length === 0) {
        alert("Список и так пуст!")
    }
    else {
        localStorage.clear();
        let pElements = document.getElementsByTagName('p');

        while (pElements.length > 0) {
            pElements[0].parentNode.removeChild(pElements[0]);
        }
        main()
    }

};

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        addButton.click();
    }
};

function main() {
    window.onload = loadList;

    if (localStorage.length === 0) {
        let messageElement = document.createElement("h3");
        messageElement.textContent = "Ваш список пуст";
        let orgDiv = document.getElementById("org_div1");
        orgDiv.after(messageElement);
    }

    if (sessionStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    
};

main();
