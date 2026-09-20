/*** Логика урока 29 */
/* =========================================
   ЗАДАНИЕ 1: ЛОГИКА ИНТЕРАКТИВНЫХ СЛОГОВ
   ========================================= */

// Функция переключения состояния строки слогов (прочитано / не прочитано)
function toggleL29Row(rowElement) {
    // Переключаем класс 'completed' для элемента строки
    rowElement.classList.toggle('completed');

    // Проверяем общий прогресс задания
    checkL29Task1Progress();
}

// Функция проверки: все ли ряды слогов отмечены ребенком
function checkL29Task1Progress() {
    // Находим все строки слогов в первом задании
    const allRows = document.querySelectorAll('.l29-t1-row');
    // Находим строки, которые уже отмечены как прочитанные
    const completedRows = document.querySelectorAll('.l29-t1-row.completed');
    // Находим блок для вывода текста результата
    const resArea = document.getElementById('res-29-1');

    // Если количество прочитанных строк равно общему количеству
    if (completedRows.length === allRows.length) {
        resArea.innerHTML = "<b>Молодец! Ты отлично прочитал все ряды слогов!</b>";
        resArea.style.color = "#27ae60"; // Зеленый цвет при полном выполнении
    } else {
        resArea.innerHTML = `Прочитано рядов: ${completedRows.length} из ${allRows.length}. Продолжай в том же духе!`;
        resArea.style.color = "#2980b9"; // Синий цвет при процессе чтения
    }
}


/* =========================================
   ЗАДАНИЕ 2: ЛОГИКА ПРОВЕРКИ ИГРЫ "ПУТАНИЦА"
   ========================================= */

// Функция проверки заполненности предложений по нажатию на кнопку
function checkL29Task2() {
    // Находим все интерактивные поля ввода в задании
    const inputs = document.querySelectorAll('.l29-t2-input[data-required="true"]');
    // Находим блок для вывода текста результатов
    const resArea = document.getElementById('res-29-2');
    
    // Флаг успешности проверки
    let allCorrect = true;

    // Перебираем каждое поле ввода
    inputs.forEach(input => {
        // Получаем введенный текст и убираем пробелы по краям
        const userAnswer = input.value.trim();

        // Проверяем, что поле заполнено (текст не пустой)
        if (userAnswer !== "") {
            input.classList.add('correct');    // Подсвечиваем зеленым
            input.classList.remove('wrong');   // Убираем красный класс
        } else {
            input.classList.add('wrong');      // Подсвечиваем красным, если поле пустое
            input.classList.remove('correct'); // Убираем зеленый класс
            allCorrect = false;                // Фиксируем недочет
        }
    });

    // Выводим итоговое сообщение ребенку
    if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Ты составил все предложения из путаницы! Отличная работа!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при успехе
    } else {
        resArea.innerHTML = "<b>Остались пустые поля. Составь предложения для всех строк!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет при наличии незаполненных строк
    }
}

/* =========================================
   ЗАДАНИЕ 3: ЛОГИКА DRAG-AND-DROP (УЧЕТ 8 ТЕНЕЙ И ЛИШНИХ ПРЕДМЕТОВ)
   ========================================= */

// Переменная для хранения ID перетаскиваемого элемента
let draggedItemId = null;

