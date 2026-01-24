document.addEventListener('DOMContentLoaded', () => {
    // Данные ученика (по аналогии с вашим lesson-2)
    document.getElementById('child-name-display').textContent = 'Ульяна';
    document.getElementById('lesson-date-display').textContent = '24.01.2026';

    // === Задание №1 Логика. Комментарий: задание 1 ===
    (function() {
        const items = document.querySelectorAll('#task-1 .selectable-item');
        const checkBtn = document.getElementById('btn-1');
        const resMsg = document.getElementById('res-1');

        items.forEach(item => {
            // ЛКМ - Выделить (Красный контур)
            item.addEventListener('click', function() {
                this.classList.add('selected');
            });

            // ПКМ - Снять выделение
            item.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                this.classList.remove('selected');
                this.style.backgroundColor = "#fff";
            });
        });

        if (checkBtn) {
            checkBtn.onclick = function() {
                let hasError = false;
                let correctCount = 0;
                const totalCorrect = document.querySelectorAll('#task-1 .selectable-item[data-correct="true"]').length;

                items.forEach(item => {
                    const isSelected = item.classList.contains('selected');
                    const isCorrect = item.dataset.correct === "true";

                    if (isSelected && isCorrect) {
                        correctCount++;
                        item.style.backgroundColor = "#e8f5e9";
                    } else if (isSelected && !isCorrect) {
                        hasError = true;
                        item.style.backgroundColor = "#ffebee";
                    } else if (!isSelected && isCorrect) {
                        hasError = true; // Пропустили нужную картинку
                    }
                });

                if (!hasError && correctCount === totalCorrect) {
                    resMsg.textContent = "🎉 ВЕРНО! ТЫ НАШЁЛ ВСЕ СЛОВА!";
                    resMsg.style.color = "#2e7d32";
                    this.style.backgroundColor = "#27ae60";
                    this.style.boxShadow = "0 6px 0 #1e8449";
                } else {
                    resMsg.textContent = "❌ ЕЩЁ НЕ ВСЁ. ПОСМОТРИ ВНИМАТЕЛЬНЕЕ!";
                    resMsg.style.color = "#c62828";
                }
            };
        }
    })();
});

// === Задание №2 Логика. Комментарий: задание 2 ===
(function() {
    const checkBtn = document.getElementById('btn-2');
    const resMsg = document.getElementById('res-2');
    const inputs = document.querySelectorAll('.sentence-input');

    if (checkBtn) {
        checkBtn.onclick = function() {
            let allFilled = true;
            inputs.forEach(input => {
                if (input.value.trim().length < 3) allFilled = false;
            });

            if (allFilled) {
                resMsg.textContent = "🌟 МОЛОДЕЦ! ТЫ ЗАПИСАЛ ВСЕ ПРЕДЛОЖЕНИЯ!";
                resMsg.style.color = "#27ae60";
                this.style.backgroundColor = "#27ae60";
            } else {
                resMsg.textContent = "✍️ ПОЖАЛУЙСТА, ДОПИШИ ВСЕ ПРЕДЛОЖЕНИЯ.";
                resMsg.style.color = "#ff6d00";
            }
        };
    }
})();

// === Задание №3: Логика кругов. Комментарий: задание 3 ===
(function() {
    const circles = document.querySelectorAll('.num-circle');
    
    circles.forEach(circle => {
        circle.onclick = function() {
            // Переключаем класс active для заливки
            this.classList.toggle('active');
        };
    });

    const checkBtn = document.getElementById('btn-3');
    if (checkBtn) {
        checkBtn.onclick = function() {
            this.style.backgroundColor = "#27ae60";
            this.textContent = "МОЛОДЕЦ!";
        };
    }
})();

// === Задание №4: Проверка. Комментарий: задание 4 ===
(function() {
    const checkBtn = document.getElementById('btn-4');
    if (checkBtn) {
        checkBtn.onclick = function() {
            this.style.backgroundColor = "#27ae60";
            this.textContent = "ГОТОВО!";
        };
    }
})();

// === Задание №5: Логика сопоставления. Комментарий: задание 5 ===
(function() {
    let selectedText = null;
    const twisterItems = document.querySelectorAll('.twister-item');
    const imgCards = document.querySelectorAll('.img-card');

    twisterItems.forEach(item => {
        item.onclick = function() {
            if (this.classList.contains('matched')) return;
            twisterItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            selectedText = this;
        };
    });

    imgCards.forEach(card => {
        card.onclick = function() {
            if (this.classList.contains('matched') || !selectedText) return;
            
            if (this.dataset.id === selectedText.dataset.id) {
                this.classList.add('matched');
                selectedText.classList.add('matched');
                selectedText.classList.remove('selected');
                selectedText = null;
            } else {
                this.style.borderColor = "red";
                setTimeout(() => this.style.borderColor = "#e1f5fe", 500);
            }
        };
    });

    document.getElementById('btn-5').onclick = function() {
        const matches = document.querySelectorAll('.twister-item.matched').length;
        if (matches === 5) {
            document.getElementById('res-5').textContent = "🎉 ТЫ ВСЁ СОЕДИНИЛ ВЕРНО!";
            this.style.backgroundColor = "#27ae60";
        }
    };
})();

