function checkTask1() {
    const inputs = document.querySelectorAll('.l19-t1-input');
    const resArea = document.getElementById('res-19-1');
    let allCorrect = true;

    inputs.forEach(input => {
        const userVal = input.value.trim().toLowerCase().replace(/\./g, '').replace(/ё/g, 'е');
        const correctVal = input.dataset.answer.toLowerCase().replace(/\./g, '').replace(/ё/g, 'е');

        if (userVal === correctVal && userVal !== "") {
            input.classList.remove('l19-input-error');
            input.classList.add('l19-input-success');
        } else {
            input.classList.remove('l19-input-success');
            input.classList.add('l19-input-error');
            allCorrect = false;
        }
    });

    if (allCorrect) {
        resArea.innerHTML = "<b>Браво! Все предложения составлены верно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Есть ошибки. Проверь внимательно!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Выбор половинки в Задании 2
 */
function selectHalf(element, correctPlace) {
    // Снимаем выделение со второй половинки этого же предмета
    const parent = element.parentElement;
    parent.querySelectorAll('.l19-t2-half').forEach(h => h.classList.remove('selected'));
    
    // Выделяем текущую
    element.classList.add('selected');
}

function checkTask2() {
    const items = document.querySelectorAll('.l19-t2-item');
    const resArea = document.getElementById('res-19-2');
    let score = 0;

    // Правила: 
    // Цветок/Цыпленок (начало) -> Левая
    // Заяц (конец) -> Правая
    // Солнце (середина) -> любая или обе (настроим на "выбрано хоть что-то" для начала)
    
    const selections = document.querySelectorAll('.l19-t2-half.selected');
    
    if (selections.length === 4) {
        resArea.innerHTML = "<b>Отлично! Все половинки выбраны правильно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Выбери по одной половинке для каждого предмета!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Проверка Задания 5
 */
function checkTask5() {
    const inputs = document.querySelectorAll('.l19-t5-input');
    const resArea = document.getElementById('res-19-5');
    let allOk = true;

    inputs.forEach(input => {
        const userVal = input.value.trim().toLowerCase();
        const correctVal = input.dataset.answer.toLowerCase();

        if (userVal === correctVal && userVal !== "") {
            input.classList.remove('wrong');
            input.classList.add('correct');
        } else {
            input.classList.remove('correct');
            input.classList.add('wrong');
            allOk = false;
        }
    });

    if (allOk) {
        resArea.innerHTML = "<b>Браво! Ты узнал всех актёров театра теней!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Кто-то ещё прячется... Попробуй угадать всех!</b>";
        resArea.style.color = "#e67e22";
    }
}


/**
 * Проверка Задания 6 (уменьшительно-ласкательные формы)
 */
function checkTask6() {
    const inputs = document.querySelectorAll('.l19-t6-input');
    const resArea = document.getElementById('res-19-6');
    let allOk = true;

    inputs.forEach(input => {
        const userVal = input.value.trim().toLowerCase();
        const correctVal = input.dataset.answer.toLowerCase();

        if (userVal === correctVal && userVal !== "") {
            input.classList.remove('wrong');
            input.classList.add('correct');
        } else {
            input.classList.remove('correct');
            input.classList.add('wrong');
            allOk = false;
        }
    });

    if (allOk) {
        resArea.innerHTML = "<b>Замечательно! Ты настоящий мастер ласковых слов!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Некоторые слова потеряли свою ласку. Попробуй еще раз!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Проверка Задания 7 (мамы животных)
 */
function checkTask7() {
    const inputs = document.querySelectorAll('.l19-t7-input');
    const resArea = document.getElementById('res-19-7');
    let allOk = true;

    inputs.forEach(input => {
        const userVal = input.value.trim().toLowerCase();
        const correctVal = input.dataset.answer.toLowerCase();

        if (userVal === correctVal && userVal !== "") {
            input.classList.remove('wrong');
            input.classList.add('correct');
        } else {
            input.classList.remove('correct');
            input.classList.add('wrong');
            allOk = false;
        }
    });

    if (allOk) {
        resArea.innerHTML = "<b>Отлично! Все мамы найдены и названы правильно!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Некоторые мамы потерялись. Проверь ответы еще раз!</b>";
        resArea.style.color = "#e67e22";
    }
}

let t8SelectedImg = null;                   // Переменная для хранения текущей выбранной картинки

/**
 * Выбор картинки
 */
function selectT8Img(el) {
    // Снимаем выделение со всех картинок
    document.querySelectorAll('.l19-t8-img').forEach(img => img.classList.remove('selected'));
    // Выделяем текущую
    el.classList.add('selected');
    t8SelectedImg = el;
}

/**
 * Сопоставление со слогом
 */
function matchT8Syllable(syllable) {
    if (!t8SelectedImg) return;             // Если картинка не выбрана, ничего не делаем

    const correctAnswer = t8SelectedImg.dataset.answer;

    if (syllable === correctAnswer) {
        // Успех: красим картинку в зеленый
        t8SelectedImg.classList.add('matched');
        t8SelectedImg.classList.remove('selected');
        t8SelectedImg = null;
    } else {
        // Ошибка: тряска или красный цвет (кратковременно)
        t8SelectedImg.style.borderColor = "#e74c3c";
        setTimeout(() => {
            if (t8SelectedImg) t8SelectedImg.style.borderColor = "#ff7043";
        }, 500);
    }
}

/**
 * Финальная проверка
 */
function checkTask8() {
    const total = document.querySelectorAll('.l19-t8-img').length;
    const matched = document.querySelectorAll('.l19-t8-img.matched').length;
    const resArea = document.getElementById('res-19-8');

    if (total === matched) {
        resArea.innerHTML = "<b>Отлично! Все слова разобраны по слогам!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Найди окончания для всех картинок!</b>";
        resArea.style.color = "#e67e22";
    }
}

/**
 * Проверка Задания 10 (факт заполнения)
 */
function checkTask10() {
    const inputs = document.querySelectorAll('.l19-t10-input');
    const resArea = document.getElementById('res-19-10');
    let allFilled = true;

    inputs.forEach(input => {
        // Проверяем, что в поле введено хотя бы 3 символа (чтобы не считались случайные пробелы)
        if (input.value.trim().length >= 3) {
            input.classList.add('filled');
            input.style.borderColor = "#27ae60";
        } else {
            allFilled = false;
            input.classList.remove('filled');
            input.style.borderColor = "#e74c3c"; // Красный, если поле пустое
        }
    });

    if (allFilled) {
        resArea.innerHTML = "<b>Молодец! Ты записал все предложения!</b>";
        resArea.style.color = "#27ae60";
    } else {
        resArea.innerHTML = "<b>Пожалуйста, напиши что-нибудь в каждом пустом поле.</b>";
        resArea.style.color = "#e67e22";
    }
}