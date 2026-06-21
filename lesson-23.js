
/*** Логика урока 23 */
function clickL23T1(element) {
    // Переключаем класс выбора
    element.classList.toggle('selected');
}

function checkL23Task1() {
    const words = document.querySelectorAll('.l23-t1-word');
    const resArea = document.getElementById('res-23-1');
    let isAllCorrect = true;

    words.forEach(word => {
        const shouldBeSelected = word.dataset.hasBoth === "true";
        const isSelected = word.classList.contains('selected');

        if (shouldBeSelected !== isSelected) {
            isAllCorrect = false;
            // Подсветим ошибки красным, если выбрали лишнее или пропустили нужное
            if (isSelected && !shouldBeSelected) word.classList.add('error');
        }
    });

    if (isAllCorrect) {
        resArea.innerHTML = "<b>Отлично! Все слова с обоими звуками найдены верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Проверьте внимательнее, не все слова выбраны верно!</b>";
        resArea.style.color = "#e67e22";
    }
}

/* ЗАДАНИЕ 2: ЛОГИКА ПРОВЕРКИ БУКВ */
function checkL23Task2() {
    const inputs = document.querySelectorAll('.l23-t2-input'); // Ищем все поля ввода
    const resArea = document.getElementById('res-23-2');      // Место вывода результата
    let allCorrect = true;                                     // Флаг для проверки всех слов

    inputs.forEach(input => {                                  // Перебираем каждое поле
        const val = input.value.trim().toLowerCase();          // Берем значение из поля
        if (val === input.dataset.answer) {                    // Сравниваем с эталоном
            input.className = 'l23-t2-input correct';          // Если верно - класс успеха
        } else {
            input.className = 'l23-t2-input wrong';            // Если нет - класс ошибки
            allCorrect = false;                                // Отмечаем, что есть ошибка
        }
    });

    resArea.innerHTML = allCorrect ?                           // Условие для текста результата
        "<b>Молодец! Все буквы расставлены верно!</b>" : 
        "<b>Есть ошибки, проверь внимательно!</b>";           // Текст ошибки
    resArea.style.color = allCorrect ? "#27ae60" : "#e67e22";  // Цветовой индикатор
}

/* ЗАДАНИЕ 4: ЖЕСТКАЯ ЛОГИКА DRAG-AND-DROP */
function dragWord(ev) { 
    // Запоминаем ID объекта
    ev.dataTransfer.setData("text", ev.target.id); 
}

function allowDrop(ev) { 
    // Разрешаем браузеру принять объект
    ev.preventDefault(); 
}

function dropWord(ev) {
    ev.preventDefault();
    const imgId = ev.dataTransfer.getData("text");
    const imgEl = document.getElementById(imgId);
    
    // Ищем целевой слот
    const slot = ev.target.closest('.l23-t4-slot');
    
    // Проверяем: совпадает ли data-len картинки и слота
    if (slot && imgEl.dataset.len === slot.dataset.len) {
        // Прячем оригинал в пуле (но не удаляем, чтобы не ломать структуру)
        imgEl.style.visibility = 'hidden'; 
        
        // Клонируем картинку для вставки в сетку
        const clone = imgEl.cloneNode(true);
        clone.style.visibility = 'visible';
        clone.style.cursor = 'default';
        clone.style.margin = '0';
        
        // Очищаем слот и вставляем
        slot.appendChild(clone);

        // Добавляем текстовую подпись
        const labelArea = slot.parentElement.querySelector('.l23-t4-label');
        labelArea.textContent = imgEl.querySelector('img').alt; 
    }
}

function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function allowDrop(ev) { ev.preventDefault(); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedEl = document.getElementById(data);
    const targetSlot = ev.target.closest('.l23-t4-slot');

    if (targetSlot && draggedEl.dataset.len === targetSlot.dataset.len) {
        // Клонируем элемент, чтобы оригинал остался в пуле (если нужно) или просто перемещаем
        targetSlot.appendChild(draggedEl);
    }
}

/* ЗАДАНИЕ №5: ЛОГИКА ПРОВЕРКИ ВСТАВЛЕННЫХ СЛОВ */
function checkL23Task5() {                      /* Функция вызывается по нажатию кнопки */
    const inputs = document.querySelectorAll('.l23-t5-input'); // Собираем все инпуты задания
    const resArea = document.getElementById('res-23-5');      // Ищем блок для результата
    let allCorrect = true;                                    // Флаг для отслеживания всех ответов

    inputs.forEach(input => {                   /* Перебираем каждый инпут по очереди */
        const userVal = input.value.trim().toLowerCase(); // Получаем значение, убирая лишнее
        const correct = input.dataset.answer;           // Получаем верный ответ из data-атрибута

        if (userVal === correct) {              /* Если введенный текст равен эталону */
            input.classList.add('correct');     /* Добавляем класс с зеленым цветом */
        } else {
            input.classList.add('wrong');       /* Если не равен - добавляем класс с красным */
            allCorrect = false;                 // Помечаем, что есть ошибка
        }
    });

    resArea.innerHTML = allCorrect ?            /* Выводим результат в блок */
        "<b>Молодец! Всё правильно!</b>" : 
        "<b>Есть ошибки, проверь внимательно!</b>";
    resArea.style.color = allCorrect ? "#27ae60" : "#e67e22"; // Цвет сообщения в зависимости от успеха
}

/* ЗАДАНИЕ №6: ЛОГИКА ПЕРЕКЛЮЧЕНИЯ И ПРОВЕРКИ */

