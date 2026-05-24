let l21T1Buffer = null; // Хранилище для первой выбранной карточки (текст или картинка)

/**
 * Логика свободного сопоставления загадок и картинок в Задании 1
 */
function clickL21T1(element) {
    if (element.classList.contains('matched')) return;

    // Шаг 1: Если это первый клик по элементу в текущем раунде
    if (!l21T1Buffer) {
        element.classList.add('selected'); 
        l21T1Buffer = element;             
        return;
    }

    // Если ребенок кликнул на ту же самую карточку — отменяем выбор
    if (l21T1Buffer === element) {
        element.classList.remove('selected');
        l21T1Buffer = null;
        return;
    }

    // Шаг 2: Сверка ключей при клике по второй карточке
    const firstMatchId = l21T1Buffer.dataset.match; 
    const secondMatchId = element.dataset.match;    
    
    const isDifferentType = l21T1Buffer.className !== element.className;

    if (isDifferentType && firstMatchId === secondMatchId) {
        // УСПЕХ: Нашли верную пару!
        l21T1Buffer.classList.add('matched');
        element.classList.add('matched');

        // Определяем, какой из элементов является текстовой карточкой, и дописываем слово
        const textCard = l21T1Buffer.classList.contains('l21-t1-text-card') ? l21T1Buffer : element;
        const targetWord = textCard.dataset.word; // Достаем слово (например, "цветы")
        
        // Очищаем «... (что?)» или «...» и подставляем чистое красивое слово
        let baseText = textCard.querySelector('span').innerText;
        baseText = baseText.split('...')[0]; // Берем всё, что до троеточия
        textCard.querySelector('span').innerHTML = `${baseText} <b style="color: #27ae60;">${targetWord}</b>.`;

        l21T1Buffer.classList.remove('selected');
        l21T1Buffer = null;
    } else {
        // Ошибка сопоставления — сбрасываем желтый фокус
        l21T1Buffer.classList.remove('selected');
        l21T1Buffer = null;
    }
}

/**
 * Финальная верификация Задания 1 по кнопке
 */
function checkTask1() {
    const totalItems = document.querySelectorAll('.l21-t1-text-card').length + document.querySelectorAll('.l21-t1-img-card').length;
    const matchedItems = document.querySelectorAll('.l21-t1-text-card.matched, .l21-t1-img-card.matched').length;
    const resArea = document.getElementById('res-21-1');

    if (matchedItems >= totalItems) {
        resArea.innerHTML = "<b>Потрясающе! Все загадки Цоколочки разгаданы и дописаны абсолютно верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Не все отгадки найдены. Попробуй сопоставить карточки ещё раз!</b>";
        resArea.style.color = "#e67e22";
    }
}


let l21T2SelectedCard = null; // Буфер для хранения первой выбранной карточки зайца

/**
 * Логика абсолютно свободного сопоставления карточек-антонимов в Задании 2
 */
function clickL21T2(element) {
    // Если карточка уже находится в угаданной паре, полностью игнорируем клики
    if (element.classList.contains('matched')) return;

    // Шаг 1: Если это первый выбор карточки в раунде
    if (!l21T2SelectedCard) {
        element.classList.add('selected'); // Включаем синее выделение рамки
        l21T2SelectedCard = element;       // Сохраняем карточку в буфер проверки
        return;
    }

    // Если ребенок повторно нажал на ту же самую карточку — просто снимаем выделение
    if (l21T2SelectedCard === element) {
        element.classList.remove('selected');
        l21T2SelectedCard = null;
        return;
    }

    // Шаг 2: Проверка совместимости при выборе второй карточки противоположности
    const firstMatchId = l21T2SelectedCard.dataset.match; // Грамматический ID первой карты (например, "speed")
    const secondMatchId = element.dataset.match;         // ID второй карты
    const firstSide = l21T2SelectedCard.dataset.side;     // Сторона первой карты (left/right)
    const secondSide = element.dataset.side;             // Сторона второй карты

    // Защита: пара должна состоять строго из одной левой (Цуня) и одной правой (Януц) карточки
    if (firstSide !== secondSide && firstMatchId === secondMatchId) {
        // УСПЕХ: Карточки с разных колонок и их смысловые антонимы совпали!
        l21T2SelectedCard.classList.add('matched');
        element.classList.add('matched');

        // Снимаем временный синий класс выделения фокуса
        l21T2SelectedCard.classList.remove('selected');
        l21T2SelectedCard = null; // Зануляем буфер для сборки следующей пары противоположностей
    } else {
        // ОШИБКА: Пары не совпали (или кликнули две карточки внутри одной колонки)
        // Мягко снимаем синее выделение фокуса с первой карточки, давая продолжить игру
        l21T2SelectedCard.classList.remove('selected');
        l21T2SelectedCard = null; // Сбрасываем буфер выбора
    }
}