// Событие начала перетаскивания цветной картинки
function dragItem(event) {
    draggedItemId = event.target.dataset.id; // Запоминаем ID перетаскиваемого предмета
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Разрешаем сброс элемента в целевую зону тени
function allowDrop(event) {
    event.preventDefault();
}

// Событие сброса цветной картинки на зону тени
function dropItem(event) {
    event.preventDefault();
    
    // Находим ближайший блок зоны сброса (dropzone)
    let dropzone = event.target.closest('.l29-t3-dropzone');
    if (!dropzone) return;

    let targetId = dropzone.dataset.id; // Получаем ID тени

    // Проверяем, не пытается ли ребенок сбросить лишний предмет (9 или 10)
    if (draggedItemId === "9" || draggedItemId === "10") {
        alert("Этот предмет — лишний! Для него нет тени, так как в его названии нет звука [ч].");
        return;
    }

    // Проверяем совпадение ID перетаскиваемой картинки и тени
    if (draggedItemId === targetId) {
        let draggedElement = document.getElementById(`item-${draggedItemId}`);
        
        if (draggedElement) {
            // Вставляем цветную картинку внутрь зоны сброса поверх тени
            dropzone.appendChild(draggedElement);
            
            // Отключаем дальнейшее перетаскивание для успешно размещенной картинки
            draggedElement.removeAttribute('draggable');
            draggedElement.style.cursor = 'default';
            draggedElement.style.borderColor = '#27ae60'; // Зеленая рамка успеха

            // Изменяем стиль зоны сброса и делаем видимым текстовое название для чтения
            dropzone.style.borderColor = '#27ae60';
            dropzone.style.backgroundColor = '#f0fff4';
            dropzone.classList.add('matched');
        }
    } else {
        alert("Эта картинка не подходит к данной тени! Попробуй еще раз.");
    }
}

// Функция проверки выполнения задания
function checkL29Task3() {
    // Находим все зоны сброса (всего 8 теней)
    const dropzones = document.querySelectorAll('.l29-t3-dropzone');
    // Находим успешно сопоставленные элементы
    const matchedZones = document.querySelectorAll('.l29-t3-dropzone.matched');
    // Блок для вывода результата
    const resArea = document.getElementById('res-29-3');

    // Проверяем, все ли 8 пар сопоставлены
    if (matchedZones.length === dropzones.length) {
        resArea.innerHTML = "<b>Великолепно! Все 8 пар с тенями собраны, слова прочитаны, а лишние предметы (груша и лиса) найдены!</b>";
        resArea.style.color = "#27ae60"; // Зеленый цвет при победе
    } else {
        resArea.innerHTML = `Собрано пар с тенями: ${matchedZones.length} из ${dropzones.length}. Продолжай!`;
        resArea.style.color = "#e67e22"; // Оранжевый цвет при неполном выполнении
    }
}

/* =========================================
   ЗАДАНИЕ 4: ЛОГИКА ПРОВЕРКИ ПРЕДЛОЖЕНИЙ
   ========================================= */

// Функция проверки правильности заполненных предложений
function checkL29Task4() {
    // Находим все интерактивные поля ввода в четвертом задании
    const inputs = document.querySelectorAll('.l29-t4-input.interactive');
    // Находим блок для вывода результатов
    const resArea = document.getElementById('res-29-4');
    
    // Флаг успешности проверки
    let allCorrect = true;

    // Перебираем каждое поле ввода
    inputs.forEach(input => {
        // Получаем введенный текст, приводим к нижнему регистру, убираем лишние пробелы и знаки на конце
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Получаем эталонный ответ из атрибута data-answer
        const correctAnswer = input.dataset.answer;

        // Проверяем совпадение текста с эталоном
        if (userAnswer === correctAnswer && userAnswer !== "") {
            input.classList.add('correct');    // Зеленая рамка при совпадении
            input.classList.remove('wrong');   // Убираем красный класс
        } else {
            input.classList.add('wrong');      // Красная рамка при ошибке или пустоте
            input.classList.remove('correct'); // Убираем зеленый класс
            allCorrect = false;                // Фиксируем ошибку
        }
    });

    // Выводим итоговое сообщение ребенку
    if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Все предложения закончены абсолютно верно! Отличная работа!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при успехе
    } else {
        resArea.innerHTML = "<b>В некоторых окончаниях есть ошибки или пропуски. Проверь и исправь их!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет при наличии ошибок
    }
}


/* =========================================
   ЗАДАНИЕ 5: ЛОГИКА ПРОВЕРКИ КРОССВОРДА
   ========================================= */

// Автоматический переход фокуса на следующий инпут при вводе буквы
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.l29-t5-cell');

    cells.forEach((cell, index) => {
        cell.addEventListener('input', () => {
            // Если введена буква и существует следующий инпут, переводим фокус туда
            if (cell.value.length === 1 && index < cells.length - 1) {
                cells[index + 1].focus();
            }
        });

        // Поддержка удаления (клавиша Backspace возвращает фокус на предыдущую ячейку)
        cell.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && cell.value === '' && index > 0) {
                cells[index - 1].focus();
            }
        });
    });
});

// Функция проверки правильности заполнения кроссворда
function checkL29Task5() {
    // Находим все ячейки ввода букв
    const cells = document.querySelectorAll('.l29-t5-cell');
    // Находим блок для вывода результатов
    const resArea = document.getElementById('res-29-5');
    
    // Флаг успешности
    let allCorrect = true;

    // Проверяем каждую ячейку кроссворда
    cells.forEach(cell => {
        // Получаем введенную букву в нижнем регистре
        const userLetter = cell.value.trim().toLowerCase();
        // Получаем правильный эталон из data-answer
        const correctLetter = cell.dataset.answer;

        // Сбрасываем старые стили
        cell.classList.remove('correct', 'wrong');

        if (userLetter === correctLetter && userLetter !== "") {
            cell.classList.add('correct'); // Зеленая подсветка правильной буквы
        } else {
            cell.classList.add('wrong');   // Красная подсветка при ошибке или пустоте
            allCorrect = false;            // Фиксируем ошибку
        }
    });

    // Выводим итоговое сообщение ребенку
    if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Кроссворд разгадан безупречно! Все слова на букву 'ч' на своих местах!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при победе
    } else {
        resArea.innerHTML = "<b>В кроссворде есть ошибки или незаполненные клеточки. Проверь слова по картинкам!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет при ошибках
    }
}


