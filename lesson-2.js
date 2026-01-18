document.addEventListener('DOMContentLoaded', () => {
    // Инфо
    document.getElementById('child-name-display').textContent = 'Ульяна';
    document.getElementById('lesson-date-display').textContent = '17.01.2026';

    // === Задание №1 Логика. Комментарий: задание 1 ===
    (function() {
        const checkBtn = document.getElementById('btn-1');
        const resMsg = document.getElementById('res-1');

        checkBtn.onclick = function() {
            resMsg.textContent = "🎉 ОТЛИЧНО! ВСЁ ВЕРНО!";
            resMsg.style.color = "#27ae60";
            checkBtn.style.backgroundColor = "#27ae60";
            checkBtn.style.boxShadow = "0 6px 0 #1e8449";
        };
    })();

    // === Задание №2 Логика. Комментарий: задание 2 ===
    (function() {
        const checkBtn = document.getElementById('btn-2');
        const resMsg = document.getElementById('res-2');

        checkBtn.onclick = function() {
            resMsg.textContent = "🎉 ВЕЛИКОЛЕПНО! ПИРАМИДА ПРОЙДЕНА!";
            resMsg.style.color = "#27ae60";
            checkBtn.style.backgroundColor = "#27ae60";
            checkBtn.style.boxShadow = "0 6px 0 #1e8449";
        };
    })();
});

// === Задание №3 Логика. Комментарий: задание 3 ===
    (function() {
        const checkBtn = document.getElementById('btn-3');
        const resMsg = document.getElementById('res-3');

        if (checkBtn) {
            checkBtn.onclick = function() {
                resMsg.textContent = "🎉 МОЛОДЕЦ! ТЫ НАЗВАЛА ВСЕ МЕЧТЫ К СЮШИ!";
                resMsg.style.color = "#27ae60";
                
                // Стилизация кнопки после нажатия в стиле lesson-8
                checkBtn.style.backgroundColor = "#27ae60";
                checkBtn.style.boxShadow = "0 6px 0 #1e8449";
                checkBtn.textContent = "ВЫПОЛНЕНО";
            };
        }
    })();

    // === Задание №4 Логика. Комментарий: задание 4 ===
    (function() {
        const checkBtn = document.getElementById('btn-4');
        const inputs = document.querySelectorAll('.story-input-4');
        const resMsg = document.getElementById('res-4');

        if (checkBtn) {
            checkBtn.onclick = function() {
                let filledCount = 0;
                inputs.forEach(input => {
                    if (input.value.trim().length > 3) {
                        input.style.borderColor = "#27ae60";
                        filledCount++;
                    } else {
                        input.style.borderColor = "#e74c3c";
                    }
                });

                if (filledCount === 4) {
                    resMsg.textContent = "🎉 ВЕЛИКОЛЕПНО!";
                    resMsg.style.color = "#27ae60";
                    checkBtn.style.backgroundColor = "#27ae60";
                } else {
                    resMsg.textContent = "ЗАПОЛНИ ВСЕ ПОЛЯ.";
                    resMsg.style.color = "#e74c3c";
                }
            };
        }
    })();


    // === Задание №5 Логика. Комментарий: задание 5 ===
(function() {
    const canvas = document.getElementById('canvas-5');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('draw-container-5');
    const img = container.querySelector('img');

    let isDrawing = false;
    let startX, startY;
    let lines = [];

    // Функция подгонки холста под размер картинки
    function resize() {
        canvas.width = img.offsetWidth;
        canvas.height = img.offsetHeight;
        drawAll();
    }

    // Ждем загрузки картинки, чтобы знать её размеры
    if (img.complete) {
        resize();
    } else {
        img.onload = resize;
    }
    window.addEventListener('resize', resize);

    // Обработка клика
    canvas.addEventListener('mousedown', function(e) {
        e.preventDefault(); // Блокируем системные события
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (!isDrawing) {
            // Ставим начальную точку
            startX = x;
            startY = y;
            isDrawing = true;
            
            // Сразу рисуем маленькую точку, чтобы видеть начало
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.arc(startX, startY, 4, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Ставим конечную точку и сохраняем линию
            lines.push({ x1: startX, y1: startY, x2: x, y2: y });
            isDrawing = false;
            drawAll();
        }
    });

    function drawAll() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        lines.forEach(l => {
            ctx.beginPath();
            ctx.moveTo(l.x1, l.y1);
            ctx.lineTo(l.x2, l.y2);
            ctx.stroke();
        });
    }

    // Кнопка сброса
    document.getElementById('btn-reset-5').onclick = function() {
        lines = [];
        isDrawing = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('res-5').textContent = "";
    };

    // Кнопка проверки
    document.getElementById('btn-5').onclick = function() {
        const resMsg = document.getElementById('res-5');
        resMsg.textContent = "🎉 ЗАДАНИЕ ВЫПОЛНЕНО!";
        resMsg.style.color = "#27ae60";
    };
})();

// === Задание №6 Логика. Комментарий: задание 6 ===
    (function() {
        const checkBtn = document.getElementById('btn-6');
        const inputs = document.querySelectorAll('.rhyme-input-final');
        const resMsg = document.getElementById('res-6');

        if (checkBtn) {
            checkBtn.onclick = function() {
                let allCorrect = true;
                inputs.forEach(input => {
                    const val = input.value.trim().toUpperCase();
                    if (val === input.dataset.answer) {
                        input.style.backgroundColor = "#e8f5e9";
                        input.style.borderColor = "#4caf50";
                    } else {
                        input.style.backgroundColor = "#ffebee";
                        input.style.borderColor = "#f44336";
                        allCorrect = false;
                    }
                });

                if (allCorrect) {
                    resMsg.textContent = "✅ МОЛОДЕЦ! РИФМЫ ВЕРНЫЕ!";
                    resMsg.style.color = "#2e7d32";
                } else {
                    resMsg.textContent = "❌ ПОДУМАЙ ЕЩЁ!";
                    resMsg.style.color = "#c62828";
                }
            };
        }
    })();


    // === Задание №7 Логика. Комментарий: задание 7 ===
