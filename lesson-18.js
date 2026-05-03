/**
 * Функция проверки Задания 3
 */
function checkTask3() {
    const inputs = document.querySelectorAll('.l18-t3-input'); // Выбираем все поля ввода
    let allCorrect = true; // Флаг для итогового сообщения

    inputs.forEach(input => {
        const userVal = input.value.trim().toLowerCase(); // Убираем пробелы и приводим к нижнему регистру
        const correctVal = input.dataset.answer.toLowerCase(); // Берем эталонный ответ

        if (userVal === correctVal) {
            input.classList.remove('wrong'); // Убираем класс ошибки
            input.classList.add('correct'); // Добавляем класс успеха
        } else {
            input.classList.remove('correct'); // Убираем класс успеха
            input.classList.add('wrong'); // Помечаем ошибку
            allCorrect = false; // Сбрасываем флаг общего успеха
        }
    });

    const resArea = document.getElementById('res-18-3'); // Область вывода результата
    if (allCorrect) {
        resArea.innerHTML = "<b>Браво! Все предложения завершены верно!</b>";
        resArea.style.color = "#27ae60"; // Зеленый текст
    } else {
        resArea.innerHTML = "<b>Некоторые слова неверны. Попробуй еще раз!</b>";
        resArea.style.color = "#e67e22"; // Оранжевый текст
    }
}

let selectedBunnies = []; // Массив для хранения выбранных объектов

function selectBunny(element) {
    // Отмена выбора при повторном клике
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        selectedBunnies = selectedBunnies.filter(item => item !== element);
        return;
    }

    // Ребенок может выбрать только 2 картинки
    if (selectedBunnies.length < 2) {
        element.classList.add('selected');
        selectedBunnies.push(element);
    }
}

function checkTask5() {
    const resArea = document.getElementById('res-18-5');
    if (selectedBunnies.length !== 2) return;

    // Сверяем атрибуты 1-й и 5-й картинок[cite: 1]
    const isFirstCorrect = selectedBunnies[0].dataset.isCorrect === "true";
    const isSecondCorrect = selectedBunnies[1].dataset.isCorrect === "true";

    if (isFirstCorrect && isSecondCorrect) {
        // Успех: синее свечение[cite: 1, 2]
        selectedBunnies.forEach(bunny => {
            bunny.classList.remove('selected');
            bunny.classList.add('correct-match');
        });
        resArea.innerHTML = "<b>Верно! Эти зайцы одинаковые!</b>";
        resArea.style.color = "#27ae60";
    } else {
        // Ошибка: сброс выделения[cite: 1]
        selectedBunnies.forEach(bunny => bunny.classList.remove('selected'));
        resArea.innerHTML = "<b>Не угадал. Попробуй ещё раз!</b>";
        resArea.style.color = "#e74c3c";
    }
    selectedBunnies = []; // Очистка массива
}

/**
 * Функция проверки Задания 6
 */
function checkTask6() {
    const inputs = document.querySelectorAll('.l18-t6-input'); // Собираем все поля ввода задания 6
    const resArea = document.getElementById('res-18-6'); // Область для результата
    let allOk = true; // Начальный статус проверки

    inputs.forEach(input => {
        const userValue = input.value.trim().toLowerCase(); // Убираем лишние пробелы и меняем регистр[cite: 1]
        const correctValue = input.dataset.answer.toLowerCase(); // Берем правильный ответ из атрибута[cite: 1]

        if (userValue !== "" && userValue === correctValue) {
            input.classList.remove('wrong'); // Удаляем класс ошибки[cite: 1]
            input.classList.add('correct'); // Добавляем класс успеха[cite: 1]
        } else {
            allOk = false; // Помечаем, что есть ошибка
            input.classList.remove('correct'); // Удаляем класс успеха[cite: 1]
            input.classList.add('wrong'); // Добавляем класс ошибки[cite: 1]
        }
    });

    if (allOk) {
        resArea.innerHTML = "<b>Отлично! Ты правильно помог Соне!</b>";
        resArea.style.color = "#27ae60"; // Зеленый цвет для успеха[cite: 1]
    } else {
        resArea.innerHTML = "<b>Некоторые слова написаны с ошибкой. Проверь ещё раз!</b>";
        resArea.style.color = "#e67e22"; // Оранжевый цвет для предупреждения[cite: 1]
    }
}

// Переменная для хранения количества нажатий в Задании 7
let task7Clicks = 0;

