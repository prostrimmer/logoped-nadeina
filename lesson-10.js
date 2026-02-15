document.addEventListener('DOMContentLoaded', () => {
    // Установка данных ученика
    document.getElementById('child-name-display').textContent = 'Ульяна';
    document.getElementById('lesson-date-display').textContent = '08.02.2026';

    const cards = document.querySelectorAll('.img-card');
    const checkBtn = document.getElementById('btn-1-10');
    const resMsg = document.getElementById('res-1-10');

    // Логика выделения картинок
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // При клике сбрасываем цвета предыдущей проверки
            card.classList.remove('correct', 'wrong');
            card.classList.toggle('selected');
        });
    });

    // Проверка задания
    checkBtn.onclick = () => {
        let hasErrors = false;
        let selectedCount = 0;
        const correctRequired = document.querySelectorAll('.img-card[data-correct="true"]').length;

        cards.forEach(card => {
            const isCorrect = card.getAttribute('data-correct') === 'true';
            const isSelected = card.classList.contains('selected');

            card.classList.remove('correct', 'wrong');

            if (isSelected) {
                selectedCount++;
                if (isCorrect) {
                    card.classList.add('correct');
                } else {
                    card.classList.add('wrong');
                    hasErrors = true;
                }
            } else if (isCorrect) {
                // Если правильный ответ не выбран
                hasErrors = true;
            }
        });

        if (selectedCount === 0) {
            resMsg.textContent = "Сначала выбери картинки!";
            resMsg.style.color = "#ff7043";
        } else if (!hasErrors && selectedCount === correctRequired) {
            resMsg.textContent = "🌟 МОЛОДЕЦ! ТЫ НАШЁЛ ВСЕ СЛОВА!";
            resMsg.style.color = "#4caf50";
        } else {
            resMsg.textContent = "ПОПРОБУЙ ЕЩЁ РАЗ!";
            resMsg.style.color = "#ef5350";
        }
    };
});

// === Задание №2. Обработка нажатия ПРАВОЙ кнопкой мыши (ПКМ) ===
/* Урок №10. Комментарий: Логика проверки текстового ввода для Задания 2 */

(function() {
    const btn = document.getElementById('btn-10-2');
    if (!btn) return;

    btn.onclick = () => {
        const inputs = document.querySelectorAll('.word-input-10');
        const res = document.getElementById('res-10-2');
        let errorCount = 0;

        inputs.forEach(input => {
            const val = input.value.trim().toUpperCase();       /* Приведение к верхнему регистру */
            const ans = input.getAttribute('data-ans');         /* Эталонное значение из атрибута */

            if (val === ans) {
                input.classList.remove('wrong');
                input.classList.add('correct');                 /* Установка зеленой рамки */
            } else if (val !== "") {
                input.classList.remove('correct');
                input.classList.add('wrong');                   /* Установка красной рамки */
                errorCount++;
            } else {
                errorCount++;                                   /* Пустое поле тоже ошибка */
            }
        });

        if (errorCount === 0) {
            res.textContent = "✨ ПРЕКРАСНО! ТЫ ПРОЧИТАЛ ВСЕ СЛОВА!";
            res.style.color = "#4caf50";
        } else {
            res.textContent = "ПОСМОТРИ ЕЩЁ РАЗ, ЧТО-ТО НЕ СОВПАДАЕТ!";
            res.style.color = "#ef5350";
        }
    };
})();

/* Урок №10. Комментарий: Логика выбора предметов на едином рисунке ЛКМ */

(function() {
    const zones = document.querySelectorAll('.click-zone');

    zones.forEach(zone => {
        // Нажатие левой кнопкой мыши
        zone.addEventListener('click', (e) => {
            if (e.button === 0) {               /* Проверка на ЛКМ */
                // Переключение выделения (активен/неактивен)
                zone.classList.toggle('active');
            }
        });

        // Блокировка контекстного меню на предметах
        zone.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    });
})();

