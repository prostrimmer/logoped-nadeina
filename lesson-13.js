/* ЗАДАНИЕ №1. Логика проверки слов-трансформеров */
(function() {
    const inputs = document.querySelectorAll('.transform-input'); // Выбираем все поля ввода
    const checkBtn = document.getElementById('btn-13-1');        // Кнопка проверки
    const resultMsg = document.getElementById('res-13-1');       // Текст результата

    // Обработка ввода в реальном времени
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Перевод в заглавные буквы и очистка стилей проверки
            input.value = input.value.toUpperCase();
            input.classList.remove('correct', 'wrong');
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            let errors = 0; // Переменная для подсчета ошибок

            inputs.forEach(input => {
                const userText = input.value.trim();             // Текст ребенка
                const correctText = input.dataset.answer;        // Эталонный ответ

                // Сравнение введенного слова с правильным
                if (userText === correctText) {
                    input.classList.add('correct');              // Красим зеленым
                } else {
                    input.classList.add('wrong');                // Красим красным
                    errors++;                                    // Фиксируем ошибку
                }
            });

            // Итоговое сообщение для ребенка
            if (errors === 0) {
                resultMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! Все превращения верны!</b>";
                resultMsg.style.color = "#27ae60";
            } else {
                resultMsg.innerHTML = "<b>Есть ошибки. Проверь первый звук!</b>";
                resultMsg.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №2. Логика проверки предложений по картинкам */
(function() {
    const inputs = document.querySelectorAll('.sentence-input'); // Поля ввода для 2-го задания
    const checkBtn = document.getElementById('btn-13-2');        // Кнопка проверки задания 2
    const resMsg = document.getElementById('res-13-2');          // Сообщение с результатом

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.toUpperCase();             // Принудительный верхний регистр
            input.classList.remove('correct', 'wrong');          // Сброс цвета при печати
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            let errors = 0;

            inputs.forEach(input => {
                const userVal = input.value.trim().replace('Ё', 'Е'); // Упрощаем проверку Е/Ё
                const targetVal = input.dataset.answer.replace('Ё', 'Е');

                if (userVal === targetVal) {
                    input.classList.add('correct');
                } else {
                    input.classList.add('wrong');
                    errors++;
                }
            });

            if (errors === 0) {
                resMsg.innerHTML = "<b>🏆 ПРЕКРАСНО! Все предложения закончены правильно!</b>";
                resMsg.style.color = "#27ae60";
            } else {
                resMsg.innerHTML = "<b>Есть ошибки. Проверь окончания слов!</b>";
                resMsg.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №3. Логика смены картинки и проверки текста */
(function() {
    const img = document.getElementById('mystery-img');      // Картинка
    const textarea = document.getElementById('task-3-story'); // Поле ввода
    const checkBtn = document.getElementById('btn-13-3');    // Кнопка
    const resMsg = document.getElementById('res-13-3');      // Сообщение

    // СМЕНА КАРТИНКИ ПРИ НАЖАТИИ
    if (img) {
        img.onclick = () => {
            // Меняем ч/б файл на цветной lesson-13-3.png
            img.src = "images/lesson-13-3.png";
        };
    }

    // ПРОВЕРКА ТЕКСТА
    if (checkBtn) {
        checkBtn.onclick = () => {
            const text = textarea.value.toLowerCase().replace(/ё/g, 'е'); 
            // Обязательные корни для проверки
            const roots = ["зонт", "фазан", "коз", "роз", "берез", "забор"];
            let missingRoots = [];

            roots.forEach(root => {
                if (!text.includes(root.replace(/ё/g, 'е'))) {
                    missingRoots.push(root);
                }
            });

            if (text.length < 15) {
                resMsg.innerHTML = "<b>Напиши рассказ подлиннее!</b>";
                resMsg.style.color = "#ff9800";
            } else if (missingRoots.length === 0) {
                resMsg.innerHTML = "<b>🏆 ВЕЛИКОЛЕПНО! Ты использовал все слова со звуком [З]!</b>";
                resMsg.style.color = "#27ae60";
                textarea.style.borderColor = "#8bc34a";
            } else {
                resMsg.innerHTML = `<b>Вспомни про эти предметы: ${missingRoots.join(", ")}</b>`;
                resMsg.style.color = "#e74c3c";
                textarea.style.borderColor = "#ef5350";
            }
        };
    }
})();

/* ЗАДАНИЕ №4. Логика вертикального отражения картинок */
(function() {
    // Находим кнопку и все изображения четвертого задания
    const checkBtn = document.getElementById('btn-13-4');
    const images = document.querySelectorAll('.task-4-img');

    if (checkBtn) {
        checkBtn.onclick = () => {
            // Переключаем класс зеркального отражения для каждой картинки
            images.forEach(img => {
                img.classList.toggle('mirror-v');
            });

            // Визуальное изменение кнопки после нажатия
            if (images[0].classList.contains('mirror-v')) {
                checkBtn.innerText = "ВЕРНУТЬ";
                checkBtn.style.background = "#ffb74d";
            } else {
                checkBtn.innerText = "ПРОВЕРИТЬ";
                checkBtn.style.background = "#ff8a65";
            }
        };
    }
})();

/* ЗАДАНИЕ №5. Логика проверки предложений-антонимов */
(function() {
    const inputs = document.querySelectorAll('.antonym-input'); // Выбираем все поля ввода задания 5
    const checkBtn = document.getElementById('btn-13-5');      // Кнопка проверки
    const resMsg = document.getElementById('res-13-5');        // Сообщение с результатом

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.toUpperCase();           // Авто-капс при наборе текста
            input.classList.remove('correct', 'wrong');        // Сброс цвета при изменении текста
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            let errorCount = 0;

            inputs.forEach(input => {
                const userVal = input.value.trim();            // Текст, введенный ребенком
                const trueVal = input.dataset.answer;          // Правильный ответ из HTML

                if (userVal === trueVal) {
                    input.classList.add('correct');            // Подсветка верного ответа
                } else {
                    input.classList.add('wrong');              // Подсветка ошибки
                    errorCount++;                              // Увеличение счетчика ошибок
                }
            });

            // Итоговый вывод результата для ребенка
            if (errorCount === 0) {
                resMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! Ты правильно подобрал все слова!</b>";
                resMsg.style.color = "#27ae60";
            } else {
                resMsg.innerHTML = "<b>Подумай ещё, какие слова здесь пропущены?</b>";
                resMsg.style.color = "#e74c3c";
            }
        };
    }
})();

/* ЗАДАНИЕ №6. Появление описания лабиринтов */
(function() {
    const checkBtn = document.getElementById('btn-13-6');
    const desc1 = document.getElementById('desc-6-1');
    const desc2 = document.getElementById('desc-6-2');

    if (checkBtn) {
        checkBtn.onclick = () => {
            // Показываем оба описания при нажатии
            if (desc1 && desc2) {
                desc1.style.display = "block";
                desc2.style.display = "block";
            }
            
            // Прокрутка к тексту для удобства, если экран маленький
            desc1.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };
    }
})();

/* ЗАДАНИЕ №7. Логика интерактивного выделения */
(function() {
    const items = document.querySelectorAll('.odd-item');       /* Все карточки задания */
    const checkBtn = document.getElementById('btn-13-7');      /* Кнопка проверки */
    const resMsg = document.getElementById('res-13-7');        /* Сообщение результата */

    items.forEach(item => {
        item.addEventListener('click', () => {
            // Переключение красного контура при нажатии
            item.classList.toggle('selected'); 
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            let winCount = 0;
            const rows = document.querySelectorAll('.odd-row');
            
            rows.forEach(row => {
                const selected = row.querySelectorAll('.odd-item.selected');
                const correct = row.querySelector('.odd-item[data-correct="true"]');
                
                // Условие: выбран только правильный элемент в ряду
                if (selected.length === 1 && selected[0] === correct) {
                    winCount++;
                }
            });

            if (winCount === 4) {
                resMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! Все лишние предметы названы верно!</b>";
                resMsg.style.color = "#2e7d32";
            } else {
                resMsg.innerHTML = "<b>Попробуй еще раз! Ищи слова со звуком [З].</b>";
                resMsg.style.color = "#d32f2f";
            }
        };
    }
})();


/* ЗАДАНИЕ №8. Интерактив "Слово + Картинка" */
(function() {
    let selectedColor = null;                                   /* Переменная для хранения текущего выбора */
    const wordBtns = document.querySelectorAll('.word-btn');    /* Кнопки со словами */
    const imgFrames = document.querySelectorAll('.img-frame');  /* Рамки с картинками */
    const checkBtn = document.getElementById('btn-13-8');      /* Кнопка "Проверить" */
    const resMsg = document.getElementById('res-13-8');        /* Текстовое поле для "Молодец" */

    wordBtns.forEach(btn => {
        btn.onclick = () => {
            wordBtns.forEach(b => b.classList.remove('active'));/* Сброс активного класса у всех кнопок */
            btn.classList.add('active');                        /* Подсветка текущей кнопки синим */
            selectedColor = btn.dataset.color;                  /* Запоминаем тип цвета (green или blue) */
            if (resMsg) resMsg.innerHTML = "";                  /* Очищаем сообщение при новом выборе */
        };
    });

    imgFrames.forEach(frame => {
        frame.onclick = () => {
            if (selectedColor) {
                frame.classList.remove('border-green', 'border-blue'); /* Сброс старой рамки */
                frame.classList.add(`border-${selectedColor}`);       /* Установка новой цветной рамки */
            }
        };
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            // Простая проверка: если хотя бы одна картинка была окрашена
            const hasMatches = document.querySelector('.img-frame.border-green, .img-frame.border-blue');
            
            if (hasMatches) {
                resMsg.innerHTML = "Молодец! Ты составил словосочетания."; /* Вывод текста вместо окна */
                resMsg.style.color = "#2e7d32";                             /* Темно-зеленый цвет текста */
            } else {
                resMsg.innerHTML = "Сначала подбери картинки к словам!";    /* Подсказка, если ничего не выбрано */
                resMsg.style.color = "#d32f2f";                             /* Красный цвет для ошибки */
            }
        };
    }
})();

/* ЗАДАНИЕ №9. Сыщик */
(function() {
    const zones = document.querySelectorAll('.hero-zone');      /* Находим все зоны героев */
    const resMsg = document.getElementById('res-13-9');        /* Поле вывода текста */
    const checkBtn = document.getElementById('btn-13-9');      /* Кнопка активации проверки */

    zones.forEach(zone => {
        zone.onclick = () => {
            const hero = zone.dataset.hero;                     /* Извлекаем имя персонажа */
            const find = zone.dataset.find;                     /* Извлекаем найденный предмет */
            resMsg.innerHTML = `Герой <b>${hero}</b> ищет <b>${find}</b>!`; /* Выводим текущую пару */
            resMsg.style.color = "#0277bd";                     /* Устанавливаем синий цвет текста */
        };
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            /* Финальное сообщение с перечислением всех пар со звуком [З] */
            resMsg.innerHTML = "<b>Молодец! Ты нашёл все пары:</b><br>" +
                "Змея — гнездо, Золушка — зола, Знайка — рюкзак, Коза — незабудки.";
            resMsg.style.color = "#2e7d32";                     /* Устанавливаем зеленый цвет текста */
        };
    }
})();

/* ЗАДАНИЕ №10. ЛОГИКА КРОССВОРДА */
(function() {
    const checkBtn = document.getElementById('btn-13-10');     /* Кнопка проверки */
    const resMsg = document.getElementById('res-13-10');       /* Поле для сообщения */
    const rows = document.querySelectorAll('.cross-row');      /* Все ряды слов */

    // Настройка автоперехода к следующей ячейке при вводе
    document.querySelectorAll('.char-input').forEach((input, idx, array) => {
        input.addEventListener('input', () => {
            input.value = input.value.toUpperCase();            /* Только заглавные буквы */
            input.classList.remove('correct', 'wrong');         /* Сброс стилей при правке */
            if (input.value.length === 1 && idx < array.length - 1) {
                array[idx + 1].focus();                         /* Фокус на следующую ячейку */
            }
        });
    });

    if (checkBtn) {
        checkBtn.onclick = () => {
            let errorCount = 0;

            rows.forEach(row => {
                const correctWord = row.dataset.word;           /* Получаем правильное слово */
                const cells = row.querySelectorAll('.cell');    /* Все ячейки ряда (включая 'З') */
                let userWord = "";

                cells.forEach(cell => userWord += cell.value);  /* Собираем слово из ячеек */

                if (userWord === correctWord) {
                    cells.forEach(c => { if(!c.readOnly) c.classList.add('correct'); });
                } else {
                    cells.forEach(c => { if(!c.readOnly) c.classList.add('wrong'); });
                    errorCount++;
                }
            });

            // Вывод финального сообщения над кнопкой
            if (errorCount === 0) {
                resMsg.innerHTML = "<b>Молодец! Ты разгадал весь кроссворд!</b>";
                resMsg.style.color = "#2e7d32";
            } else {
                resMsg.innerHTML = "<b>Посмотри внимательно на картинки и исправь ошибки.</b>";
                resMsg.style.color = "#d32f2f";
            }
        };
    }
})();