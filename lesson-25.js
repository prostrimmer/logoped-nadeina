/*** Логика урока 25 */

/* ========================================
   ЗАДАНИЕ 1: ВЫБЕРИ УГОЩЕНИЯ СО ЗВУКОМ Ч
   ======================================== */

function toggleL25T1(element) {
    // Переключаем класс 'selected' – синяя рамка
    element.classList.toggle('selected');
    // Убираем классы результатов предыдущей проверки
    element.classList.remove('correct', 'wrong');
}

function checkL25Task1() {
    const cards = document.querySelectorAll('.l25-t1-card');
    const resArea = document.getElementById('res-25-1');
    let allCorrect = true;

    cards.forEach(card => {
        const shouldBeSelected = card.dataset.correct === "true";
        const isSelected = card.classList.contains('selected');

        if (isSelected) {
            if (shouldBeSelected) {
                card.classList.add('correct');      // Правильный выбор – зелёный
            } else {
                card.classList.add('wrong');        // Лишний выбор – красный
                allCorrect = false;
            }
        } else {
            if (shouldBeSelected) {
                allCorrect = false;                 // Правильное не выбрано – ошибка
            }
        }
    });

    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты правильно выбрал все угощения со звуком [Ч]!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки! Проверь, все ли слова со звуком [Ч] ты выбрал, и не выбрал ли лишние.</b>";
        resArea.style.color = "#e67e22";
    }
}

/* ========================================
   ЗАДАНИЕ 2: ЧУЛАН Ч (ВЕЩИ СО ЗВУКОМ Ч)
   ======================================== */

function toggleL25T2(element) {
    element.classList.toggle('selected');
    element.classList.remove('correct', 'wrong');
}

function checkL25Task2() {
    const cards = document.querySelectorAll('.l25-t2-card');
    const resArea = document.getElementById('res-25-2');
    let allCorrect = true;

    cards.forEach(card => {
        const shouldBeSelected = card.dataset.correct === "true";
        const isSelected = card.classList.contains('selected');

        if (isSelected) {
            if (shouldBeSelected) {
                card.classList.add('correct');
            } else {
                card.classList.add('wrong');
                allCorrect = false;
            }
        } else {
            if (shouldBeSelected) {
                allCorrect = false;
            }
        }
    });

    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты правильно нашёл все вещи со звуком [Ч]!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки! Проверь, все ли вещи со звуком [Ч] ты отметил.</b>";
        resArea.style.color = "#e67e22";
    }
}

/* ========================================
   ЗАДАНИЕ 3: ЛЕТОМ НА ДАЧЕ
   ======================================== */

// Правильные слова (все со звуком Ч) – в нижнем регистре для сравнения
const correctWordsL25T3 = [
    "качели", "бабочки", "девочка", "юбочка", "кофточка",
    "сачок", "бочки", "черепашка", "мячик", "колокольчики",
    "одуванчики", "пчелки", "кирпичи", "грач", "удочка",
    "крючок", "червяк", "чертополох", "ручей"
];

/**
 * Показывает поля для ввода после нажатия «ГОТОВ».
 * Скрывает картинку и кнопку, показывает блок с инпутами.
 */
function showL25T3Inputs() {
    document.getElementById('l25-t3-image-area').style.display = 'none';
    document.getElementById('l25-t3-input-area').style.display = 'block';
}

/**
 * Проверяет введённые слова.
 * Сравнивает множество введённых уникальных слов с множеством правильных.
 * Подсвечивает каждое поле: зелёным, если слово есть в правильном списке, иначе красным.
 * Выводит итоговое сообщение.
 */
function checkL25Task3() {
    const inputs = document.querySelectorAll('.l25-t3-input');
    const resArea = document.getElementById('res-25-3');

    // Собираем все введённые значения (обрезаем пробелы, приводим к нижнему регистру)
    const userWords = [];
    inputs.forEach(input => {
        const val = input.value.trim().toLowerCase();
        userWords.push(val);
    });

    // Проверяем, что все поля заполнены
    const emptyFields = userWords.filter(w => w === '');
    if (emptyFields.length > 0) {
        resArea.innerHTML = "<b>Заполни все поля! Введи слово в каждую клеточку.</b>";
        resArea.style.color = "#e67e22";
        // Можно подсветить пустые поля красным
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('wrong');
                input.classList.remove('correct');
            } else {
                // Сбрасываем классы, чтобы потом перепроверить
                input.classList.remove('correct', 'wrong');
            }
        });
        return;
    }

    // Создаём множества для сравнения
    const userSet = new Set(userWords);
    const correctSet = new Set(correctWordsL25T3);

    // Проверяем каждое поле: если слово есть в правильном множестве – correct, иначе wrong
    let allCorrect = true;
    inputs.forEach(input => {
        const val = input.value.trim().toLowerCase();
        if (correctSet.has(val)) {
            input.classList.add('correct');
            input.classList.remove('wrong');
        } else {
            input.classList.add('wrong');
            input.classList.remove('correct');
            allCorrect = false;
        }
    });

    // Дополнительная проверка: множества должны совпадать и количество введённых слов должно быть ровно 19
    // (чтобы не было дублей и не хватало слов)
    const isSetsEqual = userSet.size === correctSet.size && 
                        [...userSet].every(word => correctSet.has(word));

    if (allCorrect && isSetsEqual) {
        resArea.innerHTML = "<b>Отлично! Ты вспомнил все слова со звуком [Ч]!</b>";
        resArea.style.color = "#27ae60";
    } else {
        // Если есть лишние слова или не все правильные введены
        resArea.innerHTML = "<b>Есть ошибки! Проверь, все ли слова ты написал, и нет ли лишних (или опечаток).</b>";
        resArea.style.color = "#e67e22";
    }
}