/* Урок №10. Комментарий: Логика проверки 4-х лишних с финальным результатом */

(function() {
    const items = document.querySelectorAll('.item-16');
    const checkBtn = document.getElementById('btn-check-10-4');
    const resultMsg = document.getElementById('res-10-4');

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.button !== 0) return;         /* Только левая кнопка мыши */
            
            // В одном ряду может быть выбран только один предмет
            const row = item.parentElement;
            row.querySelectorAll('.item-16').forEach(el => el.classList.remove('active'));
            
            item.classList.add('active');       /* Визуальный выбор ребенка */
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            let correctCount = 0;
            const selectedItems = document.querySelectorAll('.item-16.active');

            selectedItems.forEach(selected => {
                const status = selected.getAttribute('data-status');
                if (status === 'extra') {
                    correctCount++;
                    selected.classList.add('correct-border'); /* Фиксируем красный контур */
                } else {
                    selected.classList.remove('active');      /* Сбрасываем неверный выбор */
                }
            });

            if (correctCount === 4) {
                resultMsg.textContent = "✨ МОЛОДЕЦ! ТЫ НАШЁЛ ВСЕ ЛИШНИЕ ПРЕДМЕТЫ!";
                resultMsg.style.color = "#4caf50";
            } else {
                resultMsg.textContent = "ПОСМОТРИ ЕЩЁ РАЗ ВНИМАТЕЛЬНО!";
                resultMsg.style.color = "#ef5350";
            }
        };
    }
})();


/* Урок №10. Комментарий: Логика последовательного заполнения слов по клику */

(function() {
    const images = document.querySelectorAll('.img-choice');
    const drops = document.querySelectorAll('.drop-word');
    const checkBtn = document.getElementById('btn-check-10-5');
    const resetBtn = document.getElementById('btn-reset-10-5');
    const resultMsg = document.getElementById('res-10-5');
    
    let currentIndex = 0;

    images.forEach(img => {
        img.addEventListener('click', () => {
            if (currentIndex < drops.length) {
                const word = img.getAttribute('data-txt');
                drops[currentIndex].textContent = word; // Вставка текста в предложение
                img.classList.add('selected');          // Выделение картинки
                currentIndex++;
            }
        });
    });

    resetBtn.onclick = () => {
        currentIndex = 0;
        drops.forEach(d => d.textContent = "...");
        images.forEach(i => i.classList.remove('selected'));
        resultMsg.textContent = "";
    };

    checkBtn.onclick = () => {
        if (currentIndex === 12) {
            resultMsg.textContent = "✨ МОЛОДЕЦ! ТЫ СОБРАЛ ВСЕ ПРЕДЛОЖЕНИЯ!";
            resultMsg.style.color = "#4caf50";
        } else {
            resultMsg.textContent = "ЗАПОЛНИ ВСЕ ПРЕДЛОЖЕНИЯ!";
            resultMsg.style.color = "#ef5350";
        }
    };
})();

/* Урок №10. Комментарий: Логика клика по зонам и формирования списка находок */

