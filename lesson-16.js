/* ЛОГИКА УРОКА №16 */

/* ЛОГИКА ЗАДАНИЯ №1 (ОБНОВЛЕННАЯ) */
document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.l16-t1-pic');
    const dropZones = document.querySelectorAll('.l16-t1-drop-zone');
    const sourceZone = document.getElementById('l16-t1-source');
    const checkBtn1 = document.getElementById('btn-16-1');
    const resultMsg1 = document.getElementById('res-16-1');

    draggables.forEach(pic => {
        pic.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', pic.id);
            pic.style.opacity = '0.4';
        });
        pic.addEventListener('dragend', () => pic.style.opacity = '1');
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => e.preventDefault());
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const draggedPic = document.getElementById(id);
            
            if (zone.children.length > 0) {
                sourceZone.appendChild(zone.children[0]);
            }

            draggedPic.style.opacity = '1';
            zone.appendChild(draggedPic);
            zone.setAttribute('data-current', draggedPic.getAttribute('data-type'));
        });
    });

    if (checkBtn1) {
        checkBtn1.addEventListener('click', () => {
            let correctCount = 0;
            dropZones.forEach(zone => {
                if (zone.getAttribute('data-current') === zone.getAttribute('data-answer')) {
                    zone.style.borderColor = "#27ae60";
                    correctCount++;
                } else {
                    zone.style.borderColor = "#e74c3c";
                }
            });

            if (correctCount === 6) {
                resultMsg1.innerHTML = "<b>🏆 МОЛОДЕЦ! ВСЕ ВЕРНО!</b>";
                resultMsg1.style.color = "#27ae60";
            } else {
                resultMsg1.innerHTML = "<b>ПОПРОБУЙ ЕЩЕ РАЗ!</b>";
                resultMsg1.style.color = "#e74c3c";
            }
        });
    }
});


/* ЛОГИКА ЗАДАНИЯ №3: СИНХРОННОЕ ВЫДЕЛЕНИЕ */
document.addEventListener('DOMContentLoaded', () => {
    let firstWord = null;
    let matchesCount = 0;

    const allWords = document.querySelectorAll('.l16-t3-word');
    const imageBoxes = document.querySelectorAll('.l16-t3-img-box');
    const resultMsg3 = document.getElementById('res-16-3');
    const checkBtn3 = document.getElementById('btn-16-3');

    allWords.forEach(word => {
        word.addEventListener('click', () => {
            // Если слово уже угадано, ничего не делаем
            if (word.classList.contains('matched')) return;

            // Если кликаем по тому же слову — снимаем выделение
            if (firstWord === word) {
                word.classList.remove('active');
                firstWord = null;
                return;
            }

            // Визуально выделяем текущее слово как активное
            word.classList.add('active');

            if (!firstWord) {
                // Первый клик
                firstWord = word;
            } else {
                // Второй клик — проверяем, из разных ли столбцов слова
                const isDifferentCols = firstWord.parentElement !== word.parentElement;
                const isSameValue = firstWord.getAttribute('data-word') === word.getAttribute('data-word');

                if (isDifferentCols && isSameValue) {
                    // УСПЕХ: Слова в обоих столбцах становятся зелеными
                    firstWord.classList.add('matched');
                    word.classList.add('matched');
                    
                    // Находим картинку и обводим её зеленым
                    const wordKey = word.getAttribute('data-word');
                    imageBoxes.forEach(box => {
                        if (box.getAttribute('data-word') === wordKey) {
                            box.classList.add('matched');
                        }
                    });

                    matchesCount++;
                    firstWord.classList.remove('active');
                    word.classList.remove('active');
                    firstWord = null;
                } else {
                    // ОШИБКА или клик в том же столбце: сбрасываем всё
                    setTimeout(() => {
                        firstWord.classList.remove('active');
                        word.classList.remove('active');
                        firstWord = null;
                    }, 300);
                }
            }
        });
    });

    if (checkBtn3) {
        checkBtn3.addEventListener('click', () => {
            if (matchesCount === 8) {
                resultMsg3.innerHTML = "<b>🏆 МОЛОДЕЦ! ВСЕ СЛОВА И КАРТИНКИ СОВПАЛИ!</b>";
                resultMsg3.style.color = "#27ae60";
            } else {
                resultMsg3.innerHTML = "<b>НАЙДИ ВСЕ ПАРЫ ОДИНАКОВЫХ СЛОВ!</b>";
                resultMsg3.style.color = "#e74c3c";
            }
        });
    }
});

