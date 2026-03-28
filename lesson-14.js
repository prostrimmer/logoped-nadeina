/* ЗАДАНИЕ №1 */
/* Устное задание с кнопкой "ПРОВЕРИТЬ", при нажатии которой появляется надпись "МОЛОДЕЦ!" */

document.addEventListener('DOMContentLoaded', () => {
    
    const checkBtn = document.getElementById('btn-14-1');
    const resultMsg = document.getElementById('res-14-1');

    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            // Показываем положительный результат
            resultMsg.innerHTML = "<b>🏆 МОЛОДЕЦ!</b>";
            resultMsg.style.color = "#27ae60";
            
            // Опционально: можно отключить кнопку после нажатия
            // checkBtn.disabled = true;
            // checkBtn.style.opacity = "0.6";
        });
    }
});

/* ЗАДАНИЕ №2 */
/* Вывод списка слов после прохождения лабиринта */

    const checkBtn2 = document.getElementById('btn-14-2');
    const resultMsg2 = document.getElementById('res-14-2');

    if (checkBtn2) {
        checkBtn2.addEventListener('click', () => {
            // Выводим список слов из задания
            resultMsg2.innerHTML = "<b>Зонт — Узор — Зубы — Зубр — Знак — Тазы — Козы — Вазы — Пузыри</b>";
            resultMsg2.style.color = "#27ae60"; // Зеленый цвет из твоего кода
            
            // Кнопку не блокируем, чтобы можно было нажать повторно при необходимости
        });
    }

    /* ЛОГИКА УРОКА №14 */
document.addEventListener('DOMContentLoaded', () => {

    /* --- ЗАДАНИЕ №1 --- */
    const checkBtn1 = document.getElementById('btn-14-1');
    const resultMsg1 = document.getElementById('res-14-1');

    if (checkBtn1) {
        checkBtn1.onclick = () => {
            resultMsg1.innerHTML = "<b>🏆 МОЛОДЕЦ!</b>";
            resultMsg1.style.color = "#27ae60";
        };
    }

    /* --- ЗАДАНИЕ №3: СЧЕТ И ВЫДЕЛЕНИЕ РАМКИ --- */
    
    // 1. Поиск контейнера сетки третьего задания
    const gridContainer = document.querySelector('.grid-3x4');

    if (gridContainer) {
        // Навешиваем событие клика на всю сетку (делегирование)
        gridContainer.addEventListener('click', (event) => {
            // Проверяем, что нажали именно на картинку внутри сетки
            if (event.target.tagName === 'IMG') {
                // toggle добавляет класс 'selected', если его нет, и удаляет, если он есть
                event.target.classList.toggle('selected');
                
                // Лог для проверки в консоли браузера (F12)
                console.log("Статус рамки изменен для:", event.target.alt);
            }
        });
    }

    // 2. Логика кнопки проверки для задания 3
    const checkBtn3 = document.getElementById('btn-14-3');
    const resultMsg3 = document.getElementById('res-14-3');

    if (checkBtn3) {
        checkBtn3.onclick = () => {
            // Вывод финального текста поздравления
            resultMsg3.innerHTML = "<b>🏆 МОЛОДЕЦ! ОТЛИЧНЫЙ СЧЁТ!</b>";
            resultMsg3.style.color = "#27ae60";                 // Установка зеленого цвета текста
        };
    }
});


/* ЛОГИКА ЗАДАНИЯ №4 */
document.addEventListener('DOMContentLoaded', () => {
    const checkBtn4 = document.getElementById('btn-14-4');
    const resultMsg4 = document.getElementById('res-14-4');

    if (checkBtn4) {
        checkBtn4.onclick = () => {
            // Выводим текст успеха при нажатии
            resultMsg4.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ СОСТАВИЛ ОТЛИЧНЫЕ ПРЕДЛОЖЕНИЯ!</b>";
            resultMsg4.style.color = "#27ae60";                 /* Зеленый цвет */
        };
    }
});

/* ЛОГИКА ЗАДАНИЯ №5: ЛАБИРИНТ */
/* Полная копия логики задания №2: вывод текста при нажатии на кнопку */

