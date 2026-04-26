/* --- ЛОГИКА ЗАДАНИЯ №1 --- */

document.addEventListener('DOMContentLoaded', () => {
    const startBlocks = document.querySelectorAll('.start-block');
    const endBlocks = document.querySelectorAll('.end-block');

    // Назначаем события для блоков, которые можно тянуть
    startBlocks.forEach(block => {
        block.addEventListener('dragstart', (e) => {
            // Запоминаем, какой слог (зи или зе) мы начали тянуть
            e.dataTransfer.setData('text/plain', e.target.dataset.syllable);
        });
    });

    // Назначаем события для блоков-мишеней (окончаний)
    endBlocks.forEach(block => {
        // Разрешаем сброс элемента в эту область
        block.addEventListener('dragover', (e) => {
            e.preventDefault();
            block.classList.add('drag-over'); // Подсвечиваем мишень
        });

        // Убираем подсветку, если элемент увели в сторону
        block.addEventListener('dragleave', () => {
            block.classList.remove('drag-over');
        });

        // Обработка самого момента "броска" слога на окончание
        block.addEventListener('drop', (e) => {
            e.preventDefault();
            block.classList.remove('drag-over');

            const draggedSyllable = e.dataTransfer.getData('text/plain'); // Слог из памяти
            const validSyllable = block.dataset.valid; // Правильный ответ для этого блока

            // Если ребенок притянул верный слог
            if (draggedSyllable === validSyllable) {
                block.classList.add('matched'); // Визуально отмечаем успех
                block.innerText = draggedSyllable + block.innerText.replace('-', ''); // Собираем слово целиком
            }
        });
    });
});

// Функция проверки итогов задания №1
function checkTask1() {
    const resArea = document.getElementById('res-17-1');
    const totalBlocks = document.querySelectorAll('.end-block').length;
    const matchedBlocks = document.querySelectorAll('.end-block.matched').length;

    // Проверяем, все ли 10 слов собраны
    if (matchedBlocks === totalBlocks) {
        resArea.innerHTML = "<b style='color: #27ae60;'>Отлично! Все 10 слов собраны правильно!</b>";
    } else {
        resArea.innerHTML = "<b style='color: #e67e22;'>Пока собрано слов: " + matchedBlocks + " из 10. Продолжай!</b>";
    }
}

// Проверка Задания 2 (формальная)
function checkTask2() {
    const resArea = document.getElementById('res-17-2');
    resArea.innerHTML = "<span style='color: #27ae60;'><b>Молодец! Ты отлично потренировался в чтении!</b></span>";
}

/**
 * Функция проверки Задания 3.
 * Сверяет введённые данные с эталонами, записанными в атрибутах data-answer.
 */
function checkTask3() {
    // Выбираем все текстовые поля в контейнере задания 3
    const inputs = document.querySelectorAll('.l17-t3-input');
    const resArea = document.getElementById('res-17-3');
    let allCorrect = true; // Флаг для итогового результата

    inputs.forEach(input => {
        // Очищаем ввод от лишних пробелов и переводим в нижний регистр для точности
        const userValue = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();

        // Проверка: текст должен совпадать с эталоном и не быть пустым
        if (userValue === "" || userValue !== correctAnswer) {
            allCorrect = false;
            input.classList.remove('l17-input-success');
            input.classList.add('l17-input-error'); // Помечаем как ошибку
        } else {
            input.classList.remove('l17-input-error');
            input.classList.add('l17-input-success'); // Помечаем как успех
        }
    });

    // Вывод сообщения пользователю в зависимости от результата
    if (allCorrect) {
        resArea.innerHTML = "<b style='color: #27ae60;'>Верно! Все 5 предложений составлены без ошибок!</b>";
    } else {
        resArea.innerHTML = "<b style='color: #e67e22;'>Есть ошибки в предложениях. Проверь внимательно!</b>";
    }
}
 // Проверка Задания 4.

function checkTask4() {
    const inputs = document.querySelectorAll('.l17-t4-input');
    const resArea = document.getElementById('res-17-4');
    let allCorrect = true;

    inputs.forEach(input => {
        // Подготовка строк к сравнению: удаление пробелов, нижний регистр, замена ё на е
        const userVal = input.value.trim().toLowerCase().replace(/ё/g, 'е');
        const correctVal = input.dataset.answer.toLowerCase().replace(/ё/g, 'е');

        if (userVal !== "" && userVal === correctVal) {
            input.classList.remove('l17-input-error');
            input.classList.add('l17-input-success');
        } else {
            allCorrect = false;
            input.classList.remove('l17-input-success');
            input.classList.add('l17-input-error');
        }
    });

    if (allCorrect) {
        resArea.innerHTML = "<b style='color: #27ae60;'>Отлично! Все признаки подобраны верно!</b>";
    } else {
        resArea.innerHTML = "<b style='color: #e67e22;'>Есть ошибки. Попробуй исправить их!</b>";
    }
}
let selectedMonkeys = [];

