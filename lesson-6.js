document.addEventListener('DOMContentLoaded', () => {
    // 1. Отображение имени и даты (как в lesson-8)
    document.getElementById('child-name-display').textContent = localStorage.getItem('childName') || 'Ученик';
    document.getElementById('lesson-date-display').textContent = localStorage.getItem('lessonDate') || '27.12.2025';

    // === Задание №1: Логика ===
    (function() {
        const rows = document.querySelectorAll('.word-row-6');
        const checkBtn = document.getElementById('btn-1');
        const resMsg = document.getElementById('res-1');

        // Добавляем обработчики клика на слова
        rows.forEach(row => {
            const words = row.querySelectorAll('.selectable-word');
            words.forEach(word => {
                word.onclick = function() {
                    // Снимаем выделение со всех слов в ЭТОМ ряду
                    words.forEach(w => w.classList.remove('selected', 'correct', 'wrong'));
                    // Выделяем текущее слово
                    this.classList.add('selected');
                };
            });
        });

        // Проверка задания
        if (checkBtn) {
            checkBtn.onclick = function() {
                let correctCount = 0;
                
                // Проверяем, выбрано ли слово в каждом ряду
                const selectedWords = document.querySelectorAll('.selectable-word.selected');

                selectedWords.forEach(word => {
                    // Если у выбранного слова есть метка правильного ответа
                    if (word.dataset.correct === "true") {
                        word.classList.remove('selected');
                        word.classList.add('correct'); // Красим в зеленый
                        correctCount++;
                    } else {
                        // Если выбрано неверно, оставляем или подсвечиваем ошибку
                        word.classList.remove('selected');
                        word.classList.add('wrong'); // Остается красным
                    }
                });

                // Вывод результата
                // Важно: проверяем, что количество правильных ответов равно количеству рядов
                if (correctCount === rows.length) {
                    resMsg.textContent = "🎉 ВЕРНО! ТЫ ОЧЕНЬ ВНИМАТЕЛЬНЫЙ!";
                    resMsg.style.color = "#27ae60";
                } else {
                    // Если выбрано меньше слов или есть ошибки
                    resMsg.textContent = "ПОПРОБУЙ ЕЩЁ РАЗ!";
                    resMsg.style.color = "#e74c3c";
                }
            };
        }
    })();
});

// === Задание №2: Логика отрисовки и проверки ===
(function() {
    const draggables = document.querySelectorAll('.drag-item-6');
    const dropZones = document.querySelectorAll('.drop-box-6');
    const checkBtn = document.getElementById('btn-2');
    const resultText = document.getElementById('res-2');
    
    let correctCount = 0;

    // Начало перетаскивания
    draggables.forEach(item => {
        item.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    // Настройка зон сброса
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('hover');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('hover');
        });

        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('hover');
            
            const id = e.dataTransfer.getData('text/plain');
            const original = document.getElementById(id);
            const gender = original.dataset.gender;
            const target = zone.dataset.target;

            // ЕСЛИ РОД СОВПАДАЕТ С ЗОНОЙ
            if (gender === target) {
                // 1. Обводим оригинал и делаем бледным
                original.classList.add(target === 'my' ? 'correct-my-border' : 'correct-moya-border');

                // 2. Отрисовываем внутри прямоугольника картинку 100х100
                const mini = document.createElement('img');
                mini.src = original.src;
                mini.classList.add('mini-img-6');
                
                // Добавляем в контейнер этого прямоугольника
                zone.querySelector('.mini-container').appendChild(mini);

                correctCount++;
            }
            // Если неверно — ничего не происходит (как вы и требовали)
        });
    });

    // Проверка выполнения
    if (checkBtn) {
        checkBtn.onclick = function() {
            if (correctCount === draggables.length) {
                resultText.textContent = "ВЕЛИКОЛЕПНО! ВСЁ ВЕРНО!";
                resultText.style.color = "#27ae60";
            } else {
                resultText.textContent = "РАСПРЕДЕЛИ ВСЕ КАРТИНКИ ПРАВИЛЬНО!";
                resultText.style.color = "#e74c3c";
            }
        };
    }
})();

// === Задание №3: Логика отображения ответа ===
(function() {
    const checkBtn = document.getElementById('btn-3');
    const answerBlock = document.getElementById('answer-3');

    if (checkBtn && answerBlock) {
        checkBtn.onclick = function() {
            // Показываем блок с перечислением предметов
            answerBlock.style.display = 'block';
            
            // Прокрутка к ответу, если экран маленький
            answerBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Опционально: меняем текст кнопки после нажатия
            checkBtn.textContent = "ВЕРНО!";
            checkBtn.style.backgroundColor = "#27ae60";
            checkBtn.style.boxShadow = "0 6px 0 #1e8449";
        };
    }
})();