/* ЛОГИКА ЗАДАНИЯ №4 */
document.addEventListener('DOMContentLoaded', () => {
    const rows4 = document.querySelectorAll('.l16-t4-row');
    const checkBtn4 = document.getElementById('btn-16-4');
    const resultMsg4 = document.getElementById('res-16-4');

    rows4.forEach(row => {
        const items = row.querySelectorAll('.l16-t4-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                // Снимаем выделение только в текущем ряду
                items.forEach(i => i.classList.remove('selected', 'correct', 'error'));
                item.classList.add('selected');
            });
        });
    });

    if (checkBtn4) {
        checkBtn4.addEventListener('click', () => {
            let correctRows = 0;

            rows4.forEach(row => {
                const selected = row.querySelector('.l16-t4-item.selected');
                if (selected) {
                    if (selected.getAttribute('data-status') === 'odd') {
                        selected.classList.add('correct');
                        correctRows++;
                    } else {
                        selected.classList.add('error');
                    }
                }
            });

            if (correctRows === 5) {
                resultMsg4.innerHTML = "<b>🏆 ВЕЛИКОЛЕПНО! ВСЕ ЛИШНИЕ КАРТИНКИ НАЙДЕНЫ!</b>";
                resultMsg4.style.color = "#27ae60";
            } else {
                resultMsg4.innerHTML = "<b>ЕСТЬ ОШИБКИ. ПОПРОБУЙ ЕЩЁ!</b>";
                resultMsg4.style.color = "#e74c3c";
            }
        });
    }
});

/* ЛОГИКА ЗАДАНИЯ №5: ОДОБРЕНИЕ ПОСЛЕ ЧТЕНИЯ */

document.addEventListener('DOMContentLoaded', () => {
    const checkBtn5 = document.getElementById('btn-16-5');           // Находим кнопку задания 5
    const resultMsg5 = document.getElementById('res-16-5');          // Находим блок результата

    if (checkBtn5) {
        checkBtn5.addEventListener('click', () => {
            // При нажатии выводим текст одобрения
            resultMsg5.innerHTML = "<b>🏆 ВЕЛИКОЛЕПНО! ТЫ ОЧЕНЬ ХОРОШО И СТАРАТЕЛЬНО ПРОЧИТАЛА РАССКАЗ!</b>";
            resultMsg5.style.color = "#27ae60";                      // Зеленый цвет успеха
            
            // Плавный скролл к сообщению, если экран маленький
            resultMsg5.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});

// --- ЛОГИКА ЗАДАНИЯ №6: КТО ЕСТЬ КТО (DRAG & DROP) ---
document.addEventListener('DOMContentLoaded', () => {
    const dragItems = document.querySelectorAll('.l16-t6-drag-item');
    const dropZones = document.querySelectorAll('.l16-t6-drop-zone');
    const checkBtn6 = document.getElementById('btn-16-6');
    const resultMsg6 = document.getElementById('res-16-6');

    // Настройка элементов для перетаскивания
    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', ''); // Необходимо для Firefox
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    // Настройка зон сброса
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Разрешаем сброс
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            const draggingItem = document.querySelector('.dragging');
            if (draggingItem) {
                zone.appendChild(draggingItem);
            }
        });
    });

    // Логика проверки
    if (checkBtn6) {
        checkBtn6.addEventListener('click', () => {
            let errors = 0;
            let totalPlaced = 0;

            dropZones.forEach(zone => {
                const zoneRod = zone.getAttribute('data-rod');
                const placedItems = zone.querySelectorAll('.l16-t6-drag-item');
                
                placedItems.forEach(item => {
                    totalPlaced++;
                    if (item.getAttribute('data-rod') !== zoneRod) {
                        errors++;
                        item.style.border = "3px solid #e74c3c"; // Красная рамка при ошибке
                    } else {
                        item.style.border = "3px solid #27ae60"; // Зеленая рамка при успехе
                    }
                });
            });

            if (totalPlaced < 6) {
                resultMsg6.innerHTML = "<b>РАЗЛОЖИ ВСЕ КАРТИНКИ ПО КОЛОНКАМ!</b>";
                resultMsg6.style.color = "#ff9800";
            } else if (errors === 0) {
                resultMsg6.innerHTML = "<b>🏆 МОЛОДЕЦ! ТЫ ПРАВИЛЬНО ОПРЕДЕЛИЛ РОД ВСЕХ СЛОВ!</b>";
                resultMsg6.style.color = "#27ae60";
            } else {
                resultMsg6.innerHTML = "<b>ЕСТЬ ОШИБКИ. ПЕРЕПРОВЕРЬ КАРТИНКИ В РАМКАХ!</b>";
                resultMsg6.style.color = "#e74c3c";
            }
        });
    }
});

