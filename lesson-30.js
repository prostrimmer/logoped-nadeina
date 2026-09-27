/*** Логика урока 30 */

/* =========================================
   ЗАДАНИЕ 1: ПРОВЕРКА ЗАПОЛНЕНИЯ "ЗАЙЧАТА"
   ========================================= */
function checkL30Task1() {
    const inputs = document.querySelectorAll('.white-card:nth-of-type(1) .l28-t8-input');
    const resArea = document.getElementById('res-30-1');
    let allFilled = true;

    inputs.forEach(input => {
        const userText = input.value.trim();
        input.classList.remove('filled', 'empty');
        if (userText !== "") {
            input.classList.add('filled');
        } else {
            input.classList.add('empty');
            allFilled = false;
        }
    });

    if (allFilled) {
        resArea.innerHTML = "<b>Отлично! На все вопросы даны ответы!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Остались пустые поля для ответов. Напиши ответы на все вопросы!</b>";
        resArea.style.color = "#e67e22";
    }
}

/* =========================================
   ЗАДАНИЕ 2: ПРОВЕРКА ЗАПОЛНЕНИЯ "ДЕЖУРСТВО"
   ========================================= */
function checkL30Task2() {
    const inputs = document.querySelectorAll('.white-card:nth-of-type(2) .l29-t9-input');
    const resArea = document.getElementById('res-30-2');
    let allFilled = true;

    inputs.forEach(input => {
        const userText = input.value.trim();
        input.classList.remove('filled', 'empty');
        if (userText !== "") {
            input.classList.add('filled');
        } else {
            input.classList.add('empty');
            allFilled = false;
        }
    });

    if (allFilled) {
        resArea.innerHTML = "<b>Великолепно! На все вопросы даны ответы! Урок успешно пройден!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Остались пустые поля для ответов. Ответь на все вопросы!</b>";
        resArea.style.color = "#e67e22";
    }
}

/* =========================================
   ЗАДАНИЯ 3 И 4: ЛОГИКА ОТМЕТКИ ПРОЧИТАННЫХ СТРОК
   ========================================= */

// Универсальная функция переключения состояния строки (прочитано / не прочитано)
function toggleL30Row(rowElement, resultElementId, totalRowsCount) {
    // Переключаем класс 'completed' для кликнутой строки
    rowElement.classList.toggle('completed');

    // Находим родительский контейнер карточки, чтобы искать отмеченные строки именно в нем
    let cardContainer = rowElement.closest('.white-card');
    let completedInCard = cardContainer.querySelectorAll('.completed').length;
    let resArea = document.getElementById(resultElementId);

    // Выводим текущий прогресс чтения
    if (completedInCard === totalRowsCount) {
        resArea.innerHTML = "<b>Молодец! Ты отлично прочитал все строчки!</b>";
        resArea.style.color = "#27ae60"; // Зеленый при полном выполнении
    } else {
        resArea.innerHTML = `Прочитано строчек: ${completedInCard} из ${totalRowsCount}. Продолжай читать!`;
        resArea.style.color = "#2980b9"; // Синий в процессе
    }
}


/* =========================================
   ЗАДАНИЕ 5: ЛОГИКА ПРОВЕРКИ 16 КАРТИНОК
   ========================================= */

