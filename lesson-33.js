/*** Логика урока 33 */
/* =========================================================
   ЗАДАНИЕ 1: ЧТЕНИЕ СЛОГОВ И СЛОВ СО ЗВУКОМ [Щ]
   ========================================================= */

// Переключение статуса прочтения строки
function toggleL33T1Row(rowElement) {
    // Включаем или выключаем класс прочитанного
    rowElement.classList.toggle('read');

    // Находим кружок внутри строки
    const icon = rowElement.querySelector('.l33-t1-icon');

    // Меняем иконку статуса
    if (rowElement.classList.contains('read')) {
        icon.textContent = '🟢';                      // Зеленый кружок прочтения
    } else {
        icon.textContent = '⚪';                      // Белый кружок ожидания
    }
}

// Главная функция проверки выполнения задания 1
function checkL33Task1() {
    // Находим все интерактивные строки задания 1
    const card = document.querySelectorAll('.white-card')[0];
    const rows = card.querySelectorAll('.l33-t1-row');
    // Блок для вывода вердикта
    const resArea = document.getElementById('res-33-1');

    // Считаем количество отмеченных строк
    let readCount = 0;
    rows.forEach(row => {
        if (row.classList.contains('read')) {
            readCount++;
        }
    });

    // Проверяем, все ли 8 строчек прочитаны
    if (readCount === rows.length) {
        resArea.innerHTML = "<b>Отлично! Все слоги и слова со звуком [Щ] прочитаны чисто и чётко!</b>";
        resArea.style.color = "#27ae60";              // Зеленый цвет победы
    } else {
        resArea.innerHTML = `<b>Прочитано строк: ${readCount} из ${rows.length}. Произнеси все слоги и нажимай на строки!</b>`;
        resArea.style.color = "#e67e22";              // Оранжевый подсказывающий цвет
    }
}

/* =========================================================
   ЗАДАНИЕ 2: ЛОГИКА ИГРЫ «10, 7, 2, 1» (УСТНЫЙ СЧЁТ)
   ========================================================= */

// Переключение статуса сосчитанного слова при клике на карточку
function toggleL33T2Card(cardElement) {
    // Включаем или выключаем класс выполненного устного счёта
    cardElement.classList.toggle('counted');

    // Находим значок статуса внутри карточки
    const icon = cardElement.querySelector('.l33-t2-status-icon');

    // Обновляем значок: кружок ожидания или зелёный кружок победы
    if (cardElement.classList.contains('counted')) {
        icon.textContent = '🟢';                      // Успешно сосчитано
    } else {
        icon.textContent = '⚪';                      // Ожидает счёта
    }
}

// Главная функция проверки выполнения задания 2
function checkL33Task2() {
    // Находим вторую карточку задания на странице
    const card = document.querySelectorAll('.white-card')[1];
    // Получаем все 6 интерактивных карточек слов
    const itemCards = card.querySelectorAll('.l33-t2-card');
    // Блок для вывода текста результата проверки
    const resArea = document.getElementById('res-33-2');

    // Считаем количество карточек со статусом «Посчитано»
    let countedCount = 0;
    itemCards.forEach(item => {
        if (item.classList.contains('counted')) {
            countedCount++;
        }
    });

    // Формируем результат проверки
    if (countedCount === itemCards.length) {
        resArea.innerHTML = "<b>Умничка! Все предметы сосчитаны по цепочке 10, 7, 2, 1 чётко и без ошибок!</b>";
        resArea.style.color = "#27ae60";              // Зеленый цвет успеха
    } else {
        resArea.innerHTML = `<b>Посчитано предметов: ${countedCount} из ${itemCards.length}. Посчитай остальные слова по цепочке цифр и нажми на карточки!</b>`;
        resArea.style.color = "#e67e22";              // Оранжевый подсказывающий цвет
    }
}

/* =========================================================
   ЗАДАНИЕ 3: ПРОВЕРКА СОСТАВЛЕНИЯ ПРЕДЛОЖЕНИЙ
   ========================================================= */
