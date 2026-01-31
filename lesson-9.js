document.addEventListener('DOMContentLoaded', () => {
    // Инфо
    document.getElementById('child-name-display').textContent = 'Ульяна';
    document.getElementById('lesson-date-display').textContent = '31.01.2026';

    // === Задание 1. Комментарий: Логика проверки предложений ===
    (function() {
        const checkBtn = document.getElementById('btn-1');
        const resMsg = document.getElementById('res-1');
        const inputs = document.querySelectorAll('.sentences-grid input');

        checkBtn.onclick = () => {
            let allFilled = true;
            
            inputs.forEach(input => {
                if (input.value.trim().length < 2) {
                    input.style.borderColor = "#ef5350";
                    allFilled = false;
                } else {
                    input.style.borderColor = "#4caf50";
                }
            });

            if (allFilled) {
                resMsg.textContent = "🎉 ВЕЛИКОЛЕПНО! ВСЁ ПРАВИЛЬНО!";
                resMsg.style.color = "#4caf50";
            } else {
                resMsg.textContent = "ЗАПОЛНИ ВСЕ ПРОПУСКИ!";
                resMsg.style.color = "#ef5350";
            }
        };
    })();
});

// === Задание №2. Комментарий: Устное выполнение поиска и счета ===
(function() {
    const checkBtn = document.getElementById('btn-2-9');
    const resMsg = document.getElementById('res-2-9');

    checkBtn.onclick = () => {
        // Задание устное, фиксируем успех при нажатии
        resMsg.textContent = "🎉 МОЛОДЕЦ! ТЫ ПОМОГ ИРИШКЕ ВСЁ НАЙТИ И ПОСЧИТАТЬ!";
        resMsg.style.color = "#4caf50";
    };
})();

// === Задание №3. Комментарий: Логика проверки ввода предложений ===
(function() {
    const checkBtn = document.getElementById('btn-3-9');
    const resMsg = document.getElementById('res-3-9');
    const inputs = document.querySelectorAll('.sentence-field');

    checkBtn.onclick = () => {
        let allFilled = true;
        
        inputs.forEach(input => {
            if (input.value.trim().length < 5) {
                input.style.borderColor = "#ef5350"; // Красный
                allFilled = false;
            } else {
                input.style.borderColor = "#4caf50"; // Зеленый
            }
        });

        if (allFilled) {
            resMsg.textContent = "🎉 ВЕЛИКОЛЕПНО! ТЫ СОСТАВИЛ ВСЕ ПРЕДЛОЖЕНИЯ!";
            resMsg.style.color = "#4caf50";
        } else {
            resMsg.textContent = "ПОЖАЛУЙСТА, ЗАПИШИ ВСЕ ТРИ ПРЕДЛОЖЕНИЯ.";
            resMsg.style.color = "#ef5350";
        }
    };
})();

// === Задание №4. Комментарий: Проверка детёнышей без учета регистра ===
(function() {
    const checkBtn = document.getElementById('btn-4-9');
    const resMsg = document.getElementById('res-4-9');
    const inputs = document.querySelectorAll('.animal-input-plain');

    checkBtn.onclick = () => {
        let filledCount = 0;
        inputs.forEach(input => {
            if (input.value.trim().length >= 3) {
                input.style.borderColor = "#4caf50";
                filledCount++;
            } else {
                input.style.borderColor = "#ef5350";
            }
        });

        if (filledCount === inputs.length) {
            resMsg.textContent = "🎉 МОЛОДЕЦ! ТЫ НАЗВАЛ ВСЕХ МАЛЫШЕЙ!";
            resMsg.style.color = "#4caf50";
        } else {
            resMsg.textContent = "ПОЖАЛУЙСТА, ЗАПОЛНИ ВСЕ ПОЛЯ.";
            resMsg.style.color = "#ef5350";
        }
    };
})();

// === Задание №5. Комментарий: Слуховое запоминание слов ===
(function() {
    const btn = document.getElementById('btn-5-9');
    const res = document.getElementById('res-5-9');

    if(btn) {
        btn.onclick = () => {
            res.textContent = "🎉 МОЛОДЕЦ! ТЫ ОЧЕНЬ ВНИМАТЕЛЬНО СЛУШАЛ!";
            res.style.color = "#4caf50";
        };
    }
})();

// === Задание №6. Комментарий: Логика проверки кроссворда ===
(function() {
    const btn = document.getElementById('btn-6-9');
    const res = document.getElementById('res-6-9');
    const inputs = document.querySelectorAll('.cw-cell:not(.static-cell)');

    if(btn) {
        btn.onclick = () => {
            let errors = 0;
            inputs.forEach(input => {
                const val = input.value.trim().toUpperCase();
                const ans = input.dataset.ans;
                if (val === ans) {
                    input.style.backgroundColor = "#c8e6c9";
                    input.style.borderColor = "#4caf50";
                } else {
                    input.style.backgroundColor = "#ffcdd2";
                    input.style.borderColor = "#ef5350";
                    errors++;
                }
            });

            if (errors === 0) {
                res.textContent = "🎉 УРА! КРОССВОРД РАЗГАДАН ВЕРНО!";
                res.style.color = "#4caf50";
            } else {
                res.textContent = "ПОПРОБУЙ ЕЩЁ РАЗ, ЕСТЬ ОШИБКИ!";
                res.style.color = "#ef5350";
            }
        };
    }
})();

