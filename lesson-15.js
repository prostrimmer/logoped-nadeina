/* ЛОГИКА УРОКА №15 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Проверка Задания 1
    const checkBtn1 = document.getElementById('btn-15-1');
    const resultMsg1 = document.getElementById('res-15-1');

    if (checkBtn1) {
        checkBtn1.addEventListener('click', () => {
            // Вывод списка слов с мягким звуком [З']
            resultMsg1.innerHTML = "<b>Газета, узел, базилик, обезьяна, магазин, корзина, змея, земляника, зеркало, зебра, зяблик, зимородок.</b>";
            resultMsg1.style.color = "#27ae60";                 /* Зеленый цвет из ваших уроков */
        });
    }
});

/* ЛОГИКА ЗАДАНИЯ 2 */
document.addEventListener('DOMContentLoaded', () => {
    const checkBtn2 = document.getElementById('btn-15-2');
    const resultMsg2 = document.getElementById('res-15-2');
    const inputs = document.querySelectorAll('.word-field');

    const correctWords = ["зефир", "зерно", "зеркало", "земля", "зебра", "зелень"];

    if (checkBtn2) {
        checkBtn2.addEventListener('click', () => {
            let foundWords = [];
            let correctCount = 0;

            inputs.forEach(input => {
                const val = input.value.trim().toLowerCase();
                
                if (correctWords.includes(val) && !foundWords.includes(val)) {
                    input.classList.remove('error');
                    input.classList.add('correct');
                    foundWords.push(val);
                    correctCount++;
                } else {
                    input.classList.remove('correct');
                    input.classList.add('error');
                }
            });

            if (correctCount === correctWords.length) {
                resultMsg2.innerHTML = "<b>🏆 ВЕРНО! ВСЕ СЛОВА СОБРАНЫ!</b>";
                resultMsg2.style.color = "#27ae60";
            } else {
                resultMsg2.innerHTML = "<b>ЕСТЬ ОШИБКИ ИЛИ ПОВТОРЫ. ПОПРОБУЙ ЕЩЁ!</b>";
                resultMsg2.style.color = "#e74c3c";
            }
        });
    }
});

/* ЛОГИКА ЗАДАНИЯ 3 */

/* ЗАДАНИЕ №3. ЛОГИКА С ИНДИВИДУАЛЬНЫМИ КЛАССАМИ */
document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.l15-t3-pic');
    const dropZones = document.querySelectorAll('.l15-t3-item');
    const checkBtn3 = document.getElementById('btn-15-3');
    const resultMsg3 = document.getElementById('res-15-3');

    draggables.forEach(pic => {
        pic.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', pic.getAttribute('data-word'));
            pic.style.opacity = '0.5';
        });
        pic.addEventListener('dragend', () => pic.style.opacity = '1');
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const word = e.dataTransfer.getData('text/plain');
            zone.querySelector('.l15-t3-drop').textContent = word;
            zone.setAttribute('data-current', word);
        });
    });

    if (checkBtn3) {
        checkBtn3.addEventListener('click', () => {
            let correct = 0;
            dropZones.forEach(zone => {
                if (zone.getAttribute('data-current') === zone.getAttribute('data-answer')) {
                    zone.style.borderColor = "#27ae60";
                    zone.style.backgroundColor = "#e8f5e9";
                    correct++;
                } else {
                    zone.style.borderColor = "#e74c3c";
                    zone.style.backgroundColor = "#ffebee";
                }
            });
            resultMsg3.innerHTML = correct === dropZones.length ? "<b>🏆 ОТЛИЧНО!</b>" : "<b>ПОПРОБУЙ ЕЩЁ!</b>";
            resultMsg3.style.color = correct === dropZones.length ? "#27ae60" : "#e74c3c";
        });
    }
});