// === Задание №6: Логика выбора. Комментарий: задание 6 ===
(function() {
    const allCells = document.querySelectorAll('.cells div');
    
    allCells.forEach(cell => {
        cell.onclick = function() {
            // В одном ряду может быть только одна активная клетка
            const parent = this.parentElement;
            Array.from(parent.children).forEach(child => child.classList.remove('active'));
            this.classList.add('active');
        };
    });

    document.getElementById('btn-6').onclick = function() {
        this.style.backgroundColor = "#27ae60";
        this.textContent = "ОТЛИЧНО!";
    };
})();

// === Задание №7 Логика. Комментарий: задание 7 ===
(function() {
    const animals = document.querySelectorAll('#task-7 .drag-animal');
    const dropZone = document.getElementById('drop-zone-7');
    const overlay = document.querySelector('.barn-overlay');
    let draggedItem = null;

    animals.forEach(animal => {
        animal.addEventListener('dragstart', function() {
            draggedItem = this;
            this.style.opacity = '0.5';
        });

        animal.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });

    dropZone.addEventListener('dragover', e => {
        e.preventDefault();
        overlay.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        overlay.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        overlay.classList.remove('drag-over');

        if (draggedItem) {
            // Если у животного есть звук [с'], оно исчезает (уходит в сарай)
            if (draggedItem.dataset.sound === 'yes') {
                draggedItem.style.visibility = 'hidden'; 
                draggedItem.setAttribute('draggable', 'false');
                draggedItem.classList.add('hidden-in-barn');
            } else {
                // Если звука нет, картинка просто возвращается на место (ничего не происходит)
            
            }
        }
    });

    document.getElementById('btn-7').onclick = function() {
        const hiddenCount = document.querySelectorAll('.hidden-in-barn').length;
        const res = document.getElementById('res-7');
        
        if (hiddenCount === 4) {
            res.textContent = "✅ МОЛОДЕЦ! ВСЕ ЖИВОТНЫЕ В САРАЕ!";
            res.style.color = "#27ae60";
            this.style.backgroundColor = "#27ae60";
        } else {
            res.textContent = "❌ ТЫ СПРЯТАЛ НЕ ВСЕХ НУЖНЫХ ЖИВОТНЫХ.";
            res.style.color = "#c62828";
        }
    };
})();

// === Задание №8 Логика. Комментарий: задание 8 ===
(function() {
    const inputs = document.querySelectorAll('#task-8 .letter-input');
    
    // Автоматический переход к следующему полю при вводе
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
    });

    document.getElementById('btn-8').onclick = function() {
        let allCorrect = true;
        
        inputs.forEach(input => {
            const userVal = input.value.trim().toUpperCase();
            const correctVal = input.dataset.correct;
            
            if (userVal === correctVal) {
                input.classList.remove('error');
                input.classList.add('success');
            } else {
                input.classList.remove('success');
                input.classList.add('error');
                allCorrect = false;
            }
        });

        const res = document.getElementById('res-8');
        if (allCorrect) {
            res.textContent = "🎉 ВЕРНО! ПОЛУЧИЛОСЬ СЛОВО: СОСИСКА";
            res.style.color = "#27ae60";
            this.style.backgroundColor = "#27ae60";
        } else {
            res.textContent = "❌ ПОКА НЕ СОВСЕМ... ПОПРОБУЙ ЕЩЁ РАЗ!";
            res.style.color = "#f44336";
        }
    };
})();

// === Задание №9 Логика. Комментарий: задание 9 ===
(function() {
    const draggables = document.querySelectorAll('#task-9 .drag-sentence');
    const targets = document.querySelectorAll('#task-9 .target-box');
    let dragged = null;

    draggables.forEach(s => {
        s.ondragstart = () => { dragged = s; s.style.opacity = "0.5"; };
        s.ondragend = () => { s.style.opacity = "1"; };
    });

    targets.forEach(t => {
        t.ondragover = e => e.preventDefault();
        t.ondrop = function() {
            if (dragged) {
                const zone = this.querySelector('.drop-zone-text');
                zone.textContent = dragged.textContent;
                zone.dataset.match = dragged.dataset.match;
                dragged.style.display = "none";
                dragged = null;
            }
        };
    });

    document.getElementById('btn-9').onclick = function() {
        let matches = 0;
        targets.forEach(t => {
            if (t.dataset.id === t.querySelector('.drop-zone-text').dataset.match) matches++;
        });

        const creativeText = document.getElementById('creative-input').value.trim();
        const res = document.getElementById('res-9');

        if (matches === 4 && creativeText.length > 5) {
            res.textContent = "✅ Задание выполнено идеально!";
            res.style.color = "#2e7d32";
            this.style.backgroundColor = "#27ae60";
        } else {
            res.textContent = "Соотнеси все картинки и напиши предложение.";
            res.style.color = "#d32f2f";
        }
    };
})();