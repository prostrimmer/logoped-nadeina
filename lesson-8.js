document.addEventListener('DOMContentLoaded', () => {
    // Инфо
    document.getElementById('child-name-display').textContent = 'Ульяна';
    document.getElementById('lesson-date-display').textContent = '21.12.2025';

    // === Задание 1 Логика ===
    let score1 = 0;
    const items1 = document.querySelectorAll('.drag-item-18');
    const targets1 = document.querySelectorAll('.drop-target');

    items1.forEach(i => i.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', e.target.id)));
    targets1.forEach(t => {
        t.addEventListener('dragover', (e) => e.preventDefault());
        t.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text');
            if (id === t.dataset.match) {
                t.innerHTML = '';
                t.appendChild(document.getElementById(id));
                t.style.border = "5px solid #8bc34a";
                score1++;
            }
        });
    });
    document.getElementById('btn-18').onclick = () => {
        document.getElementById('res-18').textContent = (score1 === 5) ? "🎉 Превосходно!" : "Найди все тени!";
    };

    // === Задание 2 Логика ===
    let score2 = 0;
    const packItems = document.querySelectorAll('.drag-pack');
    const bag = document.getElementById('backpack-goal');

    packItems.forEach(p => p.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', e.target.id)));
    bag.addEventListener('dragover', (e) => e.preventDefault());
    bag.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const el = document.getElementById(id);
        if (el.dataset.sound === 'true') {
            el.classList.add('hidden-item');
            score2++;
        }
    });
    document.getElementById('btn-19').onclick = () => {
        document.getElementById('res-19').textContent = (score2 === 5) ? "🎉 Рюкзак собран!" : "Проверь еще раз!";
    };

    // === Задание 3 Логика ===
    document.getElementById('btn-20').onclick = () => {
        // Замена картинки при нажатии кнопки ПРОВЕРИТЬ
        document.getElementById('task3-img').src = 'images/good-errors-8.jpg';
        document.getElementById('res-20').textContent = "🎉 Молодец! Теперь всё правильно!";
    };

// === Задание 4 Логика ===
    document.getElementById('btn-21').onclick = () => {
        const inputs = document.querySelectorAll('.word-input');
        let allCorrect = true;

        inputs.forEach(input => {
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = input.dataset.answer.toLowerCase();

            if (userAnswer === correctAnswer) {
                input.classList.remove('wrong');
                input.classList.add('correct');
            } else {
                input.classList.remove('correct');
                input.classList.add('wrong');
                allCorrect = false;
            }
        });

        const resMsg = document.getElementById('res-21');
        if (allCorrect) {
            resMsg.textContent = "🎉 Превосходно! Все слова верны!";
            resMsg.style.color = "#4caf50";
        } else {
            resMsg.textContent = "Есть ошибки, попробуй ещё раз!";
            resMsg.style.color = "#ef5350";
        }
    };
// === Задание 5 Логика ===
    let activeStart = null;
    const startBtns = document.querySelectorAll('.syl-btn:not(.static)');
    const endBtns = document.querySelectorAll('.syl-btn.static');

    startBtns.forEach(btn => {
        btn.onclick = () => {
            if (btn.classList.contains('connected')) return;
            startBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeStart = btn;
        };
    });

    endBtns.forEach(eBtn => {
        eBtn.onclick = () => {
            if (activeStart && activeStart.dataset.pair === eBtn.dataset.id) {
                // Склеиваем слово
                activeStart.textContent = activeStart.dataset.original + eBtn.dataset.id;
                activeStart.classList.remove('active');
                activeStart.classList.add('connected');
                
                // Просто добавляем класс без визуального побледнения
                eBtn.classList.add('connected');
                activeStart = null;
            }
        };
    });

    document.getElementById('btn-22').onclick = () => {
        const total = document.querySelectorAll('.syl-btn:not(.static)').length;
        const connected = document.querySelectorAll('.syl-btn.connected:not(.static)').length;
        const resMsg = document.getElementById('res-22');
        
        if (total === connected) {
            resMsg.textContent = "🎉 Все слова собраны и прочитаны!";
        } else {
            resMsg.textContent = "Собери все слова!";
        }
    };
    
// === Задание 6 Логика ===
    document.getElementById('btn-23').onclick = () => {
        const forestInputs = document.querySelectorAll('.forest-overlay-box .word-input');
        let allOk = true;

        forestInputs.forEach(input => {
            if (input.value.trim().toLowerCase() === input.dataset.answer.toLowerCase()) {
                input.classList.remove('wrong');
                input.classList.add('correct');
            } else {
                input.classList.remove('correct');
                input.classList.add('wrong');
                allOk = false;
            }
        });

        const resMsg = document.getElementById('res-23');
        if (allOk) {
            resMsg.textContent = "🎉 Правильно!";
            resMsg.style.color = "#4caf50";
        } else {
            resMsg.textContent = "Попробуй еще раз!";
            resMsg.style.color = "#f44336";
        }
    };
// === Задание 7 Логика ===
    let score7 = 0;
    const giftItems = document.querySelectorAll('.drag-gift');
    const giftGoal = document.getElementById('gift-goal');

    giftItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        });
    });

    giftGoal.addEventListener('dragover', (e) => {
        e.preventDefault();
        giftGoal.classList.add('drag-over');
    });

    giftGoal.addEventListener('dragleave', () => {
        giftGoal.classList.remove('drag-over');
    });

    giftGoal.addEventListener('drop', (e) => {
        e.preventDefault();
        giftGoal.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text');
        const element = document.getElementById(id);
        
        // Проверяем, правильный ли это предмет (согласно data-double-sound)
        if (element.dataset.doubleSound === 'true') {
            element.classList.add('hidden-gift');
            score7++;
        } else {
            // Если звук один или нет совсем — можно добавить визуальную подсказку
            element.style.opacity = "0.5";
            setTimeout(() => element.style.opacity = "1", 500);
        }
    });

    document.getElementById('btn-24').onclick = () => {
        const resMsg = document.getElementById('res-24');
        if (score7 === 3) {
            resMsg.textContent = "🎉 Ура! Ваня собрал все нужные подарки!";
            resMsg.style.color = "#4caf50";
        } else {
            resMsg.textContent = "Нужно найти еще " + (3 - score7) + " предмета с двумя звуками [с].";
            resMsg.style.color = "#ef5350";
        }
    };

