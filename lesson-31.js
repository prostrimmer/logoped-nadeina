/*** Логика урока 31 */
/* =========================================
   ЗАДАНИЕ 1: ПРОВЕРКА БУКВ Ч И Ш
   ========================================= */
function checkL31Task1() {                                   // Функция проверки первого задания
    const inputs = document.querySelectorAll('.l31-t1-input'); // Все поля ввода задания 1
    const resArea = document.getElementById('res-31-1');       // Блок вывода результата
    let allCorrect = true;                                     // Флаг: все ли ответы верны
    let allFilled = true;                                      // Флаг: все ли поля заполнены

    inputs.forEach(input => {                                  // Перебираем каждое поле
        const userAnswer = input.value.trim().toLowerCase();   // Ответ ребёнка: нижний регистр, без пробелов
        const correctAnswer = input.dataset.answer;            // Эталон из data-answer

        input.classList.remove('correct-ch', 'correct-sh', 'wrong'); // Сбрасываем старые стили

        if (userAnswer === "") {                               // Если поле пустое
            allFilled = false;                                 // Отмечаем, что не всё заполнено
            input.classList.add('wrong');                      // Красная подсветка
        } else if (userAnswer === correctAnswer) {             // Если буква совпала с эталоном
            if (correctAnswer === "ч") {                       // Если эталон — Ч
                input.classList.add('correct-ch');             // Зелёный цвет буквы
            } else {                                           // Если эталон — Ш
                input.classList.add('correct-sh');             // Синий цвет буквы
            }
        } else {                                               // Если буква неверная
            input.classList.add('wrong');                      // Красная подсветка
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    if (!allFilled) {                                          // Если есть пустые поля
        resArea.innerHTML = "<b>Не все буквы вставлены. Заполни все пропуски!</b>"; // Сообщение
        resArea.style.color = "#e67e22";                       // Оранжевый цвет
    } else if (allCorrect) {                                   // Если всё верно
        resArea.innerHTML = "<b>Молодец! Все буквы Ч и Ш вставлены верно!</b>"; // Похвала
        resArea.style.color = "#27ae60";                       // Зелёный цвет
    } else {                                                   // Если есть ошибки
        resArea.innerHTML = "<b>Есть ошибки (красные поля). Проверь буквы Ч и Ш ещё раз!</b>"; // Подсказка
        resArea.style.color = "#e67e22";                       // Оранжевый цвет
    }
}

/* =========================================
   ЗАДАНИЕ 2: СОСТАВЬ СЛОВОСОЧЕТАНИЯ
   ========================================= */

/* Разрешаем сброс элемента над целью */
function allowDrop31T2(ev) {                                 // Обработчик dragover
    ev.preventDefault();                                     // Отменяем действие браузера по умолчанию
    const slot = ev.target.closest('.l31-t2-slot');          // Ищем ближайший слот
    const pool = ev.target.closest('.l31-t2-pool');          // Ищем ближайший пул
    if (slot) slot.classList.add('over');                    // Подсвечиваем слот
    if (pool) pool.classList.add('over');                    // Подсвечиваем пул
}

/* Убираем подсветку при уходе курсора */
document.addEventListener('dragleave', function(ev) {        // Слушаем уход курсора с элемента
    const slot = ev.target.closest('.l31-t2-slot');          // Ищем ближайший слот
    const pool = ev.target.closest('.l31-t2-pool');          // Ищем ближайший пул
    if (slot) slot.classList.remove('over');                 // Убираем подсветку слота
    if (pool) pool.classList.remove('over');                 // Убираем подсветку пула
});

/* Начало перетаскивания: запоминаем id */
function dragItem31T2(ev) {                                  // Обработчик dragstart
    ev.dataTransfer.setData("text", ev.target.id || "");     // Сохраняем id, если есть
    ev.dataTransfer.setData("word", ev.target.dataset.word); // Сохраняем слово
    ev.dataTransfer.setData("html", ev.target.outerHTML);    // Сохраняем HTML карточки
}

/* Сброс слова в слот строки */
function dropItem31T2(ev) {                                  // Обработчик drop на слоте
    ev.preventDefault();                                     // Отменяем действие по умолчанию
    const slot = ev.target.closest('.l31-t2-slot');          // Ищем слот
    if (!slot) return;                                       // Если слот не найден — выходим
    if (slot.querySelector('.l31-t2-drag')) return;          // Если слот уже занят — выходим

    const word = ev.dataTransfer.getData("word");            // Получаем слово
    const html = ev.dataTransfer.getData("html");            // Получаем HTML карточки
    if (!word || !html) return;                              // Если данных нет — выходим

    /* Создаём новый элемент в слоте на основе исходного HTML */
    const wrapper = document.createElement('div');           // Временный контейнер
    wrapper.innerHTML = html;                                // Кладём HTML карточки
    const newItem = wrapper.firstElementChild;               // Берём саму карточку

    /* Удаляем исходную карточку из пула */
    const sourceWord = ev.dataTransfer.getData("word");      // Слово-источник
    const pools = document.querySelectorAll('.l31-t2-pool'); // Все пулы на странице
    pools.forEach(pool => {                                  // Перебираем пулы
        const found = Array.from(pool.querySelectorAll('.l31-t2-drag')).find(el => el.dataset.word === sourceWord);
        if (found && !found.classList.contains('used')) {    // Если нашли подходящую карточку в пуле
            found.remove();                                  // Удаляем её из пула
        }
    });

    /* Вставляем новую карточку в слот */
    newItem.classList.remove('used');                        // Убираем служебный класс
    slot.appendChild(newItem);                               // Кладём слово в слот

    /* Сбрасываем стили проверки у строки */
    const row = slot.closest('.l31-t2-row');                 // Находим строку
    if (row) row.classList.remove('correct', 'wrong');       // Снимаем подсветку
}

/* Возврат слова обратно в пул */
function dropToPool31T2(ev) {                                // Обработчик drop на пуле
    ev.preventDefault();                                     // Отменяем действие по умолчанию
    const pool = ev.target.closest('.l31-t2-pool');          // Ищем пул
    if (!pool) return;                                       // Если пула нет — выходим
    ev.dataTransfer.dropEffect = "move";                     // Эффект перемещения
}

/* Клик по слову в слоте: возврат в пул */
function returnToPool31T2(ev) {                              // Обработчик клика по слоту
    const slot = ev.currentTarget;                           // Слот, по которому кликнули
    const item = slot.querySelector('.l31-t2-drag');         // Слово внутри слота
    if (!item) return;                                       // Если слова нет — выходим

    const row = slot.closest('.l31-t2-row');                 // Находим строку
    const block = slot.closest('.l31-t2-block');             // Находим блок задания
    const pool = block.querySelector('.l31-t2-pool');        // Находим пул в этом блоке

    pool.appendChild(item);                                  // Возвращаем слово в пул
    if (row) row.classList.remove('correct', 'wrong');       // Снимаем подсветку строки
    ev.stopPropagation();                                    // Останавливаем всплытие
}

/* Проверка задания 2 */
function checkL31Task2() {                                   // Функция проверки задания
    const rows = document.querySelectorAll('.l31-t2-row');   // Все строки задания
    const resArea = document.getElementById('res-31-2');     // Блок вывода результата
    let allCorrect = true;                                   // Флаг: все ли пары верны
    let allFilled = true;                                    // Флаг: все ли слоты заполнены

    rows.forEach(row => {                                    // Перебираем строки
        const slot = row.querySelector('.l31-t2-slot');      // Находим слот
        const item = slot.querySelector('.l31-t2-drag');     // Находим слово в слоте

        row.classList.remove('correct', 'wrong');            // Сбрасываем стили

        if (!item) {                                         // Если слот пустой
            allFilled = false;                               // Отмечаем незаполненность
            row.classList.add('wrong');                      // Красная подсветка
            return;                                          // Переходим к следующей строке
        }

        if (item.dataset.word === row.dataset.answer) {      // Если слово совпало с эталоном
            row.classList.add('correct');                    // Зелёная подсветка
        } else {                                             // Если не совпало
            row.classList.add('wrong');                      // Красная подсветка
            allCorrect = false;                              // Фиксируем ошибку
        }
    });

    if (!allFilled) {                                        // Если есть пустые слоты
        resArea.innerHTML = "<b>Не все словосочетания собраны. Заполни все строки!</b>"; // Сообщение
        resArea.style.color = "#e67e22";                     // Оранжевый цвет
    } else if (allCorrect) {                                 // Если всё верно
        resArea.innerHTML = "<b>Молодец! Все словосочетания составлены верно!</b>"; // Похвала
        resArea.style.color = "#27ae60";                     // Зелёный цвет
    } else {                                                 // Если есть ошибки
        resArea.innerHTML = "<b>Есть ошибки (красные строки). Подумай, какие слова подходят по смыслу!</b>"; // Подсказка
        resArea.style.color = "#e67e22";                     // Оранжевый цвет
    }
}

/* =========================================
   ЗАДАНИЕ 2: СОСТАВЬ СЛОВОСОЧЕТАНИЯ
   ========================================= */

let activeMarker31T2 = null;                                 // Активный маркер: 'green' или 'blue'

/* Выбор маркера */
function selectMarker31T2(el, color) {                       // Клик по маркеру
    document.querySelectorAll('.l31-t2-marker').forEach(m => m.classList.remove('active')); // Снимаем со всех
    el.classList.add('active');                              // Подсвечиваем выбранный
    activeMarker31T2 = color;                                // Запоминаем цвет
}

/* Клик по букве: раскрашиваем выбранным маркером (capture-фаза) */
document.addEventListener('click', function(ev) {            // Делегируем клик по документу
    const letter = ev.target.closest('.l31-t2-letter');      // Попали ли в букву
    if (!letter) return;                                     // Если нет — выходим
    if (!activeMarker31T2) return;                           // Если маркер не выбран — выходим

    letter.classList.remove('painted-green', 'painted-blue', 'wrong-color'); // Сбрасываем раскраску
    if (activeMarker31T2 === 'green') {                      // Выбран зелёный
        letter.classList.add('painted-green');               // Красим зелёным
    } else {                                                 // Выбран синий
        letter.classList.add('painted-blue');                // Красим синим
    }
    ev.stopPropagation();                                    // Не даём событию дойти до слота
}, true);                                                    // capture: true — срабатываем раньше onclick слота

/* Разрешаем сброс */
function allowDrop31T2(ev) {                                 // Обработчик dragover
    ev.preventDefault();                                     // Отменяем действие браузера
    const slot = ev.target.closest('.l31-t2-slot');          // Ищем слот
    const pool = ev.target.closest('.l31-t2-pool');          // Ищем пул
    if (slot) slot.classList.add('over');                    // Подсвечиваем слот
    if (pool) pool.classList.add('over');                    // Подсвечиваем пул
}

/* Снимаем подсветку при уходе курсора */
document.addEventListener('dragleave', function(ev) {        // Слушаем уход курсора
    const slot = ev.target.closest('.l31-t2-slot');          // Ищем слот
    const pool = ev.target.closest('.l31-t2-pool');          // Ищем пул
    if (slot) slot.classList.remove('over');                 // Убираем подсветку
    if (pool) pool.classList.remove('over');                 // Убираем подсветку
});

/* Начало перетаскивания */
function dragItem31T2(ev) {                                  // Обработчик dragstart
    ev.dataTransfer.setData("word", ev.target.dataset.word); // Сохраняем слово
    ev.dataTransfer.effectAllowed = "move";                  // Только перемещение
}

/* Бросок слова в слот */
function dropItem31T2(ev) {                                  // Обработчик drop на слоте
    ev.preventDefault();                                     // Отменяем действие по умолчанию
    const slot = ev.target.closest('.l31-t2-slot');          // Ищем слот
    if (!slot) return;                                       // Если нет — выходим
    if (slot.querySelector('.l31-t2-drag')) return;          // Если слот занят — выходим

    const word = ev.dataTransfer.getData("word");            // Слово из перетаскивания
    if (!word) return;                                       // Если нет — выходим

    const block = slot.closest('.l31-t2-block');             // Блок, в котором бросили
    const pool = block.querySelector('.l31-t2-pool');        // Пул этого блока
    const source = Array.from(pool.querySelectorAll('.l31-t2-drag')).find(el => el.dataset.word === word); // Ищем карточку только в своём пуле
    if (!source) return;                                     // Не нашли — выходим

    const clone = source.cloneNode(true);                    // Клонируем карточку
    clone.draggable = false;                                 // В слоте не перетаскивается
    slot.appendChild(clone);                                 // Кладём в слот
    source.remove();                                         // Удаляем из пула

    const row = slot.closest('.l31-t2-row');                 // Находим строку
    if (row) row.classList.remove('correct', 'wrong');       // Снимаем подсветку
}

/* Бросок в пул (заглушка) */
function dropToPool31T2(ev) {                                // Обработчик drop на пуле
    ev.preventDefault();                                     // Отменяем действие по умолчанию
}

/* Клик по слоту: возврат слова в пул */
function returnToPool31T2(ev) {                              // Обработчик клика по слоту
    if (ev.target.closest('.l31-t2-letter')) return;         // Кликнули по букве — не возвращаем слово

    const slot = ev.currentTarget;                           // Слот
    const item = slot.querySelector('.l31-t2-drag');         // Слово в слоте
    if (!item) return;                                       // Если пусто — выходим

    const block = slot.closest('.l31-t2-block');             // Блок
    const pool = block.querySelector('.l31-t2-pool');        // Пул этого блока
    const row = slot.closest('.l31-t2-row');                 // Строка

    const restored = item.cloneNode(true);                   // Клонируем
    restored.draggable = true;                               // Снова перетаскиваемая
    pool.appendChild(restored);                              // Возвращаем в пул
    item.remove();                                           // Убираем из слота

    if (row) row.classList.remove('correct', 'wrong');       // Снимаем подсветку
    ev.stopPropagation();                                    // Останавливаем всплытие
}

/* Проверка задания 2 */
function checkL31Task2() {                                   // Функция проверки
    const rows = document.querySelectorAll('.l31-t2-row');   // Все строки
    const letters = document.querySelectorAll('.l31-t2-letter'); // Все буквы Ч/Ш
    const resArea = document.getElementById('res-31-2');     // Блок результата

    let allFilled = true;                                    // Все ли слоты заполнены
    let allCorrectPairs = true;                              // Все ли пары верны
    let allCorrectColors = true;                             // Все ли буквы раскрашены верно

    rows.forEach(row => {                                    // Проверка пар
        const slot = row.querySelector('.l31-t2-slot');      // Слот
        const item = slot.querySelector('.l31-t2-drag');     // Слово в слоте
        row.classList.remove('correct', 'wrong');            // Сбрасываем стили

        if (!item) {                                         // Пусто
            allFilled = false;                               // Не всё заполнено
            row.classList.add('wrong');                      // Красная подсветка
            return;                                          // Дальше
        }
        if (item.dataset.word === row.dataset.answer) {      // Слово совпало
            row.classList.add('correct');                    // Зелёная подсветка
        } else {                                             // Не совпало
            row.classList.add('wrong');                      // Красная подсветка
            allCorrectPairs = false;                         // Фиксируем ошибку
        }
    });

    letters.forEach(letter => {                              // Проверка раскраски
        letter.classList.remove('wrong-color');              // Сбрасываем метку

        const isCh = letter.dataset.letter === 'ч';          // Буква Ч?
        const isSh = letter.dataset.letter === 'ш';          // Буква Ш?
        const paintedGreen = letter.classList.contains('painted-green'); // Зелёная
        const paintedBlue = letter.classList.contains('painted-blue');   // Синяя

        if (isCh && !paintedGreen) {                         // Ч должна быть зелёной
            allCorrectColors = false;                        // Ошибка
            letter.classList.add('wrong-color');             // Красное подчёркивание
        } else if (isSh && !paintedBlue) {                   // Ш должна быть синей
            allCorrectColors = false;                        // Ошибка
            letter.classList.add('wrong-color');             // Красное подчёркивание
        }
    });

    if (!allFilled) {                                        // Есть пустые слоты
        resArea.innerHTML = "<b>Не все словосочетания собраны. Заполни все строки!</b>";
        resArea.style.color = "#e67e22";                     // Оранжевый
    } else if (!allCorrectPairs) {                           // Ошибки в парах
        resArea.innerHTML = "<b>Есть ошибки в парах (красные строки). Подумай ещё!</b>";
        resArea.style.color = "#e67e22";                     // Оранжевый
    } else if (!allCorrectColors) {                          // Ошибки в раскраске
        resArea.innerHTML = "<b>Пары собраны верно, но буквы Ч и Ш раскрашены не все. Ч — зелёным, Ш — синим!</b>";
        resArea.style.color = "#e67e22";                     // Оранжевый
    } else {                                                 // Всё верно
        resArea.innerHTML = "<b>Молодец! Все словосочетания составлены верно, буквы Ч и Ш раскрашены правильно!</b>";
        resArea.style.color = "#27ae60";                     // Зелёный
    }
}

/* =========================================
   ЗАДАНИЕ 3: ПРОВЕРКА СОСТАВЛЕННЫХ ПРЕДЛОЖЕНИЙ
   ========================================= */
function checkL31Task3() {
    const inputs = document.querySelectorAll('.l31-t3-input');
    const resArea = document.getElementById('res-31-3');
    let allCorrect = true;
    let allFilled = true;

    inputs.forEach(input => {
        // Приводим ответ ребёнка к нижнему регистру, убираем лишние пробелы и знаки препинания на конце
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        const correctAnswer = input.dataset.answer.trim().toLowerCase();

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
        resArea.innerHTML = "<b>Не все предложения написаны. Заполни все поля!</b>";
        resArea.style.color = "#e67e22";
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Все предложения составлены абсолютно верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки (красные поля). Проверь порядок слов и написание!</b>";
        resArea.style.color = "#e67e22";
    }
}

/* =========================================
   ЗАДАНИЕ 4: ПРОВЕРКА СЛОВ С СУФФИКСОМ -ЕЧК-
   ========================================= */
function checkL31Task4() {                                   // Функция проверки четвёртого задания
    const inputs = document.querySelectorAll('.l31-t4-input'); // Все поля ввода задания 4
    const resArea = document.getElementById('res-31-4');       // Блок вывода результата
    let allCorrect = true;                                     // Флаг: все ли ответы верны
    let allFilled = true;                                      // Флаг: все ли поля заполнены

    inputs.forEach(input => {                                  // Перебираем каждое поле
        const userAnswer = input.value.trim().toLowerCase();   // Ответ ребёнка: без пробелов, нижний регистр
        const correctAnswer = input.dataset.answer;            // Эталон из data-answer

        input.classList.remove('correct', 'wrong');            // Сбрасываем старые стили

        if (userAnswer === "") {                               // Если поле пустое
            allFilled = false;                                 // Отмечаем, что не всё заполнено
            input.classList.add('wrong');                      // Красная подсветка
        } else if (userAnswer === correctAnswer) {             // Если совпало с эталоном
            input.classList.add('correct');                    // Зелёная подсветка
        } else {                                               // Если ответ неверный
            input.classList.add('wrong');                      // Красная подсветка
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    if (!allFilled) {                                          // Если есть пустые поля
        resArea.innerHTML = "<b>Не все слова написаны. Заполни все поля!</b>"; // Сообщение
        resArea.style.color = "#e67e22";                       // Оранжевый цвет
    } else if (allCorrect) {                                   // Если всё верно
        resArea.innerHTML = "<b>Молодец! Все слова с суффиксом -ечк- написаны верно!</b>"; // Похвала
        resArea.style.color = "#27ae60";                       // Зелёный цвет
    } else {                                                   // Если есть ошибки
        resArea.innerHTML = "<b>Есть ошибки (красные поля). Проверь слова ещё раз!</b>"; // Подсказка
        resArea.style.color = "#e67e22";                       // Оранжевый цвет
    }
}

/* =========================================
   ЗАДАНИЕ 5: ПРОВЕРКА ЗАПОЛНЕНИЯ "ШКОЛЬНИЦА"
   ========================================= */
function checkL31Task5() {
    const inputs = document.querySelectorAll('.white-card:last-of-type .l31-t5-input');
    const resArea = document.getElementById('res-31-5');
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
        resArea.innerHTML = "<b>Отлично! На все вопросы даны ответы! Урок успешно пройден!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Остались пустые поля для ответов. Напиши ответы на все вопросы!</b>";
        resArea.style.color = "#e67e22";
    }
}

/* =========================================
   ЗАДАНИЕ 6: ПРОВЕРКА ЗАПОЛНЕНИЯ "ЧАЕПИТИЕ"
   ========================================= */
function checkL31Task6() {
    const inputs = document.querySelectorAll('.white-card:last-of-type .l31-t6-input');
    const resArea = document.getElementById('res-31-6');
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
   ЗАДАНИЕ 7: ПРОВЕРКА ЛАСКОВЫХ ИМЕН
   ========================================= */
function checkL31Task7() {
    // Находим все поля ввода в седьмом задании
    const inputs = document.querySelectorAll('.white-card:last-of-type .l31-t7-input');
    // Находим блок для вывода результата
    const resArea = document.getElementById('res-31-7');
    
    let allCorrect = true;                                     // Флаг: все ли ответы верны
    let allFilled = true;                                      // Флаг: все ли поля заполнены

    inputs.forEach(input => {
        // Приводим введённый ответ к нижнему регистру, убираем пробелы и знаки препинания
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Получаем правильный эталон из атрибута data-answer
        const correctAnswer = input.dataset.answer;

        // Сбрасываем старые стили
        input.classList.remove('correct', 'wrong');

        // Проверяем заполненность и правильность
        if (userAnswer === "") {
            allFilled = false;
            input.classList.add('wrong');                      // Красная подсветка пустых полей
        } else if (userAnswer === correctAnswer) {
            input.classList.add('correct');                    // Зелёная подсветка верных ответов
        } else {
            input.classList.add('wrong');                      // Красная подсветка ошибок
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    // Выводим итоговое сообщение на экран
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все ласковые имена написаны. Заполни все поля!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый цвет
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Все имена названы ласково и правильно!</b>";
        resArea.style.color = "#27ae60";                       // Зелёный цвет
    } else {
        resArea.innerHTML = "<b>Есть ошибки (красные поля). Проверь написание ещё раз!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый цвет
    }
}

/* =========================================
   ЗАДАНИЕ 8: АВТОПЕРЕХОД КУРСОРА ПО КЛЕТКАМ
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    // Собираем все инпуты кроссворда в том порядке, в котором они идут в HTML
    const inputs = Array.from(document.querySelectorAll('.l31-t8-input'));

    inputs.forEach((input, index) => {
        // Ввод буквы
        input.addEventListener('input', function () {
            // Разрешаем только кириллицу, приводим к нижнему регистру
            this.value = this.value.replace(/[^а-яё]/gi, '').toLowerCase();
            // Если буква введена — переходим к следующему полю
            if (this.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
                inputs[index + 1].select();
            }
        });

        // Навигация стрелками и Backspace
        input.addEventListener('keydown', function (e) {
            // Backspace на пустом поле — возврат к предыдущему
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                inputs[index - 1].focus();
                inputs[index - 1].select();
            }
            // Стрелка вправо
            if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            // Стрелка влево
            if (e.key === 'ArrowLeft' && index > 0) {
                inputs[index - 1].focus();
            }
        });

        // При фокусе выделяем содержимое — удобно перезаписать
        input.addEventListener('focus', function () {
            this.select();
        });
    });
});


/* =========================================
   ЗАДАНИЕ 8: ПРОВЕРКА КРОССВОРДА
   ========================================= */
function checkL31Task8Crossword() {
    const inputs = document.querySelectorAll('.l31-t8-input');
    const resArea = document.getElementById('res-31-8');
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

/* =========================================================
   ЗАДАНИЕ 9: ПРОВЕРКА ПРОИЗНОШЕНИЯ ПРЕДЛОЖЕНИЙ СО ЗВУКОМ [Ч]
   ========================================================= */

// Функция переключения статуса прочитанного предложения
function toggleL31T9Done(buttonElement) {
    // Включаем или выключаем класс выполненного предложения
    buttonElement.classList.toggle('done');

    // Меняем иконку и надпись в зависимости от нажатия
    if (buttonElement.classList.contains('done')) {
        buttonElement.innerHTML = '<span class="l31-t9-icon">🌟</span> Молодец! Сказано чисто!';
    } else {
        buttonElement.innerHTML = '<span class="l31-t9-icon">⭐</span> Произнёс чисто!';
    }
}

// Проверка выполнения девятого задания
function checkL31Task9() {
    // Находим все кнопки в девятом задании
    const buttons = document.querySelectorAll('.white-card:last-of-type .l31-t9-say-btn');
    // Находим блок для вывода сообщения
    const resArea = document.getElementById('res-31-9');

    // Считаем количество нажатых кнопок
    let completedCount = 0;
    buttons.forEach(btn => {
        if (btn.classList.contains('done')) {
            completedCount++;
        }
    });

    // Проверяем, подтверждены ли все предложения
    if (completedCount === buttons.length) {
        resArea.innerHTML = "<b>Отлично! Все предложения со звуком [Ч] произнесены чётко и правильно!</b>";
        resArea.style.color = "#27ae60";             // Зелёный цвет победы
    } else {
        resArea.innerHTML = `<b>Прочитано предложений: ${completedCount} из ${buttons.length}. Проговори все фразы чётко!</b>`;
        resArea.style.color = "#e67e22";             // Оранжевый цвет подсказки
    }
}

/* =========================================================
   ЗАДАНИЕ 10: ПРОВЕРКА ИГРЫ «СЫЩИК»
   ========================================================= */
function checkL31Task10() {
    // Находим все поля ввода в карточке десятого задания
    const inputs = document.querySelectorAll('.l31-t10-input');
    // Находим блок для вывода результата
    const resArea = document.getElementById('res-31-10');

    let allCorrect = true;                                     // Флаг: все ли предметы сосчитаны верно
    let allFilled = true;                                      // Флаг: все ли клеточки заполнены
    let correctCount = 0;                                      // Счётчик верно найденных предметов

    inputs.forEach(input => {
        // Получаем введенное число (очищаем от пробелов)
        const userAnswer = input.value.trim();
        // Получаем эталонный ответ из data-answer
        const correctAnswer = input.dataset.answer;

        // Сбрасываем предыдущую подсветку
        input.classList.remove('correct', 'wrong');

        if (userAnswer === "") {
            allFilled = false;
            input.classList.add('wrong');                      // Пустое поле подсвечиваем красным
        } else if (userAnswer === correctAnswer) {
            input.classList.add('correct');                    // Правильный ответ — зеленый
            correctCount++;
        } else {
            input.classList.add('wrong');                      // Неправильное число — красный
            allCorrect = false;
        }
    });

    // Формируем итоговое сообщение для сыщика
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все предметы сосчитаны! Заполни все клеточки, сыщик!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый цвет
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Браво, настоящий сыщик! Все предметы найдены и сосчитаны абсолютно верно!</b>";
        resArea.style.color = "#27ae60";                       // Зелёный цвет победы
    } else {
        resArea.innerHTML = `<b>Верно сосчитано: ${correctCount} из ${inputs.length}. Пересчитай предметы в красных клеточках ещё раз!</b>`;
        resArea.style.color = "#e67e22";                       // Оранжевый цвет подсказки
    }
}