// === Задание №4: Логика подтверждения прочтения ===
(function() {
    const checkBtn = document.getElementById('btn-4');
    const resultText = document.getElementById('res-4');
    const pairs = document.querySelectorAll('.pair-row');

    if (checkBtn) {
        checkBtn.onclick = function() {
            // Подсвечиваем слова зеленым, подтверждая успешное повторение
            pairs.forEach(pair => {
                pair.classList.add('highlight');
            });

            resultText.textContent = "МОЛОДЕЦ! ОТЛИЧНАЯ ПАМЯТЬ!";
            resultText.style.color = "#27ae60";
            
            checkBtn.textContent = "ГОТОВО";
            checkBtn.disabled = true;
            checkBtn.style.opacity = "0.7";
            checkBtn.style.cursor = "default";
        };
    }
})();


// === Задание №5: Логика "Клякса" ===
(function() {
    const blots = document.querySelectorAll('.blot-item');
    const checkBtn = document.getElementById('btn-5');
    const resultDisplay = document.getElementById('res-5');

    // Клик по конкретной кляксе показывает предмет
    blots.forEach(blot => {
        blot.onclick = function() {
            this.classList.toggle('revealed');
            resultDisplay.textContent = this.dataset.answer.toUpperCase();
            resultDisplay.style.color = "#1a237e";
        };
    });

    // Общая проверка всех предметов
    if (checkBtn) {
        checkBtn.onclick = function() {
            resultDisplay.textContent = "подсолнух, солнце, сумка, пистолет, сковорода, часы, галстук";
            resultDisplay.style.color = "#27ae60";
            
            blots.forEach(b => b.classList.add('revealed'));
        };
    }
})();

// === Задание №6: Логика проверки (Комментарий: №6) ===
(function() {
    const checkBtn = document.getElementById('btn-6');
    const resultText = document.getElementById('res-6');
    const inputs = document.querySelectorAll('.sentence-input');

    if (checkBtn) {
        checkBtn.onclick = function() {
            let filledCount = 0;

            inputs.forEach(input => {
                const val = input.value.trim();
                if (val !== "") {
                    filledCount++;
                    input.classList.add('filled');
                    input.style.borderBottomColor = "#27ae60";
                } else {
                    input.classList.remove('filled');
                    input.style.borderBottomColor = "#e74c3c";
                }
            });

            if (filledCount === inputs.length) {
                resultText.textContent = "ОТЛИЧНО! ВСЕ ПРЕДЛОЖЕНИЯ ЗАПИСАНЫ!";
                resultText.style.color = "#27ae60";
                
                // Деактивируем поля после успеха
                inputs.forEach(input => input.disabled = true);
                checkBtn.textContent = "ГОТОВО";
                checkBtn.style.opacity = "0.6";
                checkBtn.disabled = true;
            } else {
                resultText.textContent = "ЗАПОЛНИ ВСЕ 6 СТРОЧЕК!";
                resultText.style.color = "#e74c3c";
            }
        };
    }
})();


// === Задание №7: Логика проверки (Комментарий: №7) ===
(function() {
    const checkBtn = document.getElementById('btn-7');
    const resultText = document.getElementById('res-7');
    const inputs = document.querySelectorAll('.sentence-input-7');

    if (checkBtn) {
        checkBtn.onclick = function() {
            let filledCount = 0;

            inputs.forEach(input => {
                if (input.value.trim().length > 5) { // Проверка, что предложение введено
                    filledCount++;
                    input.classList.add('correct');
                } else {
                    input.classList.remove('correct');
                    input.style.borderBottomColor = "#e74c3c";
                }
            });

            if (filledCount === inputs.length) {
                resultText.textContent = "МОЛОДЕЦ! ТЫ ОТЛИЧНО СЧИТАЕШЬ И СОСТАВЛЯЕШЬ ПРЕДЛОЖЕНИЯ!";
                resultText.style.color = "#27ae60";
                
                inputs.forEach(input => input.disabled = true);
                checkBtn.textContent = "ГОТОВО";
                checkBtn.disabled = true;
                checkBtn.style.opacity = "0.7";
            } else {
                resultText.textContent = "СОСТАВЬ ВСЕ ПРЕДЛОЖЕНИЯ!";
                resultText.style.color = "#e74c3c";
            }
        };
    }
})();

