/*** Логика урока 32 */
/* =========================================================
   ЗАДАНИЕ 1: ЧТЕНИЕ СЛОГОВ И СЛОВ СО ЗВУКОМ [Щ]
   ========================================================= */

// Переключение статуса прочитанной строки при клике
function toggleL32T1Read(element) {
    // Переключаем класс выполнения строки
    element.classList.toggle('read');

    // Находим кружок-индикатор внутри строки
    const icon = element.querySelector('.l32-t1-check-icon');

    // Обновляем иконку: пустой кружок или зелёная галочка
    if (element.classList.contains('read')) {
        icon.textContent = '🟢';                      // Зелёный кружок выполненного чтения
    } else {
        icon.textContent = '⚪';                      // Белый кружок ожидания
    }
}

// Главная функция проверки задания 1
function checkL32Task1() {
    // Находим все интерактивные строки чтения в первом задании
    const allRows = document.querySelectorAll('.white-card:first-of-type [onclick*="toggleL32T1Read"]');
    // Находим блок для вывода сообщения ребёнку
    const resArea = document.getElementById('res-32-1');

    // Считаем, сколько строк ребёнок уже прочитал и отметил
    let readCount = 0;
    allRows.forEach(row => {
        if (row.classList.contains('read')) {
            readCount++;
        }
    });

    // Проверяем, прочитаны ли абсолютно все слоги и слова
    if (readCount === allRows.length) {
        resArea.innerHTML = "<b>Умничка! Все слоги и слова прочитаны чётко, звук [Щ] произнесён безупречно!</b>";
        resArea.style.color = "#27ae60";              // Зелёный цвет победы
    } else {
        resArea.innerHTML = `<b>Прочитано строк: ${readCount} из ${allRows.length}. Нажимай на строки по мере чтения, чтобы отметить всё!</b>`;
        resArea.style.color = "#e67e22";              // Оранжевый подсказывающий цвет
    }
}

/* =========================================================
   ЗАДАНИЕ 2: ПРОВЕРКА НАЗВАНИЙ КАРТИНОК СО ЗВУКОМ [Щ]
   ========================================================= */