function checkL33Task3() {
    // Находим третью карточку задания на странице
    const card = document.querySelectorAll('.white-card')[2];
    // Получаем все поля ввода внутри обоих столбцов
    const inputs = card.querySelectorAll('.l33-t3-input');
    // Блок для вывода текста результата
    const resArea = document.getElementById('res-33-3');

    let allCorrect = true;                                     // Флаг: все ли предложения верны
    let allFilled = true;                                      // Флаг: заполнены ли все поля
    let correctCount = 0;                                      // Счетчик правильных ответов

    inputs.forEach(input => {
        // Очищаем ввод ребёнка: нижний регистр, убираем пробелы по краям, точки и заменяем ё на е
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "").replace(/ё/g, "е");
        // Получаем массив эталонов ответов
        const allowedAnswers = input.dataset.answer.toLowerCase().replace(/ё/g, "е").split('|');

        // Сбрасываем старые стили проверки
        input.classList.remove('correct', 'wrong');

        if (userAnswer === "") {
            allFilled = false;                                 // Найдено пустое поле
            input.classList.add('wrong');                      // Подсвечиваем красным
        } else if (allowedAnswers.includes(userAnswer)) {
            input.classList.add('correct');                    // Ответ совпал с эталоном — зеленый цвет
            correctCount++;
        } else {
            input.classList.add('wrong');                      // Ответ с ошибкой — красный цвет
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    // Формируем сообщение с результатом проверки
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все предложения составлены! Заполни все поля в обоих столбиках!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый цвет предупреждения
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Все глаголы изменены правильно, предложения составлены без ошибок!</b>";
        resArea.style.color = "#27ae60";                       // Зеленый цвет успеха
    } else {
        resArea.innerHTML = `<b>Правильно составлено: ${correctCount} из ${inputs.length}. Проверь написание слов в красных рамках!</b>`;
        resArea.style.color = "#e67e22";                       // Оранжевый цвет подсказки
    }
}

/* =========================================================
   ЗАДАНИЕ 4: ПРОВЕРКА ЗАДАНИЯ «МАЛЫШ И ВЕЛИКАН»
   ========================================================= */
function checkL33Task4() {
    // Находим четвертую карточку задания на странице
    const card = document.querySelectorAll('.white-card')[3];
    // Получаем все поля ввода задания 4
    const inputs = card.querySelectorAll('.l33-t4-input');
    // Блок для вывода текста результата
    const resArea = document.getElementById('res-33-4');

    let allCorrect = true;                                     // Флаг: все ли слова образованы верно
    let allFilled = true;                                      // Флаг: заполнены ли все поля
    let correctCount = 0;                                      // Счетчик правильных ответов

    inputs.forEach(input => {
        // Очищаем ввод ребёнка: нижний регистр, убираем пробелы по краям, точки и заменяем ё на е
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "").replace(/ё/g, "е");
        // Получаем массив эталонов ответов
        const allowedAnswers = input.dataset.answer.toLowerCase().replace(/ё/g, "е").split('|');

        // Сбрасываем старые стили проверки
        input.classList.remove('correct', 'wrong');

        if (userAnswer === "") {
            allFilled = false;                                 // Найдено пустое поле
            input.classList.add('wrong');                      // Подсвечиваем красным
        } else if (allowedAnswers.includes(userAnswer)) {
            input.classList.add('correct');                    // Ответ совпал с эталоном — зеленый цвет
            correctCount++;
        } else {
            input.classList.add('wrong');                      // Ответ с ошибкой — красный цвет
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    // Формируем сообщение с результатом проверки
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все слова названы! Помоги малышу и великану заполнить все поля!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый цвет предупреждения
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Браво! Все слова для малыша и великана названы абсолютно правильно!</b>";
        resArea.style.color = "#27ae60";                       // Зеленый цвет успеха
    } else {
        resArea.innerHTML = `<b>Правильно названо слов: ${correctCount} из ${inputs.length}. Проверь написание в красных рамках!</b>`;
        resArea.style.color = "#e67e22";                       // Оранжевый цвет подсказки
    }
}

/* =========================================================
   ЗАДАНИЕ 5: ПРОВЕРКА ИГРЫ «ЭХО» (СЛОВА-ПРИЗНАКИ)
   ========================================================= */
function checkL33Task5() {
    // Находим пятую карточку задания на странице
    const card = document.querySelectorAll('.white-card')[4];
    // Получаем все 16 полей ввода внутри этого задания
    const inputs = card.querySelectorAll('.l33-t5-input');
    // Блок для вывода текста результата проверки
    const resArea = document.getElementById('res-33-5');

    let allCorrect = true;                                     // Флаг: верны ли все слова
    let allFilled = true;                                      // Флаг: заполнены ли все 16 полей
    let correctCount = 0;                                      // Счетчик правильных ответов

    inputs.forEach(input => {
        // Очищаем введенное ребенком слово: нижний регистр, убираем пробелы по краям, точки и заменяем ё на е
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "").replace(/ё/g, "е");
        // Получаем массив эталонов ответов
        const allowedAnswers = input.dataset.answer.toLowerCase().replace(/ё/g, "е").split('|');

        // Сбрасываем старые стили проверки
        input.classList.remove('correct', 'wrong');

        if (userAnswer === "") {
            allFilled = false;                                 // Найдено пустое поле
            input.classList.add('wrong');                      // Подсвечиваем красным
        } else if (allowedAnswers.includes(userAnswer)) {
            input.classList.add('correct');                    // Ответ совпал с эталоном — зеленый цвет
            correctCount++;
        } else {
            input.classList.add('wrong');                      // Ответ с ошибкой — красный цвет
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    // Формируем сообщение с результатом проверки
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все слова-признаки подобраны! Заполни все поля в обоих столбиках!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый предупреждающий цвет
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Превосходно! Все слова-признаки со звуком [Щ] образованы и согласованы абсолютно правильно!</b>";
        resArea.style.color = "#27ae60";                       // Зеленый цвет успеха
    } else {
        resArea.innerHTML = `<b>Правильно подобрано: ${correctCount} из ${inputs.length}. Подумай и исправь слова в красных рамках!</b>`;
        resArea.style.color = "#e67e22";                       // Оранжевый подсказывающий цвет
    }
}

/* =========================================================
   ЗАДАНИЕ 6: ЛОГИКА ИГРЫ «ЩЕНОК СПЕШИТ К МАМЕ»
   ========================================================= */

// Переключение статуса шага при клике на карточку
function toggleL33T6Step(stepElement) {
    // Включаем или выключаем класс пройденного шага
    stepElement.classList.toggle('stepped');

    // Находим значок лапки внутри шага
    const paw = stepElement.querySelector('.l33-t6-paw');

    // Обновляем иконку: след лапки щенка или кружок ожидания
    if (stepElement.classList.contains('stepped')) {
        paw.textContent = '🐾';                       // Лапка щенка ступила на шаг
    } else {
        paw.textContent = '⚪';                       // Ожидание шага
    }

    // Обновляем общий прогресс пути щенка
    updateL33T6Progress();
}

// Функция обновления строки прогресса
function updateL33T6Progress() {
    const card = document.querySelectorAll('.white-card')[5];
    const steps = card.querySelectorAll('.l33-t6-step');
    const progressText = document.getElementById('l33-t6-progress-text');

    let completedCount = 0;
    steps.forEach(step => {
        if (step.classList.contains('stepped')) {
            completedCount++;
        }
    });

    if (progressText) {
        progressText.textContent = `Пройдено шагов: ${completedCount} из ${steps.length}`;
    }
}

// Главная функция проверки задания 6
function checkL33Task6() {
    // Находим шестую карточку задания на странице
    const card = document.querySelectorAll('.white-card')[5];
    // Получаем все 18 шагов дорожки
    const steps = card.querySelectorAll('.l33-t6-step');
    // Блок для вывода текста результата
    const resArea = document.getElementById('res-33-6');

    // Считаем количество пройденных шагов
    let completedCount = 0;
    steps.forEach(step => {
        if (step.classList.contains('stepped')) {
            completedCount++;
        }
    });

    // Формируем результат проверки
    if (completedCount === steps.length) {
        resArea.innerHTML = "<b>Ура! Щенок пробежал всю дорожку и встретился с мамой! Все слова со звуком [Щ] произнесены безупречно!</b>";
        resArea.style.color = "#27ae60";              // Зеленый цвет победы
    } else {
        resArea.innerHTML = `<b>Пройдено шагов: ${completedCount} из ${steps.length}. Назови оставшиеся картинки, чётко выделяя звук [Щ], и нажми на них!</b>`;
        resArea.style.color = "#e67e22";              // Оранжевый подсказывающий цвет
    }
}

/* =========================================================
   ЗАДАНИЕ 7: ЛОГИКА ПОВТОРЕНИЯ СЛОВ И ОБВОДКИ БУКВЫ Щ
   ========================================================= */

// Переключение обводки буквы Щ при клике
function toggleL33T7Shch(element) {
    // Включаем или выключаем класс обведённой буквы
    element.classList.toggle('circled');
}

// Главная функция проверки выполнения задания 7
function checkL33Task7() {
    // Находим седьмую карточку задания на странице
    const card = document.querySelectorAll('.white-card')[6];
    // Получаем все интерактивные буквы Щ в словах задания
    const shchLetters = card.querySelectorAll('.l33-t7-letter-shch');
    // Блок для вывода текста результата проверки
    const resArea = document.getElementById('res-33-7');

    // Считаем, сколько букв Щ ребёнок уже обвёл кружком
    let circledCount = 0;
    shchLetters.forEach(letter => {
        if (letter.classList.contains('circled')) {
            circledCount++;
        }
    });

    // Формируем результат проверки
    if (circledCount === shchLetters.length) {
        resArea.innerHTML = "<b>Молодец! Все слова со звуком [Щ] прочитаны и все буквы «Щ» обведены кружком!</b>";
        resArea.style.color = "#27ae60";              // Зеленый цвет успеха
    } else {
        resArea.innerHTML = `<b>Обведено букв «Щ»: ${circledCount} из ${shchLetters.length}. Прочитай все слова и обведи оставшиеся буквы «Щ»!</b>`;
        resArea.style.color = "#e67e22";              // Оранжевый подсказывающий цвет
    }
}

/* =========================================================
   ЗАДАНИЕ 8: ВЫВОД СПИСКА НАЙДЕННЫХ ПРЕДМЕТОВ СО ЗВУКОМ [Щ]
   ========================================================= */
function checkL33Task8() {
    // Получаем блок для вывода результата
    const resArea = document.getElementById('res-33-8');

    // Массив слов с картинки для проверки
    const wordsList = [
        "Кощей", "Щелкунчик", "пещера", "щит", "борщ", 
        "дощечка", "ящерица", "щавель", "щенок", "щегол", 
        "щука", "пищаль", "прищепка"
    ];

    // Формируем плашки для каждого слова, выделяя букву Щ
    const wordsHtml = wordsList.map(word => {
        // Подсвечиваем как строчную, так и заглавную букву Щ/щ
        const highlighted = word.replace(/([щЩ])/g, '<span class="shch-highlight">$1</span>');
        return `<span class="l33-t8-word-chip">${highlighted}</span>`;
    }).join("");

    // Выводим аккуратный блок с заголовком и списком всех слов
    resArea.innerHTML = `
        <div class="l33-t8-answers-box">
            <div class="l33-t8-answers-title">✨ Слова со звуком [Щ] на картинке (${wordsList.length} предметов):</div>
            <div class="l33-t8-words-cloud">
                ${wordsHtml}
            </div>
        </div>
    `;
}

/* =========================================================
   ЗАДАНИЕ 9: ПРОВЕРКА ОТВЕТОВ НА ВОПРОСЫ ПО РАССКАЗУ «ЩЕНОК»
   ========================================================= */
function checkL33Task9() {
    // Находим девятую карточку задания на странице
    const card = document.querySelectorAll('.white-card')[8];
    // Получаем все 6 полей ввода ответов на вопросы
    const inputs = card.querySelectorAll('.l33-t9-q-input');
    // Блок для вывода текста результата проверки
    const resArea = document.getElementById('res-33-9');

    let allFilled = true;                              // Все ли 6 ответов написаны
    let filledCount = 0;                               // Количество заполненных полей

    inputs.forEach(input => {
        const text = input.value.trim();

        // Сбрасываем предыдущие классы проверки
        input.classList.remove('filled', 'empty');

        // Проверяем, что ответ содержит развернутое предложение (не менее 3 символов)
        if (text.length >= 3) {
            input.classList.add('filled');             // Зеленая подсветка ответа
            filledCount++;
        } else {
            input.classList.add('empty');              // Красная подсветка пустого поля
            allFilled = false;
        }
    });

    // Список слов со звуком [Щ] из рассказа для итоговой памятки
    const storyWords = [
        "обещала", "овощи", "щей", "щенок", "угощения", 
        "пищал", "угостила", "ящик", "помощь", 
        "вытащила", "не пищи", "обещания", "площадку"
    ];

    const chipsHtml = storyWords.map(w => `<span class="l33-t9-summary-chip">${w}</span>`).join("");

    // Формируем результат проверки
    if (allFilled) {
        resArea.innerHTML = `
            <div style="color: #27ae60; margin-bottom: 8px;">
                <b>Прекрасно! Ты ответил на все вопросы по рассказу «Щенок» полными предложениями!</b>
            </div>
            <div class="l33-t9-words-summary">
                <div class="l33-t9-words-summary-title">⭐ Слова со звуком [Щ] из рассказа:</div>
                <div class="l33-t9-summary-chips">
                    ${chipsHtml}
                </div>
            </div>
        `;
    } else {
        resArea.innerHTML = `
            <div style="color: #e67e22;">
                <b>Отвечено на вопросов: ${filledCount} из ${inputs.length}. Заполни все поля полными предложениями!</b>
            </div>
        `;
    }
}