(function() {
    const samples = document.querySelectorAll('.color-sample');
    const boxes = document.querySelectorAll('.color-item-box');
    const checkBtn = document.getElementById('btn-7');
    let activeColor = null;

    // 1. Выбор цвета в палитре (строго 7 цветов радуги)
    samples.forEach(s => {
        s.onclick = function() {
            samples.forEach(i => i.classList.remove('active-color'));
            this.classList.add('active-color');
            // Используем trim() для исключения ошибок с пробелами в HTML
            activeColor = this.dataset.color.trim().toLowerCase();
        };
    });

    // 2. Раскрашивание (Замена src на цветную версию)
    boxes.forEach(box => {
        box.onclick = function() {
            if (!activeColor) return;
            
            const img = this.querySelector('img');
            const base = this.dataset.baseSrc; 
            
            // Генерируем новый путь. Теперь он точно подхватит "green"
            const newPath = `images/${base}-${activeColor}.png`;
            
            // Устанавливаем новый src
            img.src = newPath;
            
            // Сохраняем выбор для проверки
            this.dataset.userChoice = activeColor;
        };
    });

    // 3. Проверка результата
    if (checkBtn) {
        checkBtn.onclick = function() {
            let winCount = 0;
            boxes.forEach(b => {
                // Сравниваем выбор ребенка с эталоном из data-correct
                if (b.dataset.userChoice === b.dataset.correct) winCount++;
            });

 //           const res = document.getElementById('res-7');
 //           if (winCount = 6) {
 //               res.textContent = "✅ ВЕЛИКОЛЕПНО! ВСЕ ЦВЕТА ВЕРНЫЕ!";
//                res.style.color = "#2e7d32";
 //           } else {
 //               res.textContent = "❌ ПРОВЕРЬ ЕЩЁ РАЗ!";
 //               res.style.color = "#c62828";
 //           }
        };
    }
})();

// === Задание №8 Логика. Комментарий: задание 8 ===
(function() {
    const container = document.getElementById('comic-grid');
    let draggingElement = null;

    // Функция обновления номеров на плитках (просто 1-6 по порядку в DOM)
    function updateNumbers() {
        const items = container.querySelectorAll('.comic-item');
        items.forEach((item, index) => {
            item.querySelector('.number-badge').textContent = index + 1;
        });
    }

    updateNumbers();

    // Drag and Drop события
    container.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('comic-item')) {
            draggingElement = e.target;
            e.target.classList.add('dragging');
        }
    });

    container.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('comic-item')) {
            e.target.classList.remove('dragging');
            draggingElement = null;
            updateNumbers();
        }
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
        if (afterElement == null) {
            container.appendChild(draggingElement);
        } else {
            container.insertBefore(draggingElement, afterElement);
        }
    });

    function getDragAfterElement(container, x, y) {
        const draggableElements = [...container.querySelectorAll('.comic-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Проверка
    document.getElementById('btn-8').onclick = function() {
        const items = [...container.querySelectorAll('.comic-item')];
        const currentOrder = items.map(item => item.dataset.order).join('');
        const correctOrder = "123456"; // Снеговика лепят -> Сова прилетела -> Бум!
        const story = document.getElementById('story-text').value.trim();

        const res = document.getElementById('res-8');
        
        
            res.textContent = "✅ ОТЛИЧНО! ТЫ РАССТАВИЛ ВСЁ ВЕРНО И НАПИСАЛ РАССКАЗ!";
            res.style.color = "#2e7d32";
     
    };
})();


// === Задание №9 Логика. Комментарий: задание 9 ===
(function() {
    const rows = document.querySelectorAll('.ladder-row');
    const checkBtn = document.getElementById('btn-9');

    // Автопереход фокуса
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        inputs.forEach((input, index) => {
            input.oninput = function() {
                if (this.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            };
        });
    });

    if (checkBtn) {
        checkBtn.onclick = function() {
            let isWin = true;
            rows.forEach(row => {
                const target = row.dataset.word;
                const inputs = row.querySelectorAll('input');
                let word = 'С';
                inputs.forEach(i => word += i.value.trim().toUpperCase());

                if (word === target) {
                    inputs.forEach(i => i.style.backgroundColor = "#e8f5e9");
                } else {
                    isWin = false;
                    inputs.forEach(i => i.style.backgroundColor = "#ffebee");
                }
            });

            const res = document.getElementById('res-9');
            res.textContent = isWin ? "✅ ВЕРНО! ЛЕСЕНКА ГОТОВА." : "❌ ОШИБКА В СЛОВАХ";
            res.style.color = isWin ? "#2e7d32" : "#c62828";
        };
    }
})();


// === Задание №10. Комментарий: задание 10 ===
(function() {
    const checkBtn = document.getElementById('btn-10');
    if (checkBtn) {
        checkBtn.onclick = function() {
            const res = document.getElementById('res-10');
            res.textContent = "✅ МОЛОДЕЦ! ТЫ ОТЛИЧНО ПРОГОВОРИЛ ВСЕ ЗВУКИ!";
            res.style.color = "#2e7d32";
            this.style.display = "none"; // Прячем кнопку после нажатия
        };
    }
})();