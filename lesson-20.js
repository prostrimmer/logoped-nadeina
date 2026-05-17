/**
 * Проверка Задания 1 (Факт заполнения всех 10 полей ввода)
 */
function checkTask1() {
    // Находим все поля ввода внутри первого задания
    const inputs = document.querySelectorAll('.l20-t1-input');
    // Находим область вывода итогового текста результата
    const resArea = document.getElementById('res-20-1');
    // Флаг успешности проверки (изначально считаем, что всё заполнено)
    let allFilled = true;

    inputs.forEach(input => {
        // Проверяем, что в поле введено хотя бы 3 символа (исключая случайные пробелы)
        if (input.value.trim().length >= 3) {
            input.classList.add('filled');
            input.style.borderColor = "#27ae60"; // Подсвечиваем рамку зеленым цветом
        } else {
            allFilled = false;                  // Сбрасываем флаг успеха, если нашли пустое поле
            input.classList.remove('filled');
            input.style.borderColor = "#e74c3c"; // Окрашиваем пропущенное поле в красный цвет
        }
    });

    // Выводим общий вердикт для ребенка
    if (allFilled) {
        resArea.innerHTML = "<b>Отлично! Все предложения успешно записаны! Ты супер-исполнитель!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Пожалуйста, составь и запиши предложения во все пустые поля.</b>";
        resArea.style.color = "#e67e22";
    }
}

/** Задание 2
 * Логика "дорисовывания" предмета (только визуальный эффект)
 */
function drawHalf(cardElement) {
    cardElement.classList.add('completed');
}

/**
 * Финальная проверка по кнопке для Задания 2
 */
function checkTask2() {
    const totalItems = document.querySelectorAll('.l20-t2-art-item').length-2;
    const completedItems = document.querySelectorAll('.l20-t2-art-item.completed').length;
    const resArea = document.getElementById('res-20-2');

    if (totalItems === completedItems) {
        resArea.innerHTML = "<b>Превосходно! Ты помог Цоколочке дорисовать все 10 картинок!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Вы посмотри внимательнее! Некоторые картинки ещё не дорисованы.</b>";
        resArea.style.color = "#e67e22";
    }
}
/** задание 3 */
let l20T3FirstSelected = null; // Хранилище для первой выбранной карточки (любой стороны)

/**
 * Управление свободными кликами по карточкам портретов (любой порядок выбора)
 */
function clickL20T3Card(cardElement) {
    // Если карточка уже находится в успешной паре, игнорируем любые клики по ней
    if (cardElement.classList.contains('matched')) return;

    // Шаг 1: Если это первый клик (или повторный клик по той же карте для отмены выбора)
    if (!l20T3FirstSelected) {
        cardElement.classList.add('selected'); // Окрашиваем рамку в желтый цвет
        l20T3FirstSelected = cardElement;       // Запоминаем как первую карту
        return;
    }

    // Если ребенок кликнул второй раз по той же самой карточке — отменяем выбор
    if (l20T3FirstSelected === cardElement) {
        cardElement.classList.remove('selected'); // Снимаем желтую подсветку
        l20T3FirstSelected = null;                // Очищаем буфер
        return;
    }

    // Шаг 2: Ребенок кликнул по второй карточке для создания пары
    const firstId = l20T3FirstSelected.dataset.id; // Сюжет первой карты (например, "singers")
    const secondId = cardElement.dataset.id;       // Сюжет второй карты
    const firstSide = l20T3FirstSelected.dataset.side; // Сторона первой карты (left/right)
    const secondSide = cardElement.dataset.side;       // Сторона второй карты

    // Защита: пара должна состоять из одной левой и одной правой карточки
    if (firstSide !== secondSide && firstId === secondId) {
        // УСПЕХ: Карточки из разных колонок и их сюжетные ID совпали!
        l20T3FirstSelected.classList.add('matched');
        cardElement.classList.add('matched');

        // Меняем цвет рамок с желтого на специфический цвет пары по условию задания
        l20T3FirstSelected.classList.add(`match-${firstId}`);
        cardElement.classList.add(`match-${secondId}`);

        // Снимаем временный желтый класс выделения
        l20T3FirstSelected.classList.remove('selected');
        l20T3FirstSelected = null; // Очищаем буфер для следующей пары
    } else {
        // ОШИБКА: Сюжеты не совпали (или кликнули две карточки на одной стороне)
        // Мягко сбрасываем желтое выделение с первой карточки, давая продолжить игру
        l20T3FirstSelected.classList.remove('selected');
        l20T3FirstSelected = null; // Сбрасываем буфер выбора
    }
}

/**
 * Проверка Задания 3 по кнопке
 */