function showSecondImage() {                    /* Функция кнопки "ГОТОВ" */
    document.getElementById('img-step-1').style.display = 'none';  // Скрываем первое фото
    document.getElementById('img-step-2').style.display = 'block'; // Показываем второе
    document.getElementById('btn-ready-box').style.display = 'none'; // Убираем кнопку
    document.getElementById('l23-t6-workspace').style.display = 'flex'; // Показываем вопросы
}

function checkL23Task6() {                      /* Функция проверки ответов */
    const ansS = document.getElementById('ans-s'); // Получаем инпут звука С
    const ansZ = document.getElementById('ans-z'); // Получаем инпут звука З
    const ansC = document.getElementById('ans-c'); // Получаем инпут звука Ц
    const resArea = document.getElementById('res-23-6'); // Блок результата

    // Эталонные значения (С=2, З=2, Ц=1)
    let allCorrect = true;                      // Флаг для всех ответов

    if (ansS.value.trim() === "2") { ansS.classList.add('correct'); } else { ansS.classList.add('wrong'); allCorrect = false; }
    if (ansZ.value.trim() === "2") { ansZ.classList.add('correct'); } else { ansZ.classList.add('wrong'); allCorrect = false; }
    if (ansC.value.trim() === "1") { ansC.classList.add('correct'); } else { ansC.classList.add('wrong'); allCorrect = false; }

    resArea.innerHTML = allCorrect ?            // Вывод текста результата
        "<b>Верно! Ты молодец!</b>" : 
        "<b>Попробуй посчитать ещё раз!</b>";
    resArea.style.color = allCorrect ? "#27ae60" : "#dc3545"; // Цвет текста
}

/* ЗАДАНИЕ №7: ЛОГИКА ПРОВЕРКИ ОТВЕТОВ */
function checkL23Task7() {                      /* Функция проверки */
    const inputs = document.querySelectorAll('.l23-t7-input'); // Выбираем все поля ввода
    const resArea = document.getElementById('res-23-7');      // Место вывода результата
    let allCorrect = true;                                    // Флаг успешности всех ответов

    inputs.forEach(input => {                   /* Перебираем каждый вопрос */
        const userVal = input.value.trim().toLowerCase(); // Получаем значение, убирая пробелы
        const correct = input.dataset.answer;           // Получаем эталон из атрибута

        if (userVal === correct) {              /* Сравниваем ввод с эталоном */
            input.classList.add('correct');     /* Если верно - красим в зеленый */
        } else {
            input.classList.add('wrong');       /* Если ошибка - красим в красный */
            allCorrect = false;                 // Устанавливаем флаг ошибки
        }
    });

    resArea.innerHTML = allCorrect ?            // Вывод сообщения результата
        "<b>Молодец! Ты отлично ответил на вопросы!</b>" : 
        "<b>Проверь свои ответы еще раз!</b>";
    resArea.style.color = allCorrect ? "#27ae60" : "#e67e22"; // Цвет сообщения
}

/* ЗАДАНИЕ №8: ЛОГИКА ПРОВЕРКИ ИСПАНИИ */
function checkL23Task8() {                      /* Запуск проверки по нажатию */
    const inputs = document.querySelectorAll('.l23-t8-input'); // Собираем все инпуты
    const resArea = document.getElementById('res-23-8');      // Блок вывода сообщения
    let allCorrect = true;                                    // Флаг успеха

    inputs.forEach(input => {                   /* Цикл по всем вопросам */
        const userVal = input.value.trim().toLowerCase(); // Значение ребенка
        const correct = input.dataset.answer;           // Эталонный ответ

        if (userVal === correct) {              /* Проверка совпадения */
            input.classList.add('correct');     /* Зеленый если верно */
        } else {
            input.classList.add('wrong');       /* Красный если нет */
            allCorrect = false;                 // Сбрасываем флаг
        }
    });

    resArea.innerHTML = allCorrect ?            /* Вывод результата */
        "<b>Молодец! Ты отлично всё запомнил!</b>" : 
        "<b>Есть ошибки, давай ещё раз!</b>";
    resArea.style.color = allCorrect ? "#27ae60" : "#e67e22"; // Цвет сообщения
}

/* ЗАДАНИЕ 9: ЛОГИКА ПРОВЕРКИ */
function checkCrossword() {
    // Собираем все поля, в которые ребенок вписывает буквы (исключая ось З/Ц)
    const cells = document.querySelectorAll('.cell:not(.fixed)'); 
    let allCorrect = true;                                     // Флаг успешного решения

    cells.forEach(cell => {                                    // Проверяем каждую ячейку
        const userAnswer = cell.value.trim().toLowerCase();    // Ответ ребенка (в нижний регистр)
        const correctAnswer = cell.dataset.answer;             // Эталонный ответ (из HTML)

        if (userAnswer === correctAnswer && userAnswer !== "") {
            cell.classList.add('correct');                     // Если совпало - красим в зеленый
            cell.classList.remove('wrong');                    // Убираем красный, если был
        } else {
            cell.classList.add('wrong');                       // Если ошибка или пусто - красим в красный
            cell.classList.remove('correct');                  // Убираем зеленый, если был
            allCorrect = false;                                // Кроссворд решен не полностью
        }
    });

    // Выводим финальное сообщение
    const resArea = document.getElementById('res-23-9');
    if (allCorrect) {
        resArea.innerHTML = "<b>Молодец! Ты отлично разгадал весь кроссворд!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки или пустые клеточки. Проверь внимательно!</b>";
        resArea.style.color = "#e67e22";
    }
}