// Функция проверки правильности вставленных слогов и букв для всех 16 картинок
function checkL30Task5Words() {
    // Находим все поля ввода в пятом задании
    const inputs = document.querySelectorAll('.l30-t5-input');
    // Находим специальный блок для вывода результатов
    const resArea = document.getElementById('res-30-5-words');
    
    // Флаг успешности проверки
    let allCorrect = true;

    // Перебираем каждое поле ввода
    inputs.forEach(input => {
        // Получаем введенный слог, переводим в нижний регистр, убираем пробелы
        const userSyllable = input.value.trim().toLowerCase();
        // Получаем эталонный ответ из атрибута data-answer
        const correctSyllable = input.dataset.answer;

        // Сбрасываем старые стили
        input.classList.remove('correct', 'wrong');

        // Проверяем совпадение с эталоном
        if (userSyllable === correctSyllable && userSyllable !== "") {
            input.classList.add('correct');    // Зеленая рамка при верном ответе
        } else {
            input.classList.add('wrong');      // Красная рамка при ошибке или пустоте
            allCorrect = false;                // Фиксируем ошибку
        }
    });

    // Анализируем итоговый результат и выводим сообщение ребенку
    if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Все пропущенные слоги и буквы для 16 картинок вставлены безупречно!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при победе
    } else {
        resArea.innerHTML = "<b>В некоторых словах допущены ошибки. Проверь слоги [ч] и [ц] еще раз!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет при наличии ошибок
    }
}


/* =========================================
   ЗАДАНИЕ 6: ЛОГИКА ПРОВЕРКИ СЛОВ ИЗ СЛОГОВ
   ========================================= */

// Функция проверки правильности составленных слов из слогов
function checkL30Task6() {
    // Находим все поля ввода в шестом задании
    const inputs = document.querySelectorAll('.l30-t6-input');
    // Находим блок для вывода результатов
    const resArea = document.getElementById('res-30-6');
    
    // Флаг успешности проверки
    let allCorrect = true;

    // Перебираем каждое поле ввода
    inputs.forEach(input => {
        // Получаем введенное слово, переводим в нижний регистр, убираем пробелы и знаки
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Получаем правильный эталон из атрибута data-answer
        const correctAnswer = input.dataset.answer;

        // Сбрасываем старые классы стилей
        input.classList.remove('correct', 'wrong');

        // Проверяем совпадение с эталоном
        if (userAnswer === correctAnswer && userAnswer !== "") {
            input.classList.add('correct');    // Зеленая подсветка при правильном слове
        } else {
            input.classList.add('wrong');      // Красная подсветка при ошибке или пустоте
            allCorrect = false;                // Фиксируем недочет
        }
    });

    // Выводим итоговое сообщение ребенку
    if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Все слова из слогов составлены абсолютно верно!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при победе
    } else {
        resArea.innerHTML = "<b>В некоторых словах допущены ошибки. Проверь слоги еще раз!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет при наличии ошибок
    }
}

/* =========================================
   ЗАДАНИЕ 7: ПРОВЕРКА ОТГАДОК НА ЗАГАДКИ
   ========================================= */
function checkL30Task7Riddles() {
    const inputs = document.querySelectorAll('.l30-t7-riddle-input');
    const resArea = document.getElementById('res-30-7');
    let allCorrect = true;

    inputs.forEach(input => {
        // Приводим введённый ответ к нижнему регистру и убираем пробелы/знаки
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Эталонный ответ тоже переводим в нижний регистр
        const correctAnswer = input.dataset.answer.trim().toLowerCase();

        input.classList.remove('correct', 'wrong');

        if (userAnswer === correctAnswer && userAnswer !== "") {
            input.classList.add('correct');
        } else {
            input.classList.add('wrong');
            allCorrect = false;
        }
    });

    if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Все загадки отгаданы безупречно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>В некоторых ответах есть ошибки. Попробуй подумать еще раз!</b>";
        resArea.style.color = "#e67e22";
    }
}

/* =========================================
   ЗАДАНИЕ 8: ЛОГИКА ДРАГ-Н-ДРОПА И КЛИКОВ
   ========================================= */

let selectedElement = null;