function checkL32Task2() {
    // Находим карточку задания 2 на странице
    const card = document.querySelectorAll('.white-card')[1];
    // Получаем все поля ввода названий картинок внутри задания 2
    const inputs = card.querySelectorAll('.l32-t2-input');
    // Находим блок вывода текстового вердикта
    const resArea = document.getElementById('res-32-2');

    let allCorrect = true;                                     // Флаг: все ли картинки названы верно
    let allFilled = true;                                      // Флаг: заполнены ли все поля
    let correctCount = 0;                                      // Счетчик правильных ответов

    inputs.forEach(input => {
        // Очищаем введенное ребенком слово от пробелов и знаков препинания на концах, приводим к нижнему регистру
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Получаем список допустимых эталонов через разделитель |
        const allowedAnswers = input.dataset.answer.toLowerCase().split('|');

        // Сбрасываем классы предыдущей проверки
        input.classList.remove('correct', 'wrong');

        if (userAnswer === "") {
            allFilled = false;                                 // Поле пустое
            input.classList.add('wrong');                      // Подсвечиваем красным незаполненное поле
        } else if (allowedAnswers.includes(userAnswer)) {
            input.classList.add('correct');                    // Слово совпало с одним из эталонов — подсвечиваем зеленым
            correctCount++;
        } else {
            input.classList.add('wrong');                      // Допущена орфографическая ошибка или не то слово
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    // Формируем результат проверки
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все предметы названы! Заполни все поля под картинками!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый цвет предупреждения
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Превосходно! Все предметы названы абсолютно правильно!</b>";
        resArea.style.color = "#27ae60";                       // Зеленый цвет победы
    } else {
        resArea.innerHTML = `<b>Правильно названо предметов: ${correctCount} из ${inputs.length}. Проверь написание слов в красных рамках!</b>`;
        resArea.style.color = "#e67e22";                       // Оранжевый цвет подсказки
    }
}

/* =========================================================
   ЗАДАНИЕ 3: ПРОВЕРКА ИГРЫ «ЭХО» (СЛОВА-ПРИЗНАКИ)
   ========================================================= */
function checkL32Task3() {
    // Находим карточку задания 3
    const card = document.querySelectorAll('.white-card')[2];
    // Получаем все поля ввода задания 3
    const inputs = card.querySelectorAll('.l32-t3-input');
    // Получаем блок для вывода текста результата
    const resArea = document.getElementById('res-32-3');

    let allCorrect = true;                                     // Флаг: все ли слова правильные
    let allFilled = true;                                      // Флаг: заполнены ли все поля
    let correctCount = 0;                                      // Счетчик правильных ответов

    inputs.forEach(input => {
        // Очищаем введенное значение от пробелов и знаков препинания
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "");
        // Эталон ответа
        const correctAnswer = input.dataset.answer.toLowerCase();

        // Сброс предыдущей индикации
        input.classList.remove('correct', 'wrong');

        if (userAnswer === "") {
            allFilled = false;
            input.classList.add('wrong');                      // Красная рамка на пустом поле
        } else if (userAnswer === correctAnswer) {
            input.classList.add('correct');                    // Зеленая рамка правильного ответа
            correctCount++;
        } else {
            input.classList.add('wrong');                      // Красная рамка ошибки
            allCorrect = false;
        }
    });

    if (!allFilled) {
        resArea.innerHTML = "<b>Не все слова-признаки подобраны! Заполни все пустые поля!</b>";
        resArea.style.color = "#e67e22";
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Все слова-признаки подобраны и согласованы абсолютно верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = `<b>Верно подобрано: ${correctCount} из ${inputs.length}. Проверь слова в красных рамках!</b>`;
        resArea.style.color = "#e67e22";
    }
}

/* =========================================================
   ЗАДАНИЕ 4: ПРОВЕРКА СОСТАВЛЕНИЯ ПРЕДЛОЖЕНИЙ
   ========================================================= */
function checkL32Task4() {
    // Находим четвертую карточку на странице (white-card для Задания 4)
    const card = document.querySelectorAll('.white-card')[3];
    // Получаем все поля ввода внутри этого задания
    const inputs = card.querySelectorAll('.l32-t4-input');
    // Находим блок для вывода сообщения с результатом проверки
    const resArea = document.getElementById('res-32-4');

    let allCorrect = true;                                     // Флаг: все ли предложения верны
    let allFilled = true;                                      // Флаг: заполнены ли все 14 полей
    let correctCount = 0;                                      // Счетчик правильных ответов

    inputs.forEach(input => {
        // Очищаем ввод ребёнка: нижний регистр, убираем пробелы по краям, знаки препинания и заменяем ё на е для надежности
        const userAnswer = input.value.trim().toLowerCase().replace(/[.,!?;:]+$/, "").replace(/ё/g, "е");
        // Получаем массив эталонов, также заменяя ё на е
        const allowedAnswers = input.dataset.answer.toLowerCase().replace(/ё/g, "е").split('|');

        // Сбрасываем старые стили проверки
        input.classList.remove('correct', 'wrong');

        if (userAnswer === "") {
            allFilled = false;                                 // Поле не заполнено
            input.classList.add('wrong');                      // Подсвечиваем красным
        } else if (allowedAnswers.includes(userAnswer)) {
            input.classList.add('correct');                    // Ответ совпал с эталоном — зеленый цвет
            correctCount++;
        } else {
            input.classList.add('wrong');                      // Ответ с ошибкой — красный цвет
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    // Формируем сообщение с результатом
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все предложения составлены! Заполни все поля!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый цвет предупреждения
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Отлично! Все глаголы изменены правильно, предложения составлены без ошибок!</b>";
        resArea.style.color = "#27ae60";                       // Зеленый цвет успеха
    } else {
        resArea.innerHTML = `<b>Правильно составлено: ${correctCount} из ${inputs.length}. Проверь окончания глаголов в красных рамках!</b>`;
        resArea.style.color = "#e67e22";                       // Оранжевый цвет подсказки
    }
}

/* =========================================================
   ЗАДАНИЕ 5: ЛОГИКА УПРАЖНЕНИЯ «ВЕСЁЛЫЙ ПОЕЗД» (DRAG & DROP)
   ========================================================= */

// Хранилище HTML содержимого каждого пассажира для возможности возврата
const l32T5PassengersStore = {};

// Сохраняем исходные карточки пассажиров после загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
    const passengers = document.querySelectorAll('.l32-t5-passenger');
    passengers.forEach(p => {
        const id = p.dataset.id;
        l32T5PassengersStore[id] = p.outerHTML;        // Запоминаем исходный HTML блок пассажира
    });
});

// Событие начала перетаскивания пассажира
function dragPassenger32T5(ev) {
    const passengerEl = ev.target.closest('.l32-t5-passenger');
    if (!passengerEl) return;

    ev.dataTransfer.setData("passengerId", passengerEl.dataset.id);
    ev.dataTransfer.effectAllowed = "move";
}

// Разрешаем сброс над вагоном
function allowDrop32T5(ev) {
    ev.preventDefault();
    const wagon = ev.target.closest('.l32-t5-wagon');
    if (wagon) {
        wagon.classList.add('drag-over');             // Подсвечиваем вагон
    }
}

// Убираем подсветку вагона при уходе курсора
document.addEventListener('dragleave', function (ev) {
    const wagon = ev.target.closest('.l32-t5-wagon');
    if (wagon && !wagon.contains(ev.relatedTarget)) {
        wagon.classList.remove('drag-over');
    }
});

// Сброс пассажира на вагон
function dropPassenger32T5(ev) {
    ev.preventDefault();
    const wagon = ev.target.closest('.l32-t5-wagon');
    if (!wagon) return;
    wagon.classList.remove('drag-over');

    const passengerId = ev.dataTransfer.getData("passengerId");
    if (!passengerId) return;

    // Находим слот этого пассажира в сетке 3х3
    const slot = document.querySelector(`.l32-t5-slot[data-id="${passengerId}"]`);
    if (!slot) return;

    const wagonNum = wagon.dataset.wagon;             // Номер вагона: 1, 2, 3 или 4
    slot.dataset.chosenWagon = wagonNum;              // Записываем выбранный вагон в слот

    // Заменяем пассажира на картинку вагона с номером (vagon_1.png и т.д.)
    slot.innerHTML = `
        <div class="l32-t5-seated-badge" title="Нажми, чтобы вернуть пассажира">
            <img src="images/vagon_${wagonNum}.png" 
                 class="l32-t5-wagon-img" 
                 alt="Вагон ${wagonNum}" 
                 onerror="this.onerror=null; this.src='images/vagon_${wagonNum}.jpg'; this.onerror=function(){this.outerHTML='<span style=\\'font-size:2.4rem;\\'>🚃</span>';};">
            <span class="l32-t5-wagon-num-text">Вагон №${wagonNum}</span>
        </div>
    `;

    // Снимаем классы проверки
    slot.classList.remove('correct', 'wrong');
}

// Возврат пассажира обратно на платформу по клику на ячейку с вагоном
function returnPassenger32T5(slotElement) {
    // Если пассажир уже рассажен (есть выбранный вагон)
    if (slotElement.dataset.chosenWagon) {
        const id = slotElement.dataset.id;
        delete slotElement.dataset.chosenWagon;       // Сбрасываем выбор

        // Восстанавливаем исходную карточку пассажира из хранилища
        if (l32T5PassengersStore[id]) {
            slotElement.innerHTML = l32T5PassengersStore[id];
        }

        slotElement.classList.remove('correct', 'wrong');
    }
}

// Проверка правильности рассадки пассажиров по вагонам
function checkL32Task5() {
    const slots = document.querySelectorAll('.l32-t5-slot');
    const resArea = document.getElementById('res-32-5');

    let allPlaced = true;                              // Все ли пассажиры посажены в поезд
    let allCorrect = true;                             // Все ли сели в правильный вагон
    let correctCount = 0;                              // Счетчик правильных рассадок

    slots.forEach(slot => {
        const chosenWagon = slot.dataset.chosenWagon;  // Выбранный ребенком вагон
        const correctWagon = slot.dataset.correctWagon;// Правильный вагон по числу слогов

        slot.classList.remove('correct', 'wrong');

        if (!chosenWagon) {
            allPlaced = false;                         // Пассажир остался на платформе
            slot.classList.add('wrong');
        } else if (chosenWagon === correctWagon) {
            slot.classList.add('correct');             // Вагон выбран верно — зеленый
            correctCount++;
        } else {
            slot.classList.add('wrong');               // Ошибка в количестве слогов — красный
            allCorrect = false;
        }
    });

    // Формируем результат проверки
    if (!allPlaced) {
        resArea.innerHTML = "<b>Не все пассажиры сели в поезд! Перетащи всех пассажиров по их вагонам!</b>";
        resArea.style.color = "#e67e22";
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Ура! Поезд отправляется в путь! Все пассажиры заняли свои правильные вагоны!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = `<b>Верно заняли вагоны: ${correctCount} из ${slots.length}. Нажми на красные карточки, чтобы пересчитать слоги и рассадить верно!</b>`;
        resArea.style.color = "#e67e22";
    }
}

/* =========================================================
   ЗАДАНИЕ 6: ИГРА «ПУТАНИЦА» (АВТОПЕРЕХОД И ПРОВЕРКА БУКВ)
   ========================================================= */

// Навешиваем слушатели автоперехода по клеткам после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    // Находим все ряды клеточек задания 6
    const wordBoxes = document.querySelectorAll('.l32-t6-boxes');

    wordBoxes.forEach(box => {
        const inputs = Array.from(box.querySelectorAll('.l32-t6-input'));

        inputs.forEach((input, index) => {
            // Ввод буквы: фильтрация и автопереход в следующую клетку
            input.addEventListener('input', function () {
                // Оставляем только кириллицу и приводим к нижнему регистру
                this.value = this.value.replace(/[^а-яё]/gi, '').toLowerCase();

                // Снимаем классы проверки при редактировании
                this.classList.remove('correct', 'wrong');

                // Если буква введена — автоматически фокусируемся на следующей клетке этого слова
                if (this.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                    inputs[index + 1].select();
                }
            });

            // Навигация клавишами стрелок и Backspace
            input.addEventListener('keydown', function (e) {
                // Backspace на пустой клетке возвращает курсор в предыдущую клетку
                if (e.key === 'Backspace' && this.value === '' && index > 0) {
                    inputs[index - 1].focus();
                    inputs[index - 1].select();
                }
                // Стрелка влево
                if (e.key === 'ArrowLeft' && index > 0) {
                    inputs[index - 1].focus();
                }
                // Стрелка вправо
                if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // При клике или фокусе сразу выделяем текущую букву для легкой замены
            input.addEventListener('focus', function () {
                this.select();
            });
        });
    });
});

// Проверка задания 6
function checkL32Task6() {
    // Находим шестую карточку на странице
    const card = document.querySelectorAll('.white-card')[5];
    // Получаем все клеточки внутри задания 6
    const inputs = card.querySelectorAll('.l32-t6-input');
    // Блок для вывода текстового сообщения
    const resArea = document.getElementById('res-32-6');

    let allCorrect = true;                                     // Флаг: все ли буквы верны
    let allFilled = true;                                      // Флаг: заполнены ли все клетки
    let correctCount = 0;                                      // Счетчик правильных букв

    inputs.forEach(input => {
        // Ответ ребенка (в нижнем регистре, с заменой ё на е для удобства)
        const userLetter = input.value.trim().toLowerCase().replace(/ё/g, 'е');
        // Эталонная буква из data-answer
        const correctLetter = input.dataset.answer.toLowerCase().replace(/ё/g, 'е');

        // Сбрасываем старые стили проверки
        input.classList.remove('correct', 'wrong');

        if (userLetter === "") {
            allFilled = false;                                 // Найдена пустая клетка
            input.classList.add('wrong');                      // Подсвечиваем красным
        } else if (userLetter === correctLetter) {
            input.classList.add('correct');                    // Буква верная — зеленый цвет
            correctCount++;
        } else {
            input.classList.add('wrong');                      // Буква неверная — красный цвет
            allCorrect = false;                                // Фиксируем ошибку
        }
    });

    // Формируем результат проверки
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все слова собраны! Заполни все клеточки буквами!</b>";
        resArea.style.color = "#e67e22";                       // Оранжевый предупреждающий цвет
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Браво! Вся путаница распутана, все слова составлены верно!</b>";
        resArea.style.color = "#27ae60";                       // Зеленый цвет победы
    } else {
        resArea.innerHTML = `<b>Верно вставлено букв: ${correctCount} из ${inputs.length}. Исправь буквы в красных клеточках!</b>`;
        resArea.style.color = "#e67e22";                       // Оранжевый цвет подсказки
    }
}