// === Задание №8: Логика отличий и звукового анализа ===
(function() {
    const checkBtn = document.getElementById('btn-8');
    const resultText = document.getElementById('res-8');
    const chips = document.querySelectorAll('.chip');

    // Интерактив для фишек (выбор ребенка)
    chips.forEach(chip => {
        chip.onclick = function() {
            // Убираем активность у соседей по строке
            const row = this.parentElement;
            row.querySelectorAll('.chip').forEach(c => c.classList.remove('active', 'wrong'));
            this.classList.add('active');
        };
    });

    if (checkBtn) {
        checkBtn.onclick = function() {
            // Перечисление найденных отличий
            const differences = "Найдено 5 отличий";
            
            resultText.innerHTML = `<p style="margin-bottom:10px;">${differences}</p><strong>ОТЛИЧНО! ТЫ ВСЁ НАШЕЛ И ПРАВИЛЬНО ОПРЕДЕЛИЛ ЗВУКИ!</strong>`;
            resultText.style.color = "#27ae60";
            
            checkBtn.textContent = "УРОК ЗАВЕРШЕН";
            checkBtn.disabled = true;
            checkBtn.style.opacity = "0.7";
        };
    }
})();

// === Задание №9: Логика соединения линиями (Комментарий: №9) ===
(function() {
    const container = document.getElementById('container-9');
    const canvas = document.getElementById('canvas-9');
    const ctx = canvas.getContext('2d');
    const items = document.querySelectorAll('.grid-item-9');
    const checkBtn = document.getElementById('btn-9');
    const clearBtn = document.getElementById('btn-9-clear');

    let firstItem = null;
    let connections = []; // Храним пары соединенных ID

    // Настройка размера канваса при загрузке и ресайзе
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        drawAllLines();
    }
    window.addEventListener('resize', resizeCanvas);
    setTimeout(resizeCanvas, 100);

    // Функция отрисовки одной линии
    function drawLine(x1, y1, x2, y2) {
        ctx.strokeStyle = '#00BFFF'; // Толстая синяя линия
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // Перерисовка всех накопленных линий
    function drawAllLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        connections.forEach(pair => {
            const el1 = document.getElementById(pair.from);
            const el2 = document.getElementById(pair.to);
            
            const rect1 = el1.getBoundingClientRect();
            const rect2 = el2.getBoundingClientRect();
            const contRect = container.getBoundingClientRect();

            const x1 = rect1.left + rect1.width / 2 - contRect.left;
            const y1 = rect1.top + rect1.height / 2 - contRect.top;
            const x2 = rect2.left + rect2.width / 2 - contRect.left;
            const y2 = rect2.top + rect2.height / 2 - contRect.top;

            drawLine(x1, y1, x2, y2);
        });
    }

    // Обработка клика по картинке
    items.forEach(item => {
        item.addEventListener('click', function() {
            if (!firstItem) {
                // Первый выбор
                firstItem = this;
                this.classList.add('selected');
            } else {
                // Второй выбор
                if (firstItem !== this) {
                    connections.push({ from: firstItem.id, to: this.id });
                    drawAllLines();
                }
                // Сброс выбора
                firstItem.classList.remove('selected');
                firstItem = null;
            }
        });
    });

    // Сброс
    clearBtn.onclick = function() {
        connections = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('res-9').textContent = "";
    };

    // Проверка (логика слогов)
    checkBtn.onclick = function() {
        // Здесь можно добавить проверку: правильные ли пары соединил ребенок
        // Для примера просто выводим похвалу
        document.getElementById('res-9').textContent = "ОТЛИЧНО! ТЫ СОЕДИНИЛ ВСЕ КАРТИНКИ!";
        document.getElementById('res-9').style.color = "#27ae60";
    };
})();

// === Задание №10: Логика выделения на панно (Комментарий: №10) ===
(function() {
    const cells = document.querySelectorAll('.cell-10');
    const resetBtn = document.getElementById('btn-10-reset');

    // Клик по ячейке сетки
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    // Кнопка сброса
    if (resetBtn) {
        resetBtn.onclick = function() {
            cells.forEach(cell => {
                cell.classList.remove('selected');
            });
        };
    }
})();


// === Задание №11: Логика проверки (Комментарий: №11) ===
(function() {
    const checkBtn = document.getElementById('btn-11');
    const answerBlock = document.getElementById('answer-11');

    if (checkBtn && answerBlock) {
        checkBtn.onclick = function() {
            // Показываем текстовый ответ
            answerBlock.style.display = 'block';
            
            // Плавная прокрутка к результату
            answerBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Оформление кнопки после нажатия
            checkBtn.textContent = "МОЛОДЕЦ!";
            checkBtn.style.backgroundColor = "#2e7d32";
            checkBtn.disabled = true;
            checkBtn.style.opacity = "0.8";
        };
    }
})();