(function() {
    // Ждем загрузки контента
    document.addEventListener('DOMContentLoaded', () => {
        
        // Ссылка на кнопку и поле вывода задания 5
        const checkBtn5 = document.getElementById('btn-14-5');
        const resultMsg5 = document.getElementById('res-14-5');

        // Если кнопка существует, вешаем обработчик клика
        if (checkBtn5) {
            checkBtn5.addEventListener('click', () => {
                // Выводим стандартную похвалу, как в прошлых устных заданиях
                resultMsg5.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ УСПЕШНО ПРОШЁЛ ЛАБИРИНТ!</b>";
                // Устанавливаем зеленый цвет текста из твоего стиля
                resultMsg5.style.color = "#27ae60";
            });
        }
    });
})();


/* ЛОГИКА ЗАДАНИЯ №6 */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const checkBtn6 = document.getElementById('btn-14-6');  // Находим кнопку
        const resultMsg6 = document.getElementById('res-14-6'); // Находим поле результата

        if (checkBtn6) {
            checkBtn6.addEventListener('click', () => {
                // Выводим текст похвалы жирным шрифтом
                resultMsg6.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ ПОМОГ МАМЕ-ЗАЙЧИХЕ!</b>";
                // Устанавливаем зеленый цвет текста из твоего стиля
                resultMsg6.style.color = "#27ae60";
            });
        }
    });
})();

/* ЛОГИКА ЗАДАНИЯ №7: РИФМЫ */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const checkBtn7 = document.getElementById('btn-14-7');
        const resultMsg7 = document.getElementById('res-14-7');

        // Правильные ответы (в нижнем регистре для сравнения)
        const answers = {
            'rhyme-1': 'коза',
            'rhyme-2': 'грозы',
            'rhyme-3': 'гнездо',
            'rhyme-4': 'изба',
            'rhyme-5': 'рюкзак'
        };

        if (checkBtn7) {
            checkBtn7.onclick = () => {
                let correctCount = 0;
                const total = Object.keys(answers).length;

                for (let id in answers) {
                    const input = document.getElementById(id);
                    const userVal = input.value.trim().toLowerCase();

                    if (userVal === answers[id]) {
                        input.classList.remove('input-wrong');
                        input.classList.add('input-correct');
                        correctCount++;
                    } else {
                        input.classList.remove('input-correct');
                        input.classList.add('input-wrong');
                    }
                }

                if (correctCount === total) {
                    resultMsg7.innerHTML = "<b>🏆 МОЛОДЕЦ! ВСЕ РИФМЫ ВЕРНЫ!</b>";
                    resultMsg7.style.color = "#27ae60";
                } else {
                    resultMsg7.innerHTML = "<b>ЕСТЬ ОШИБКИ. ПОПРОБУЙ ЕЩЁ РАЗ!</b>";
                    resultMsg7.style.color = "#e74c3c";
                }
            };
        }
    });
})();

/* ЛОГИКА ЗАДАНИЯ №8: ЗАГАДОЧНЫЕ СЛОВА */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const checkBtn8 = document.getElementById('btn-14-8');
        const resultMsg8 = document.getElementById('res-14-8');

        // Список правильных ответов
        const correctWords = ["замок", "зонтик", "музыка"];

        if (checkBtn8) {
            checkBtn8.onclick = () => {
                // Собираем элементы инпутов в массив
                const inputs = [
                    document.getElementById('sea-word-1'),
                    document.getElementById('sea-word-2'),
                    document.getElementById('sea-word-3')
                ];

                // Получаем значения, очищенные от пробелов и в нижнем регистре
                const userAnswers = inputs.map(input => input.value.trim().toLowerCase());
                
                let matches = 0;
                
                // Проверяем каждое поле
                inputs.forEach((input, index) => {
                    const val = userAnswers[index];
                    
                    // Если слово есть в списке правильных
                    if (correctWords.includes(val)) {
                        input.classList.remove('input-sea-wrong');
                        input.classList.add('input-sea-correct');
                        matches++;
                    } else {
                        input.classList.remove('input-sea-correct');
                        input.classList.add('input-sea-wrong');
                    }
                });

                // Вывод результата: нужно 3 совпадения
                if (matches === 3) {
                    resultMsg8.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ РАЗГАДАЛ ВСЕ СЛОВА!</b>";
                    resultMsg8.style.color = "#27ae60";
                } else {
                    resultMsg8.innerHTML = "<b>КАЖЕТСЯ, ГДЕ-ТО ОШИБКА. ПОСМОТРИ ЕЩЁ РАЗ!</b>";
                    resultMsg8.style.color = "#e74c3c";
                }
            };
        }
    });
})();