/* =========================================================
   ЗАДАНИЕ 7: ЛОГИКА ЛАБИРИНТА КОЩЕЯ (АВТОПЕРЕХОД И ПРОВЕРКА)
   ========================================================= */

// Навешиваем слушатели автоперехода по буквам слов задания 7
document.addEventListener('DOMContentLoaded', function () {
    const wordContainers = document.querySelectorAll('.l32-t7-answer-boxes');

    wordContainers.forEach(container => {
        const inputs = Array.from(container.querySelectorAll('.l32-t7-letter-input'));

        inputs.forEach((input, index) => {
            // Ввод буквы: очистка, кириллица и переход вперёд
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^а-яё]/gi, '').toLowerCase();
                this.classList.remove('correct', 'wrong');

                // Автопереход к следующей клетке слова
                if (this.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                    inputs[index + 1].select();
                }
            });

            // Навигация стрелками и клавишей Backspace
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && this.value === '' && index > 0) {
                    inputs[index - 1].focus();
                    inputs[index - 1].select();
                }
                if (e.key === 'ArrowLeft' && index > 0) {
                    inputs[index - 1].focus();
                }
                if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Выделение содержимого клетки при фокусе
            input.addEventListener('focus', function () {
                this.select();
            });
        });
    });
});

// Проверка выполнения задания 7
function checkL32Task7() {
    // Находим карточку задания 7 на странице
    const card = document.querySelectorAll('.white-card')[6];
    // Получаем все клеточки для букв слов
    const letterInputs = card.querySelectorAll('.l32-t7-letter-input');
    // Получаем поля для ввода предложений
    const sentenceInputs = card.querySelectorAll('.l32-t7-sentence-input');
    // Блок для вывода сообщения с результатом
    const resArea = document.getElementById('res-32-7');

    let allLettersCorrect = true;                              // Все ли буквы разгаданы верно
    let allLettersFilled = true;                               // Все ли клетки букв заполнены
    let correctLettersCount = 0;                               // Количество верных букв

    letterInputs.forEach(input => {
        const userLetter = input.value.trim().toLowerCase().replace(/ё/g, 'е');
        const correctLetter = input.dataset.answer.toLowerCase().replace(/ё/g, 'е');

        input.classList.remove('correct', 'wrong');

        if (userLetter === "") {
            allLettersFilled = false;
            input.classList.add('wrong');
        } else if (userLetter === correctLetter) {
            input.classList.add('correct');
            correctLettersCount++;
        } else {
            input.classList.add('wrong');
            allLettersCorrect = false;
        }
    });

    // Проверяем заполненность составленных предложений
    let allSentencesFilled = true;
    sentenceInputs.forEach(input => {
        const text = input.value.trim();
        input.classList.remove('filled', 'empty');

        if (text.length >= 3) {
            input.classList.add('filled');
        } else {
            input.classList.add('empty');
            allSentencesFilled = false;
        }
    });

    // Формируем итоговый результат проверки
    if (!allLettersFilled) {
        resArea.innerHTML = "<b>Не все буквы в словах разгаданы! Пройди по лабиринту и заполни все клеточки!</b>";
        resArea.style.color = "#e67e22";
    } else if (!allLettersCorrect) {
        resArea.innerHTML = `<b>Верно разгадано букв: ${correctLettersCount} из ${letterInputs.length}. Проверь ходы в красных клеточках!</b>`;
        resArea.style.color = "#e67e22";
    } else if (!allSentencesFilled) {
        resArea.innerHTML = "<b>Слова «ГОНЩИК» и «ЗАЩИТА» разгаданы верно! Теперь составь с ними предложения внизу!</b>";
        resArea.style.color = "#e67e22";
    } else {
        resArea.innerHTML = "<b>Отлично! Лабиринт Кощея пройден, слова разгаданы и предложения составлены правильно!</b>";
        resArea.style.color = "#27ae60";
    }
}

