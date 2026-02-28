document.addEventListener('DOMContentLoaded', () => {

    // === ЛОГИКА ЗАДАНИЯ №1 (КЛИКИ) ===
    let clickCount11 = 0;
    const searchImg = document.getElementById('search-image');
    const btn1 = document.getElementById('btn-11-1');
    const res1 = document.getElementById('res-11-1');

    if (searchImg) {
        searchImg.onclick = () => {
            clickCount11++;                     // Считаем клики по всей картинке
        };
    }

    btn1.onclick = () => {
        if (clickCount11 > 10) {                // Условие успеха: более 10 кликов
            res1.textContent = "🏆 МОЛОДЕЦ! ТЫ НАШЁЛ ВСЕ БУКВЫ!";
            res1.style.color = "#27ae60";
        } else {
            res1.textContent = "ПОСМОТРИ ВНИМАТЕЛЬНЕЕ И ПОИЩИ ЕЩЁ!";
            res1.style.color = "#e74c3c";
        }
    };

    // === ЛОГИКА ЗАДАНИЯ №2 (DRAG-AND-DROP) ===
    let scoreDrag = 0;
    const dragItems = document.querySelectorAll('.drag-item-11');
    const targets = document.querySelectorAll('.drop-target-11');
    const btn2 = document.getElementById('btn-11-2');
    const res2 = document.getElementById('res-11-2');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id); // Запоминаем ID при захвате
        });
    });

    targets.forEach(target => {
        target.addEventListener('dragover', (e) => e.preventDefault()); // Разрешаем сброс
        
        target.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData('text');
            
            // Если ID совпадает с меткой в data-match
            if (draggedId === target.dataset.match) {
                const element = document.getElementById(draggedId);
                target.innerHTML = '';          // Удаляем тень из левой сетки
                target.appendChild(element);    // Перемещаем картинку (исчезает из правой)
                target.style.border = "5px solid #8bc34a";
                scoreDrag++;
            }
        });
    });

    btn2.onclick = () => {
        if (scoreDrag === 9) {                  // Все 9 пар найдены
            res2.textContent = "🎉 ВЕЛИКОЛЕПНО! ВСЕ ТЕНИ СОВПАЛИ!";
            res2.style.color = "#27ae60";
        } else {
            res2.textContent = "ПОПРОБУЙ СОЕДИНИТЬ ВСЕ ПАРЫ!";
            res2.style.color = "#e74c3c";
        }
    };
});

(function() {
    let score3 = 0;
    const totalItems = 5;

    const container = document.getElementById('clothes-container');
    const clothesCells = Array.from(container.children);
    const zones = document.querySelectorAll('#task-11-3 .target-zone');

    // === 1. СЛУЧАЙНЫЙ ПОРЯДОК ОДЕЖДЫ (Fisher-Yates Shuffle) ===
    for (let i = clothesCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(clothesCells[j]);
    }

    // === 2. ЛОГИКА ПЕРЕТАСКИВАНИЯ ===
    const dragItems = document.querySelectorAll('.drag-cloth');
    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            // Передаем ID одежды
            e.dataTransfer.setData('targetHero', e.target.id);
        });
    });

    zones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            // Подсветка при наведении, если герой еще не "исправлен"
            if (!zone.classList.contains('fixed-success')) {
                zone.classList.add('drag-hover');
            }
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-hover');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-hover');

            const clothId = e.dataTransfer.getData('targetHero');
            
            // Проверка на соответствие героя и одежды
            if (clothId === zone.dataset.hero) {
                // УСПЕХ: Если это правильный герой и он еще не был одет
                if (!zone.classList.contains('fixed-success')) {
                    // 1. Меняем картинку героя на правильную (без -wrong)
                    const heroImg = zone.querySelector('.character-portrait');
                    heroImg.src = 'images/' + clothId + '.png'; 

                    // 2. ОДЕЖДА НЕ ИСЧЕЗАЕТ (согласно вашему требованию)
                    // Мы просто ничего не делаем с элементом clothImg в нижнем ряду

                    // 3. Визуально фиксируем ячейку героя
                    zone.classList.add('fixed-success');
                    score3++;
                }
            } else {
                // ОШИБКА: Визуальная индикация неправильного выбора
                zone.style.borderColor = "#e74c3c";
                setTimeout(() => {
                    if (!zone.classList.contains('fixed-success')) {
                        zone.style.borderColor = "#b2ebf2";
                    }
                }, 500);
            }
        });
    });

    // === 3. КНОПКА ПРОВЕРКИ ===
    document.getElementById('btn-11-3').onclick = () => {
        const res = document.getElementById('res-11-3');
        if (score3 === totalItems) {
            res.textContent = "🏆 ПРЕВОСХОДНО! ВСЕ ГЕРОИ ОДЕТЫ ПРАВИЛЬНО!";
            res.style.color = "#27ae60";
        } else {
            res.textContent = "ПОМОГИ ОСТАЛЬНЫМ ГЕРОЯМ НАЙТИ ИХ ВЕЩИ!";
            res.style.color = "#e74c3c";
        }
    };
})();