function selectMonkey(element) {
    if (element.classList.contains('colored')) return;

    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        selectedMonkeys = selectedMonkeys.filter(item => item !== element);
    } else {
        if (selectedMonkeys.length < 2) {
            element.classList.add('selected');
            selectedMonkeys.push(element);
        }
    }
}

function checkTask5() {
    const resArea = document.getElementById('res-17-5');
    
    if (selectedMonkeys.length !== 2) {
        resArea.innerHTML = "<b>Выбери двух обезьянок!</b>";
        resArea.style.color = "#e67e22";
        return;
    }

    const id1 = selectedMonkeys[0].dataset.monkeyId;
    const id2 = selectedMonkeys[1].dataset.monkeyId;

    if (id1 === "correct" && id2 === "correct") {
        selectedMonkeys.forEach(el => {
            el.classList.remove('selected');
            el.classList.add('colored');
            // Заменяем на черную обезьяну №5
            el.style.backgroundImage = "url('images/lesson-17-5-5.png')";
        });
        
        resArea.innerHTML = "<b>Верно! Ты нашел одинаковых обезьянок!</b>";
        resArea.style.color = "#27ae60";
        selectedMonkeys = [];
    } else {
        selectedMonkeys.forEach(el => el.classList.remove('selected'));
        selectedMonkeys = [];
        resArea.innerHTML = "<b>Попробуй еще раз, они разные.</b>";
        resArea.style.color = "#e74c3c";
    }
}
/**
 * Автоматическое перемещение фокуса при вводе
 * Добавляем обработчик на все ячейки кроссворда
 */
document.querySelectorAll('.l17-t6-cell').forEach((input, index, cells) => {
    input.addEventListener('input', () => {
        // Если введена буква и есть следующая ячейка в DOM
        if (input.value.length === 1 && cells[index + 1]) {
            // Перемещаем фокус на следующий элемент
            cells[index + 1].focus();
        }
    });

    // Дополнительно: обработка удаления (Backscape) для возврата назад
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && cells[index - 1]) {
            cells[index - 1].focus();
        }
    });
});

/**
 * Проверка Задания 6
 */
function checkTask6() {
    const cells = document.querySelectorAll('.l17-t6-cell:not([readonly])');
    const resArea = document.getElementById('res-17-6');
    let allOk = true;

    cells.forEach(cell => {
        const val = cell.value.trim().toLowerCase();
        const correct = cell.dataset.letter.toLowerCase();

        if (val === correct) {
            cell.classList.remove('cell-wrong');
            cell.classList.add('cell-correct');
        } else {
            allOk = false;
            cell.classList.remove('cell-correct');
            cell.classList.add('cell-wrong');
        }
    });

    if (allOk) {
        resArea.innerHTML = "<b>Отлично! Кроссворд заполнен правильно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Где-то ошибка. Проверь буквы еще раз!</b>";
        resArea.style.color = "#e67e22";
    }
}

function checkTask7() {
    const inputs = document.querySelectorAll('.l17-t7-input');
    let allCorrect = true;

    inputs.forEach(input => {
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            input.classList.remove('input-error');
            input.classList.add('input-correct');
        } else {
            input.classList.remove('input-correct');
            input.classList.add('input-error');
            allCorrect = false;
        }
    });

    const resultMsg = document.getElementById('res-17-7');
    if (allCorrect) {
        resultMsg.innerHTML = "<b>Превосходно! Все предметы названы верно.</b>";
        resultMsg.style.color = "#27ae60";
    } else {
        resultMsg.innerHTML = "<b>Кое-где есть ошибки. Попробуй исправить.</b>";
        resultMsg.style.color = "#e67e22";
    }
}


// Переменная для хранения количества нажатий
let task8Clicks = 0;

/**
 * Обработчик клика по картинке
 */
function handleImageClick() {
    // Увеличиваем счетчик при каждом нажатии, но не более 5
    if (task8Clicks < 5) {
        task8Clicks++;
        
        // Обновляем цифру на экране для ребенка
        const counterDisplay = document.getElementById('click-counter');
        if (counterDisplay) {
            counterDisplay.innerText = task8Clicks;
        }
    }
}

/**
 * Функция проверки выполнения задания 8
 */
function checkTask8() {
    const resArea = document.getElementById('res-17-8');
    
    // Если ребенок нажал на картинку 5 или более раз
    if (task8Clicks >= 5) {
        resArea.innerHTML = "<b>Отлично! Ты нашел все предметы!</b>";
        resArea.style.color = "#27ae60"; // Зеленый цвет для успеха
    } else {
        resArea.innerHTML = "<b>Ты нашел не все предметы. Ищи внимательнее!</b>";
        resArea.style.color = "#e67e22"; // Оранжевый цвет для предупреждения
    }
}