/* =========================================================
   ЗАДАНИЕ 8: ЛОГИКА РЕБУСОВ «СОБЕРИ СЛОВО» (АВТОПЕРЕХОД И ПРОВЕРКА)
   ========================================================= */

// Навешиваем слушатели автоперехода по клеточкам букв каждого слова
document.addEventListener('DOMContentLoaded', function () {
    const wordRows = document.querySelectorAll('.l32-t8-word-row');

    wordRows.forEach(row => {
        const inputs = Array.from(row.querySelectorAll('.l32-t8-input'));

        inputs.forEach((input, index) => {
            // Ввод буквы: очистка, кириллица и переход вперёд
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^а-яё]/gi, '').toLowerCase();
                this.classList.remove('correct', 'wrong');

                // Автопереход к следующей клеточке этого слова
                if (this.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                    inputs[index + 1].select();
                }
            });

            // Навигация стрелками и клавишей Backspace
            input.addEventListener('keydown', function (e) {
                // Backspace на пустой клетке возвращает курсор назад
                if (e.key === 'Backspace' && this.value === '' && index > 0) {
                    inputs[index - 1].focus();
                    inputs[index - 1].select();
                }
                // Стрелка влево
                if (e.key === 'ArrowLeft' && index > 0) {
                    inputs[index - 1].focus();
                }
                // Стрелка вправо
                if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Выделение текущей буквы при фокусе
            input.addEventListener('focus', function () {
                this.select();
            });
        });
    });
});

