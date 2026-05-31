
/*** Логика свободного сопоставления загадок и картинок в Задании 1 */
/**
 * НАДЕЖНЫЙ ИНТЕРФЕЙС DRAG AND DROP ДЛЯ ЗАДАНИЯ 1
 */
function dragL22T1(ev) {
    // currentTarget гарантированно берет ID элемента l22-t1-img-card, а не вложенного тега img
    ev.dataTransfer.setData("text/plain", ev.currentTarget.id);
}

function allowL22T1Drop(ev) {
    ev.preventDefault();
}

function dropL22T1(ev) {
    ev.preventDefault();
    
    const data = ev.dataTransfer.getData("text/plain");
    const draggedCard = document.getElementById(data);
    
    if (!draggedCard) return;

    // Ищем родительскую карточку скороговорки
    let targetCard = ev.target.closest('.l22-t1-text-card');

    // Если картинку вернули в правый желтый пул
    if (ev.target.closest('.l22-t1-images-pool') || ev.target.id === 'l22-t1-pool') {
        document.getElementById('l22-t1-pool').appendChild(draggedCard);
        return;
    }

    if (targetCard) {
        const textMatchId = targetCard.dataset.match;
        const imgMatchId = draggedCard.dataset.match;

        // Проверка на правильность пары по ТЗ
        if (textMatchId === imgMatchId) {
            targetCard.querySelector('.l22-t1-drop-slot').appendChild(draggedCard);
            targetCard.classList.add('matched'); // Контур плашки меняется на зеленый
            draggedCard.setAttribute('draggable', 'false'); // Фиксируем элемент
        } else {
            // Если неправильно — картинка возвращается обратно в пул и не затаскивается
            document.getElementById('l22-t1-pool').appendChild(draggedCard);
        }
    }
}

/**
 * Валидация Задания 1 по кнопке проверки
 */
