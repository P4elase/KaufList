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

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        addButton.click();
    }

};

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

    if (localStorage.getItem(product1) !== null) {
        let action = confirm("Элемент с таким названием уже существует! Вы хотите его заменить?");
        if (action == true) {
            localStorage.setItem(product1, quantity);
            loadList();
            resetInput();
            messageElement.remove();
        }
        else {
            resetInput();
            messageElement.remove();
        }
    }
    else {
        localStorage.setItem(product1, quantity);
        loadList();
        resetInput();
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
            deleteButton.setAttribute("id", "btn3");
            deleteButton.addEventListener("dblclick", function () {
                localStorage.removeItem(key);
                existingPElement.remove();
                main();
                loadList();
            });
            existingPElement.appendChild(deleteButton);
        }
        else {
            // Если элемента нет, то создаем новый
            let pElement = document.createElement("p");
            pElement.setAttribute("data-key", key);
            pElement.innerHTML = `Продукт: ${key}, Количество: ${value}`;
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.setAttribute("id", "btn3");
            deleteButton.addEventListener("dblclick", function () {
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
        alert("Нельзя удалить то, чего нет, Вы же на 0 не делите?");
    }
    else {
        let action = confirm("Удалить все записи?")
        if (action == false) {
            return;
        }
        localStorage.clear();
        let pElements = document.getElementsByTagName('p');

        while (pElements.length > 0) {
            pElements[0].parentNode.removeChild(pElements[0]);
        }
        main();
        alert("Список успешно очищен!");
    }

};

function resetInput() {

    document.getElementById("Produсt").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("Produсt").focus();

};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/KaufList/service-worker.js', { scope: '/KaufList/' }).then(function (registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    })
        .catch(function (error) {
            console.log('Service Worker registration failed:', error);
        });
};

document.getElementById('darkModeSwitch').addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
    let darkModeState = document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled';
    setCookie('darkMode', darkModeState, 365); // Save for 365 days
});

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

function main() {

    if (localStorage.length === 0) {
        let messageElement = document.createElement("h3");
        messageElement.textContent = "Ваш список пуст";
        let orgDiv = document.getElementById("org_div1");
        orgDiv.after(messageElement);
    }

    document.addEventListener('DOMContentLoaded', function () {
        let darkModeSetting = getCookie('darkMode');
        if (darkModeSetting === 'enabled') {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeSwitch').checked = true;
        }
    });
};

window.onload = loadList;

main();
