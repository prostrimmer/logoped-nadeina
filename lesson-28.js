/*** Логика урока 28 */
/* =========================================
   ЗАДАНИЕ 2: ЛОГИКА ВЫБОРА КАРТИНОК
   ========================================= */

// Функция обработки клика по карточке (выделение зеленым контуром при выборе)
function toggleL28T2(cardElement) {
    // Переключаем класс 'selected': если класса не было — добавляем, если был — удаляем (снятие выбора)
    cardElement.classList.toggle('selected');
}

// Функция проверки правильности выбранных картинок
function checkL28Task2() {
    // Находим все карточки второго задания
    const cards = document.querySelectorAll('.l28-t2-card');
    // Находим специальный блок для вывода итогового текстового сообщения
    const resArea = document.getElementById('res-28-2');
    
    // Заводим флаг успешности прохождения задания, изначально считая его верным
    let isAllCorrect = true;

    // Запускаем цикл перебора каждой карточки в задании
    cards.forEach(card => {
        // Проверяем, является ли эта картинка правильным ответом (звук в начале: data-correct="true")
        const shouldBeSelected = card.dataset.correct === "true";
        // Проверяем, выбрал ли ее пользователь (есть ли класс 'selected')
        const isSelected = card.classList.contains('selected');

        // Сравниваем выбор ребенка с эталоном:
        // Ошибка возникает, если пользователь выбрал лишнюю картинку ИЛИ не выбрал нужную
        if (isSelected !== shouldBeSelected) {
            isAllCorrect = false; // Фиксируем ошибку
        }
    });

    // Анализируем итоговый флаг isAllCorrect и выводим соответствующее сообщение
    if (isAllCorrect) {
        resArea.innerHTML = "<b>Молодец! Ты безупречно нашел все предметы, в названиях которых звук [ч] стоит в начале слова!</b>";
        resArea.style.color = "#27ae60";          // Окрашиваем текст в зеленый цвет при победе
    } else {
        resArea.innerHTML = "<b>Не совсем так. Внимательно проверь свой выбор: нужно отметить только те слова, где [ч] в самом начале!</b>";
        resArea.style.color = "#e67e22";          // Окрашиваем текст в оранжевый цвет при наличии ошибок
    }
}




/* =========================================
   ЗАДАНИЕ 3: ЛОГИКА ПРОВЕРКИ ПОДБОРА СЛОВ
   ========================================= */

// Функция проверки правильности подбора слов по смыслу
function checkL28Task3() {
    // Находим все поля ввода (инпуты) в третьем задании
    const inputs = document.querySelectorAll('.l28-t3-input');
    // Находим специальный блок для вывода итогового сообщения ребенку
    const resArea = document.getElementById('res-28-3');
    
    // Заводим флаг успешности, изначально предполагая, что все ответы верные
    let allCorrect = true;

    // Запускаем цикл перебора каждого поля ввода
    inputs.forEach(input => {
        // Получаем введенный ребенком текст: убираем пробелы, переводим в нижний регистр и очищаем знаки препинания
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Получаем правильный эталонный ответ из атрибута data-answer
        const correctAnswer = input.dataset.answer;

        // Сравниваем очищенный текст с эталоном и проверяем, что поле не пустое
        if (userAnswer === correctAnswer && userAnswer !== "") {
            input.classList.add('correct');    // Если верно — добавляем класс зеленого оформления
            input.classList.remove('wrong');   // Обязательно убираем красный класс, если он был раньше
        } else {
            input.classList.add('wrong');      // Если ошибка или пусто — добавляем красный класс
            input.classList.remove('correct'); // Обязательно убираем зеленый класс
            allCorrect = false;                // Меняем общий флаг успеха на false, так как есть ошибка
        }
    });

    // Анализируем итоговый флаг allCorrect и выводим соответствующее сообщение
    if (allCorrect) {
        resArea.innerHTML = "<b>Молодец! Ты помог Ч распутаться и правильно подобрал все слова!</b>";
        resArea.style.color = "#27ae60";       // Окрашиваем текст сообщения в зеленый цвет при победе
    } else {
        resArea.innerHTML = "<b>В некоторых словах допущены ошибки или остались пустые поля. Загляни в словарик и попробуй снова!</b>";
        resArea.style.color = "#e67e22";       // Окрашиваем текст в оранжевый цвет при наличии недочетов
    }
}

/* =========================================
   ЗАДАНИЕ 4: ЛОГИКА ПРОВЕРКИ СХЕМ ЗВУКА
   ========================================= */