(function() {
    const zones = document.querySelectorAll('.find-zone');
    const tagsContainer = document.getElementById('tags-6');
    const checkBtn = document.getElementById('btn-check-10-6');
    const resultMsg = document.getElementById('res-10-6');
    
    let foundCount = 0;
    const totalToFind = zones.length;

    zones.forEach(zone => {
        zone.addEventListener('click', (e) => {
            if (e.button !== 0 || zone.classList.contains('active')) return;

            zone.classList.add('active');
            foundCount++;

            // Создаем текстовую метку найденного предмета
            const itemName = zone.getAttribute('data-item');
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = itemName;
            tagsContainer.appendChild(tag);
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            if (foundCount === totalToFind) {
                resultMsg.textContent = "✨ МОЛОДЕЦ! ТЫ НАШЁЛ ВСЕ ПРЕДМЕТЫ!";
                resultMsg.style.color = "#4caf50";
            } else {
                resultMsg.textContent = "ЗДЕСЬ СПРЯТАНО ЕЩЁ ЧТО-ТО! ПОСМОТРИ ВНИМАТЕЛЬНО.";
                resultMsg.style.color = "#ef5350";
            }
        };
    }
})();

/* Урок №10. Комментарий: Логика клика по буквам и замены изображения на цветное */

(function() {
    const hitboxes = document.querySelectorAll('.letter-hitbox');
    const mainImg = document.getElementById('main-img-7');
    const checkBtn = document.getElementById('btn-check-10-7');
    const resultMsg = document.getElementById('res-10-7');
    
    let foundCount = 0;
    const totalLetters = hitboxes.length;

    hitboxes.forEach(box => {
        box.addEventListener('click', (e) => {
            if (e.button === 0 && !box.classList.contains('found')) {
                box.classList.add('found');
                foundCount++;
            }
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            if (foundCount === totalLetters) {
                // Меняем путь к картинке на раскрашенную версию
                mainImg.src = "images/lesson-10-7-2.png";
                
                // Скрываем маркеры поиска, чтобы не мешали смотреть на цветную картинку
                hitboxes.forEach(b => b.style.display = 'none');

                resultMsg.textContent = "✨ МОЛОДЕЦ! ТЫ НАШЁЛ ВСЕ БУКВЫ И РАСКРАСИЛ КАРТИНКУ!";
                resultMsg.style.color = "#4caf50";
            } else {
                resultMsg.textContent = "ТЫ НАШЁЛ ЕЩЁ НЕ ВСЕ БУКВЫ С!";
                resultMsg.style.color = "#ef5350";
            }
        };
    }
})();

/* Урок №10. Комментарий: Логика проверки 8 уникальных слов из списка */

(function() {
    const checkBtn = document.getElementById('btn-check-10-8');
    const resultMsg = document.getElementById('res-10-8');
    const inputs = document.querySelectorAll('.word-input-8');

    // Эталонный список слов для проверки
    const dictionary = [
        'слон', 'лиса', 'светофор', 'самокат', 'сосна', 
        'бусы', 'сумка', 'сарафан', 'лес', 'лисёнок'
    ];

    if (checkBtn) {
        checkBtn.onclick = () => {
            let answers = [];
            
            inputs.forEach(input => {
                const word = input.value.trim().toLowerCase();
                // Условие: слово не пустое, есть в словаре и еще не введено (уникальность)
                if (word && dictionary.includes(word) && !answers.includes(word)) {
                    answers.push(word);
                    input.style.borderColor = "#4caf50"; // Подсветка верного
                } else if (word !== "") {
                    input.style.borderColor = "#ef5350"; // Подсветка ошибки
                }
            });

            if (answers.length >= 8) {
                resultMsg.textContent = "✨ МОЛОДЕЦ! ТЫ НАШЁЛ ВСЕ СЛОВА!";
                resultMsg.style.color = "#4caf50";
            } else {
                resultMsg.textContent = "ПОСМОТРИ ЕЩЁ РАЗ ВНИМАТЕЛЬНО!";
                resultMsg.style.color = "#ef5350";
            }
        };
    }
})();

/* Урок №10. Комментарий: Логика выбора одного варианта в каждой карточке */

(function() {
    const cards = document.querySelectorAll('.sentence-card');
    const checkBtn = document.getElementById('btn-check-10-9');
    const resultMsg = document.getElementById('res-10-9');

    // Логика переключения выбора внутри каждой карточки
    cards.forEach(card => {
        const btns = card.querySelectorAll('.opt-btn');
        btns.forEach(btn => {
            btn.onclick = () => {
                btns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            };
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            const selectedBtns = document.querySelectorAll('.opt-btn.selected');
            let correctAnswers = 0;

            selectedBtns.forEach(btn => {
                if (btn.getAttribute('data-correct') === 'true') {
                    correctAnswers++;
                }
            });

            if (correctAnswers === 6) {
                resultMsg.textContent = "✨ МОЛОДЕЦ! ТЫ ПОМОГ ПИСАТЕЛЮ!";
                resultMsg.style.color = "#4caf50";
            } else if (selectedBtns.length < 6) {
                resultMsg.textContent = "ВЫБЕРИ СЛОВА ДЛЯ ВСЕХ КАРТИНОК!";
                resultMsg.style.color = "#ef5350";
            } else {
                resultMsg.textContent = "ЕСТЬ ОШИБКИ. ПОПРОБУЙ ЕЩЁ РАЗ!";
                resultMsg.style.color = "#ef5350";
            }
        };
    }
})();

/* Урок №10. Комментарий: Логика проверки значений в 18 полях ввода */

(function() {
    const checkBtn = document.getElementById('btn-check-10-10');
    const resultMsg = document.getElementById('res-10-10');
    const inputs = document.querySelectorAll('.count-input');

    if (checkBtn) {
        checkBtn.onclick = () => {
            let errors = 0;
            let filled = 0;

            inputs.forEach(input => {
                const userVal = parseInt(input.value);
                const correctVal = parseInt(input.getAttribute('data-ans'));

                if (input.value.trim() !== "") {
                    filled++;
                    if (userVal === correctVal) {
                        input.style.borderColor = "#4caf50"; // Верно
                    } else {
                        input.style.borderColor = "#ef5350"; // Ошибка
                        errors++;
                    }
                } else {
                    input.style.borderColor = "#ffcc80";
                }
            });

            if (filled === 18 && errors === 0) {
                resultMsg.textContent = "✨ ТЫ НАСТОЯЩИЙ СЫЩИК! ВСЁ ВЕРНО!";
                resultMsg.style.color = "#4caf50";
            } else if (filled < 18) {
                resultMsg.textContent = "ЗАПОЛНИ ВСЕ КЛЕТОЧКИ!";
                resultMsg.style.color = "#ef5350";
            } else {
                resultMsg.textContent = "ПОСЧИТАЙ ЕЩЁ РАЗ ВНИМАТЕЛЬНО!";
                resultMsg.style.color = "#ef5350";
            }
        };
    }
})();

/* Урок №10.11: Логика автоперехода и проверки слов */

(function() {
    const inputs = document.querySelectorAll('.js-input');
    const checkBtn = document.getElementById('btn-check-10-11');
    const resultMsg = document.getElementById('res-10-11');

    // Автопереход курсора
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1) {
                const next = input.nextElementSibling;
                if (next && next.classList.contains('js-input')) {
                    next.focus();
                }
            }
        });
    });

    // Проверка правильности
    if (checkBtn) {
        checkBtn.onclick = () => {
            let allCorrect = true;
            document.querySelectorAll('.cross-row').forEach(row => {
                const target = row.getAttribute('data-word'); // Берем эталон из атрибута
                let userWord = "";
                
                row.querySelectorAll('.cross-letter').forEach(el => {
                    userWord += (el.tagName === 'INPUT') ? el.value.trim().toUpperCase() : el.textContent;
                });

                if (userWord === target) {
                    row.querySelectorAll('input').forEach(i => i.style.backgroundColor = "#e8f5e9");
                } else {
                    row.querySelectorAll('input').forEach(i => i.style.backgroundColor = "#ffebee");
                    allCorrect = false;
                }
            });

            if (allCorrect) {
                resultMsg.textContent = "✨ ОТЛИЧНО! ВСЕ СЛОВА НАЙДЕНЫ!";
                resultMsg.style.color = "#4caf50";
            } else {
                resultMsg.textContent = "ЕСТЬ ОШИБКИ, ПРОВЕРЬ ЕЩЁ РАЗ!";
                resultMsg.style.color = "#ef5350";
            }
        };
    }
})();