/* ЛОГИКА ЗАДАНИЯ №9: СОБЕРИ СЛОВО С АВТОПЕРЕХОДОМ */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        // Находим все группы клеток в 9-м задании
        const wordGroups = document.querySelectorAll('.word-group');

        wordGroups.forEach(group => {
            const inputs = group.querySelectorAll('.letter-cell');

            inputs.forEach((input, index) => {
                // 1. АВТОПЕРЕХОД ВПЕРЕД ПРИ ВВОДЕ
                input.addEventListener('input', () => {
                    if (input.value.length === 1 && index < inputs.length - 1) {
                        // Переключаем фокус на следующий элемент в этой группе
                        inputs[index + 1].focus();
                    }
                });

                // 2. АВТОПЕРЕХОД НАЗАД ПРИ НАЖАТИИ BACKSPACE
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                        // Возвращаем фокус на предыдущий элемент
                        inputs[index - 1].focus();
                    }
                });
            });
        });

        // ЛОГИКА КНОПКИ ПРОВЕРКИ (остается прежней)
        const checkBtn = document.getElementById('btn-14-9');
        const resultMsg = document.getElementById('res-14-9');

        if (checkBtn) {
            checkBtn.onclick = () => {
                const getWord = (id) => {
                    const cells = document.querySelectorAll(`${id} .letter-cell`);
                    return Array.from(cells).map(i => i.value.trim().toLowerCase()).join('');
                };

                const word1 = getWord('#word-9-1'); // Ожидаем "знаки"
                const word2 = getWord('#word-9-2'); // Ожидаем "золото"

                const isCorrect1 = (word1 === 'знаки');
                const isCorrect2 = (word2 === 'золото');

                const highlight = (id, isCorrect) => {
                    const cells = document.querySelectorAll(`${id} .letter-cell`);
                    cells.forEach(c => {
                        c.classList.remove('cell-correct', 'cell-wrong');
                        c.classList.add(isCorrect ? 'cell-correct' : 'cell-wrong');
                    });
                };

                highlight('#word-9-1', isCorrect1);
                highlight('#word-9-2', isCorrect2);

                if (isCorrect1 && isCorrect2) {
                    resultMsg.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ РАЗГАДАЛ ВСЕ СЛОВА ЗНАЙКИ!</b>";
                    resultMsg.style.color = "#27ae60";
                } else {
                    resultMsg.innerHTML = "<b>ЕСТЬ ОШИБКА В СЛОВАХ. ПРОВЕРЬ ХОДЫ ЕЩЁ РАЗ!</b>";
                    resultMsg.style.color = "#e74c3c";
                }
            };
        }
    });
})();


/* ЛОГИКА ЗАДАНИЯ №10: ЗАВЕРШЕНИЕ УРОКА */
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const checkBtn10 = document.getElementById('btn-14-10'); // Находим кнопку завершения
        const resultMsg10 = document.getElementById('res-14-10'); // Находим поле результата

        if (checkBtn10) {
            checkBtn10.addEventListener('click', () => {
                // Финальное сообщение после устных ответов
                resultMsg10.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ ОТЛИЧНО СПРАВИЛСЯ СО ВСЕМИ ЗАДАНИЯМИ УРОКА!</b>";
                resultMsg10.style.color = "#27ae60";            /* Зеленый цвет успеха */
                
                // Эффект конфетти или прокрутка к началу может быть добавлена здесь
            });
        }
    });
})();