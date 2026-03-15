document.addEventListener('DOMContentLoaded', () => {
    
    // Выбираем все текстовые поля для упражнения
    const inputs = document.querySelectorAll('.transform-input');
    // Кнопка для запуска проверки
    const checkBtn = document.getElementById('btn-12-1');
    // Контейнер для вывода итогового сообщения
    const resultMsg = document.getElementById('res-12-1');

    /**
     * Обработка каждого поля ввода:
     * Перевод в верхний регистр и сброс стилей ошибки при печати
     */
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.toUpperCase();
            input.classList.remove('wrong', 'correct');
        });
    });

    /**
     * Функция проверки ответов
     */
    if (checkBtn) {
        checkBtn.onclick = () => {
            let correctCount = 0; // Переменная для подсчета успехов

            inputs.forEach(input => {
                // Очистка от пробелов и сравнение с правильным ответом в data-answer
                const userVal = input.value.trim().toUpperCase();
                const correctAns = input.dataset.answer.toUpperCase();

                if (userVal === correctAns) {
                    input.classList.add('correct');
                    correctCount++;
                } else if (userVal !== "") {
                    // Красим только если поле не пустое
                    input.classList.add('wrong');
                }
            });

            // Формируем финальный отзыв для ребенка
            if (correctCount === inputs.length) {
                resultMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! ВСЁ ВЕРНО!</b>";
                resultMsg.style.color = "#27ae60";
            } else {
                resultMsg.innerHTML = "<b>ЕСТЬ ОШИБКИ, ПОПРОБУЙ ЕЩЁ!</b>";
                resultMsg.style.color = "#e74c3c";
            }
        };
    }
});

