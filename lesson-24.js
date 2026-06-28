/*** Логика урока 24 */
/* =========================================
   ЗАДАНИЕ 1: ЛОГИКА ПРОЧИТАННЫХ КАРТОЧЕК
   ========================================= */

// Функция срабатывает при клике на любую карточку со слогами
function toggleReadL24T1(element) {
    // Метод toggle добавляет класс 'read', если его нет, и убирает, если он есть
    // Это перекрашивает карточку в зеленый цвет (и обратно, если ребенок передумал)
    element.classList.toggle('read'); 
}

// Функция проверки по кнопке "Проверить"
function checkL24Task1() {
    // Собираем абсолютно все карточки из первого задания
    const cards = document.querySelectorAll('.l24-t1-card');
    // Находим блок, куда будем выводить текст результата (Молодец / Ошибка)
    const resArea = document.getElementById('res-24-1');
    // Заводим флаг. Изначально верим, что ребенок прочитал всё
    let allRead = true;

    // Перебираем каждую карточку по очереди
    cards.forEach(card => {
        // Если у карточки НЕТ класса 'read' (то есть она осталась белой)
        if (!card.classList.contains('read')) {
            allRead = false; // Меняем флаг: задание выполнено не до конца
        }
    });

    // Если флаг остался true (все карточки зеленые)
    if (allRead) {
        // Выводим радостное сообщение
        resArea.innerHTML = "<b>Умница! Ты отлично всё прочитал!</b>";
        resArea.style.color = "#27ae60"; // Красим текст в зеленый
    } else { // Если хотя бы одна карточка осталась белой
        // Просим дочитать оставшиеся
        resArea.innerHTML = "<b>Прочитай все слова и нажми на каждую карточку!</b>";
        resArea.style.color = "#e67e22"; // Красим текст в оранжевый
    }
}

/* =========================================
   ЗАДАНИЕ 2: ЛОГИКА ПРОВЕРКИ ОТЧЕСТВ
   ========================================= */

function checkL24Task2() {
    // Собираем все поля ввода из второго задания
    const inputs = document.querySelectorAll('.l24-t2-input');
    // Находим блок для вывода финального сообщения
    const resArea = document.getElementById('res-24-2');
    // Флаг успешности. Изначально предполагаем, что всё решено верно
    let allCorrect = true;

    // Проходимся циклом по каждому полю ввода
    inputs.forEach(input => {
        // Получаем то, что ввел ребенок (убираем лишние пробелы и переводим в нижний регистр)
        const userAnswer = input.value.trim().toLowerCase();
        // Получаем правильный ответ, который мы спрятали в HTML в атрибуте data-answer
        const correctAnswer = input.dataset.answer;

        // Если поле не пустое и ответ совпадает с эталоном
        if (userAnswer === correctAnswer && userAnswer !== "") {
            input.classList.add('correct');    // Красим в зеленый
            input.classList.remove('wrong');   // Убираем красный (если ребенок исправил ошибку)
        } else {
            // Если ответ неверный или поле пустое
            input.classList.add('wrong');      // Красим в красный
            input.classList.remove('correct'); // Убираем зеленый
            allCorrect = false;                // Отмечаем, что есть ошибка
        }
    });

    // Выводим сообщение в зависимости от того, остались ли ошибки (флаг allCorrect)
    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты правильно назвал все отчества!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет текста
    } else {
        resArea.innerHTML = "<b>В некоторых словах есть ошибки, или остались пустые поля. Попробуй еще раз!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет текста
    }
}

/* =========================================
   ЗАДАНИЕ 3: ПРОВЕРКА РАСШИФРОВАННЫХ СЛОВ
   ========================================= */

function checkL24Task3() {
    // Находим все клеточки для ввода букв из третьего задания
    const cells = document.querySelectorAll('.l24-t3-cell');
    // Находим блок для вывода сообщения
    const resArea = document.getElementById('res-24-3');
    // Флаг успешности. Изначально считаем, что всё правильно
    let allCorrect = true;

    // Проверяем каждую клеточку по очереди
    cells.forEach(cell => {
        // Получаем введенную букву, убираем пробелы и переводим в нижний регистр
        const userAnswer = cell.value.trim().toLowerCase();
        // Получаем правильную букву из атрибута data-answer
        const correctAnswer = cell.dataset.answer;

        // Если введена правильная буква
        if (userAnswer === correctAnswer && userAnswer !== "") {
            cell.classList.add('correct');    // Перекрашиваем в зеленый
            cell.classList.remove('wrong');   // Убираем красный (если был)
        } else {
            // Если буква неверная или клеточка пустая
            cell.classList.add('wrong');      // Перекрашиваем в красный
            cell.classList.remove('correct'); // Убираем зеленый
            allCorrect = false;               // Фиксируем ошибку
        }
    });

    // Выводим финальный результат
    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты разгадал все зашифрованные слова!</b>";
        resArea.style.color = "#27ae60";      // Зеленый цвет текста
    } else {
        resArea.innerHTML = "<b>В словах есть ошибки или пустые клеточки. Будь внимательнее!</b>";
        resArea.style.color = "#e67e22";      // Оранжевый цвет текста
    }
}