// === Задание №7. Комментарий: Логика приготовления супа ===
(function() {
    const cards = document.querySelectorAll('.product-card');
    const potZone = document.getElementById('pot-zone-7');
    const btnCheck = document.getElementById('btn-check-7');
    const btnReset = document.getElementById('btn-reset-7');
    const res = document.getElementById('res-7-9');

    let draggedItem = null;

    // Инициализация Drag and Drop
    cards.forEach(card => {
        card.addEventListener('dragstart', function() {
            draggedItem = this;
        });
    });

    potZone.addEventListener('dragover', (e) => e.preventDefault());

    potZone.addEventListener('drop', function(e) {
        e.preventDefault();
        if (draggedItem) {
            draggedItem.classList.add('inactive');
        }
    });

    // Логика кнопки ОТМЕНИТЬ
    btnReset.onclick = () => {
        cards.forEach(card => card.classList.remove('inactive'));
        res.textContent = "";
    };

    // Логика кнопки ПРОВЕРИТЬ
    btnCheck.onclick = () => {
        const selected = document.querySelectorAll('.product-card.inactive');
        const neededTotal = document.querySelectorAll('.product-card[data-needed="true"]').length;
        
        let correctInPot = 0;
        let mistakes = 0;

        selected.forEach(item => {
            if (item.getAttribute('data-needed') === "true") {
                correctInPot++;
            } else {
                mistakes++;
            }
        });

        if (correctInPot === neededTotal && mistakes === 0) {
            res.textContent = "🎉 ВЕЛИКОЛЕПНО! СУП ПОЛУЧИЛСЯ ОЧЕНЬ ВКУСНЫМ!";
            res.style.color = "#4caf50";
        } else if (mistakes > 0) {
            res.textContent = "❌ КАЖЕТСЯ, В СУП ПОПАЛО ЧТО-ТО ЛИШНЕЕ!";
            res.style.color = "#ef5350";
        } else {
            res.textContent = "🥣 ЧЕГО-ТО НЕ ХВАТАЕТ... ПОСМОТРИ ВНИМАТЕЛЬНЕЕ!";
            res.style.color = "#ff9800";
        }
    };
})();

// === ЗАДАНИЕ 8: ЛОГИКА ОТКРЫТИЯ СЛОВ ===
function openCloud(element) { // Обработка клика по облаку
    if (!element.classList.contains('opened')) { // Проверка, не открыто ли уже
        element.classList.add('opened'); // Добавляем класс, запускающий CSS-анимацию
        
        const total = document.querySelectorAll('.cloud-wrapper').length; // Общее число слов
        const opened = document.querySelectorAll('.cloud-wrapper.opened').length; // Сколько открыли
        const sun = document.getElementById('sun-8'); // Ссылка на солнце
        const res = document.getElementById('res-8-9'); // Ссылка на итог

        if (opened === total) { // Победное условие
            sun.classList.add('visible'); // Включаем солнце
            if(res) { 
                res.textContent = "☀️ МОЛОДЕЦ! ТЫ ОТКРЫЛ ВСЕ СЛОВА!"; // Поздравление
                res.style.color = "#4caf50"; // Зеленый цвет текста
            }
        }
    }
}

function resetClouds() { // Сброс задания в начальное состояние
    document.querySelectorAll('.cloud-wrapper').forEach(c => c.classList.remove('opened')); // Закрываем облака
    const sun = document.getElementById('sun-8'); 
    if(sun) sun.classList.remove('visible'); // Прячем солнце
    const res = document.getElementById('res-8-9');
    if(res) res.textContent = ""; // Очищаем текст
}

// === Задание №9. Комментарий: Лопанье пузырей ===

/**
 * Функция для "лопанья" пузырька
 * @param {HTMLElement} element - контейнер пузырька
 */
function popBubble(element) {
    if (!element.classList.contains('popped')) {
        element.classList.add('popped');
        
        // Проверка завершения задания
        const total = document.querySelectorAll('.bubble-item').length;
        const popped = document.querySelectorAll('.bubble-item.popped').length;
        
        if (popped === total) {
            const res = document.getElementById('res-9-9');
            res.textContent = "✨ УРА! ВСЕ ПУЗЫРЬКИ ЛОПНУЛИ, А СЛОВА ПРОЧИТАНЫ!";
            res.style.color = "#009688";
        }
    }
}

/**
 * Сброс игры: возвращаем все пузырьки
 */
function resetBubbles() {
    document.querySelectorAll('.bubble-item').forEach(b => b.classList.remove('popped'));
    document.getElementById('res-9-9').textContent = "";
}


// === Задание №10. Комментарий: Проверка трехколоночной шифровки ===
(function() {
    const inputs = document.querySelectorAll('.decoding-grid-3col input');
    const btnCheck = document.getElementById('btn-check-10');
    const btnReset = document.getElementById('btn-reset-10');

    if (btnCheck) {
        btnCheck.onclick = () => {
            inputs.forEach(input => {
                const val = input.value.trim().toUpperCase();
                const ans = input.getAttribute('data-ans');
                if (val === ans) {
                    input.className = 'correct';
                } else if (val !== "") {
                    input.className = 'wrong';
                }
            });
        };
    }

    if (btnReset) {
        btnReset.onclick = () => {
            inputs.forEach(input => {
                input.value = "";
                input.className = "";
            });
            document.getElementById('res-10-9').textContent = "";
        };
    }
})();