// Единый обработчик для Задания 4 (Один — много)
document.addEventListener('click', function(event) {
    // Проверяем, нажата ли кнопка именно четвертого задания
    if (event.target && event.target.id === 'btn-11-4') {
        
        const container = document.getElementById('task-11-4');
        const resultMsg = document.getElementById('res-11-4');
        const inputs = container.querySelectorAll('.plural-input');
        
        let correctCount = 0;
        let hasEmpty = false;

        inputs.forEach(input => {
            const userVal = input.value.trim().toUpperCase();
            const correctAns = input.getAttribute('data-answer').toUpperCase();

            if (userVal === "") {
                hasEmpty = true;
                input.style.border = "4px solid #ff9800"; // Оранжевый для пустых
            } else if (userVal === correctAns) {
                input.style.border = "4px solid #27ae60"; // Зеленый для верных
                input.style.backgroundColor = "#e8f5e9";
                correctCount++;
            } else {
                input.style.border = "4px solid #e74c3c"; // Красный для ошибок
                input.style.backgroundColor = "#ffebee";
            }
        });

        // ЛОГИКА ВЫВОДА СООБЩЕНИЙ
        if (correctCount === inputs.length) {
            // Если всё правильно
            resultMsg.style.color = "#27ae60";
            resultMsg.innerHTML = "<b>🏆 ВЕЛИКОЛЕПНО! ТЫ ПРАВИЛЬНО НАЗВАЛ ВСЕ СЛОВА!</b>";
        } else if (hasEmpty) {
            // Если есть пустые поля
            resultMsg.style.color = "#ff9800";
            resultMsg.innerHTML = "<b>ТЫ ЗАПОЛНИЛ НЕ ВСЕ СЛОВА! ПОПРОБУЙ ЕЩЁ.</b>";
        } else {
            // Если есть ошибки в написании
            resultMsg.style.color = "#e74c3c";
            resultMsg.innerHTML = "<b>ЕСТЬ ОШИБКИ В СЛОВАХ. ПОСМОТРИ ВНИМАТЕЛЬНЕЕ!</b>";
        }
    }
});

// Автоматический перевод ввода в верхний регистр (живой ввод)
document.addEventListener('input', function(event) {
    if (event.target && event.target.classList.contains('plural-input')) {
        event.target.value = event.target.value.toUpperCase();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('letter-grid');
    const resultDisplay = document.getElementById('res-11-5');

    // 1. ЛОГИКА ПОДСВЕТКИ ПРИ НАВЕДЕНИИ
    grid.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.classList.contains('letter-box') && !target.classList.contains('hidden')) {
            const char = target.dataset.char;
            const row = target.closest('.letter-row');
            
            // Находим все ТАКИЕ ЖЕ буквы в этой СТРОКЕ
            const allVisibleInRow = row.querySelectorAll('.letter-box:not(.hidden)');
            const sameChars = Array.from(allVisibleInRow).filter(box => box.dataset.char === char);

            // Если их больше одной — подсвечиваем всю группу КРАСНЫМ
            if (sameChars.length > 1) {
                sameChars.forEach(box => box.classList.add('highlight-red'));
            }
        }
    });

    // Убираем подсветку при выходе мышки
    grid.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('letter-box')) {
            const row = e.target.closest('.letter-row');
            row.querySelectorAll('.letter-box').forEach(box => box.classList.remove('highlight-red'));
        }
    });

    // 2. ЛОГИКА УДАЛЕНИЯ ВСЕЙ ГРУППЫ ПРИ КЛИКЕ
    grid.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('letter-box') && !target.classList.contains('hidden')) {
            const char = target.dataset.char;
            const row = target.closest('.letter-row');
            const allVisibleInRow = row.querySelectorAll('.letter-box:not(.hidden)');
            const sameChars = Array.from(allVisibleInRow).filter(box => box.dataset.char === char);

            // Удаляем только если есть повторы (группа подсвечена красным)
            if (sameChars.length > 1) {
                sameChars.forEach(box => {
                    box.classList.add('hidden');
                    box.classList.remove('highlight-red');
                });
            }
        }
    });

    // 3. ПРОВЕРКА ИТОГОВОГО РЕЗУЛЬТАТА
    document.getElementById('btn-11-5').onclick = () => {
        const rows = document.querySelectorAll('.letter-row');
        let error = false;

        rows.forEach(row => {
            const leftLetters = row.querySelectorAll('.letter-box:not(.hidden)');
            const charMap = {};
            leftLetters.forEach(box => {
                const c = box.dataset.char;
                charMap[c] = (charMap[c] || 0) + 1;
            });
            // Если в любой строке остался хоть один дубликат — задание не закончено
            if (Object.values(charMap).some(val => val > 1)) error = true;
        });

        if (!error) {
            resultDisplay.innerHTML = "<b>🏆 ВЕРНО! ЛИШНИЕ БУКВЫ УДАЛЕНЫ!</b>";
            resultDisplay.style.color = "#27ae60";
        } else {
            resultDisplay.innerHTML = "<b>ПОИЩИ ЕЩЁ ПОВТОРЯЮЩИЕСЯ БУКВЫ!</b>";
            resultDisplay.style.color = "#e74c3c";
        }
    };
});