// === ЛОГИКА ЗАДАНИЯ №2 (ШИРОКАЯ КАРТИНКА) ===
(function() {
    let clicks = 0; // Переменная для хранения количества кликов
    const img = document.getElementById('logic-image');
    const btn = document.getElementById('btn-12-2');
    const res = document.getElementById('res-12-2');

    if (img) {
        img.onclick = () => {
            clicks++; // Считаем каждое нажатие на изображение
            // Визуальное подтверждение клика (мигание рамки)
            img.style.borderColor = "#ff6d00";
            setTimeout(() => { img.style.borderColor = "#81d4fa"; }, 150);
        };
    }

    if (btn) {
        btn.onclick = () => {
            // Условие: найдено 5 и более небылиц
            if (clicks >= 5) {
                res.innerHTML = "<b>🏆 ВЕРНО! ТЫ ОЧЕНЬ ВНИМАТЕЛЬНЫЙ!</b>";
                res.style.color = "#27ae60";
            } else {
                res.innerHTML = "<b>ТЫ НАШЁЛ НЕ ВСЕ ОШИБКИ. ПОСМОТРИ ЕЩЁ!</b>";
                res.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №3. Логика перетаскивания и валидации ответов */
(function() {
    const dragObjs = document.querySelectorAll('.drag-obj');
    const cells = document.querySelectorAll('.grid-cell.empty');
    const checkBtn = document.getElementById('btn-12-3');
    const resMsg = document.getElementById('res-12-3');

    // Настройка событий начала перетаскивания
    dragObjs.forEach(obj => {
        obj.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', e.target.dataset.type);
            e.dataTransfer.setData('id', e.target.id);
        });
    });

    // Настройка зон приема (ячеек таблицы)
    cells.forEach(cell => {
        cell.addEventListener('dragover', (e) => e.preventDefault());
        
        // Подсветка ячейки при входе курсора с предметом
        cell.addEventListener('dragenter', (e) => e.target.closest('.grid-cell').classList.add('drag-over'));
        cell.addEventListener('dragleave', (e) => e.target.closest('.grid-cell').classList.remove('drag-over'));

        // Обработка сброса картинки в ячейку
        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            const targetCell = e.target.closest('.grid-cell');
            targetCell.classList.remove('drag-over');
            
            const type = e.dataTransfer.getData('type');
            const originalId = e.dataTransfer.getData('id');
            const originalImg = document.getElementById(originalId);

            // Клонирование объекта для вставки в таблицу
            const newImg = originalImg.cloneNode(true);
            newImg.classList.remove('drag-obj');
            newImg.dataset.placed = type;

            targetCell.innerHTML = '';
            targetCell.appendChild(newImg);
        });
    });

    // Логика проверки правильности заполнения
    if (checkBtn) {
        checkBtn.onclick = () => {
            let hasError = false;
            cells.forEach(cell => {
                const img = cell.querySelector('img');
                // Проверка на соответствие атрибуту data-correct
                if (!img || img.dataset.placed !== cell.dataset.correct) {
                    if (img) {
                        img.style.transition = "0.3s";
                        img.style.opacity = "0";
                    }
                    // Очистка неверных ячеек
                    setTimeout(() => { cell.innerHTML = ''; }, 300);
                    hasError = true;
                }
            });

            // Вывод финального сообщения
            if (!hasError) {
                resMsg.innerHTML = "<b>🏆 ВЕРНО!</b>";
                resMsg.style.color = "#27ae60";
            } else {
                resMsg.innerHTML = "<b>ПОПРОБУЙ ЕЩЁ!</b>";
                resMsg.style.color = "#e74c3c";
            }
        };
    }
})();


/* ЗАДАНИЕ №4. Логика проверки количества и выбора правильного ответа */
(function() {
    const checkBtn = document.getElementById('btn-12-4');
    const resultMsg = document.getElementById('res-12-4');
    const selectBox = document.getElementById('select-max-item');
    const rows = document.querySelectorAll('.count-row');

    if (checkBtn) {
        checkBtn.onclick = () => {
            // 1. Определяем технически, в каком ряду больше всего предметов
            let maxCount = 0;
            let correctName = "";

            rows.forEach(row => {
                const count = parseInt(row.dataset.count);
                if (count > maxCount) {
                    maxCount = count;
                    correctName = row.dataset.name;
                }
            });

            // 2. Сверяем выбор пользователя с правильным ответом
            const userChoice = selectBox.value;

            if (userChoice === "") {
                resultMsg.innerHTML = "<b>Сначала выбери ответ!</b>";
                resultMsg.style.color = "#ff9800";
            } else if (userChoice === correctName) {
                resultMsg.innerHTML = "<b>🏆 ВЕРНО! Больше всего гнёзд (6 шт.)!</b>";
                resultMsg.style.color = "#27ae60";
                
                // Подсвечиваем правильный ряд
                rows.forEach(row => {
                    if (row.dataset.name === correctName) {
                        row.style.boxShadow = "0 0 15px #8bc34a";
                        row.style.border = "2px solid #8bc34a";
                    }
                });
            } else {
                resultMsg.innerHTML = "<b>НЕВЕРНО. Попробуй сосчитать еще раз!</b>";
                resultMsg.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №5. Логика отрисовки кругов на обеих картинках */
(function() {
    const zones = document.querySelectorAll('.interactive-zone');
    const checkBtn = document.getElementById('btn-12-5');
    const resMsg = document.getElementById('res-12-5');
    
    let totalClicks = 0;
    const goal = 7;

    // Функция создания круга
    function createCircle(zone, x, y) {
        const layer = zone.querySelector('.markers-layer');
        const circle = document.createElement('div');
        circle.className = 'click-circle';
        circle.style.left = x + '%'; // Используем проценты для адаптивности
        circle.style.top = y + '%';
        layer.appendChild(circle);
    }

    // Навешиваем обработчик на обе зоны
    zones.forEach(zone => {
        zone.addEventListener('mousedown', function(e) {
            totalClicks++;

            // Вычисляем координаты клика в процентах относительно картинки
            const rect = zone.getBoundingClientRect();
            const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
            const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

            // Рисуем круги на ОБЕИХ картинках в одном и том же месте
            zones.forEach(z => createCircle(z, xPercent, yPercent));

            // Обновляем счетчик для пользователя
            if (totalClicks < goal) {
                resMsg.innerHTML = `Найдено отличий: <b>${totalClicks}</b>`;
                resMsg.style.color = "#2c3e50";
            } else {
                resMsg.innerHTML = "<b>Отлично! Найдено 7 отличий. Можно проверять!</b>";
                resMsg.style.color = "#27ae60";
            }
        });
    });

    // Логика кнопки проверки
    if (checkBtn) {
        checkBtn.onclick = () => {
            if (totalClicks >= goal) {
                resMsg.innerHTML = "<b>🏆 ПРАВИЛЬНО! Ты очень внимательный!</b>";
                resMsg.style.color = "#27ae60";
                // Блокируем дальнейшие клики
                zones.forEach(z => z.style.pointerEvents = "none");
            } else {
                resMsg.innerHTML = `<b>Нужно найти ещё ${goal - totalClicks}. Посмотри внимательнее!</b>`;
                resMsg.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №6. Проверка исправленных предложений */
(function() {
    const checkBtn = document.getElementById('btn-12-6');
    const resultMsg = document.getElementById('res-12-6');
    const items = document.querySelectorAll('.sentence-item');

    if (checkBtn) {
        checkBtn.onclick = () => {
            let correctCount = 0;

            items.forEach(item => {
                const input = item.querySelector('.fix-input');
                const userAnswer = input.value.trim().toLowerCase().replace(/[.!?]/g, "");
                const correctAnswer = item.dataset.correct.toLowerCase().replace(/[.!?]/g, "");

                // Сравниваем текст (игнорируя регистр и знаки препинания в конце)
                if (userAnswer === correctAnswer) {
                    item.classList.remove('error');
                    item.classList.add('success');
                    correctCount++;
                } else {
                    item.classList.remove('success');
                    item.classList.add('error');
                }
            });

            if (correctCount === items.length) {
                resultMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! Все предложения исправлены верно!</b>";
                resultMsg.style.color = "#27ae60";
            } else {
                resultMsg.innerHTML = `<b>Исправлено верно: ${correctCount} из ${items.length}. Проверь ошибки!</b>`;
                resultMsg.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №7. Логика последовательного прохождения улитки */
(function() {
    const spots = document.querySelectorAll('.snail-spot');
    const display = document.getElementById('snail-word-display');
    const checkBtn = document.getElementById('btn-12-7');
    const resMsg = document.getElementById('res-12-7');
    
    let currentIndex = 0;

    // Установка первой зоны в активное состояние
    if(spots.length > 0) {
        spots[0].classList.add('active-word');
    }

    spots.forEach((spot, index) => {
        spot.onclick = function() {
            // Ребенок должен нажимать слова по порядку
            if (index === currentIndex) {
                this.classList.remove('active-word');
                this.classList.add('completed');
                
                currentIndex++;

                if (currentIndex < spots.length) {
                    // Активируем следующее слово
                    const nextSpot = spots[currentIndex];
                    nextSpot.classList.add('active-word');
                    display.innerText = nextSpot.dataset.name;
                } else {
                    // Все слова названы
                    display.innerText = "⭐ Все слова названы верно!";
                    display.style.color = "#27ae60";
                    resMsg.innerHTML = "<b>🏆 УРОК ОКОНЧЕН! ТЫ ОТЛИЧНО ПОРАБОТАЛ!</b>";
                }
            } else if (index > currentIndex) {
                // Если нажал раньше времени
                display.innerText = "Иди по порядку!";
                display.style.color = "#e74c3c";
                setTimeout(() => {
                    display.innerText = spots[currentIndex].dataset.name;
                    display.style.color = "#ff6d00";
                }, 1000);
            }
        };
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            if (currentIndex === spots.length) {
                alert("Поздравляем! Вы прошли все задания урока №12!");
                location.reload(); // Перезагрузка для повторения
            } else {
                resMsg.innerText = "Сначала назови все картинки на улитке!";
                resMsg.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №8. Логика удаления зеркальных букв */
(function() {
    const letters = document.querySelectorAll('.letter');
    const checkBtn = document.getElementById('btn-12-8');
    const resMsg = document.getElementById('res-12-8');

    letters.forEach(letter => {
        // Обработка клика левой кнопкой мыши
        letter.addEventListener('click', function(e) {
            if (this.classList.contains('mirror')) {
                // Если буква зеркальная — она исчезает
                this.classList.add('removed');
            } else {
                // Если буква правильная — визуальный эффект ошибки
                this.style.borderColor = "#ef5350";
                setTimeout(() => { this.style.borderColor = "#e1f5fe"; }, 400);
            }
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            const remainingMirrors = document.querySelectorAll('.letter.mirror:not(.removed)').length;
            
            if (remainingMirrors === 0) {
                resMsg.innerHTML = "<b>🏆 ПРАВИЛЬНО! Все зеркальные буквы убраны. Прочитай слова!</b>";
                resMsg.style.color = "#27ae60";
            } else {
                resMsg.innerHTML = `<b>Осталось найти ещё ${remainingMirrors} зеркальные буквы!</b>`;
                resMsg.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №9. КРОССВОРД */
(function() {
    const checkBtn = document.getElementById('btn-12-9'); // Кнопка проверки задания
    const resMsg = document.getElementById('res-12-9');   // Поле для вывода результата
    const rows = document.querySelectorAll('.cross-row'); // Все строки кроссворда

    // 1. ЛОГИКА АВТОПЕРЕХОДА КУРСОРA
    rows.forEach(row => {
        // Выбираем только редактируемые ячейки (пропускаем букву З)
        const inputs = row.querySelectorAll('.cell:not(.static)'); 
        
        inputs.forEach((input, index) => {
            // Событие при вводе буквы
            input.addEventListener('input', () => {
                input.value = input.value.toUpperCase(); // Принудительный верхний регистр
                
                // Если буква введена, переносим фокус на следующую пустую ячейку в этой строке
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Событие нажатия клавиш (Backspace)
            input.addEventListener('keydown', (e) => {
                // Если нажата клавиша удаления и ячейка пуста — возвращаемся назад
                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    });

    // 2. ЛОГИКА ПРОВЕРКИ ВСЕХ СЛОВ
    if (checkBtn) {
        checkBtn.onclick = () => {
            let totalErrors = 0; // Счетчик строк с ошибками

            rows.forEach(row => {
                const targetWord = row.dataset.word; // Правильное слово (КАЗАК, НЕЗНАЙКА и т.д.)
                const letterInputs = row.querySelectorAll('.cell');
                let userWord = "";

                // Собираем слово, введенное ребенком в текущей строке
                letterInputs.forEach(input => {
                    userWord += input.value.toUpperCase();
                });

                // Сверка собранного слова с эталоном
                if (userWord === targetWord) {
                    // Подсвечиваем ячейки зеленым при успехе
                    letterInputs.forEach(input => {
                        if (!input.classList.contains('static')) {
                            input.style.borderColor = "#4caf50"; 
                            input.style.backgroundColor = "#f1f8e9";
                        }
                    });
                } else {
                    // Подсвечиваем ячейки красным при наличии ошибки
                    letterInputs.forEach(input => {
                        if (!input.classList.contains('static') && input.value !== "") {
                            input.style.borderColor = "#f44336";
                            input.style.backgroundColor = "#ffebee";
                        }
                    });
                    totalErrors++;
                }
            });

            // Вывод итогового сообщения для ребенка
            if (totalErrors === 0) {
                resMsg.innerHTML = "<b>🏆 ВЕЛИКОЛЕПНО! Весь кроссворд заполнен верно!</b>";
                resMsg.style.color = "#27ae60";
            } else {
                resMsg.innerHTML = `<b>В кроссворде есть ошибки. Проверь слова ещё раз!</b>`;
                resMsg.style.color = "#e74c3c";
            }
        };
    }
})();


/* ЗАДАНИЕ №10. Логика проверки числовых значений */
(function() {
    const checkBtn = document.getElementById('btn-12-10');
    const resultMsg = document.getElementById('res-12-10');
    const answerSlots = document.querySelectorAll('.answer-slot');

    if (checkBtn) {
        checkBtn.onclick = () => {
            let errorCount = 0;

            answerSlots.forEach(slot => {
                const input = slot.querySelector('.detective-input');
                const userVal = parseInt(input.value);
                const correctVal = parseInt(slot.dataset.true);

                // Сравнение введенного значения с эталоном из data-true
                if (userVal === correctVal) {
                    slot.classList.remove('wrong');
                    slot.classList.add('correct');
                } else {
                    slot.classList.remove('correct');
                    slot.classList.add('wrong');
                    errorCount++;
                }
            });

            // Вывод итогового сообщения для ребенка
            if (errorCount === 0) {
                resultMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! Ты нашёл все картинки и правильно их сосчитал!</b>";
                resultMsg.style.color = "#27ae60";
            } else {
                resultMsg.innerHTML = `<b>Посмотри внимательнее</b>`;
                resultMsg.style.color = "#e74c3c";
            }
        };
    }
})();