/* =========================================
   ЗАДАНИЕ 4: ЛОГИКА ВЫБОРА КАРТИНОК
   ========================================= */

// Функция срабатывает при клике на любую картинку
function toggleL24T4(element) {
    // Добавляем или убираем класс 'selected' (синяя рамка выбора)
    // Также убираем классы ошибок/правильности, если ребенок решил перевыбрать после проверки
    element.classList.toggle('selected');
    element.classList.remove('correct', 'wrong');
}

// Функция срабатывает при нажатии на кнопку "Проверить"
function checkL24Task4() {
    // Находим все карточки в 4-м задании
    const cards = document.querySelectorAll('.l24-t4-card');
    // Блок для текста результата
    const resArea = document.getElementById('res-24-4');
    
    // Флаг успешного выполнения задания
    let isAllCorrect = true;

    // Проходимся по каждой карточке
    cards.forEach(card => {
        // Проверяем, должна ли эта карточка быть выбрана (data-correct="true")
        const shouldBeSelected = card.dataset.correct === "true";
        // Проверяем, выбрал ли ее ребенок (есть ли класс 'selected')
        const isSelected = card.classList.contains('selected');

        // Если карточка выбрана
        if (isSelected) {
            if (shouldBeSelected) {
                // Выбрал правильно (слово кончается на Ч)
                card.classList.add('correct');
            } else {
                // Выбрал неправильно (лишняя картинка)
                card.classList.add('wrong');
                isAllCorrect = false; // Фиксируем ошибку
            }
        } else {
            // Если карточка НЕ выбрана, но ДОЛЖНА БЫЛА быть выбрана
            if (shouldBeSelected) {
                isAllCorrect = false; // Ребенок пропустил правильную картинку
            }
        }
    });

    // Выводим результат в зависимости от наличия ошибок
    if (isAllCorrect) {
        resArea.innerHTML = "<b>Умница! Ты нашел все слова, которые заканчиваются на звук [Ч]!</b>";
        resArea.style.color = "#27ae60"; // Зеленый текст
    } else {
        resArea.innerHTML = "<b>Есть ошибки или ты нашел не все нужные картинки. Проверь еще раз!</b>";
        resArea.style.color = "#e67e22"; // Оранжевый текст
    }
}

/* =========================================
   ЗАДАНИЕ 5: ПРОВЕРКА ПРЕДЛОЖЕНИЙ
   ========================================= */

function checkL24Task5() {
    // Находим все поля для ввода предложений
    const inputs = document.querySelectorAll('.l24-t5-input');
    // Блок для вывода результата
    const resArea = document.getElementById('res-24-5');
    // Флаг успешности
    let allCorrect = true;

    // Проверяем каждое предложение
    inputs.forEach(input => {
        // Получаем введенный текст в нижнем регистре
        const sentence = input.value.trim().toLowerCase();
        
        // Получаем корни слов, которые обязательно должны быть в предложении
        const word1 = input.dataset.w1;
        const word2 = input.dataset.w2;

        // Проверяем, содержит ли введенное предложение оба корня
        // Используем includes(), чтобы игнорировать окончания (например, "печ" найдется в слове "печке")
        const hasWord1 = sentence.includes(word1);
        const hasWord2 = sentence.includes(word2);

        // Если есть оба слова и предложение не пустое
        if (hasWord1 && hasWord2) {
            input.classList.add('correct');    // Красим рамку в зеленый
            input.classList.remove('wrong');   // Убираем красный
        } else {
            input.classList.add('wrong');      // Красим рамку в красный
            input.classList.remove('correct'); // Убираем зеленый
            allCorrect = false;                // Фиксируем ошибку
        }
    });

    // Выводим сообщение
    if (allCorrect) {
        resArea.innerHTML = "<b>Фантастика! Ты придумал отличные предложения!</b>";
        resArea.style.color = "#27ae60";       // Зеленый
    } else {
        resArea.innerHTML = "<b>Убедись, что ты написал предложения и использовал ОБА слова из пары!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый
    }
}

/* =========================================
   ЗАДАНИЕ 6: ПРОВЕРКА ПРОПУЩЕННЫХ СЛОВ
   ========================================= */

function checkL24Task6() {
    // Собираем все поля ввода в 6 задании
    const inputs = document.querySelectorAll('.l24-t6-input');
    // Находим блок для вывода финального результата
    const resArea = document.getElementById('res-24-6');
    // Устанавливаем флаг успешности
    let allCorrect = true;

    // Проверяем каждое поле
    inputs.forEach(input => {
        // Читаем, что ввел ребенок (убираем пробелы и переводим в нижний регистр)
        const userAnswer = input.value.trim().toLowerCase();
        // Получаем правильный ответ из HTML (data-answer)
        const correctAnswer = input.dataset.answer;

        // Если ответ правильный
        if (userAnswer === correctAnswer && userAnswer !== "") {
            input.classList.add('correct');    // Окрашиваем в зеленый
            input.classList.remove('wrong');   // Убираем красный
        } else {
            // Если ответ с ошибкой или поле пустое
            input.classList.add('wrong');      // Окрашиваем в красный
            input.classList.remove('correct'); // Убираем зеленый
            allCorrect = false;                // Отмечаем, что есть ошибка
        }
    });

    // Выводим сообщение в зависимости от наличия ошибок
    if (allCorrect) {
        resArea.innerHTML = "<b>Умница! Ты правильно подобрал все слова!</b>";
        resArea.style.color = "#27ae60";       // Зеленый текст
    } else {
        resArea.innerHTML = "<b>В некоторых словах есть ошибки. Проверь окончания (например, качается на <i>качелях</i>)!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый текст
    }
}

