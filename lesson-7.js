document.addEventListener('DOMContentLoaded', () => {
    // Персонализация
    const childName = localStorage.getItem('childName') || 'Юный Герой';
    const date = localStorage.getItem('lessonDate') 
        ? new Date(localStorage.getItem('lessonDate')).toLocaleDateString('ru-RU') 
        : new Date().toLocaleDateString('ru-RU');
    document.getElementById('child-name-display').textContent = childName;
    document.getElementById('lesson-date-display').textContent = date;

    // === ЗАДАНИЕ 3 — СЛУЧАЙНЫЙ ПОРЯДОК + МАЛЕНЬКИЕ КНОПКИ ===
    const words = [
        { text: "скамейка", pos: "начало" }, { text: "скакать", pos: "начало" },
        { text: "скакун", pos: "начало" }, { text: "скок", pos: "начало" },
        { text: "скатка", pos: "начало" }, { text: "скобка", pos: "начало" },
        {  text: "маска", pos: "середина" }, { text: "миска", pos: "середина" },
        { text: "киска", pos: "середина" }, { text: "каска", pos: "середина" },
        { text: "кумыс", pos: "конец" }, { text: "фокус", pos: "конец" },
        { text: "полюс", pos: "конец" }, { text: "кокос", pos: "конец" },
        { text: "покос", pos: "конец" }, { text: "баркас", pos: "конец" },
        { text: "поиск", pos: "середина" }, { text: "выпуск", pos: "середина" },
        { text: "оттиск", pos: "середина" }, { text: "киоск", pos: "середина" },
        { text: "кусок", pos: "середина" }
    ];

    // Перемешиваем
    words.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('words-grid');
    words.forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'sound-word';
        btn.textContent = item.text;
        btn.dataset.correct = item.pos;
        grid.appendChild(btn);
    });

    let selectedWord = null;

    document.querySelectorAll('.sound-word').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sound-word').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedWord = btn;
        });
    });

    document.querySelectorAll('.pos-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!selectedWord) {
                alert('Сначала выбери слово!');
                return;
            }
            const answer = btn.dataset.pos;
            const correct = selectedWord.dataset.correct;

            selectedWord.classList.remove('selected');
            if (answer === correct) {
                selectedWord.classList.add('correct');
            } else {
                selectedWord.classList.add('incorrect');
            }
            selectedWord = null;
        });
    });

    document.getElementById('check-all-sound-pos').addEventListener('click', () => {
        const total = words.length;
        const correct = document.querySelectorAll('.sound-word.correct').length;
        const fb = document.getElementById('feedback-sound-pos');
        if (correct === total) {
            fb.innerHTML = 'УРА! Все слова правильные! Ты — чемпион!';
            fb.style.color = '#4CAF50';
        } else {
            fb.innerHTML = `Правильно: ${correct} из ${total}. Доделай!`;
            fb.style.color = '#FF5722';
        }
    });

    // Остальные задания работают как раньше
    document.getElementById('check-syllables').addEventListener('click', () => {
        document.getElementById('feedback-syllables').innerHTML = 'Молодец! Ты всё повторил!';
        document.getElementById('feedback-syllables').style.color = '#4CAF50';
    });

        // === ЗАДАНИЕ 5 — МГНОВЕННАЯ ПОДСВЕТКА ПРИ КЛИКЕ ===
