/*** Логика урока 26 */
/* ========================================
   ЗАДАНИЕ 1: ЛАСКОВЫЕ МАМОЧКИ (12 КАРТИНОК)
   ======================================== */

function checkL26Task1() {
    const cards = document.querySelectorAll('.l26-t1-card');
    const resArea = document.getElementById('res-26-1');

    // Проверяем, не были ли уже показаны подписи
    if (cards[0].classList.contains('checked')) {
        resArea.innerHTML = "<b>Подписи уже показаны! Молодец!</b>";
        resArea.style.color = "#27ae60";
        return;
    }

    // Добавляем класс 'checked' ко всем карточкам – картинки исчезают, появляются подписи
    cards.forEach(card => {
        card.classList.add('checked');
    });

    // Выводим сообщение
    resArea.innerHTML = "<b>Отлично! Ты назвал всех детёнышей!</b>";
    resArea.style.color = "#27ae60";

    // Блокируем кнопку
    const btn = document.querySelector('.l26-t1-grid + .btn-box .orange-check-btn');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'default';
    }
}

/* ========================================
   ЗАДАНИЕ 2: ЧУДО-ПЕЧКА
   ======================================== */

function checkL26Task2() {
    const answersBlock = document.getElementById('l26-t2-answers');
    const resArea = document.getElementById('res-26-2');

    // Проверяем, не показаны ли уже ответы
    if (answersBlock.style.display !== 'none') {
        resArea.innerHTML = "<b>Ответы уже показаны! Молодец!</b>";
        resArea.style.color = "#27ae60";
        return;
    }

    // Показываем блок с ответами
    answersBlock.style.display = 'block';

    // Выводим сообщение
    resArea.innerHTML = "<b>Отлично! Проверь, всё ли ты правильно назвал.</b>";
    resArea.style.color = "#27ae60";

    // Блокируем кнопку
    const btn = document.querySelector('.l26-t2-image-wrapper + .btn-box .orange-check-btn');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'default';
    }
}

/* ========================================
   ЗАДАНИЕ 3: ДАЧИ ДЛЯ ЗВЕРЯТ
   ======================================== */

function checkL26Task3() {
    const inputs = document.querySelectorAll('.l26-t3-input');
    const resArea = document.getElementById('res-26-3');
    let allCorrect = true;
    let emptyFields = false;

    // Проверяем каждое поле
    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();

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

    // Если есть пустые поля – просим заполнить
    if (emptyFields) {
        resArea.innerHTML = "<b>Заполни все поля! Впиши ответ под каждой картинкой.</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    // Итоговое сообщение
    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты правильно определил все дачи!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки! Проверь, правильно ли ты написал названия.</b>";
        resArea.style.color = "#e67e22";
    }
}

/* ========================================
   ЗАДАНИЕ 4: ЗАГАДКИ Ч (3×3 СЕТКА)
   ======================================== */

function checkL26Task4() {
    const cards = document.querySelectorAll('.l26-t4-card');
    const resArea = document.getElementById('res-26-4');

    // Проверяем, не были ли уже показаны подписи
    if (cards[0].classList.contains('checked')) {
        resArea.innerHTML = "<b>Ответы уже показаны! Молодец!</b>";
        resArea.style.color = "#27ae60";
        return;
    }

    // Добавляем класс 'checked' ко всем карточкам – картинки исчезают, появляются глаголы
    cards.forEach(card => {
        card.classList.add('checked');
    });

    // Выводим сообщение
    resArea.innerHTML = "<b>Отлично! Ты правильно отгадал все загадки!</b>";
    resArea.style.color = "#27ae60";

    // Блокируем кнопку
    const btn = document.querySelector('.l26-t4-grid + .btn-box .orange-check-btn');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'default';
    }
}

/* ========================================
   ЗАДАНИЕ 5: ЗАГАДОЧНЫЕ КАРТИНКИ
   ======================================== */

function checkL26Task5() {
    const textarea = document.getElementById('l26-t5-story');
    const resArea = document.getElementById('res-26-5');

    // Проверяем, заполнено ли поле
    const story = textarea.value.trim();

    if (story === '') {
        resArea.innerHTML = "<b>Напиши свой рассказ в поле, а потом нажми «Проверить».</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    // Если текст есть – хвалим
    resArea.innerHTML = "<b>Отличный рассказ! Ты молодец!</b>";
    resArea.style.color = "#27ae60";

    // Блокируем кнопку, чтобы нельзя было нажать повторно (по желанию)
    const btn = document.querySelector('.l26-t5-textarea-wrapper + .btn-box .orange-check-btn');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'default';
    }
}

/* ========================================
   ЗАДАНИЕ 6: НА ДАЧЕ (ТЕКСТ И ВОПРОСЫ)
   ======================================== */