/**
 * Финальная верификация Задания 2 по кнопке
 */
function checkTask2() {
    // Всего карточек в игре: 4 у Цуни + 4 у Януца = 8 элементов
    const totalCards = document.querySelectorAll('.l21-t2-card').length;
    const matchedCards = document.querySelectorAll('.l21-t2-card.matched').length;
    const resArea = document.getElementById('res-21-2');

    if (totalCards === matchedCards) {
        resArea.innerHTML = "<b>Браво! Все противоположности найдены, а слова Цуни и Януца прочитаны верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Некоторые зайчата ещё не нашли свои пары-наоборот. Поищи внимательнее!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Проверка Задания 3 (Валидация буквенных отгадок в рифмах-чистоговорках)
 */
function checkTask3() {
    // Находим все прямоугольные окошки ввода отгадок в Задании 3
    const inputs = document.querySelectorAll('.l21-t3-box-input');
    // Находим область вывода финального текстового результата
    const resArea = document.getElementById('res-21-3');
    let allRhymesCorrect = true;

    inputs.forEach(input => {
        const userWord = input.value.trim().toLowerCase(); // Слово ребенка в нижнем регистре без пробелов
        const correctAnswer = input.dataset.answer;         // Эталонный ответ из атрибута (например, "кольцо")

        // Сверяем ответ (поддерживаем частичное совпадение корня для удобства детей)
        if (userWord === correctAnswer || userWord.includes(correctAnswer.substring(0, correctAnswer.length - 1))) {
            input.classList.add('correct');
            input.style.borderColor = "#27ae60"; // Окрашиваем рамку успешной ячейки в зеленый
        } else {
            allRhymesCorrect = false;
            input.classList.remove('correct');
            input.style.borderColor = "#e74c3c"; // Подсвечиваем ошибочное поле красным контуром
        }
    });

    // Выносим итоговый речевой вердикт
    if (allRhymesCorrect) {
        resArea.innerHTML = "<b>Потрясающе! Все рифмы-чистоговорки дописаны и проговорены абсолютно правильно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Кое-где рифма потерялась. Посмотри на картинки и попробуй ещё раз!</b>";
        resArea.style.color = "#e67e22";
    }
}


/**
 * Функции обеспечения продвинутого Drag and Drop интерфейса HTML5 поверх train.jpeg
 */
function dragL21T4(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowL21T4Drop(ev) {
    ev.preventDefault();
    // Визуальный эффект: подсвечиваем вагон золотистым при наведении
    if (ev.target.classList.contains('l21-t4-virtual-dropzone')) {
        ev.target.classList.add('dragover');
    }
}

// Снимаем подсветку вагона, когда карточку убрали из зоны, не сбрасывая
document.addEventListener("dragleave", function(event) {
    if (event.target.classList.contains('l21-t4-virtual-dropzone')) {
        event.target.classList.remove('dragover');
    }
});

function dropL21T4(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const card = document.getElementById(data);
    let target = ev.target;

    // Снимаем класс наведения dragover
    if (target.classList.contains('l21-t4-virtual-dropzone')) {
        target.classList.remove('dragover');
    }

    // Защита: если бросили на всадника/картинку внутри зоны, поднимаемся до самой зоны вагона
    if (!target.classList.contains('l21-t4-virtual-dropzone') && !target.classList.contains('l21-t4-passengers-grid')) {
        target = target.closest('.l21-t4-virtual-dropzone') || target.closest('.l21-t4-passengers-grid');
    }

    // Выполняем перемещение элемента в DOM-дереве
    if (target) {
        target.appendChild(card);
        // Сбрасываем серые/красные рамки, если ребенок перетащил карту в ходе новой попытки
        card.style.borderColor = "#bdc3c7";
    }
}

/**
 * Комплексная валидация Задания 4 (Сверка размещения пассажиров в виртуальных вагонах)
 */
function checkTask4() {
    const dropzones = document.querySelectorAll('.l21-t4-virtual-dropzone');
    const resArea = document.getElementById('res-21-4');
    let allTrainCorrect = true;

    // Сбрасываем старые стили проверки перед новой валидацией
    dropzones.forEach(zone => {
        zone.classList.remove('success-wagon', 'error-wagon');
    });

    // Валидация поезда
    dropzones.forEach(zone => {
        const wagonNumber = parseInt(zone.dataset.wagon); // Номер вагона (0 - паровоз, 1, 2, 3, 4)
        const insidePassengers = zone.querySelectorAll('.l21-t4-passenger-card');
        let zoneHasError = false;

        // Защита паровоза: в зоне 0 (паровоз) пассажиров быть не должно
        if (wagonNumber === 0 && insidePassengers.length > 0) {
            zoneHasError = true;
        }

        insidePassengers.forEach(card => {
            const targetWagon = parseInt(card.dataset.wagon); // Код правильного вагона для этой карты
            
            if (targetWagon !== wagonNumber) {
                zoneHasError = true;
                card.style.borderColor = "#e74c3c"; // Ошибочную мини-карточку красим в красный
            } else {
                card.style.borderColor = "#27ae60"; // Правильную мини-карточку красим в зеленый
            }
        });

        // Накладываем полупрозрачный цветовой фильтр на весь интерактивный вагон
        if (wagonNumber > 0) {
            if (zoneHasError) {
                zone.classList.add('error-wagon');
                allTrainCorrect = false;
            } else if (insidePassengers.length > 0) {
                zone.classList.add('success-wagon');
            }
        } else if (zoneHasError) {
            // Если посадили кого-то на паровоз
            zone.classList.add('error-wagon');
            allTrainCorrect = false;
        }
    });

    // Проверяем перрон: если кто-то остался на перроне, задание не завершено
    const leftOnPlatform = document.querySelectorAll('#l21-t4-source-zone .l21-t4-passenger-card').length;
    if (leftOnPlatform > 0) {
        allTrainCorrect = false;
    }

    // Выводим итоговый логопедический вердикт задания
    if (allTrainCorrect) {
        resArea.innerHTML = "<b>Потрясающе! Все пассажиры заняли свои вагоны абсолютно верно! Поезд отправляется!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Некоторые пассажиры остались на перроне или сели не в свой вагон. Посчитай окошки!</b>";
        resArea.style.color = "#e67e22";
    }
}


// Регистрируем автопереход по клеточками букв в ребусах сразу после загрузки документа
document.addEventListener("DOMContentLoaded", () => {
    initL21T5AutoTab();
});

/**
 * Умная логика автоматического переключения фокуса курсора при заполнении букв в ребусах
 */
function initL21T5AutoTab() {
    const blocks = document.querySelectorAll('.l21-t5-rebus-block');
    
    blocks.forEach(block => {
        const cells = block.querySelectorAll('.l21-t5-cell');
        
        cells.forEach((cell, index) => {
            cell.addEventListener('input', (e) => {
                // Автоматически переводим набранную ребенком букву в верхний регистр
                cell.value = cell.value.toUpperCase();
                
                // Если буква вписана и впереди есть следующий пустой квадратик — переводим фокус
                if (cell.value.length === 1 && index < cells.length - 1) {
                    cells[index + 1].focus();
                }
            });

            // Реализуем шаг назад при нажатии клавиши Backspace на пустой ячейке
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && cell.value.length === 0 && index > 0) {
                    cells[index - 1].focus();
                }
            });
        });
    });
}