/* ЛОГИКА ЗАДАНИЯ №4 */
document.addEventListener('DOMContentLoaded', () => {
    const checkBtn4 = document.getElementById('btn-15-4');
    const resultMsg4 = document.getElementById('res-15-4');
    const inputs4 = document.querySelectorAll('.l15-t4-input');

    if (checkBtn4) {
        checkBtn4.addEventListener('click', () => {
            let correctCount = 0;

            inputs4.forEach(input => {
                const userAnswer = input.value.trim().toLowerCase();
                const correctAnswer = input.getAttribute('data-answer').toLowerCase();

                if (userAnswer === correctAnswer) {
                    input.classList.remove('error');
                    input.classList.add('correct');
                    correctCount++;
                } else {
                    input.classList.remove('correct');
                    input.classList.add('error');
                }
            });

            if (correctCount === inputs4.length) {
                resultMsg4.innerHTML = "<b>🏆 МОЛОДЕЦ! ВСЕ СЛОВА СОСТАВЛЕНЫ!</b>";
                resultMsg4.style.color = "#27ae60";
            } else {
                resultMsg4.innerHTML = "<b>ЕСТЬ ОШИБКИ. ПРОВЕРЬ БУКВЫ ЕЩЁ РАЗ!</b>";
                resultMsg4.style.color = "#e74c3c";
            }
        });
    }
});

/* ЛОГИКА ЗАДАНИЯ №5 */
document.addEventListener('DOMContentLoaded', () => {
    const checkBtn5 = document.getElementById('btn-15-5');
    const resultMsg5 = document.getElementById('res-15-5');
    const rows5 = document.querySelectorAll('.l15-t5-row');

    // Настройка автоперехода фокуса для каждой группы инпутов в ряду
    rows5.forEach(row => {
        const inputs = row.querySelectorAll('.l15-t5-letter');
        inputs.forEach((input, idx) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && inputs[idx + 1]) {
                    inputs[idx + 1].focus();
                }
            });
        });
    });

    if (checkBtn5) {
        checkBtn5.addEventListener('click', () => {
            let totalRowsCorrect = 0;

            rows5.forEach(row => {
                const rowInputs = row.querySelectorAll('.l15-t5-letter');
                const correctAnswer = row.getAttribute('data-answer').toLowerCase();
                let userWord = "";

                rowInputs.forEach(input => userWord += input.value.trim().toLowerCase());

                if (userWord === correctAnswer) {
                    rowInputs.forEach(input => {
                        input.classList.remove('error');
                        input.classList.add('correct');
                    });
                    totalRowsCorrect++;
                } else {
                    rowInputs.forEach(input => {
                        input.classList.remove('correct');
                        input.classList.add('error');
                    });
                }
            });

            if (totalRowsCorrect === rows5.length) {
                resultMsg5.innerHTML = "<b>🏆 МОЛОДЕЦ! ВСЕ 4 СЛОВА ВЕРНЫ!</b>";
                resultMsg5.style.color = "#27ae60";
            } else {
                resultMsg5.innerHTML = "<b>ЕСТЬ ОШИБКИ. ПРОВЕРЬ ПЕРВЫЕ БУКВЫ!</b>";
                resultMsg5.style.color = "#e74c3c";
            }
        });
    }
});


/* ЛОГИКА ЗАДАНИЯ №6 (DRAG AND DROP) */
document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.l15-t6-drag-item');
    const zones = document.querySelectorAll('.l15-t6-drop-area');
    const checkBtn6 = document.getElementById('btn-15-6');
    const resultMsg6 = document.getElementById('res-15-6');

    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.id);      // Запоминаем ID картинки при начале тяги
        });
    });

    zones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();                                 // Разрешаем сброс в эту зону
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text');
            const draggableElement = document.getElementById(id);
            
            // Клонируем элемент для отображения в зоне (чтобы оригинал остался бледным на месте)
            if (!zone.querySelector(`#${id}-clone`)) {
                const clone = draggableElement.cloneNode(true);
                clone.id = id + "-clone";                       // Даем уникальный ID клону
                clone.classList.remove('dragged-out');          // Клон должен быть ярким
                zone.appendChild(clone);                        // Добавляем в зону
                draggableElement.classList.add('dragged-out');  // Оригинал делаем бледным
            }
        });
    });

    if (checkBtn6) {
        checkBtn6.addEventListener('click', () => {
            const maleZoneItems = document.getElementById('zone-male').querySelectorAll('.l15-t6-drag-item');
            const femaleZoneItems = document.getElementById('zone-female').querySelectorAll('.l15-t6-drag-item');
            let errors = 0;

            // Проверка зоны "МОЙ" (male)
            maleZoneItems.forEach(item => {
                if (item.getAttribute('data-gender') !== 'male') errors++;
            });

            // Проверка зоны "МОЯ" (female)
            femaleZoneItems.forEach(item => {
                if (item.getAttribute('data-gender') !== 'female') errors++;
            });

            // Проверка, все ли картинки распределены (всего 10)
            const totalMoved = maleZoneItems.length + femaleZoneItems.length;

            if (errors === 0 && totalMoved === 10) {
                resultMsg6.innerHTML = "<b>🏆 ВЕРНО! ТЫ ПРАВИЛЬНО ОПРЕДЕЛИЛ РОД ВСЕХ СЛОВ!</b>";
                resultMsg6.style.color = "#27ae60";
            } else {
                resultMsg6.innerHTML = "<b>ЕСТЬ ОШИБКИ ИЛИ НЕ ВСЕ КАРТИНКИ РАЗЛОЖЕНЫ. ПОПРОБУЙ СНОВА!</b>";
                resultMsg6.style.color = "#e74c3c";
            }
        });
    }
});