// Проверка выполнения восьмого задания
function checkL32Task8() {
    // Находим карточку задания 8 на странице
    const card = document.querySelectorAll('.white-card')[7];
    // Получаем все поля ввода букв внутри задания 8
    const inputs = card.querySelectorAll('.l32-t8-input');
    // Блок для вывода результата
    const resArea = document.getElementById('res-32-8');

    let allCorrect = true;                                     // Флаг: все ли буквы верны
    let allFilled = true;                                      // Флаг: заполнены ли все клеточки
    let correctCount = 0;                                      // Счетчик правильных букв

    inputs.forEach(input => {
        const userLetter = input.value.trim().toLowerCase().replace(/ё/g, 'е');
        const correctLetter = input.dataset.answer.toLowerCase().replace(/ё/g, 'е');

        input.classList.remove('correct', 'wrong');

        if (userLetter === "") {
            allFilled = false;
            input.classList.add('wrong');
        } else if (userLetter === correctLetter) {
            input.classList.add('correct');
            correctCount++;
        } else {
            input.classList.add('wrong');
            allCorrect = false;
        }
    });

    // Формируем результат проверки для ребёнка
    if (!allFilled) {
        resArea.innerHTML = "<b>Не все слова разгаданы! Назови все картинки и заполни клеточки!</b>";
        resArea.style.color = "#e67e22";
    } else if (allCorrect) {
        resArea.innerHTML = "<b>Браво! Все слова «ЩИТ», «КЛЕЩИ», «ЩЕКОТКА» и «ЖЕНЩИНА» разгаданы правильно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = `<b>Верно отгадано букв: ${correctCount} из ${inputs.length}. Подумай, на какой звук начинаются картинки над красными клетками!</b>`;
        resArea.style.color = "#e67e22";
    }
}