document.querySelectorAll('#task-odd-one-out .image-item').forEach(item => {
    item.addEventListener('click', () => {
        // Убираем все предыдущие стили
        document.querySelectorAll('#task-odd-one-out .image-item').forEach(i => {
            i.classList.remove('correct', 'incorrect');
        });

        const word = item.getAttribute('data-word');

        if (word === 'лестница') {
            item.classList.add('correct');
            document.getElementById('feedback-odd').innerHTML = 'Правильно!';
            document.getElementById('feedback-odd').style.color = '#4CAF50';
        } else {
            item.classList.add('incorrect');
            document.getElementById('feedback-odd').innerHTML = 'Не совсем... Попробуй ещё раз!';
            document.getElementById('feedback-odd').style.color = '#F44336';
        }
    });
// ЗАДАНИЕ 6 — ПЕРЕМЕЩЕНИЕ (НЕ КОПИРОВАНИЕ!)
let draggedElement = null;

document.querySelectorAll('.drag-pic').forEach(img => {
    img.addEventListener('dragstart', e => {
        draggedElement = img;
        setTimeout(() => img.classList.add('dragging'), 0);
    });

    img.addEventListener('dragend', () => {
        img.classList.remove('dragging');
    });
});

document.querySelectorAll('.drop-area').forEach(area => {
    const column = area.closest('.gender-column');

    area.addEventListener('dragover', e => {
        e.preventDefault();
        area.classList.add('over');
    });

    area.addEventListener('dragleave', () => {
        area.classList.remove('over');
    });

    area.addEventListener('drop', e => {
        e.preventDefault();
        area.classList.remove('over');

        if (!draggedElement) return;

        const imgGender = draggedElement.getAttribute('data-gender');
        const columnGender = column.getAttribute('data-gender');

        if (imgGender === columnGender) {
            // Правильно — перемещаем
            area.appendChild(draggedElement);
            draggedElement.style.opacity = '1';
        } else {
            // Ошибка — трясём и оставляем на месте
            draggedElement.style.animation = 'shake 0.6s';
            setTimeout(() => draggedElement.style.animation = '', 600);
        }

        draggedElement = null;
        checkTask6Complete();
    });
});

function checkTask6Complete() {
    const total = 6;
    const placed = document.querySelectorAll('.drop-area img').length;
    const fb = document.getElementById('feedback-pronouns');

    if (placed === total) {
        fb.innerHTML = 'МОЛОДЕЦ! Всё на своих местах! Ты — мастер рода!';
        fb.style.color = '#4CAF50';
        fb.style.fontSize = '2.4em';
        fb.style.fontWeight = 'bold';
    } else if (placed > 0) {
        fb.innerHTML = 'Продолжай! Перетаскивай в правильные поля';
        fb.style.color = '#333';
    } else {
        fb.innerHTML = '';
    }
}
 // === ЗАДАНИЕ 7 — Запомни и повтори ряд слов ===
const originalOrder = ['стадион', 'стакан', 'статуя', 'стадо'];
const cards = document.querySelectorAll('.word-card');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById('shuffle-btn').addEventListener('click', () => {
    const words = ['стадион', 'стакан', 'статуя', 'стадо'];
    const shuffled = shuffleArray(words);

    cards.forEach((card, index) => {
        card.textContent = shuffled[index].toUpperCase();
        card.style.order = index;
    });

    document.getElementById('feedback-7').innerHTML = 'Повтори этот ряд вслух 4 раза!';
    document.getElementById('feedback-7').style.color = '#FF5722';
});

// ЗАДАНИЕ 8 — ПРОСТЫЕ КНОПКИ СО СЛОВАМИ
document.querySelectorAll('.word-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const word = btn.getAttribute('data-word');
        
        // Анимация нажатия
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = '', 150);

        // Похвала
        document.getElementById('feedback-8').innerHTML = `Отлично! ${word.toUpperCase()}! Продолжай считать вслух!`;
        document.getElementById('feedback-8').style.color = '#4CAF50';
    });
});
// ЗАДАНИЕ 9 — Повторить предложения
document.getElementById('repeat-all').addEventListener('click', () => {
    const feedback = document.getElementById('feedback-9');
    feedback.innerHTML = 'Молодец! Повторяй вслух каждое предложение по очереди!';
    feedback.style.color = '#4CAF50';
    feedback.style.fontSize = '2.4em';
    feedback.style.fontWeight = 'bold';

    // Небольшая анимация кнопки
    const btn = document.getElementById('repeat-all');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 200);
});
// ================================================== //
// ЗАДАНИЕ 10 — Скороговорка с анимацией чтения      //
// ================================================== //

const lines = document.querySelectorAll('.twister-line');
const feedback10 = document.getElementById('feedback-10');