/* =========================================
   ЗАДАНИЕ 6: ЛОГИКА ПЕРЕШИВАНИЯ И ПРОВЕРКИ СЛОГОВ
   ========================================= */

// Переменные для отслеживания перетаскиваемого слога
let draggedSyllableId = null;
let draggedSyllableText = null;

// При загрузке страницы автоматически перемешиваем блоки нижнего ряда случайным образом
document.addEventListener('DOMContentLoaded', () => {
    const bottomContainer = document.getElementById('l29-bottom-syllables');
    if (bottomContainer) {
        // Превращаем дочерние элементы в массив и перемешиваем алгоритмом Фишера-Йетса
        let items = Array.from(bottomContainer.children);
        for (let i = items.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            bottomContainer.appendChild(items[j]); // Переставляем случайный элемент в конец
        }
    }
});

// Событие начала перетаскивания нижнего слога
function dragSyllable(event) {
    draggedSyllableId = event.target.id;
    draggedSyllableText = event.target.dataset.syllable;
    event.dataTransfer.setData("text/plain", draggedSyllableId);
}

// Разрешаем сброс в верхнюю зону
function allowDropSyllable(event) {
    event.preventDefault();
}

// Событие сброса слога на верхний блок
function dropSyllable(event) {
    event.preventDefault();

    // Находим целевую зону верхнего ряда
    let dropzone = event.target.closest('.l29-t6-dropzone');
    if (!dropzone) return;

    let requiredMatch = dropzone.dataset.match; // Какое окончание подходит к этому слогу
    let firstPart = dropzone.dataset.first;     // Первый слог

    // Проверяем, совпадает ли перетаскиваемый слог с правильным окончанием
    if (draggedSyllableText === requiredMatch) {
        let draggedElement = document.getElementById(draggedSyllableId);

        if (draggedElement) {
            // Удаляем перетаскиваемый блок из нижнего ряда
            draggedElement.remove();

            // Сливаем слоги вместе и пишем готовое слово вместо двух частей
            let fullWord = firstPart + draggedSyllableText;
            dropzone.innerHTML = fullWord;
            
            // Меняем стиль зоны на успешный зеленый
            dropzone.classList.add('success');
            
            // Отключаем дальнейшее перетаскивание в эту зону
            dropzone.removeAttribute('ondrop');
            dropzone.removeAttribute('ondragover');
        }
    } else {
        alert("Этот слог не подходит к данному началу! Поищи другое окончание.");
    }
}

/* Функция проверки выполнения задания по кнопке */
function checkL29Task6() {
    const dropzones = document.querySelectorAll('.l29-t6-dropzone');
    const successZones = document.querySelectorAll('.l29-t6-dropzone.success');
    const resArea = document.getElementById('res-29-6');

    // Проверяем, все ли слова составлены
    if (successZones.length === dropzones.length) {
        resArea.innerHTML = "<b>Ура! Все окончания найдены верно, слова составлены!</b>";
        resArea.style.color = "#27ae60"; // Зеленый цвет при победе
    } else {
        resArea.innerHTML = `Составлено слов: ${successZones.length} из ${dropzones.length}. Продолжай искать пары!`;
        resArea.style.color = "#e67e22"; // Оранжевый цвет при неполном выполнении
    }
}

/* =========================================
   ЗАДАНИЕ 7: ЛОГИКА ПРОВЕРКИ И ПРЕВРАЩЕНИЯ ЗАГАДОК В КАРТИНКИ
   ========================================= */