function checkL22Task1() {
    const totalCards = document.querySelectorAll('.l22-t1-text-card').length;
    const matchedCards = document.querySelectorAll('.l22-t1-text-card.matched').length;
    const resArea = document.getElementById('res-22-1');

    if (totalCards === matchedCards) {
        resArea.innerHTML = "<b>Великолепно! Все чистоговорки соединены с картинками абсолютно верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Не все картинки нашли свои чистоговорки. Попробуй перетащить оставшиеся!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Валидация Задания 2 (Проверка буквенных отгадок в игре «Доскажи словечко»)
 */
function checkL22Task2() {
    const inputs = document.querySelectorAll('.l22-t2-input');
    const resArea = document.getElementById('res-22-2');
    let allRiddlesCorrect = true;

    inputs.forEach(input => {
        const userWord = input.value.trim().toLowerCase(); // Очищаем от случайных пробелов и переводим в нижний регистр
        const expectedRoot = input.dataset.answer;          // Извлекаем проверочный корень (например, "заяц", "цыплят")

        // Сверяем ответ ребенка по вхождению корня (чтобы засчитать формы вроде "цыплята", "цирк", "в цирке")
        if (userWord.length > 0 && userWord.includes(expectedRoot)) {
            input.classList.add('correct-field');
            input.style.borderColor = "#27ae60"; // Зеленый контур успеха
        } else {
            allRiddlesCorrect = false;
            input.classList.remove('correct-field');
            input.style.borderColor = "#e74c3c"; // Красный контур ошибки
        }
    });

    // Выносим итоговый вердикт задания
    if (allRiddlesCorrect) {
        resArea.innerHTML = "<b>Браво! Все рифмы подобраны верно, а словечки досказаны без ошибок!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Кое-где рифма потерялась или окошко осталось пустым. Попробуй ещё раз!</b>";
        resArea.style.color = "#e67e22";
    }
}

let l22T3IsRingSelected = false; 

/**
 * Логика выбора инструмента-кольца
 */
function selectL22T3Ring() {
    const ringTool = document.getElementById('l22-t3-ring-tool');
    l22T3IsRingSelected = !l22T3IsRingSelected;

    if (l22T3IsRingSelected) {
        ringTool.classList.add('active-tool');
    } else {
        ringTool.classList.remove('active-tool');
    }
}

/**
 * Логика клика по руке и подмены изображения
 */
function clickL22T3Hand(element) {
    if (!l22T3IsRingSelected) return;
    
    const side = element.dataset.side;
    const status = element.dataset.status;
    const imgNode = element.querySelector('img');

    // Снятие кольца при повторном клике
    if (status === 'done') {
        if (side === 'right') {
            imgNode.src = 'images/hand-right.png';
            imgNode.alt = 'Правая рука';
        } else {
            imgNode.src = 'images/hand-left.png';
            imgNode.alt = 'Левая рука';
        }
        element.dataset.status = 'empty';
        element.classList.remove('has-ring');
        return;
    }

    // Надевание кольца
    if (side === 'right') {
        imgNode.src = 'images/hand-right-ring.png';
        imgNode.alt = 'Правая рука с кольцом на указательном пальце';
    } else if (side === 'left') {
        imgNode.src = 'images/hand-left-ring.png';
        imgNode.alt = 'Левая рука с кольцом на мизинце';
    }

    element.dataset.status = 'done';
    element.classList.add('has-ring');
}

/**
 * Валидация Задания 3
 */
function checkL22Task3() {
    const totalHands = document.querySelectorAll('.l22-t3-hand-card').length;
    const doneHands = document.querySelectorAll('.l22-t3-hand-card[data-status="done"]').length;
    const resArea = document.getElementById('res-22-3');

    if (totalHands === doneHands) {
        resArea.innerHTML = "<b>Потрясающе! Все пальчики украшены кольцами абсолютно правильно! Ты отличный ювелир!</b>";
        resArea.style.color = "#27ae60";
        
        l22T3IsRingSelected = false;
        document.getElementById('l22-t3-ring-tool').classList.remove('active-tool');
    } else {
        const leftCount = totalHands - doneHands;
        resArea.innerHTML = "<b>Ещё остались пустые ручки (нужно украсить ещё: " + leftCount + "). Надень на них кольца!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * ЛОГИКА ДЛЯ ЗАДАНИЯ 4: СКЛЕЙ БЛЮДЦА (DRAG & DROP)
 */
function shuffleL22T4Shards() {
    const container = document.getElementById('l22-t4-shards-container');
    if (!container) return;
    const cards = Array.from(container.children);
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => container.appendChild(card));
}

function dragL22T4Shard(ev) {
    // Надежно передаем ID контейнера осколка l22-t4-shard-card
    ev.dataTransfer.setData("text/plain", ev.currentTarget.id);
}

function allowL22T4Drop(ev) {
    ev.preventDefault();
}

function dropL22T4Shard(ev) {
    ev.preventDefault();
    
    const data = ev.dataTransfer.getData("text/plain");
    const draggedShard = document.getElementById(data);
    
    if (!draggedShard) return;

    // Находим карточку тарелки-цели
    let targetPlate = ev.target.closest('.l22-t4-plate-card');

    if (targetPlate) {
        if (targetPlate.classList.contains('is-healed')) return;

        const plateId = targetPlate.dataset.id;
        const shardTargetId = draggedShard.dataset.target;
        const shardType = draggedShard.dataset.type;

        // Если пара совпала верно и осколок не обманка
        if (plateId === shardTargetId && shardType === 'correct') {
            const imgNode = targetPlate.querySelector('img');
            imgNode.src = 'images/lesson-22-4-plate.png'; 
            imgNode.alt = 'Склеенное целое блюдце';

            targetPlate.classList.add('is-healed'); 
            targetPlate.dataset.status = 'healed';

            // Удаляем успешно перетащенный осколок с поля
            draggedShard.remove();
        }
    }
}

/**
 * Валидация Задания 4 по кнопке проверки
 */
function checkL22Task4() {
    const totalPlates = document.querySelectorAll('.l22-t4-plate-card').length;
    const healedPlates = document.querySelectorAll('.l22-t4-plate-card.is-healed').length;
    const resArea = document.getElementById('res-22-4');

    if (!resArea) return;

    if (totalPlates === healedPlates) {
        resArea.innerHTML = "<b>Потрясающе! Все разбитые блюдца склеены абсолютно правильно! Цоколочка очень рада!</b>";
        resArea.style.color = "#27ae60";
    } else {
        const leftCount = totalPlates - healedPlates;
        resArea.innerHTML = "<b>Ещё не вся посуда целая (осталось склеить блюдец: " + leftCount + "). Продолжай подбирать осколки!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * ЛОГИКА ДЛЯ ЗАДАНИЯ 5: КОМУ ЧТО НУЖНО (ГОРИЗОНТАЛЬНЫЙ DRAG & DROP)
 */
function dragL22T5(ev) {
    // Безопасно сохраняем ID перетаскиваемой карточки предмета
    ev.dataTransfer.setData("text/plain", ev.currentTarget.id);
}

function allowL22T5Drop(ev) {
    ev.preventDefault();
}

function dropL22T5(ev) {
    ev.preventDefault();
    
    const data = ev.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(data);
    
    if (!draggedItem) return;

    // Находим целевую вертикальную карточку профессии
    let targetProfCard = ev.target.closest('.l22-t5-prof-card');

    // Если передумали и вернули предмет обратно в нижний желтый пул
    if (ev.target.closest('.l22-t5-items-horiz-pool') || ev.target.id === 'l22-t5-pool') {
        document.getElementById('l22-t5-pool').appendChild(draggedItem);
        return;
    }

    if (targetProfCard) {
        // Если на эту профессию уже успешно сбросили элемент — игнорируем новые сбросы
        if (targetProfCard.classList.contains('matched')) return;

        const profMatchId = targetProfCard.dataset.match; 
        const itemMatchId = draggedItem.dataset.match;     

        // Если пара совпала верно по ТЗ
        if (profMatchId === itemMatchId) {
            targetProfCard.querySelector('.l22-t5-drop-slot').appendChild(draggedItem);
            targetProfCard.classList.add('matched'); // Окрашиваем карточку в зеленый цвет
            draggedItem.setAttribute('draggable', 'false'); // Запрещаем вытаскивать обратно
        } else {
            // Если неправильно — принудительно возвращаем предмет обратно на нижний перрон
            document.getElementById('l22-t5-pool').appendChild(draggedItem);
        }
    }
}

/**
 * Валидация Задания 5 по кнопке проверки
 */
function checkL22Task5() {
    const totalCards = document.querySelectorAll('.l22-t5-prof-card').length;
    const matchedCards = document.querySelectorAll('.l22-t5-prof-card.matched').length;
    const resArea = document.getElementById('res-22-5');

    if (!resArea) return;

    if (totalCards === matchedCards) {
        resArea.innerHTML = "<b>Отлично! Все профессии соединены с предметами абсолютно верно! Не забудь повторить фразы вслух.</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Ещё не все нашли свои предметы. Попробуй перетащить оставшиеся картинки!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * ВАЛИДАЦИЯ ЗАДАНИЯ 6: РАСШИФРУЙ СЛОВА
 */
function checkL22Task6() {
    const inputs = document.querySelectorAll('.l22-t6-input');
    const resArea = document.getElementById('res-22-6');
    let allLettersCorrect = true;

    if (!resArea) return;

    inputs.forEach(input => {
        // Очищаем введённый символ от пробелов и переводим в нижний регистр
        const userLetter = input.value.trim().toLowerCase();
        const expectedLetter = input.dataset.letter;

        // Сверяем букву с эталоном
        if (userLetter === expectedLetter) {
            input.classList.add('correct-field');
            input.style.borderColor = "#27ae60"; // Стабильный зелёный цвет успеха
        } else {
            allLettersCorrect = false;
            input.classList.remove('correct-field');
            input.style.borderColor = "#e74c3c"; // Красный контур ошибки
        }
    });

    // Выносим итоговый вердикт задания
    if (allLettersCorrect) {
        resArea.innerHTML = "<b>Отлично! Все слова расшифрованы совершенно верно! Ты настоящий детектив!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Некоторые буквы введены неверно или окошки остались пустыми. Перепроверишь?</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * ВАЛИДАЦИЯ ЗАДАНИЯ 6: РАСШИФРУЙ СЛОВА (ПОЛНАЯ НА 4 СЛОВА)
 */
function checkL22Task6() {
    // Выбираем все текстовые поля ввода букв в шестом задании
    const inputs = document.querySelectorAll('.l22-t6-input');
    // Находим область вывода итогового сообщения для шестого задания
    const resArea = document.getElementById('res-22-6');
    // Флаг общей успешности проверки (изначально считаем, что всё верно)
    let allLettersCorrect = true;

    // Если элемент для вывода результата отсутствует на странице, выходим из функции
    if (!resArea) return;

    // Перебираем каждое окошко ввода буквы в цикле
    inputs.forEach(input => {
        // Очищаем введённый символ от случайных пробелов и переводим в нижний регистр
        const userLetter = input.value.trim().toLowerCase();
        // Извлекаем эталонную правильную букву из дата-атрибута элемента
        const expectedLetter = input.dataset.letter;

        // Сверяем символ, который ввёл ребёнок, с проверочным эталоном
        if (userLetter === expectedLetter) {
            // Если буква правильная, добавляем класс успешного зелёного оформления
            input.classList.add('correct-field');
            // Принудительно окрашиваем рамку ячейки в зелёный цвет успеха
            input.style.borderColor = "#27ae60";
        } else {
            // Если допущена ошибка или поле пустое, сбрасываем флаг успешности задания
            allLettersCorrect = false;
            // Удаляем класс зелёного оформления, если он там был
            input.classList.remove('correct-field');
            // Окрашиваем контур ошибочной ячейки в красный цвет
            input.style.borderColor = "#e74c3c";
        }
    });

    // Выносим итоговый вердикт по результатам проверки всех четырёх слов
    if (allLettersCorrect) {
        // Если ошибок нет — выводим зелёный поздравительный текст успеха
        resArea.innerHTML = "<b>Отлично! Все четыре слова расшифрованы совершенно верно! Ты потрясающий детектив!</b>";
        resArea.style.color = "#27ae60";
    } else {
        // Если есть пустые или ошибочные ячейки — выводим предупреждающий оранжевый текст
        resArea.innerHTML = "<b>Кое-где буквы введены неверно или окошки остались пустыми. Перепроверишь?</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * АВТОМАТИЧЕСКИЙ ПЕРЕНОС КУРСОРA (АВТОФОКУС) ПРИ НАБОРЕ БУКВ
 * Функция вешается на событие ввода 'input' во всех строках кроссворда задания 7
 */
document.addEventListener("DOMContentLoaded", () => {
    const crosswordRows = document.querySelectorAll('.l22-t7-row');
    
    crosswordRows.forEach(row => {
        const inputs = Array.from(row.querySelectorAll('.l22-t7-input'));
        
        inputs.forEach((input, index) => {
            // Вешаем обработчик на ввод символа в ячейку
            input.addEventListener('input', (e) => {
                // Если ячейка не пустая, ищем куда перевести фокус дальше
                if (input.value.length > 0) {
                    let nextIndex = index + 1;
                    
                    // Цикл ищет следующую ячейку, пропуская заблокированные буквы "Ц"
                    while (nextIndex < inputs.length) {
                        const nextInput = inputs[nextIndex];
                        
                        // Если ячейка доступна для ввода и не имеет класса static-letter
                        if (nextInput && !nextInput.classList.contains('static-letter')) {
                            nextInput.focus(); // Переносим курсор в эту клеточку
                            break; // Выходим из цикла поиска
                        }
                        nextIndex++; // Идём дальше, если наткнулись на заблокированную ячейку
                    }
                }
            });

            // ДОПОЛНИТЕЛЬНО: Перенос курсора назад при нажатии клавиши Backspace (удаление)
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value.length === 0) {
                    let prevIndex = index - 1;
                    
                    // Цикл ищет предыдущую доступную ячейку для стирания
                    while (prevIndex >= 0) {
                        const prevInput = inputs[prevIndex];
                        
                        if (prevInput && !prevInput.classList.contains('static-letter')) {
                            prevInput.focus(); // Возвращаем курсор назад
                            break;
                        }
                        prevIndex--; // Пропускаем заблокированные буквы "Ц" при движении назад
                    }
                }
            });
        });
    });
});

/**
 * ВАЛИДАЦИЯ ЗАДАНИЯ 7: КРОССВОРД-ЛЕСТНИЦА (БЕЗ ИЗМЕНЕНИЙ)
 */
function checkL22Task7() {
    // Получаем все строки кроссворда в задании 7
    const rows = document.querySelectorAll('.l22-t7-row');
    // Находим область вывода текстового сообщения результата
    const resArea = document.getElementById('res-22-7');
    // Общий флаг правильности решения всего кроссворда
    let allCrosswordCorrect = true;

    // Проверяем наличие блока для вывода текста на странице
    if (!resArea) return;

    // Перебираем каждую строку кроссворда в отдельности
    rows.forEach(row => {
        // Находим внутри текущей строки только те инпуты, которые заполняет ребенок
        const inputs = row.querySelectorAll('.l22-t7-input:not(.static-letter)');
        let rowCorrect = true;

        // Проверяем каждую букву, введенную пользователем
        inputs.forEach(input => {
            const userLetter = input.value.trim().toLowerCase();
            const expectedLetter = input.dataset.letter;

            // Если хотя бы одна буква не совпала или пустая
            if (userLetter !== expectedLetter) {
                rowCorrect = false;
            }
        });

        // Подсвечиваем или сбрасываем оформление строки по результатам проверки слова
        if (rowCorrect) {
            row.classList.add('correct-row'); // Добавляем класс успеха (зеленый ряд)
        } else {
            allCrosswordCorrect = false;
            row.classList.remove('correct-row'); // Убираем подсветку в случае ошибки
            
            // Красим рамки незавершенных инпутов в красный цвет для наглядности
            inputs.forEach(input => {
                const userLetter = input.value.trim().toLowerCase();
                const expectedLetter = input.dataset.letter;
                if (userLetter !== expectedLetter) {
                    input.style.borderColor = "#e74c3c";
                } else {
                    input.style.borderColor = "#27ae60";
                }
            });
        }
    });

    // Выносим окончательный вердикт задания 7
    if (allCrosswordCorrect) {
        resArea.innerHTML = "<b>Браво! Кроссворд-лестница заполнен абсолютно верно! Все слова разгаданы!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Некоторые строчки лестницы содержат ошибки или не заполнены. Попробуй ещё раз!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * ЛОГИКА ДЛЯ ЗАДАНИЯ 8: СЛОВА ПОДСКАЖУТ ЦИФРЫ (БЕСКОНЕЧНОЕ КЛОНИРОВАНИЕ)
 */
function dragL22T8Image(ev) {
    // Передаем ID исходной карточки-подсказки
    ev.dataTransfer.setData("text/plain", ev.currentTarget.id);
}

function allowL22T8Drop(ev) {
    ev.preventDefault();
}

function dropL22T8Image(ev) {
    ev.preventDefault();
    
    const data = ev.dataTransfer.getData("text/plain");
    const draggedImgCard = document.getElementById(data);
    
    if (!draggedImgCard) return;

    // Находим целевой слот в тексте
    let targetSlot = ev.target.closest('.l22-t8-drop-slot');

    if (targetSlot) {
        // Если в этом окошке уже горит зеленый успех — ничего не делаем
        if (targetSlot.classList.contains('matched')) return;

        const slotMatchId = targetSlot.dataset.match;      // Ожидаемое значение (например, "flowers")
        const imgMatchId = draggedImgCard.dataset.match;   // Значение притащенной карты (например, "flowers")

        // Если типы совпали
        if (slotMatchId === imgMatchId) {
            // Находим картинку внутри перетаскиваемой карточки, чтобы взять её src
            const sourceImg = draggedImgCard.querySelector('img');
            
            // Очищаем цифру внутри текстового слота
            targetSlot.textContent = "";
            
            // Создаем СОВЕРШЕННО НОВЫЙ элемент картинки внутри слота (оригинал внизу не трогаем)
            const newImg = document.createElement('img');
            newImg.src = sourceImg.src;
            newImg.alt = sourceImg.alt;
            newImg.style.maxWidth = "100%";
            newImg.style.maxHeight = "100%";
            newImg.style.objectFit = "contain";

            // Вставляем созданную картинку в текст и вешаем класс успеха
            targetSlot.appendChild(newImg);
            targetSlot.classList.add('matched');
        }
    }
}

/**
 * Валидация Задания 8 по кнопке проверки
 */
function checkL22Task8() {
    const totalSlots = document.querySelectorAll('.l22-t8-drop-slot').length;
    const matchedSlots = document.querySelectorAll('.l22-t8-drop-slot.matched').length;
    const resArea = document.getElementById('res-22-8');

    if (!resArea) return;

    if (totalSlots === matchedSlots) {
        resArea.innerHTML = "<b>Великолепно! Рассказ полностью расколдован, а все картинки на своих местах! Умничка!</b>";
        resArea.style.color = "#27ae60";
    } else {
        const leftCount = totalSlots - matchedSlots;
        resArea.innerHTML = "<b>В тексте ещё остались неразгаданные цифры (осталось заполнить окошек: " + leftCount + "). Перетащи картинки!</b>";
        resArea.style.color = "#e67e22";
    }
}