/* ЛОГИКА ЗАДАНИЯ №7 */
document.addEventListener('DOMContentLoaded', () => {
    const checkBtn7 = document.getElementById('btn-16-7');
    const inputs7 = document.querySelectorAll('.l16-t7-input');
    const resultMsg7 = document.getElementById('res-16-7');

    if (checkBtn7) {
        checkBtn7.addEventListener('click', () => {
            let filledFields = 0;
            inputs7.forEach(input => {
                if (input.value.trim().length > 2) {
                    input.style.borderColor = "#27ae60";
                    filledFields++;
                } else {
                    input.style.borderColor = "#e74c3c";
                }
            });

            if (filledFields === 4) {
                resultMsg7.innerHTML = "<b>МОЛОДЕЦ! ТЫ ПРИДУМАЛ ВСЕ ПРЕДЛОЖЕНИЯ!</b>";
                resultMsg7.style.color = "#27ae60";
            } else {
                resultMsg7.innerHTML = "<b>ПОЖАЛУЙСТА, ЗАПОЛНИ ВСЕ ПОЛЯ.</b>";
                resultMsg7.style.color = "#e74c3c";
            }
        });
    }
});

// --- ЛОГИКА ЗАДАНИЯ №8: СЫЩИК ---
document.addEventListener('DOMContentLoaded', () => {
    const checkBtn8 = document.getElementById('btn-16-8');
    const inputs8 = document.querySelectorAll('.l16-t8-input');
    const resultMsg8 = document.getElementById('res-16-8');

    if (checkBtn8) {
        checkBtn8.addEventListener('click', () => {
            let allCorrect = true;
            let filledCount = 0;

            inputs8.forEach(input => {
                const userVal = input.value.trim();
                const correctVal = input.getAttribute('data-answer');

                if (userVal !== "") {
                    filledCount++;
                    if (userVal === correctVal) {
                        input.style.borderColor = "#27ae60";    // Зеленый при успехе
                    } else {
                        input.style.borderColor = "#e74c3c";    // Красный при ошибке
                        allCorrect = false;
                    }
                } else {
                    allCorrect = false;
                }
            });

            if (filledCount < inputs8.length) {
                resultMsg8.innerHTML = "<b>ПОСЧИТАЙ ВСЕ ПРЕДМЕТЫ!</b>";
                resultMsg8.style.color = "#ff9800";
            } else if (allCorrect) {
                resultMsg8.innerHTML = "<b>🏆 ПОТРЯСАЮЩЕ! ТЫ САМЫЙ ВНИМАТЕЛЬНЫЙ СЫЩИК!</b>";
                resultMsg8.style.color = "#27ae60";
            } else {
                resultMsg8.innerHTML = "<b>ЕСТЬ ОШИБКИ В ПОДСЧЕТАХ, ПОПРОБУЙ ЕЩЕ РАЗ!</b>";
                resultMsg8.style.color = "#e74c3c";
            }
        });
    }
});