// Функция проверки отгадок и превращения карточек загадок в картинки
function checkL29Task7() {
    // Находим все карточки загадок в седьмом задании
    const cards = document.querySelectorAll('.l29-t7-riddle-card');
    // Находим блок для вывода результатов
    const resArea = document.getElementById('res-29-7');
    
    // Флаг успешности проверки
    let allCorrect = true;

    // Перебираем каждую карточку загадки
    cards.forEach(card => {
        const input = card.querySelector('.l29-t7-input');
        if (!input) return;

        // Получаем введенную отгадку, приводим к нижнему регистру, убираем пробелы и знаки препинания
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Получаем правильный эталон из атрибута data-answer инпута
        const correctAnswer = input.dataset.answer;
        // Получаем путь к картинке из атрибута data-image карточки
        const imageSrc = card.dataset.image;

        // Проверяем совпадение с эталоном
        if (userAnswer === correctAnswer && userAnswer !== "") {
            // Если ответ верный — превращаем карточку в картинку-отгадку!
            card.classList.add('revealed');                     // Добавляем класс красивого оформления
            card.innerHTML = `
                <div style="font-weight: bold; color: #27ae60; font-size: 0.95rem; margin-bottom: 4px;">Отгадка: ${correctAnswer}</div>
                <img src="${imageSrc}" class="l29-t7-answer-img" alt="${correctAnswer}">
            `; // Заменяем текст загадки и инпут на победную картинку и подпись
        } else {
            // Если ошибка или пусто — подсвечиваем инпут красным
            input.classList.add('wrong');
            allCorrect = false;
        }
    });

    // Выводим итоговое сообщение ребенку
    if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Все загадки отгаданы правильно, и появились картинки-отгадки!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при победе
    } else {
        resArea.innerHTML = "<b>Некоторые отгадки неверные или пропущены. Подумай еще раз над ошибками!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет при ошибках
    }
}

/* =========================================
   ЗАДАНИЕ 8: ЛОГИКА ПРОВЕРКИ ЗАПОЛНЕНИЯ ОТВЕТОВ
   ========================================= */

// Функция проверки: главное, чтобы ребенок написал что-то в форму ответа
function checkL29Task8() {
    // Находим все поля ввода в восьмом задании
    const inputs = document.querySelectorAll('.l28-t8-input');
    // Находим блок для вывода результатов
    const resArea = document.getElementById('res-29-8');
    
    // Флаг успешности
    let allFilled = true;

    // Перебираем каждое поле ввода
    inputs.forEach(input => {
        // Получаем текст ответа и убираем пробелы по краям
        const userText = input.value.trim();

        // Сбрасываем старые классы
        input.classList.remove('filled', 'empty');

        // Проверяем, что поле не пустое
        if (userText !== "") {
            input.classList.add('filled'); // Зеленая подсветка, если что-то написано
        } else {
            input.classList.add('empty');  // Красная подсветка, если поле осталось пустым
            allFilled = false;             // Фиксируем непроделенную форму
        }
    });

    // Выводим итоговое сообщение ребенку
    if (allFilled) {
        resArea.innerHTML = "<b>Отлично! На все вопросы даны ответы! Вы молодец!</b>";
        resArea.style.color = "#27ae60";       // Зеленый цвет при успехе
    } else {
        resArea.innerHTML = "<b>Остались пустые поля для ответов. Напиши ответы на все вопросы!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет, если есть пустые строки
    }
}

/* =========================================
   ЗАДАНИЕ 9: ЛОГИКА ПРОВЕРКИ ЗАПОЛНЕНИЯ ОТВЕТОВ
   ========================================= */

// Функция проверки: фиксируем, что на все вопросы даны письменные ответы
function checkL29Task9() {
    // Находим все поля ввода в девятом задании
    const inputs = document.querySelectorAll('.l29-t9-input');
    // Находим блок для вывода результатов
    const resArea = document.getElementById('res-29-9');
    
    // Флаг успешности
    let allFilled = true;

    // Перебираем каждое поле ввода
    inputs.forEach(input => {
        // Получаем текст ответа и убираем пробелы по краям
        const userText = input.value.trim();

        // Сбрасываем старые классы
        input.classList.remove('filled', 'empty');

        // Проверяем, что поле заполнено
        if (userText !== "") {
            input.classList.add('filled'); // Зеленая подсветка заполненного ответа
        } else {
            input.classList.add('empty');  // Красная подсветка пустого поля
            allFilled = false;             // Фиксируем незаполненный вопрос
        }
    });

    // Выводим итоговое сообщение ребенку
    if (allFilled) {
        resAnswerText = "<b>Великолепно! На все вопросы даны ответы! Урок успешно пройден!</b>";
        resArea.innerHTML = resAnswerText;
        resArea.style.color = "#27ae60";       // Зеленый цвет при успехе
    } else {
        resArea.innerHTML = "<b>Остались пустые поля для ответов. Ответь на все вопросы!</b>";
        resArea.style.color = "#e67e22";       // Оранжевый цвет, если есть пустые строки
    }
}