// Функция подсветки строк по очереди
function highlightLines(delay) {
    // Сначала убираем все подсветки
    lines.forEach(line => line.classList.remove('active'));
    feedback10.innerHTML = '';
    feedback10.style.color = '';

    let i = 0;
    const interval = setInterval(() => {
        if (i > 0) lines[i - 1].classList.remove('active');
        if (i < lines.length) {
            lines[i].classList.add('active');
            i++;
        } else {
            clearInterval(interval);
            feedback10.innerHTML = 'Молодец! Попробуй теперь сам без подсказки!';
            feedback10.style.color = '#4CAF50';
            feedback10.style.fontSize = '2.2em';
        }
    }, delay);
}



// ================================================== //
// ЗАДАНИЕ 11 — Проверка первого звука + слово СУГРОБ //
// Полная аналогия с блоком 6 из lesson-4 + дополнительная проверка слова //

    const firstSoundInputs11 = document.querySelectorAll('#task-first-sound-11 .first-sound-input');
    // *** ПРОВЕРЕННЫЙ ID КНОПКИ ***
    const checkButton11 = document.getElementById('check-button-first-sound-11'); 
    const feedback11 = document.getElementById('feedback-message-first-sound-11');
    const TARGET_WORD = 'СУГРОБ'; // Целевое слово

    // --- 1. Функция проверки одной буквы (для мгновенной обратной связи) ---
    function checkSingleInput(input) {
        const userLetter = input.value.trim().toUpperCase();
        const correctLetter = input.dataset.correct.toUpperCase();
        
        input.value = userLetter;
        input.classList.remove('correct', 'incorrect');
        
        if (userLetter === correctLetter && userLetter !== '') {
            input.classList.add('correct');
        } else if (userLetter !== '') {
            input.classList.add('incorrect');
        }
    }

    // --- 2. Функция полной проверки (для кнопки) ---
    function checkFullWord() {
        let enteredWord = '';
        let correctCount = 0;
        const totalInputs = firstSoundInputs11.length;

        firstSoundInputs11.forEach(input => {
            checkSingleInput(input); // Проверяем и стилизуем
            
            const userLetter = input.value.trim().toUpperCase();
            if (userLetter === input.dataset.correct.toUpperCase()) {
                correctCount++;
           }
            enteredWord += userLetter;
        });

        // --- ФИНАЛЬНАЯ ПРОВЕРКА СЛОВА И ВЫВОД РЕЗУЛЬТАТА ---
        if (enteredWord === TARGET_WORD) {
            feedback11.innerHTML = `🎉 <strong>Отлично!</strong> Ты определил первый звук в каждом слове! Прочитай слова вслух`;
            feedback11.style.cssText = 'color: #3CB371; font-size: 2em; text-align: center; font-weight: bold;';
        } else {
           
        }
    }

    // --- 3. Обработчики событий ---

    // Обработчик ввода: мгновенная проверка и переход фокуса
    firstSoundInputs11.forEach(input => {
        input.addEventListener('input', () => {
            checkSingleInput(input);
            checkFullWord(); // Обновляем фидбек сразу, если слово собрано
        });
        
        // Автоматический переход к следующему полю
        input.addEventListener('keyup', (e) => {
            if (input.value.length === 1 && /^[А-ЯЁ]$/i.test(input.value)) {
                const currentInputIndex = Array.from(firstSoundInputs11).indexOf(input);
                const nextInput = firstSoundInputs11[currentInputIndex + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });

    // *** ОБРАБОТЧИК КНОПКИ ПРОВЕРКИ ***
    if (checkButton11) { // Дополнительная проверка, что кнопка найдена
        checkButton11.addEventListener('click', checkFullWord);
    } else {
        console.error('Кнопка проверки для Задания 11 не найдена. Проверьте ID в HTML.');
    }
}); // <-- КОНЕЦ document.addEventListener('DOMContentLoaded', ...)
// ========================================================== //
// ЗАДАНИЕ 12 — Проверка первого звука + слово САЛЮТ (Аналог 11)
// ========================================================== //

const firstSoundInputs12 = document.querySelectorAll('#task-first-sound-12 .first-sound-input');
const checkButton12 = document.getElementById('check-button-first-sound-12');
const feedback12 = document.getElementById('feedback-message-first-sound-12');
const TARGET_WORD_12 = 'САЛЮТ'; // *** ИСПРАВЛЕНО НА САЛЮТ ***

if (firstSoundInputs12.length > 0 && checkButton12) {
    
    // ... (Функция checkFullWord12 остаётся той же, но использует новый TARGET_WORD_12)

    function checkFullWord12() {
        let enteredWord = '';
        let correctCount = 0;
        const totalInputs = firstSoundInputs12.length;

        firstSoundInputs12.forEach(input => {
            const userLetter = input.value.trim().toUpperCase();
            const correctLetter = input.dataset.correct.toUpperCase();
            
            enteredWord += userLetter;
            
            // Сброс и применение стилей
            input.classList.remove('correct', 'incorrect');
            
            if (userLetter === correctLetter && userLetter !== '') {
                correctCount++;
                input.classList.add('correct');
            } else if (userLetter !== '') {
                input.classList.add('incorrect');
            }
        });

        // --- ФИНАЛЬНЫЙ ВЫВОД РЕЗУЛЬТАТА ---
        if (enteredWord === TARGET_WORD_12) {
            feedback12.innerHTML = `🎉 <strong>ПОБЕДА!</strong> У тебя получился яркий САЛЮТ! Прочитай слово по слогам и скажи, какой звук [С] в слове — твердый или мягкий?`;
            feedback12.style.cssText = 'color: #3CB371; font-size: 2em; text-align: center; font-weight: bold;';
        } else {
            feedback12.innerHTML = `🤔 **Попробуй еще!** Правильно ${correctCount} из ${totalInputs}. Получилось: **${enteredWord || '.....'}**`;
            feedback12.style.cssText = 'color: #FF5722; font-size: 1.8em; text-align: center;';
        }
    }

    // Обработчики ввода (без изменений)
    firstSoundInputs12.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.toUpperCase();
        });
        
        input.addEventListener('keyup', (e) => {
            if (input.value.length === 1 && /^[А-ЯЁ]$/i.test(input.value)) {
                const currentInputIndex = Array.from(firstSoundInputs12).indexOf(input);
                const nextInput = firstSoundInputs12[currentInputIndex + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });

    // Обработчик кнопки
    checkButton12.addEventListener('click', checkFullWord12);

} else {
    console.error('Задание 12: Не найдены поля ввода или кнопка проверки. Проверьте ID!');
}
// ========================================================== //
// КОНЕЦ ЗАДАНИЯ 12
// ========================================================== //

// ================================================== //
// ЗАДАНИЕ 13 — Лабиринт: собрать слово СМЕЯТЬСЯ //
// ================================================== //

const mazeInputs = document.querySelectorAll('.maze-input');
const checkMazeBtn = document.getElementById('check-maze');
const feedbackMaze = document.getElementById('feedback-maze');

// Авто-заглавные
mazeInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.toUpperCase();
    });
});