// Функция для обеспечения выбора только ОДНОГО чекбокса в каждой схеме
document.addEventListener('DOMContentLoaded', () => {
    // Находим все карточки задания со схемами
    const items = document.querySelectorAll('.l28-t4-item');

    // Перебираем каждую карточку отдельно
    items.forEach(item => {
        // Находим все три чекбокса внутри текущей карточки
        const checkboxes = item.querySelectorAll('.l28-t4-cb');

        // Вешаем событие изменения на каждый чекбокс
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                // Если текущий чекбокс стал отмеченным
                if (cb.checked) {
                    // Снимаем галочки со всех остальных чекбоксов в этой же карточке
                    checkboxes.forEach(other => {
                        if (other !== cb) {
                            other.checked = false;
                        }
                    });
                }
            });
        });
    });
});

// Функция проверки правильности выполнения задания со схемами
function checkL28Task4() {
    // Находим все карточки с картинками и схемами
    const items = document.querySelectorAll('.l28-t4-item');
    // Находим блок для вывода итогового сообщения
    const resArea = document.getElementById('res-28-4');
    
    // Заводим флаг успешности, изначально считая, что всё верно
    let allCorrect = true;

    // Проходим циклом по каждой отдельной карточке
    items.forEach(item => {
        // Получаем правильный индекс из атрибута data-answer (0 - начало, 1 - середина, 2 - конец)
        const correctIndex = parseInt(item.dataset.answer);
        // Находим все чекбоксы внутри этой карточки
        const checkboxes = item.querySelectorAll('.l28-t4-cb');
        
        let selectedIndex = -1; // Переменная для сохранения выбранного пользователем индекса

        // Ищем, какой именно чекбокс отмечен пользователем
        checkboxes.forEach((cb, index) => {
            if (cb.checked) {
                selectedIndex = index; // Сохраняем номер выбранного кружка
            }
        });

        // Сбрасываем старые классы визуальной подсветки перед проверкой
        item.classList.remove('correct', 'wrong');

        // Сравниваем выбор пользователя с эталоном
        if (selectedIndex === correctIndex) {
            item.classList.add('correct'); // Если совпало - красим карточку в зеленый стиль
        } else {
            item.classList.add('wrong');   // Если не совпало или не выбрано - красим в красный
            allCorrect = false;            // Меняем флаг общего успеха на false
        }
    });

    // Выводим текст результата в зависимости от флага allCorrect
    if (allCorrect) {
        resArea.innerHTML = "<b>Молодец! Ты абсолютно верно определил место звука [ч] на всех схемах!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет текста при победе
    } else {
        resArea.innerHTML = "<b>Есть ошибки или пропущенные карточки. Подумай и попробуй еще раз!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет текста при наличии ошибок
    }
}

/* =========================================
   ЗАДАНИЕ 5: ЛОГИКА ПРОВЕРКИ ТАБЛИЦЫ СЛОВ
   ========================================= */