/**
 * Комплексная проверка Задания 5 (Проверка разгаданных ребусов букв)
 */
function checkTask5() {
    const blocks = document.querySelectorAll('.l21-t5-rebus-block');
    const resArea = document.getElementById('res-21-5');
    let allRebusesCorrect = true;

    blocks.forEach(block => {
        const correctWord = block.dataset.word; // Правильное эталонное слово (ОТЕЦ / ОВЦЫ / ЦЕПИ)
        const cells = block.querySelectorAll('.l21-t5-cell');
        let userWord = '';

        // Собираем буквы текущего ряда в единую строчку
        cells.forEach(cell => {
            userWord += cell.value.trim().toUpperCase();
        });

        // Сверяем полученный результат с эталоном задания
        if (userWord === correctWord) {
            block.classList.add('success'); // Окрашиваем ячейки слова в зеленый цвет успеха через CSS
        } else {
            allRebusesCorrect = false;
            block.classList.remove('success');
            
            // Если допущена ошибка, подсвечиваем пустые или неверные квадратики красным контуром
            cells.forEach(cell => {
                if (cell.value.trim() === '') {
                    cell.style.borderColor = '#e74c3c';
                }
            });
        }
    });

    // Выводим финальный логопедический вердикт
    if (allRebusesCorrect) {
        resArea.innerHTML = "<b>Великолепно! Все озорные буквы пойманы, а слова расшифрованы абсолютно верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>В некоторых словах буквы запутались. Рассмотри контуры фигурок повнимательнее!</b>";
        resArea.style.color = "#e67e22";
    }
}