function checkTask3() {
    const totalCards = document.querySelectorAll('.l20-t3-card').length;
    const matchedCards = document.querySelectorAll('.l20-t3-card.matched').length;
    const resArea = document.getElementById('res-20-3');

    if (totalCards === matchedCards) {
        resArea.innerHTML = "<b>Браво! Вся портретная галерея успешно объединена по сюжетам!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Не все портреты нашли свои пары. Попробуй ещё раз!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Проверка Задания 4 (факт заполнения всех 4-х полей домиков)
 */
function checkTask4() {
    // Находим все поля ввода текстовых строк под домиками
    const inputs = document.querySelectorAll('.l20-t4-input');
    // Находим область вывода финального сообщения результата
    const resArea = document.getElementById('res-20-4');
    // Флаг успешности проверки (изначально считаем, что всё в порядке)
    let allFilled = true;

    inputs.forEach(input => {
        // Ребенок должен вписать слова (проверяем длину строки, исключая пробелы)
        if (input.value.trim().length >= 4) {
            input.classList.add('filled');
            input.style.borderColor = "#27ae60"; // Подсвечиваем рамку зеленым цветом успеха
        } else {
            allFilled = false;                  // Сбрасываем флаг, если поле пустое или слишком короткое
            input.classList.remove('filled');
            input.style.borderColor = "#e74c3c"; // Окрашиваем пропущенный инпут в красный цвет
        }
    });

    // Выводим итоговый вердикт
    if (allFilled) {
        resArea.innerHTML = "<b>Отлично! Все гости и жители домиков успешно записаны!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Пожалуйста, запиши названия жителей под каждым домиком.</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Подтверждение выполнения Задания 5 (устное прохождение лабиринта)
 */
function checkTask5() {
    // Находим область вывода итогового текста над кнопкой
    const resArea = document.getElementById('res-20-5');
    
    // Выводим мгновенную устную похвалу, так как интерактивной сверки тут нет
    resArea.innerHTML = "<b>Прекрасно! Ты помог принцу добраться до принцессы и чётко назвал все слова!</b>";
    resArea.style.color = "#27ae60"; // Окрашиваем текст похвалы в зеленый цвет успеха
}

/**
 * Подтверждение выполнения Задания 6 (устное прохождение лабиринта 3)
 */
function checkTask6() {
    // Находим текстовую область вывода финального результата
    const resArea = document.getElementById('res-20-6');
    
    // Выводим моментальное сообщение об успехе, так как проверка сугубо устная
    resArea.innerHTML = "<b>Отлично! Ты успешно прошёл весь лабиринт и выполнил все устные задания!</b>";
    resArea.style.color = "#27ae60"; // Красим текст итоговой похвалы в зеленый цвет успеха
}

/**
 * Подтверждение выполнения Задания 7 (устное прохождение лабиринта 4)
 */
function checkTask7() {
    // Находим текстовую область вывода финального результата
    const resArea = document.getElementById('res-20-7');
    
    // Выводим моментальное сообщение об успехе, так как проверка сугубо устная
    resArea.innerHTML = "<b>Замечательно! Ты правильно соединил все половинки слов в лабиринте!</b>";
    resArea.style.color = "#27ae60"; // Красим текст итоговой похвалы в зеленый цвет успеха
}

let l20T8CurrentSelected = null; // Буфер для хранения первой выбранной карточки (слово или картинка)

/**
 * Логика абсолютно свободного сопоставления слов и картинок в Задании 8
 */
function clickL20T8(element) {
    // Если элемент уже находится в угаданной паре, полностью игнорируем клики
    if (element.classList.contains('matched')) return;

    // Шаг 1: Если это первый выбор элемента в раунде
    if (!l20T8CurrentSelected) {
        element.classList.add('selected'); // Включаем желтую подсветку рамки
        l20T8CurrentSelected = element;    // Сохраняем элемент в буфер проверки
        return;
    }

    // Если ребенок повторно нажал на ту же самую карточку — просто снимаем выделение
    if (l20T8CurrentSelected === element) {
        element.classList.remove('selected');
        l20T8CurrentSelected = null;
        return;
    }

    // Шаг 2: Проверка совместимости при выборе второго элемента
    const firstMatchId = l20T8CurrentSelected.dataset.match; // ID привязки первого элемента (например, "tsarskoye")
    const secondMatchId = element.dataset.match;             // ID привязки второго элемента

    // Защита от сопоставления карточек одного типа (слово со словом или картинка с картинкой)
    const isDifferentType = l20T8CurrentSelected.className !== element.className;

    if (isDifferentType && firstMatchId === secondMatchId) {
        // УСПЕХ: Типы элементов разные и их грамматические ключи совпали!
        l20T8CurrentSelected.classList.add('matched');
        element.classList.add('matched');

        // Снимаем временную желтую рамку выделения
        l20T8CurrentSelected.classList.remove('selected');
        l20T8CurrentSelected = null; // Зануляем буфер для сборки следующей пары
    } else {
        // ОШИБКА: Грамматические пары не совпали (или выбраны элементы одной колонки)
        // Мягко сбрасываем желтую подсветку с первого элемента и даем играть дальше
        l20T8CurrentSelected.classList.remove('selected');
        l20T8CurrentSelected = null; // Сбрасываем буфер выбора
    }
}

/**
 * Финальная верификация Задания 8 по кнопке с заменой баннера сказки
 */
function checkTask8() {
    const totalCards = document.querySelectorAll('.l20-t8-word-card').length + document.querySelectorAll('.l20-t8-img-card').length;
    const matchedCards = document.querySelectorAll('.l20-t8-word-card.matched, .l20-t8-img-card.matched').length;
    const resArea = document.getElementById('res-20-8');
    const imgElement = document.getElementById('l20-t8-hero-img');

    // Проверяем, что все 16 карточек (8 слов + 8 картинок) успешно собраны в пары
    if (matchedCards >= 16) {
        resArea.innerHTML = "<b>Потрясающе! Иван-царевич расколдовал Царевну! Все слова согласованы верно!</b>";
        resArea.style.color = "#27ae60";

        // Если баннер ещё не превратился в свадьбу, запускаем плавную замену картинки
        if (!imgElement.src.includes('Царевич-9-2.jpeg')) {
            imgElement.style.opacity = 0; // Плавное затухание болота

            setTimeout(() => {
                imgElement.src = 'images/Царевич-9-2.jpeg'; // Смена кадра на свадьбу
                imgElement.alt = 'Праздничный пир во дворце';
                imgElement.style.opacity = 1;               // Плавное появление праздника
            }, 400);
        }
    } else {
        resArea.innerHTML = "<b>Лягушка ещё не расколдована. Соедини все слова с картинками!</b>";
        resArea.style.color = "#e67e22";
    }
}


// Регистрируем автопереход по клеточкам кроссворда при загрузке документа
document.addEventListener("DOMContentLoaded", () => {
    initL20CrosswordAutoTab();
});

/**
 * Логика автоматического перемещения курсора в следующую ячейку при вводе буквы
 */
function initL20CrosswordAutoTab() {
    const rows = document.querySelectorAll('.l20-t9-row');
    
    rows.forEach(row => {
        // Находим все ячейки ввода внутри текущей строки
        const cells = row.querySelectorAll('.l20-t9-cell');
        
        cells.forEach((cell, index) => {
            cell.addEventListener('input', (e) => {
                // Принудительно переводим введенный ребенком символ в верхний регистр
                cell.value = cell.value.toUpperCase();
                
                // Если ячейка заполнена и впереди есть следующая ячейка — переводим на неё фокус
                if (cell.value.length === 1 && index < cells.length - 1) {
                    cells[index + 1].focus();
                }
            });

            // Добавляем поддержку клавиши Backspace для удаления буквы и шага назад
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && cell.value.length === 0 && index > 0) {
                    cells[index - 1].focus();
                }
            });
        });
    });
}

/**
 * Проверка правильности заполнения Кроссворда (Задание 9)
 */
function checkTask9() {
    const rows = document.querySelectorAll('.l20-t9-row');
    const resArea = document.getElementById('res-20-9');
    let allCrosswordCorrect = true;

    rows.forEach(row => {
        const correctWord = row.dataset.word; // Правильное слово из атрибута (например, "ЦЫГАН")
        const cells = row.querySelectorAll('.l20-t9-cell');
        let userWord = '';

        // Собираем буквы текущей строки в единое слово
        cells.forEach(cell => {
            userWord += cell.value.trim().toUpperCase();
        });

        // Сверяем слово ребенка с правильным вариантом
        if (userWord === correctWord) {
            row.classList.add('success'); // Подсвечиваем всю строчку зеленым при успехе
            cells.forEach(cell => cell.style.borderColor = "#27ae60");
        } else {
            allCrosswordCorrect = false;
            row.classList.remove('success');
            
            // Если слово неверно, подсвечиваем пустые или ошибочные ячейки красным
            cells.forEach(cell => {
                if (cell.value.trim() === '') {
                    cell.style.borderColor = '#e74c3c';
                }
            });
        }
    });

    // Выносим итоговый вердикт для ребенка
    if (allCrosswordCorrect) {
        resArea.innerHTML = "<b>Великолепно! Ты разгадал весь кроссворд без единой ошибки! Ты настоящий знаток!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>В кроссворде есть ошибки или пустые клетки. Посмотри на картинки внимательнее!</b>";
        resArea.style.color = "#e67e22";
    }
}