/* ЛОГИКА ЗАДАНИЯ №7 (КРОССВОРД) */
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.l15-t7-row');
    const checkBtn = document.getElementById('btn-15-7');
    const resultMsg = document.getElementById('res-15-7');

    // Автофокус на следующую ячейку
    rows.forEach(row => {
        const inputs = row.querySelectorAll('.l15-t7-letter');
        inputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length === 1 && inputs[index + 1]) {
                    inputs[index + 1].focus();
                }
            });
            // Возврат назад при Backspace
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value === '' && inputs[index - 1]) {
                    inputs[index - 1].focus();
                }
            });
        });
    });

    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            let allCorrect = true;

            rows.forEach(row => {
                const correctWord = row.getAttribute('data-word');
                const inputs = row.querySelectorAll('.l15-t7-letter');
                let userWord = "";

                inputs.forEach(input => userWord += input.value.trim().toUpperCase());

                if (userWord === correctWord) {
                    inputs.forEach(input => {
                        input.classList.remove('error');
                        input.classList.add('correct');
                    });
                } else {
                    inputs.forEach(input => {
                        input.classList.remove('correct');
                        input.classList.add('error');
                    });
                    allCorrect = false;
                }
            });

            if (allCorrect) {
                resultMsg.innerHTML = "<b>🏆 ВЕЛИКОЛЕПНО! КРОССВОРД РЕШЕН ПОЛНОСТЬЮ!</b>";
                resultMsg.style.color = "#27ae60";
            } else {
                resultMsg.innerHTML = "<b>ПОКА НЕ СОВСЕМ ВЕРНО. ПРОВЕРЬ ОШИБКИ В КЛЕТОЧКАХ!</b>";
                resultMsg.style.color = "#e74c3c";
            }
        });
    }
});


/* ЛОГИКА ЗАДАНИЯ №8 (СЫЩИК) */
document.addEventListener('DOMContentLoaded', () => {
    const checkBtn8 = document.getElementById('btn-15-8');
    const resultMsg8 = document.getElementById('res-15-8');
    const items8 = document.querySelectorAll('.l15-t8-counter-item');

    if (checkBtn8) {
        checkBtn8.addEventListener('click', () => {
            let totalErrors = 0;
            let totalEmpty = 0;

            items8.forEach(item => {
                const input = item.querySelector('.l15-t8-input');
                const userAnswer = input.value.trim();
                const correctAnswer = item.getAttribute('data-answer');

                if (userAnswer === "") {
                    totalEmpty++;
                    item.classList.remove('correct', 'error');
                } else if (userAnswer === correctAnswer) {
                    item.classList.remove('error');
                    item.classList.add('correct');
                } else {
                    item.classList.remove('correct');
                    item.classList.add('error');
                    totalErrors++;
                }
            });

            if (totalEmpty > 0) {
                resultMsg8.innerHTML = "<b>ЗАПОЛНИ ВСЕ КЛЕТОЧКИ, ЧТОБЫ УЗНАТЬ РЕЗУЛЬТАТ!</b>";
                resultMsg8.style.color = "#ff7043";
            } else if (totalErrors === 0) {
                resultMsg8.innerHTML = "<b>🏆 ПОТРЯСАЮЩЕ! ТЫ САМЫЙ ВНИМАТЕЛЬНЫЙ СЫЩИК!</b>";
                resultMsg8.style.color = "#27ae60";
            } else {
                resultMsg8.innerHTML = "<b>ГДЕ-ТО ЗАТАИЛАСЬ ОШИБКА. ПЕРЕСЧИТАЙ ЕЩЁ РАЗ!</b>";
                resultMsg8.style.color = "#e74c3c";
            }
        });
    }
});