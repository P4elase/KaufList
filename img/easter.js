let storyText = `Это история человека по имени Стэнли.
Стэнли работал в большой компании на должности сотрудника номер 427.
Работа у сотрудника 427 была простой.
Он сидел за своим столом в комнате 427 и нажимал кнопки.
Инструкции приходили к нему на экран.
Они указывали ему, какие кнопки нажимать, как долго и в каком порядке.
Сотрудник 427 делал это день за днём, год за годом.
И хотя кто-то может сказать, что такая работа вытягивает душу,
Стэнли был рад каждой новой инструкции и чувствовал, что он создан для этой работы.
Стэнли был счастлив.`;

let KonamiKode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"];
let nextKey = 0;
let buttonsContainer = document.getElementById('org_div4');

document.addEventListener("keydown", function(e){
    if (e.key == KonamiKode[nextKey]) {
        nextKey++;
        if (nextKey == KonamiKode.length) {
            nextKey = 0;
            alert("Код Konami введен, и мы оказываемся в новом мире, где все, что мы знаем, может быть иллюзией. Погружаемся в историю Стэнли, где каждый выбор имеет последствия, и реальность может быть не тем, что кажется.");
            document.querySelector('body').innerHTML = '';
            document.querySelector('body').innerHTML = '<div class="image-container"><img src="img/end.png" alt="..."><div class="text-overlay"></div></div>';
            setTimeout(function() {
                displayText(storyText);
            }, 3000);
        } else {
            let button = document.createElement('div');
            button.className = 'k-button';
            buttonsContainer.appendChild(button);
        }
    } else {
        buttonsContainer.innerHTML = '';
        nextKey = 0;
    }
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayText(text) {
    let textOverlay = document.querySelector('.text-overlay');
    textOverlay.style.display = 'flex'; // Показываем контейнер текста
    let lines = text.split('\n'); // Разделяем текст на строки
    for (let line of lines) {
        for (let char of line) {
            textOverlay.textContent += char;
            await sleep(50); // Задержка между символами
        }
        textOverlay.textContent += '\n';
        await sleep(800);
    }
        textOverlay.textContent = '';
        await sleep(1000);
        textOverlay.textContent = 'А Вы счастливы?';
        await sleep(5000);
        textOverlay.textContent = '';
        await sleep(5000);
        location.reload();
}