/**
 * Обработчик клика по общему изображению
 */
function handleTask7Click() {
    // Считаем клики до 5, обновляя счетчик на экране[cite: 1]
    if (task7Clicks < 5) {
        task7Clicks++;
        
        const counterDisplay = document.getElementById('t7-click-counter');
        if (counterDisplay) {
            counterDisplay.innerText = task7Clicks;
        }
    }
}

/**
 * Функция итоговой проверки задания
 */
function checkTask7() {
    const resArea = document.getElementById('res-18-7');
    
    // Проверяем, нашел ли ребенок минимум 5 предметов[cite: 1]
    if (task7Clicks >= 5) {
        resArea.innerHTML = "<b>Отлично! Ты нашел все нужные слова!</b>";
        resArea.style.color = "#27ae60"; // Зеленый цвет для успеха[cite: 1]
    } else {
        resArea.innerHTML = "<b>Ты нашел еще не все слова. Посмотри внимательнее!</b>";
        resArea.style.color = "#e67e22"; // Оранжевый цвет для подсказки[cite: 1]
    }
}

let currentPhrase = null; // Храним выбранную фразу[cite: 1]

function selectPhrase(element) {
    // Снимаем выделение с предыдущей фразы, если была выбрана другая[cite: 1]
    document.querySelectorAll('.l18-t8-phrase').forEach(p => p.classList.remove('selected'));
    element.classList.add('selected');
    currentPhrase = element;
}

function selectTile(element) {
    if (!currentPhrase) return; // Если фраза не выбрана, ничего не делаем[cite: 1]

    // Проверяем соответствие данных атрибутов[cite: 1]
    if (currentPhrase.dataset.match === element.dataset.id) {
        currentPhrase.classList.add('matched');
        element.classList.add('matched');
        currentPhrase.classList.remove('selected');
        currentPhrase = null;
    } else {
        // Ошибка: кратковременная индикация и сброс выделения[cite: 1]
        element.style.borderColor = "#e74c3c";
        setTimeout(() => {
            element.style.borderColor = "#e1e8ee";
            currentPhrase.classList.remove('selected');
            currentPhrase = null;
        }, 500);
    }
}

function checkTask8() {
    const totalCount = document.querySelectorAll('.l18-t8-phrase').length;
    const matchedCount = document.querySelectorAll('.l18-t8-phrase.matched').length;
    const resArea = document.getElementById('res-18-8');

    if (totalCount === matchedCount) {
        resArea.innerHTML = "<b>Ура! Ты правильно нашел все картинки к чистоговоркам!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Найди картинки для всех чистоговорок.</b>";
        resArea.style.color = "#e67e22";
    }
}

let currentObject = null; // Переменная для хранения текущего выбранного предмета[cite: 1]

/**
 * Выбор предмета из сетки
 */
function selectObject(element) {
    // Снимаем выделение с предыдущего выбранного объекта[cite: 1]
    document.querySelectorAll('.l18-t9-img').forEach(img => img.classList.remove('selected'));
    element.classList.add('selected');
    currentObject = element;
}

/**
 * Выбор схемы места звука
 */
function selectScheme(schemeElement) {
    if (!currentObject) return; // Если предмет не выбран, схема не реагирует[cite: 1]

    const resultPlace = currentObject.dataset.answer; // Правильное место из данных картинки
    const selectedPlace = schemeElement.dataset.place; // Место выбранной схемы

    if (resultPlace === selectedPlace) {
        // Успешное совпадение[cite: 1]
        currentObject.classList.add('matched');
        currentObject.classList.remove('selected');
        currentObject = null;
    } else {
        // Ошибка: визуальный сигнал и сброс выбора предмета[cite: 1]
        currentObject.style.borderColor = "#e74c3c";
        setTimeout(() => {
            currentObject.style.borderColor = "#e1e8ee";
            currentObject.classList.remove('selected');
            currentObject = null;
        }, 500);
    }
}

/**
 * Проверка завершения задания
 */
function checkTask9() {
    const total = document.querySelectorAll('.l18-t9-img').length;
    const matched = document.querySelectorAll('.l18-t9-img.matched').length;
    const resArea = document.getElementById('res-18-9');

    if (total === matched) {
        resArea.innerHTML = "<b>Отлично! Все звуки нашли своё место в словах!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Ещё не все предметы соединены со схемами. Продолжай!</b>";
        resArea.style.color = "#e67e22";
    }
}