// Проверка
checkMazeBtn.addEventListener('click', () => {
    let word = '';
    let correct = 0;

    mazeInputs.forEach(input => {
        const val = input.value.trim().toUpperCase();
        const correctVal = input.dataset.correct.toUpperCase();

        word += val;

        input.classList.remove('correct', 'incorrect');

        if (val === correctVal && val !== '') {
            correct++;
            input.classList.add('correct');
        } else if (val !== '') {
            input.classList.add('incorrect');
        }
    });

    if (word === 'СМЕЯТЬСЯ') {
        feedbackMaze.innerHTML = `
            <div style="font-size:4em;color:#FFD700;text-shadow:5px 5px #333;">
                УРА! СЛОВО СОБРАНО!
            </div>
            <div style="font-size:4em;margin:30px 0;color:#4CAF50;">
                СМЕЯТЬСЯ
            </div>
            <div style="font-size:2em;">Ты — настоящий следопыт!</div>
        `;
        feedbackMaze.style.textAlign = 'center';
    } else {
        feedbackMaze.innerHTML = `
            Получилось: <strong style="font-size:3em;">${word || '........'}</strong><br><br>
          
        `;
        feedbackMaze.style.color = '#FF5722';
        feedbackMaze.style.textAlign = 'center';
    }
});




});