// Логика Задания 6: Смена картинок
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('btn-11-6-next');
    const mainImg = document.getElementById('flower-field-img');
    const instruction = document.querySelector('#task-11-6 .card-instruction');

    if (nextBtn && mainImg) {
        nextBtn.onclick = () => {
            // Плавное исчезновение
            mainImg.style.opacity = '0';

            setTimeout(() => {
                // Смена пути к картинке (подготовьте файл lesson-11-6-end.png)
                // Если картинка только одна и она должна просто скрыться/поменяться — укажите путь
                mainImg.src = 'images/lesson-11-6-end.png'; 
                
                // Меняем инструкцию для второго этапа
                instruction.innerHTML = "А теперь вспомни и <b>назови все предметы</b>, которые были на цветах!";
                
                // Плавное появление
                mainImg.style.opacity = '1';

                // Скрываем кнопку после нажатия, так как этап пройден
                nextBtn.style.display = 'none';
            }, 500);
        };
    }
});

(function() {
    let pheasantClicks = 0;
    const imgElement = document.getElementById('pheasant-img');
    const checkBtn = document.getElementById('btn-11-7');
    const resultMsg = document.getElementById('res-11-7');

    if (imgElement) {
        // Считаем клики по картинке
        imgElement.onclick = () => {
            pheasantClicks++;
            // Кратковременная подсветка рамки при клике для обратной связи
            imgElement.style.boxShadow = "0 0 15px #ff6d00";
            setTimeout(() => { imgElement.style.boxShadow = "none"; }, 200);
        };
    }

    if (checkBtn) {
        checkBtn.onclick = () => {
            // Условие: найдено не менее 5 фазанов
            if (pheasantClicks >= 5) {
                // Меняем картинку на цветную
                imgElement.src = 'images/lesson-11-7-2.png'; 
                
                resultMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ НАШЁЛ ВСЕХ ФАЗАНОВ!</b>";
                resultMsg.style.color = "#27ae60";
                
                // Скрываем кнопку после успеха
                checkBtn.style.display = 'none';
            } else {
                resultMsg.innerHTML = "<b>ПОСМОТРИ ВНИМАТЕЛЬНЕЕ, ТУТ ЕЩЁ ЕСТЬ ФАЗАНЫ!</b>";
                resultMsg.style.color = "#e74c3c";
            }
        };
    }
})();