function dragItem(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function dropItem(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let element = document.getElementById(data);
    let zone = ev.target.closest('.l30-t8-zone');
    if (zone && element) {
        zone.querySelector('.l30-t8-zone-items').appendChild(element);
    }
}

function dropToPool(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let element = document.getElementById(data);
    let pool = document.getElementById('source-pool');
    if (element && pool) {
        pool.appendChild(element);
    }
}

// Альтернативный кликовый режим для телефонов/планшетов
function clickItem(element) {
    if (selectedElement) {
        selectedElement.classList.remove('selected-item');
    }
    selectedElement = element;
    selectedElement.classList.add('selected-item');

    // Клик по зонам
    document.querySelectorAll('.l30-t8-zone').forEach(zone => {
        zone.onclick = function() {
            if (selectedElement) {
                zone.querySelector('.l30-t8-zone-items').appendChild(selectedElement);
                selectedElement.classList.remove('selected-item');
                selectedElement = null;
            }
        };
    });
}

function checkL30Task8Drop() {
    const zones = document.querySelectorAll('.l30-t8-zone');
    const resArea = document.getElementById('res-30-8');
    let allCorrect = true;
    let totalPlaced = 0;

    zones.forEach(zone => {
        const category = zone.dataset.category;
        const items = zone.querySelectorAll('.l30-t8-drag-item');

        items.forEach(item => {
            totalPlaced++;
            const answer = item.dataset.answer;
            item.classList.remove('correct', 'wrong');

            if (category === answer) {
                item.classList.add('correct');
            } else {
                item.classList.add('wrong');
                allCorrect = false;
            }
        });
    });

    if (totalPlaced < 9) {
        resArea.innerHTML = "<b>Не все предметы распределены по червячкам! Разложи их до конца.</b>";
        resArea.style.color = "#e67e22";
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Все предметы распределены абсолютно верно! Червячки очень довольны!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки в распределении (красные карточки). Перепроверь слова «мой», «моя», «моё», «мои»!</b>";
        resArea.style.color = "#e67e22";
    }
}

/* =========================================
   ЗАДАНИЕ 9: ЛОГИКА ПРОВЕРКИ КРОССВОРДА
   ========================================= */
function checkL30Task9Crossword() {
    // Находим все ячейки ввода в кроссворде
    const inputs = document.querySelectorAll('.l30-cross-cell');
    const resArea = document.getElementById('res-30-9');
    let allCorrect = true;
    let allFilled = true;

    inputs.forEach(input => {
        // Получаем введенную букву, переводим в нижний регистр
        const userAnswer = input.value.trim().toLowerCase();
        // Получаем правильный ответ из data-answer
        const correctAnswer = input.dataset.answer.toLowerCase();

        // Сбрасываем старые стили
        input.classList.remove('correct', 'wrong');

        // Проверяем, заполнено ли поле
        if (userAnswer === "") {
            allFilled = false;
            input.classList.add('wrong');
        } else if (userAnswer === correctAnswer) {
            input.classList.add('correct');
        } else {
            input.classList.add('wrong');
            allCorrect = false;
        }
    });

    // Выводим результат
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все клетки кроссворда заполнены. Впиши все ответы!</b>";
        resArea.style.color = "#e67e22";
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Кроссворд разгадан абсолютно верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки в кроссворде (красные клетки). Проверь свои ответы!</b>";
        resArea.style.color = "#e67e22";
    }
}


/* =========================================
   ЗАДАНИЕ 9: ПРОВЕРКА КРОССВОРДА
   ========================================= */
function checkL30Task9Crossword() {
    const inputs = document.querySelectorAll('.l30-t9-input');
    const resArea = document.getElementById('res-30-9');
    let allCorrect = true;
    let allFilled = true;

    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();

        input.classList.remove('correct', 'wrong');

        if (userAnswer === "") {
            allFilled = false;
            input.classList.add('wrong');
        } else if (userAnswer === correctAnswer) {
            input.classList.add('correct');
        } else {
            input.classList.add('wrong');
            allCorrect = false;
        }
    });

    if (!allFilled) {
        resArea.innerHTML = "<b>Не все клетки заполнены. Впиши все буквы!</b>";
        resArea.style.color = "#e67e22";
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Кроссворд разгадан верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки (красные клетки). Проверь свои ответы!</b>";
        resArea.style.color = "#e67e22";
    }
}