function showL26T6Text() {
    const textBlock = document.getElementById('l26-t6-text');
    const showBtn = document.getElementById('l26-t6-show-btn');

    textBlock.style.display = 'block';
    showBtn.style.display = 'none';
}

function checkL26Task6() {
    const inputs = document.querySelectorAll('.l26-t6-input');
    const resArea = document.getElementById('res-26-6');
    let allCorrect = true;
    let emptyFields = false;

    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();

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

    if (emptyFields) {
        resArea.innerHTML = "<b>Ответь на все вопросы! Заполни все поля.</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Ты правильно ответил на все вопросы!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки. Проверь ответы и исправь их.</b>";
        resArea.style.color = "#e67e22";
    }
}

/* ========================================
   ЗАДАНИЕ 7: НАЗОВИ ЛАСКОВО (исправленное)
   ======================================== */

function checkL26Task7() {
    const cards = document.querySelectorAll('.l26-t7-card');
    const resArea = document.getElementById('res-26-7');

    // Проверяем, не были ли уже заменены слова
    if (cards[0].classList.contains('checked')) {
        resArea.innerHTML = "<b>Ответы уже показаны! Молодец!</b>";
        resArea.style.color = "#27ae60";
        return;
    }

    // Проходим по каждой карточке и заменяем текст на ласковый вариант
    cards.forEach(card => {
        const laskovo = card.dataset.laskovo;
        if (laskovo) {
            card.textContent = laskovo;   // заменяем текст
            card.classList.add('checked');
        }
    });

    resArea.innerHTML = "<b>Отлично! Ты правильно назвал все ласковые слова!</b>";
    resArea.style.color = "#27ae60";

    // Блокируем кнопку
    const btn = document.querySelector('.l26-t7-grid + .btn-box .orange-check-btn');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'default';
    }
}

/* ========================================
   ЗАДАНИЕ 8: ПУТАНИЦА
   ======================================== */

function checkL26Task8() {
    const items = document.querySelectorAll('.l26-t8-item');
    const resArea = document.getElementById('res-26-8');
    let allFilled = true;
    let allCorrect = true;

    // Проверяем, не показаны ли уже ответы
    if (items[0].classList.contains('checked')) {
        resArea.innerHTML = "<b>Ответы уже показаны! Молодец!</b>";
        resArea.style.color = "#27ae60";
        return;
    }

    items.forEach(item => {
        const input = item.querySelector('.l26-t8-input');
        const answerDiv = item.querySelector('.l26-t8-answer');
        const userAnswer = input.value.trim();

        if (userAnswer === '') {
            allFilled = false;
            input.classList.remove('correct', 'wrong');
        } else {
            // Показываем правильный ответ
            item.classList.add('checked');
            // Проверяем наличие ключевых слов (можно сделать просто проверку на длину или наличие всех слов, но проще отметить как правильное, если поле не пустое)
            // Для творческого задания просто считаем заполненное поле правильным
            input.classList.add('correct');
            input.classList.remove('wrong');
        }
    });

    if (!allFilled) {
        resArea.innerHTML = "<b>Заполни все поля! Напиши предложения во все строки.</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    // Если все заполнены, показываем правильные ответы (они уже видны благодаря классу checked)
    resArea.innerHTML = "<b>Отлично! Теперь ты можешь проверить свои предложения по образцам ниже.</b>";
    resArea.style.color = "#27ae60";

    // Блокируем кнопку
    const btn = document.querySelector('.l26-t8-grid + .btn-box .orange-check-btn');
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'default';
    }
}

/* ========================================
   ЗАДАНИЕ 9: ПОДБЕРИ ОБЩЕЕ НАЧАЛО
   ======================================== */

function checkL26Task9() {
    const inputs = document.querySelectorAll('.l26-t9-input');
    const resArea = document.getElementById('res-26-9');
    const columns = document.querySelectorAll('.l26-t9-column');
    let allCorrect = true;
    let allFilled = true;

    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();

        if (userAnswer === '') {
            allFilled = false;
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

    if (!allFilled) {
        resArea.innerHTML = "<b>Заполни оба поля! Впиши общее начало для каждого столбика.</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    // Если все поля заполнены и правильные – показываем ответы
    if (allCorrect) {
        // Показываем правильные слова в каждом столбике
        columns.forEach(column => {
            const resultBlock = column.querySelector('.l26-t9-result');
            if (resultBlock) {
                resultBlock.style.display = 'block';
            }
        });

        resArea.innerHTML = "<b>Отлично! Ты правильно подобрал общее начало для всех слов!</b>";
        resArea.style.color = "#27ae60";

        // Блокируем кнопку
        const btn = document.querySelector('.l26-t9-grid + .btn-box .orange-check-btn');
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'default';
        }
    } else {
        resArea.innerHTML = "<b>Есть ошибки. Проверь, правильно ли ты подобрал начало для каждого столбика.</b>";
        resArea.style.color = "#e67e22";
    }
}