/* =========================================
   ЗАДАНИЕ 7: ЛОГИКА ПОИСКА "ЛИШНЕГО"
   ========================================= */

// Функция выбора картинки в ряду
function selectL24T7(clickedCard) {
    // Находим родительский ряд (строку), в которой находится кликнутая картинка
    const row = clickedCard.closest('.l24-t7-row');
    // Находим все картинки ТОЛЬКО внутри этого конкретного ряда
    const cardsInRow = row.querySelectorAll('.l24-t7-card');

    // Снимаем выделение со всех картинок в этом ряду (чтобы можно было выбрать только одну)
    cardsInRow.forEach(card => {
        card.classList.remove('selected', 'correct', 'wrong');
    });

    // Выделяем ту, на которую кликнули
    clickedCard.classList.add('selected');
}

// Функция проверки ответов
function checkL24Task7() {
    // Получаем все ряды
    const rows = document.querySelectorAll('.l24-t7-row');
    const resArea = document.getElementById('res-24-7');
    
    let allCorrect = true;   // Флаг отсутствия ошибок
    let allAnswered = true;  // Флаг, что ребенок ответил во ВСЕХ рядах

    rows.forEach(row => {
        // Ищем выбранную картинку в текущем ряду
        const selected = row.querySelector('.l24-t7-card.selected');
        
        if (!selected) {
            // Если в ряду ничего не выбрано
            allAnswered = false;
            allCorrect = false;
        } else {
            // Если выбрано, проверяем правильность (data-correct="true")
            if (selected.dataset.correct === "true") {
                selected.classList.add('correct');  // Зеленая подсветка
            } else {
                selected.classList.add('wrong');    // Красная подсветка
                allCorrect = false;
            }
        }
    });

    // Вывод сообщения
    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты нашел все лишние картинки!</b>";
        resArea.style.color = "#27ae60";
    } else if (!allAnswered) {
        resArea.innerHTML = "<b>Ты выбрал лишние картинки не во всех рядах. Посмотри внимательнее!</b>";
        resArea.style.color = "#e67e22";
    } else {
        resArea.innerHTML = "<b>Есть ошибки! Подумай, в каких словах есть звук [Ч], а в каких его нет.</b>";
        resArea.style.color = "#e67e22";
    }
}

/* =========================================
   ЗАДАНИЕ 9: ПРОВЕРКА ЛАБИРИНТА
   ========================================= */

function checkL24Task9() {
    // Собираем все поля ввода в 9-м задании
    const inputs = document.querySelectorAll('.l24-t9-input');
    const resArea = document.getElementById('res-24-9');
    
    // Флаг отсутствия ошибок
    let allCorrect = true;

    // Перебираем каждое поле
    inputs.forEach(input => {
        // Читаем, что ввел ребенок (убираем пробелы и переводим в нижний регистр)
        const userAnswer = input.value.trim().toLowerCase();
        // Получаем правильный ответ
        const correctAnswer = input.dataset.answer;

        if (userAnswer === correctAnswer && userAnswer !== "") {
            input.classList.add('correct');    // Красим текст в зеленый
            input.classList.remove('wrong');
        } else {
            input.classList.add('wrong');      // Красим текст в красный
            input.classList.remove('correct');
            allCorrect = false;                // Фиксируем ошибку
        }
    });

    // Выводим финальное сообщение
    if (allCorrect) {
        resArea.innerHTML = "<b>Блестяще! Ты угадал все слова из лабиринта!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет
    } else {
        resArea.innerHTML = "<b>Есть ошибки или пустые поля. Посмотри на картинки в лабиринте еще раз!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет
    }
}

/* ЗАДАНИЕ 10: ЛОГИКА ЛАБИРИНТА */
const correctPath = ["часы", "черника", "чашка", "чулок", "чайник", "червячок", "читать", "чудесный", "чувство", "чихать", "чистота", "честность", "черепаха", "чемпион", "чай"];
let userPath = [];

function selectWord(word) {
    if (!userPath.includes(word)) {
        userPath.push(word);
        // Добавьте визуальный эффект выделения здесь
    }
}

function checkL24Task10() {
    const resArea = document.getElementById('res-24-10');
    const isPathCorrect = JSON.stringify(userPath) === JSON.stringify(correctPath);
    
    if (isPathCorrect) {
        resArea.innerHTML = "<b>Молодец! Ты успешно провел цыпленка через лабиринт!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Молодец! Ты успешно провел цыпленка через лабиринт!</b>";
        resArea.style.color = "#27ae60";
    }
}