/* ========================================
   ЗАДАНИЕ 4: ЛЕТОМ НА ДАЧЕ (ПРОДОЛЖЕНИЕ)
   ======================================== */

function toggleL25T4(element) {
    element.classList.toggle('selected');
    element.classList.remove('correct', 'wrong');
}

function checkL25Task4() {
    const cards = document.querySelectorAll('.l25-t4-card');
    const resArea = document.getElementById('res-25-4');
    let allCorrect = true;

    cards.forEach(card => {
        const shouldBeSelected = card.dataset.correct === "true";
        const isSelected = card.classList.contains('selected');

        if (isSelected) {
            if (shouldBeSelected) {
                card.classList.add('correct');
            } else {
                card.classList.add('wrong');
                allCorrect = false;
            }
        } else {
            if (shouldBeSelected) {
                allCorrect = false;
            }
        }
    });

    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты правильно вспомнил, какие предметы были на фотографии!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки! Проверь, какие предметы действительно были на даче у Ч.</b>";
        resArea.style.color = "#e67e22";
    }
}

/* ========================================
   ЗАДАНИЕ 5: НЕДОСТАЮЩИЕ ВЕЩИ (СЕТКА 3x3)
   ======================================== */

function checkL25Task5() {
    // Находим все ячейки, кроме полного чемодана Ч
    const cells = document.querySelectorAll('.l25-t5-cell:not(.full)');
    const resArea = document.getElementById('res-25-5');

    

    // Блокируем кнопку, чтобы нельзя было нажать повторно
    const btn = document.querySelector('.l25-t5-grid + .btn-box .orange-check-btn');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'default';
    }

    // Выводим сообщение об успехе
    resArea.innerHTML = "<b>Молодец! Теперь все чемоданы собраны, как у Ч!</b>";
    resArea.style.color = "#27ae60";
}

/* ========================================
   ЗАДАНИЕ 6: СОБЕРИ СЛОВО
   ======================================== */

// Правильные ответы (измените, если нужно)
const correctWordsL25T6 = {
    red: "ученик",
    green: "чайник"
};

function checkL25Task6() {
    const wordRed = document.getElementById('l25-t6-word-red');
    const wordGreen = document.getElementById('l25-t6-word-green');
    const resArea = document.getElementById('res-25-6');

    const userRed = wordRed.value.trim().toUpperCase();
    const userGreen = wordGreen.value.trim().toUpperCase();

    if (userRed === '' || userGreen === '') {
        resArea.innerHTML = "<b>Заполни оба поля!</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    // Сравниваем с правильными ответами (приводим к верхнему регистру)
    const redCorrect = (userRed === correctWordsL25T6.red.toUpperCase());
    const greenCorrect = (userGreen === correctWordsL25T6.green.toUpperCase());

    wordRed.classList.toggle('correct', redCorrect);
    wordRed.classList.toggle('wrong', !redCorrect);
    wordGreen.classList.toggle('correct', greenCorrect);
    wordGreen.classList.toggle('wrong', !greenCorrect);

    if (redCorrect && greenCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты правильно собрал оба слова!</b>";
        resArea.style.color = "#27ae60";
    } else {
        let msg = "Есть ошибки! ";
        if (!redCorrect) msg += "Красное слово неверно. ";
        if (!greenCorrect) msg += "Зелёное слово неверно. ";
        resArea.innerHTML = "<b>" + msg + "</b>";
        resArea.style.color = "#e67e22";
    }
}

/* ========================================
   ЗАДАНИЕ 8: НОВЫЕ СЛОВА (ЗАМЕНА ЗВУКОВ)
   ======================================== */

function checkL25Task8() {
    // Все поля ввода в задании
    const inputs = document.querySelectorAll('.l25-t8-input');
    const resArea = document.getElementById('res-25-8');
    let allCorrect = true;
    let emptyFields = false;

    // Проверяем каждое поле
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer; // уже в нижнем регистре

        if (userAnswer === '') {
            emptyFields = true;
            input.classList.remove('correct', 'wrong');
        } else if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('wrong');
        } else {
            input.classList.add('wrong');
            input.classList.remove('correct');
            allCorrect = false;
        }
    });

    // Сообщение
    if (emptyFields) {
        resArea.innerHTML = "<b>Заполни все поля! Введи слова во все пустые места.</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты правильно заменил звуки во всех словах!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки. Проверь, правильно ли ты заменил звуки на [Ч].</b>";
        resArea.style.color = "#e67e22";
    }
}