// Регистрируем автопереход по клеточкам букв в лабиринте Медведицы при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
    initL21T7AutoTab();
});

/**
 * Логика автоматического перемещения курсора в следующую ячейку слова при вводе буквы
 */
function initL21T7AutoTab() {
    const blocks = document.querySelectorAll('.l21-t7-word-block');
    
    blocks.forEach(block => {
        const cells = block.querySelectorAll('.l21-t7-cell');
        
        cells.forEach((cell, index) => {
            cell.addEventListener('input', (e) => {
                // Автоматически приводим набранную ребенком букву к верхнему регистру
                cell.value = cell.value.toUpperCase();
                
                // Если буква заполнена и впереди есть следующая ячейка — переводим на неё фокус
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
 * Верификация Задания 7 (Проверка слов лабиринта Медведицы)
 */
function checkTask7() {
    const blocks = document.querySelectorAll('.l21-t7-word-block');
    const resArea = document.getElementById('res-21-7');
    let allWordsCorrect = true;

    blocks.forEach(block => {
        const correctWord = block.dataset.word; // Правильное слово из атрибута (ЦВЕТОК / ИНДЕЕЦ)
        const cells = block.querySelectorAll('.l21-t7-cell');
        let userWord = '';

        // Склеиваем буквы, введенные ребенком в этой строке
        cells.forEach(cell => {
            userWord += cell.value.trim().toUpperCase();
        });

        // Сверяем полученное слово с эталоном
        if (userWord === correctWord) {
            block.classList.add('success'); // Подсвечиваем строку зеленым через CSS-класс
        } else {
            allWordsCorrect = false;
            block.classList.remove('success');
            
            // Если допущена ошибка, подсвечиваем пустые квадратики красным контуром
            cells.forEach(cell => {
                if (cell.value.trim() === '') {
                    cell.style.borderColor = '#e74c3c';
                }
            });
        }
    });

    // Выносим итоговый логопедический вердикт задания
    if (allWordsCorrect) {
        resArea.innerHTML = "<b>Великолепно! Ты правильно разгадал маршруты лабиринта и собрал оба слова!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>В словах есть ошибки или пустые клеточки. Пройди по шагам Медведицы ещё раз!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Логика Задания 8: Валидация слов и автоматическое переключение на lesson-21-8-2.jpeg
 */
function checkTask8() {
    const inputs = document.querySelectorAll('.l21-t8-word-input');
    const resArea = document.getElementById('res-21-8');
    const imgElement = document.getElementById('l21-t8-photo-img');

    // Набор проверочных логопедических корней для гибкой сверки ответов
    const validRoots = [
        "крыльц", "крылеч",
        "колодец", "колодц", "цеп",
        "куриц", "куроч", "цыпл",
        "перец", "перц", "огурц", "грядк",
        "цветник", "цвет",
        "овца", "овеч",
        "мотоцикл",
        "дворец", "дворц", "песок", "песч",
        "церков", "церкв"
    ];

    let correctCount = 0;
    let usedRoots = []; // Буфер защиты от повторного зачёта одного и того же корня

    inputs.forEach(input => {
        const value = input.value.trim().toLowerCase();
        
        if (value.length === 0) {
            input.style.borderColor = "#bdc3c7";
            input.classList.remove('correct-field');
            return;
        }

        let isMatchFound = false;

        for (let root of validRoots) {
            if (value.includes(root)) {
                if (!usedRoots.includes(root)) {
                    isMatchFound = true;
                    usedRoots.push(root);
                    break;
                }
            }
        }

        if (isMatchFound) {
            input.classList.add('correct-field');
            input.style.borderColor = "#27ae60";
            correctCount++;
        } else {
            input.classList.remove('correct-field');
            input.style.borderColor = "#e74c3c"; // Красный цвет при ошибке
        }
    });

    // Если все 8 строк заполнены уникальными правильными словами
    if (correctCount >= 8) {
        resArea.innerHTML = "<b>Великолепно! Все слова найдены абсолютно верно! Фотография Иришки стала цветной!</b>";
        resArea.style.color = "#27ae60";

        // Подгружаем цветную картинку-награду
        if (!imgElement.src.includes('lesson-21-8-2.jpeg')) {
            imgElement.style.opacity = 0; // Эффект затухания

            setTimeout(() => {
                imgElement.src = 'images/lesson-21-8-2.jpeg'; // Точное имя цветного файла
                imgElement.alt = 'Яркая цветная фотография Иришки';
                imgElement.style.opacity = 1;                     // Проявление сочных красок
            }, 400);
        }
    } else {
        resArea.innerHTML = "<b>Ты нашёл " + correctCount + " из 8 слов со звуком [Ц]. Продолжай поиски на фотографии!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Верификация Задания 9: Проверка факта заполнения полей развернутыми предложениями
 */
function checkTask9() {
    const inputs = document.querySelectorAll('.l21-t9-sentence-input');
    const resArea = document.getElementById('res-21-9');
    let allSentencesCorrect = true;

    inputs.forEach(input => {
        const value = input.value.trim(); // Очищаем текст от случайных пробелов по краям

        // Логопедический критерий: предложение должно быть длиннее 10 символов (не просто одно слово)
        if (value.length >= 10) {
            input.classList.add('success-sentence');
            input.style.borderColor = "#27ae60";
        } else {
            allSentencesCorrect = false;
            input.classList.remove('success-sentence');
            input.style.borderColor = "#e74c3c"; // Подсвечиваем пустые или короткие поля красным
        }
    });

    if (allSentencesCorrect) {
        resArea.innerHTML = "<b>Великолепно! Ты рассмотрел все картинки и записал замечательные предложения!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Пожалуйста, придумай более развёрнутые предложения для всех слов из картинок.</b>";
        resArea.style.color = "#e67e22";
    }
}