// === Задание №8 Логика ===
    (function() {
        let firstSelection = null;
        let matches = 0;
        const allItems = document.querySelectorAll('.pair-item-8');
        const checkBtn = document.getElementById('btn-28');

        allItems.forEach(item => {
            item.onclick = function() {
                if (this.classList.contains('matched')) return;

                if (!firstSelection) {
                    firstSelection = this;
                    this.classList.add('selected');
                } else if (firstSelection === this) {
                    this.classList.remove('selected');
                    firstSelection = null;
                } else {
                    const isMatch = firstSelection.dataset.pair === this.dataset.pair;
                    const fromDiffRows = firstSelection.parentElement !== this.parentElement;

                    if (isMatch && fromDiffRows) {
                        firstSelection.classList.remove('selected');
                        firstSelection.classList.add('matched');
                        this.classList.add('matched');
                        matches++;
                        firstSelection = null;
                    } else {
                        // Ошибка: просто сбрасываем первый выбор
                        firstSelection.classList.remove('selected');
                        firstSelection = null;
                    }
                }
            };
        });

        checkBtn.onclick = function() {
            const res = document.getElementById('res-28');
            if (matches === 5) {
                res.textContent = "🎉 Задание 8 выполнено идеально!";
                res.style.color = "#4caf50";
            } else {
                res.textContent = "Найди все 5 пар предметов.";
                res.style.color = "#f44336";
            }
        };
    })();

// === Задание №9 Логика ===
    (function() {
        const checkBtn = document.getElementById('btn-29');
        const inputs = document.querySelectorAll('.word-multi-grid .word-input');
        const resMsg = document.getElementById('res-29');

        checkBtn.onclick = function() {
            let allCorrect = true;
            inputs.forEach(input => {
                const val = input.value.trim().toLowerCase();
                const ans = input.dataset.answer.toLowerCase();
                
                if (val === ans) {
                    input.classList.remove('wrong');
                    input.classList.add('correct');
                } else {
                    input.classList.remove('correct');
                    input.classList.add('wrong');
                    allCorrect = false;
                }
            });

            if (allCorrect) {
                resMsg.textContent = "🎉 Прекрасно! Все слова изменены верно.";
                resMsg.style.color = "#27ae60";
            } else {
                resMsg.textContent = "Проверь окончания слов!";
                resMsg.style.color = "#e74c3c";
            }
        };
    })();

// === Задание №10 Логика (Порядок не важен, Верхний регистр) ===

    (function() {
        const checkBtn = document.getElementById('btn-30');
        const resMsg = document.getElementById('res-30');
        
        // Эталонный список слов из Вашей инструкции
        const correctAnswers = [
            "ТРОЛЛЕЙБУС", "МОСТ", "ЛАСТОЧКА", "АИСТ", 
            "ЛИСТ", "КОСА", "СУНДУК", "ГЛОБУС"
        ];

        checkBtn.onclick = function() {
            const inputs = document.querySelectorAll('.obj-input-10');
            const userWords = new Set();
            
            inputs.forEach(input => {
                const val = input.value.trim().toUpperCase();
                if (val !== "") userWords.add(val);
            });

            let correctFound = 0;
            userWords.forEach(word => {
                if (correctAnswers.includes(word)) correctFound++;
            });

            inputs.forEach(input => {
                const val = input.value.trim().toUpperCase();
                if (val !== "" && correctAnswers.includes(val)) {
                    input.classList.add('correct');
                    input.classList.remove('wrong');
                } else if (val !== "") {
                    input.classList.add('wrong');
                    input.classList.remove('correct');
                }
            });

            if (correctFound >= 8) {
                resMsg.textContent = "🎉 ОТЛИЧНО! ТЫ НАШЁЛ ПРЕДМЕТЫ!";
                resMsg.style.color = "#27ae60";
            } else {
                resMsg.textContent = "НУЖНО НАЙТИ ЕЩЁ " + (8 - correctFound) + " ПРЕДМЕТОВ.";
                resMsg.style.color = "#e74c3c";
            }
        };
    })();

// === Задание №11 Логика ===
    (function() {
        const checkBtn = document.getElementById('btn-31');
        const inputs = document.querySelectorAll('.story-input-11');
        const resMsg = document.getElementById('res-31');

        checkBtn.onclick = function() {
            let filledCount = 0;
            
            inputs.forEach(input => {
                const val = input.value.trim();
                if (val.length > 5) {
                    input.style.borderColor = "#27ae60";
                    filledCount++;
                } else {
                    input.style.borderColor = "#e74c3c";
                }
            });

            if (filledCount === 3) {
                resMsg.textContent = "🎉 ВЕЛИКОЛЕПНО! ТЫ СОСТАВИЛ ВСЕ ПРЕДЛОЖЕНИЯ!";
                resMsg.style.color = "#27ae60";
            } else {
                resMsg.textContent = "ПОЖАЛУЙСТА, ДОПИШИ ПРЕДЛОЖЕНИЯ КО ВСЕМ КАРТИНКАМ.";
                resMsg.style.color = "#e74c3c";
            }
        };
    })();









    
});