(function() {
    let selectedLeft = null;
    let matchesCount = 0;
    const svg = document.getElementById('svg-11-8');
    const container = document.getElementById('match-container-11-8');

    // Клик по левой колонке
    document.querySelectorAll('.left-column .word-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('matched')) return;
            
            // Снимаем выделение с других
            document.querySelectorAll('.left-column .word-item').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            selectedLeft = item;
        });
    });

    // Клик по правой колонке
    document.querySelectorAll('.right-column .word-item').forEach(target => {
        target.addEventListener('click', () => {
            if (!selectedLeft || target.classList.contains('matched')) return;

            // Проверка пары
            if (selectedLeft.dataset.pair === target.dataset.word) {
                createLine(selectedLeft, target);
                selectedLeft.classList.add('matched');
                target.classList.add('matched');
                selectedLeft.classList.remove('selected');
                selectedLeft = null;
                matchesCount++;
            } else {
                // Ошибка: тряска
                target.style.borderColor = "#e74c3c";
                setTimeout(() => target.style.borderColor = "#ffd600", 500);
            }
        });
    });

    // Функция отрисовки линии
    function createLine(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();

        const x1 = rect1.right - contRect.left;
        const y1 = rect1.top + rect1.height / 2 - contRect.top;
        const x2 = rect2.left - contRect.left;
        const y2 = rect2.top + rect2.height / 2 - contRect.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'connection-line');
        svg.appendChild(line);
    }

    // Проверка
    document.getElementById('btn-11-8').onclick = () => {
        const res = document.getElementById('res-11-8');
        if (matchesCount === 4) {
            res.innerHTML = "<b>🏆 МОЛОДЕЦ! ВСЕ ПАРЫ СОСТАВЛЕНЫ ВЕРНО!</b>";
            res.style.color = "#27ae60";
        } else {
            res.innerHTML = "<b>СОЕДИНИ ВСЕ СЛОВА В ПАРЫ!</b>";
            res.style.color = "#e74c3c";
        }
    };
})();

(function() {
    let firstChoice = null;
    let pairsFound = 0;
    const svg = document.getElementById('svg-11-9');
    const container = document.getElementById('syllable-container');

    document.querySelectorAll('#task-11-9 .img-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('matched')) return;

            if (!firstChoice) {
                // Первый выбор
                firstChoice = item;
                item.classList.add('selected');
            } else if (firstChoice === item) {
                // Отмена выбора
                item.classList.remove('selected');
                firstChoice = null;
            } else {
                // Второй выбор - проверка слогов
                if (firstChoice.dataset.syllables === item.dataset.syllables) {
                    drawSyllableLine(firstChoice, item);
                    firstChoice.classList.add('matched');
                    item.classList.add('matched');
                    pairsFound++;
                } else {
                    // Ошибка
                    item.style.borderColor = "#e74c3c";
                    setTimeout(() => item.style.borderColor = "#81d4fa", 500);
                }
                firstChoice.classList.remove('selected');
                firstChoice = null;
            }
        });
    });

    function drawSyllableLine(el1, el2) {
        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();
        const cR = container.getBoundingClientRect();

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', r1.left + r1.width/2 - cR.left);
        line.setAttribute('y1', r1.top + r1.height/2 - cR.top);
        line.setAttribute('x2', r2.left + r2.width/2 - cR.left);
        line.setAttribute('y2', r2.top + r2.height/2 - cR.top);
        line.setAttribute('class', 'connection-line'); // Используем класс из CSS
        line.style.stroke = "#ff6d00";
        line.style.strokeWidth = "5";
        svg.appendChild(line);
    }

    document.getElementById('btn-11-9').onclick = () => {
        const res = document.getElementById('res-11-9');
        if (pairsFound === 3) {
            res.innerHTML = "<b>🏆 ВЕРНО! ВСЕ СЛОГИ СОВПАЛИ!</b>";
            res.style.color = "#27ae60";
        } else {
            res.innerHTML = "<b>НАЙДИ ВСЕ ПАРЫ С ОДИНАКОВЫМ КОЛИЧЕСТВОМ СЛОГОВ!</b>";
            res.style.color = "#e74c3c";
        }
    };
})();


(function() {
    const checkBtn = document.getElementById('btn-11-10');
    const inputs = document.querySelectorAll('.sentence-input');
    const resultMsg = document.getElementById('res-11-10');

    // Подсветка при заполнении
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim().length > 3) {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            let allFilled = true;
            
            inputs.forEach(input => {
                // Проверяем, что введено хотя бы несколько слов (минимум 5 символов)
                if (input.value.trim().length < 5) {
                    allFilled = false;
                    input.style.borderBottomColor = "#e74c3c";
                } else {
                    input.style.borderBottomColor = "#27ae60";
                }
            });

            if (allFilled) {
                resultMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ СОСТАВИЛ ОТЛИЧНЫЕ ПРЕДЛОЖЕНИЯ!</b>";
                resultMsg.style.color = "#27ae60";
            } else {
                resultMsg.innerHTML = "<b>ПОЖАЛУЙСТА, СОСТАВЬ ПРЕДЛОЖЕНИЯ КО ВСЕМ КАРТИНКАМ!</b>";
                resultMsg.style.color = "#e74c3c";
            }
        };
    }
})();