// Функция проверки правильности слов, введенных ребенком в таблицу
function checkL28Task5() {
    // Находим все интерактивные поля ввода, которые заполняет ребенок
    const inputs = document.querySelectorAll('.l28-t5-input.interactive');
    // Находим блок для вывода итогового текстового сообщения
    const resArea = document.getElementById('res-28-5');
    
    // Заводим флаг успешности, изначально предполагая, что всё заполнено верно
    let allCorrect = true;
    // Счетчик заполненных интерактивных полей
    let filledCount = 0;

    // Запускаем цикл перебора каждого интерактивного инпута
    inputs.forEach(input => {
        // Получаем введенное слово: переводим в нижний регистр, убираем пробелы и знаки препинания
        const word = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Узнаем категорию колонки из атрибута data-col (например, "cha-start", "chu-end" и т.д.)
        const category = input.dataset.col;

        // Сбрасываем старые классы подсветки перед проверкой
        input.classList.remove('correct', 'wrong');

        // Если поле не пустое, проверяем соответствие правилу колонки
        if (word !== "") {
            filledCount++; // Увеличиваем счетчик задействованных полей
            let isValid = false; // Флаг валидности конкретного слова

            // Проверяем правила в зависимости от категории колонки
            if (category === "cha-start") {
                // Слово должно начинаться на "ча" и содержать звук [ч]
                if (word.startsWith("ча") && word.length > 2) isValid = true;
            } else if (category === "chu-start") {
                // Слово должно начинаться на "чу"
                if (word.startsWith("чу") && word.length > 2) isValid = true;
            } else if (category === "cha-end") {
                // Слово должно заканчиваться на "ча"
                if (word.endsWith("ча") && word.length > 2) isValid = true;
            } else if (category === "chu-end") {
                // Слово должно заканчиваться на "чу"
                if (word.endsWith("чу") && word.length > 2) isValid = true;
            }

            // Если слово прошло проверку по правилу русскго языка
            if (isValid) {
                input.classList.add('correct'); // Подсвечиваем зеленым
            } else {
                input.classList.add('wrong');   // Подсвечиваем красным (ошибка в правиле)
                allCorrect = false;             // Фиксируем ошибку
            }
        } else {
            // Если поле осталось пустым, но ребенок заполнил хотя бы часть таблицы
            // (пустые поля не считаем критической ошибкой, если есть правильные, но для полной проверки можно пометить)
            input.classList.remove('correct', 'wrong');
        }
    });

    // Если ребенок вообще ничего не написал
    if (filledCount === 0) {
        resArea.innerHTML = "<b>Заполни хотя бы пару строчек в таблице своими примерами слов!</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    // Анализируем результаты и выводим сообщение
    if (allCorrect) {
        resArea.innerHTML = "<b>Великолепно! Все слова подобраны абсолютно верно и соответствуют правилам!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при победе
    } else {
        resArea.innerHTML = "<b>В некоторых словах допущены ошибки (неверное начало или окончание). Проверь и исправь их!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет при наличии ошибок
    }
}

/* =========================================
   ЗАДАНИЕ 6: ЛОГИКА СОПОСТАВЛЕНИЯ ПРОФЕССИЙ
   ========================================= */
// Переменная для хранения текущей выбранной профессии
let activeProf = null;

// Объект для хранения созданных пар (ключ — id профессии, значение — объект { itemCard, color })
let userMatches = {};

// Функция выбора профессии левой кнопкой мыши
function selectProf(card) {
    // Если эта профессия уже имеет пару, временно разрешаем ее переназначить
    // Снимаем класс активности со всех профессий
    document.querySelectorAll('.prof-card').forEach(c => {
        c.classList.remove('active-prof');
    });

    // Назначаем текущую профессию активной
    activeProf = card;
    card.classList.add('active-prof');

    // Если у профессии уже есть сохраненный цвет пары, подсвечиваем ее сильнее
    const profId = card.dataset.id;
    if (userMatches[profId]) {
        let col = userMatches[profId].color;
        card.style.borderColor = col;
        card.style.backgroundColor = hexToRgba(col, 0.2);
    }
}

// Функция выбора предмета левой кнопкой мыши и привязки его к активной профессии
function selectItem(itemCard) {
    // Если пользователь не выбрал профессию предварительно, просим выбрать
    if (!activeProf) {
        alert("Сначала выберите профессию кликом левой кнопки мыши!");
        return;
    }

    const profId = activeProf.dataset.id;           // ID выбранной профессии
    const rainbowColor = activeProf.dataset.color;  // Уникальный цвет радуги этой профессии

    // Если этот предмет уже был кем-то занят, очищаем старую связь
    for (let pId in userMatches) {
        if (userMatches[pId].itemCard === itemCard) {
            let oldProfCard = document.querySelector(`.prof-card[data-id="${pId}"]`);
            if (oldProfCard && oldProfCard !== activeProf) {
                oldProfCard.style.borderColor = "#cbd5e1";
                oldProfCard.style.backgroundColor = "#ffffff";
            }
            delete userMatches[pId];
        }
    }

    // Если у этой профессии уже был другой предмет, сбрасываем его стиль рамки
    if (userMatches[profId]) {
        let oldItem = userMatches[profId].itemCard;
        oldItem.style.borderColor = "#cbd5e1";
        oldItem.style.backgroundColor = "#ffffff";
    }

    // Сохраняем новую связь в объекте пар
    userMatches[profId] = {
        itemCard: itemCard,
        color: rainbowColor
    };

    // Применяем цвет радуги ИКРАМКИ И ФОНУ ОДНОВРЕМЕННО и на профессию, и на предмет!
    activeProf.style.borderColor = rainbowColor;
    activeProf.style.backgroundColor = hexToRgba(rainbowColor, 0.15);

    itemCard.style.borderColor = rainbowColor;
    itemCard.style.backgroundColor = hexToRgba(rainbowColor, 0.15);

    // Сбрасываем активную профессию после завершения связывания пары
    activeProf.classList.remove('active-prof');
    activeProf = null;
}

// Функция отмены выбора по клику ПРАВОЙ кнопкой мыши (oncontextmenu)
function clearSelection(event, card) {
    event.preventDefault(); // Отключаем стандартное контекстное меню браузера

    if (card.classList.contains('prof-card')) {
        // Если кликнули правой кнопкой по профессии — удаляем ее пару
        const profId = card.dataset.id;
        if (userMatches[profId]) {
            let item = userMatches[profId].itemCard;
            item.style.borderColor = "#cbd5e1";
            item.style.backgroundColor = "#ffffff";
            delete userMatches[profId];
        }
        card.style.borderColor = "#cbd5e1";
        card.style.backgroundColor = "#ffffff";
        if (activeProf === card) activeProf = null;

    } else if (card.classList.contains('item-card')) {
        // Если кликнули правой кнопкой по предмету — находим хозяина и удаляем связь
        for (let pId in userMatches) {
            if (userMatches[pId].itemCard === card) {
                let profCard = document.querySelector(`.prof-card[data-id="${pId}"]`);
                if (profCard) {
                    profCard.style.borderColor = "#cbd5e1";
                    profCard.style.backgroundColor = "#ffffff";
                }
                delete userMatches[pId];
            }
        }
        card.style.borderColor = "#cbd5e1";
        card.style.backgroundColor = "#ffffff";
    }
}

// Вспомогательная функция для перевода HEX-цвета в RGBA с прозрачностью фона
function hexToRgba(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Функция проверки правильности сопоставления профессий и предметов
function checkL28Task6() {
    const resArea = document.getElementById('res-28-6');
    let correctCount = 0;
    let totalPairs = 7;

    // Проверяем каждую созданную пару по их data-id и data-match
    for (let profId in userMatches) {
        const itemCard = userMatches[profId].itemCard;
        if (itemCard.dataset.match === profId) {
            correctCount++;
        }
    }

    // Вывод текста результата
    if (correctCount === totalPairs && Object.keys(userMatches).length === totalPairs) {
        resArea.innerHTML = "<b>Ура! Все пары составлены правильно, цвета радуги сияют на карточках!</b>";
        resArea.style.color = "#27ae60"; // Зеленый цвет при победе
    } else {
        resArea.innerHTML = `<b>Правильных пар: ${correctCount} из ${totalPairs}. Проверь связи еще раз!</b>`;
        resArea.style.color = "#e67e22"; // Оранжевый цвет при ошибках
    }
}


/* =========================================
   ЗАДАНИЕ 7: ЛОГИКА ПРОВЕРКИ "ВОВОЧКА-ЧУДАК" (ЗАСЧИТЫВАЕМ ЛЮБОЙ ЗАПОЛНЕННЫЙ ОТВЕТ)
   ========================================= */

// Функция проверки: если строки заполнены, значит задание выполнено верно
function checkL28Task7() {
    // Находим все поля ввода (инпуты) в седьмом задании
    const inputs = document.querySelectorAll('.l28-t7-input');
    // Находим специальный блок для вывода итогового сообщения ребенку
    const resArea = document.getElementById('res-28-7');
    
    // Заводим флаг успешности, изначально предполагая, что все ответы верные
    let allCorrect = true;

    // Запускаем цикл перебора каждого поля ввода
    inputs.forEach(input => {
        // Получаем введенный текст и убираем пробелы по краям
        const userAnswer = input.value.trim();

        // Проверяем только то, что поле не пустое (неважно, что именно ввел ребенок)
        if (userAnswer !== "") {
            input.classList.add('correct');    // Если заполнено — добавляем класс зеленого оформления
            input.classList.remove('wrong');   // Убираем красный класс, если он был раньше
        } else {
            input.classList.add('wrong');      // Если поле осталось пустым — добавляем красный класс
            input.classList.remove('correct'); // Убираем зеленый класс
            allCorrect = false;                // Меняем общий флаг успеха на false, так как есть пустые поля
        }
    });

    // Анализируем итоговый флаг allCorrect и выводим соответствующее сообщение
    if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Ты записал все предложения и справился с заданием!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет текста при победе
    } else {
        resArea.innerHTML = "<b>Остались незаполненные поля. Запиши предложения до конца!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет, если есть пустые строки
    }
}

/* =========================================
   ЗАДАНИЕ 8: ЛОГИКА ПРОВЕРКИ 12 ПРЕДМЕТОВ И СМЕНЫ КАРТИНКИ
   ========================================= */

// Функция проверки введенных 12 предметов (порядок не имеет значения)
function checkL28Task8() {
    // Находим все поля ввода в восьмом задании
    const inputs = document.querySelectorAll('.l28-t8-input');
    // Находим блок вывода текстового результата
    const resArea = document.getElementById('res-28-8');
    // Находим тег изображения для переключения на цветную версию
    const imgElement = document.getElementById('l28-t8-image');
    
    // Официальный массив из 12 правильных предметов со звуком [ч] (с учетом возможных синонимов)
    const validItems = [
        "червяк", "червячок",
        "чайник",
        "печенье",
        "бабочка",
        "пончик",
        "меч",
        "лампочка",
        "качели",
        "сверчок", "кузнечик",
        "часы",
        "свеча", "свечка",
        "черепаха"
    ];

    let enteredWords = []; // Массив для отслеживания уникальных введенных слов
    let hasError = false;  // Флаг наличия ошибок или пустых строк

    // Сбрасываем старые классы подсветки перед каждой проверкой
    inputs.forEach(input => {
        input.classList.remove('correct', 'wrong');
    });

    // Проходим по каждому полю ввода
    inputs.forEach(input => {
        // Очищаем текст: приводим к нижнему регистру, убираем пробелы и знаки препинания
        const word = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");

        if (word === "") {
            // Пустое поле считается невыполненным
            input.classList.add('wrong');
            hasError = true;
        } else {
            // Проверяем, есть ли слово в списке разрешенных и не дублируется ли оно
            let isMatch = validItems.includes(word);
            let isDuplicate = enteredWords.includes(word);

            if (isMatch && !isDuplicate) {
                input.classList.add('correct'); // Подсвечиваем поле зеленым
                enteredWords.push(word);        // Добавляем в список уникальных
            } else {
                input.classList.add('wrong');   // Подсвечиваем красным при ошибке или повторе
                hasError = true;
            }
        }
    });

    // Проверяем итоговое условие: нет ошибок и ровно 12 уникальных правильных слов
    if (!hasError && enteredWords.length === 12) {
        resArea.innerHTML = "<b>Ура! Ты нашел все 12 предметов, и картинка стала цветной!</b>";
        resArea.style.color = "#27ae60"; // Зеленый цвет сообщения при победе
        
        // Автоматически меняем черно-белую картинку на цветную версию
        if (imgElement) {
            imgElement.src = "images/lesson-28-9-1.png";
        }
    } else {
        resArea.innerHTML = "<b>Не все предметы найдены правильно или есть повторения. Проверь слова и попробуй снова!</b>";
        resArea.style.color = "#e67e22"; // Оранжевый цвет при наличии недочетов
    }
}

/* =========================================
   ЗАДАНИЕ 9: ЛОГИКА ПРОВЕРКИ ИГРЫ "СЫЩИК"
   ========================================= */

// Функция проверки правильности подсчета предметов
function checkL28Task9() {
    // Находим все поля ввода в девятом задании
    const inputs = document.querySelectorAll('.l28-t9-input');
    // Находим блок для вывода текстового результата
    const resArea = document.getElementById('res-28-9');
    
    // Заводим общий флаг успешности
    let allCorrect = true;

    // Запускаем цикл проверки каждого поля
    inputs.forEach(input => {
        // Получаем введенное число (убираем лишние пробелы)
        const userValue = input.value.trim();
        // Получаем правильный эталон из атрибута data-answer
        const correctAnswer = input.dataset.answer;

        // Сбрасываем старые стили подсветки
        input.classList.remove('correct', 'wrong');

        // Сравниваем введенное число с эталоном
        if (userValue === correctAnswer && userValue !== "") {
            input.classList.add('correct'); // Зеленая подсветка при верном подсчете
        } else {
            input.classList.add('wrong');   // Красная подсветка при ошибке или пустоте
            allCorrect = false;             // Фиксируем наличие ошибки
        }
    });

    // Анализируем результат и выводим сообщение ребенку
    if (allCorrect) {
        resArea.innerHTML = "<b>Великолепно! Ты настоящий сыщик и верно сосчитал все предметы!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при победе
    } else {
        resArea.innerHTML = "<b>В подсчете есть ошибки или пропущенные клеточки. Проверь внимательно еще раз!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет при наличии ошибок
    }
}