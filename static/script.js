let button1 = document.getElementById("btn1");
let button2 = document.getElementById("btn2");
let darkMode = document.getElementById("darkMode");
let inputText = document.getElementById("Produсt");
let inputNumber = document.getElementById("quantity");
let addButton = document.getElementById("btn1");
let alertCount = 0;

inputText.addEventListener('keydown', handleEnterKey);
inputNumber.addEventListener('keydown', handleEnterKey);

button2.addEventListener("click", () => {
    ClearAll()
});

button1.addEventListener("click", () => {
    CreateList()
});

darkMode.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");
    sessionStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    alertCount = alertCount + 1
    if (alertCount == 10) {
        alert("Остановитесь, пожалейте глаза!")
        alertCount = 0
    }

});

function CreateList() {
    let product1 = document.getElementById("Produсt").value.trim();
    let quantity = document.getElementById("quantity").value.trim();
    let messageElement = document.querySelector("h3");

    if (quantity !== '' && product1 == '') {
        alert('Количество не имеет значения без качества, законы диалектики напоминать не нужно?')
        loadList();
        resetInput();
        messageElement.remove();
        main();
        return;
    }

    if (!product1.length) {
        alert('Список не карман, в него пустоту не засунешь! Но Вы, однозначно, шли к успеху!');
        loadList();
        resetInput();
        messageElement.remove();
        main();
        return;
    }

    else if (localStorage.getItem(product1) !== null) {
        let action = confirm("Элемент с таким названием уже существует! Вы хотите его заменить?");
        if (action == true) {
            localStorage.setItem(product1, quantity);
            loadList();
            resetInput();
            messageElement.remove();
        }
        if (action == false) {
            resetInput();
            messageElement.remove();
        }
    }
    else {
        localStorage.setItem(product1, quantity);
        messageElement.remove();
        loadList();
        resetInput();
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
            // Если элемент существует, то обновляем его содержимое
            existingPElement.innerHTML = `Продукт: ${key}, Количество: ${value}`;
            // Удаляем старую кнопку удаления (иначе не работает)
            let oldDeleteButton = existingPElement.querySelector("button");
            if (oldDeleteButton) {
                oldDeleteButton.remove();
            }
            // Создаем новую кнопку удаления
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click", function () {
                localStorage.removeItem(key);
                existingPElement.remove();
                main();
                loadList();
            });
            existingPElement.appendChild(deleteButton);
        } else {
            // Если элемента нет, то создаем новый
            let pElement = document.createElement("p");
            pElement.setAttribute("data-key", key);
            pElement.innerHTML = `Продукт: ${key}, Количество: ${value}`;
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click", function () {
                localStorage.removeItem(key);
                pElement.remove();
                main();
                loadList();
            });
            pElement.appendChild(deleteButton);
            orgDiv.parentNode.insertBefore(pElement, orgDiv.nextSibling);
        }

    }

};

function ClearAll() {
    if (localStorage.length === 0) {
        alert("Нельзя удалить то, чего нет, Вы же на 0 не делите?")
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

function resetInput(){
    
    document.getElementById("Produсt").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("Produсt").focus();

};

window.onload = loadList;

main();