/* =========================================================
   ЗАДАНИЕ 9: ПРОВЕРКА УПРАЖНЕНИЯ «ВОЛШЕБНАЯ ДОРОЖКА»
   ========================================================= */
function checkL32Task9() {
    // Находим карточку задания 9 на странице
    const card = document.querySelectorAll('.white-card')[8];
    // Получаем все 5 полей ввода предложений
    const inputs = card.querySelectorAll('.l32-t9-sentence-input');
    // Блок для вывода текста результата
    const resArea = document.getElementById('res-32-9');

    let allFilled = true;                              // Все ли 5 предложений составлены
    let filledCount = 0;                               // Количество заполненных полей

    inputs.forEach(input => {
        const text = input.value.trim();               // Очищаем текст от лишних пробелов по краям

        // Сбрасываем предыдущие стили проверки
        input.classList.remove('filled', 'empty');

        // Проверяем, что в поле написано полноценное предложение (не менее 3 символов)
        if (text.length >= 3) {
            input.classList.add('filled');             // Подсвечиваем зеленым
            filledCount++;
        } else {
            input.classList.add('empty');              // Пустое поле подсвечиваем красным
            allFilled = false;
        }
    });

    // Формируем результат проверки
    if (allFilled) {
        resArea.innerHTML = "<b>Замечательно! Все 5 предложений со словами из волшебной дорожки составлены! Ящерица добралась до пещеры!</b>";
        resArea.style.color = "#27ae60";               // Зеленый цвет успеха
    } else {
        resArea.innerHTML = `<b>Составлено предложений: ${filledCount} из ${inputs.length}. Напиши предложения во всех пяти строчках!</b>`;
        resArea.style.color = "#e67e22";               // Оранжевый предупреждающий цвет
    }
}
