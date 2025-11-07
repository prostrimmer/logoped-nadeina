document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. Персонализация ---
    const childName = localStorage.getItem('childName') || 'Юный Герой';
    const lessonDate = localStorage.getItem('lessonDate');

    document.getElementById('child-name-display').textContent = childName;
    if (lessonDate) {
        const dateObj = new Date(lessonDate);
        document.getElementById('lesson-date-display').textContent = dateObj.toLocaleDateString('ru-RU');
    } else {
        document.getElementById('lesson-date-display').textContent = new Date().toLocaleDateString('ru-RU');
    }

    // =================================================================
    // 1. ЛОГИКА ЗАДАНИЯ 5: Тройная Сортировка (Drag & Drop)
    // =================================================================
    
    const draggables = document.querySelectorAll('#draggable-items-3 img');
    const dropZones = document.querySelectorAll('#task-5 .target-zone');
    const checkButton5 = document.getElementById('check-button-3');
    const feedbackMessage5 = document.getElementById('feedback-message-3');
    let draggedItem = null;

    // A. Обработчики Drag and Drop
    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = e.target; 
            e.dataTransfer.setData('text/plain', e.target.id);
            
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        });

        item.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
            draggedItem = null; 
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            if (draggedItem) { 
                if (draggedItem.parentNode) {
                    draggedItem.parentNode.removeChild(draggedItem);
                }
                
                zone.appendChild(draggedItem);
                draggedItem.style.margin = '5px';
            }
        });
    });
    
    // B. Логика Проверки Задания 5
    checkButton5.addEventListener('click', () => {
        let correctCount = 0;
        let totalItemsToSort = 5; 

        draggables.forEach(item => item.style.border = '3px solid transparent');

        dropZones.forEach(zone => {
            const expectedCategory = zone.getAttribute('data-target');
            
            const droppedItems = zone.querySelectorAll('img');
            droppedItems.forEach(item => {
                const actualCategory = item.getAttribute('data-category');
                
                if (actualCategory === expectedCategory) {
                    correctCount++;
                    item.style.border = '3px solid #3CB371';
                } else {
                    item.style.border = '3px solid #FF6347';
                }
            });
        });

        const sourceContainer = document.getElementById('draggable-items-3');
        const extraItem = sourceContainer.querySelector('[data-category="СУ"]');
        let extraItemCorrectlyLeft = (extraItem !== null);

        let finalScore = correctCount;
        let finalMessage = '';

        if (finalScore === totalItemsToSort && extraItemCorrectlyLeft) {
            finalMessage = '🥳 <strong>Супер!</strong> Все нужные картинки на месте, и ты нашел лишнюю! 💯';
            feedbackMessage5.style.color = '#3CB371';
        } else if (finalScore === totalItemsToSort) {
            finalMessage = '👍 <strong>Почти идеально!</strong> Все картинки рассортированы верно, но одна должна была остаться внизу!';
            feedbackMessage5.style.color = '#FFA500';
        } else {
            finalMessage = `🤔 <strong>Неплохо!</strong> Правильно ${finalScore} из ${totalItemsToSort}. Попробуй исправить ошибки!`;
            feedbackMessage5.style.color = '#FF6347';
        }
        
        feedbackMessage5.innerHTML = finalMessage;
    });


    // =================================================================
    // 2. ЛОГИКА ЗАДАНИЯ 6: Игра «Закончи слово» (Сопоставление)
    // =================================================================
    
    const wordStems = document.querySelectorAll('.match-stem');
    const wordEnds = document.querySelectorAll('.match-end');
    const checkButton6 = document.getElementById('check-button-6');
    const feedbackMessage6 = document.getElementById('feedback-message-6');

    let selectedStem = null;

    // A. Обработчик для начала слова (Stem) - КОРРЕКЦИЯ СОХРАНЕНИЯ СОСТОЯНИЯ
    wordStems.forEach(stem => {
        // Сохраняем исходный текст каждого "начала слова" при инициализации
        if (!stem.dataset.originalText) {
            stem.dataset.originalText = stem.textContent;
        }
        stem.dataset.matchedEnd = ''; // Сбрасываем совпавшее окончание

        stem.addEventListener('click', () => {
            // 1. Снимаем выделение со ВСЕХ основ
            wordStems.forEach(s => {
                s.classList.remove('selected');
                // Важно: Не сбрасываем текст здесь! Текст сохраняется.
            });
            
            // 2. Если повторно нажали на ту же основу (для сброса выбора)
            if (selectedStem === stem) {
                // Если элемент уже был соединен, его текст нужно сбросить к исходному
                if (stem.dataset.matchedEnd !== '') {
                    stem.textContent = stem.dataset.originalText;
                    stem.dataset.matchedEnd = '';
                }
                selectedStem = null;
            } else {
                // 3. Выбираем новую основу
                stem.classList.add('selected');
                selectedStem = stem;
            }
        });
    });

    // B. Обработчик для окончания слова (End) - Без изменений
    wordEnds.forEach(end => {
        end.addEventListener('click', () => {
            if (selectedStem) {
                const endText = end.getAttribute('data-end'); // Получаем текст окончания (СОК, СО, СУ)
                const originalStemText = selectedStem.dataset.originalText; // Получаем исходный текст основы (НО, М, П)
                
                let newText = '';
                
                // Логика конкатенации в зависимости от типа группы
                if (selectedStem.dataset.groupType === 'reversal-stem') {
                    // РЕВЕРСИВНАЯ ЛОГИКА (ГРУППЫ 2 и 3): ОКОНЧАНИЕ (СО/СУ) + ОСНОВА (М/П/ДНО) -> СОМ, СУП
                    newText = endText + originalStemText; 
                } else {
                    // СТАНДАРТНАЯ ЛОГИКА (ГРУППА 1): ОСНОВА (НО/ПЕ) + ОКОНЧАНИЕ (СОК) -> НОСОК, ПЕСОК
                    newText = originalStemText + endText;
                }
                
                // Визуальное обновление текста выбранной основы
                selectedStem.textContent = newText;
                
                // Установка связи для проверки
                selectedStem.dataset.matchedEnd = endText;
                
                selectedStem.classList.remove('selected'); // Снимаем выделение
                selectedStem = null; // Сбрасываем выбранную основу
            }
        });
    });

    // C. Логика Проверки Задания 6 - Без изменений
    checkButton6.addEventListener('click', () => {
        let correctMatches = 0;
        let totalStems = wordStems.length;

        wordStems.forEach(stem => {
            const correctEnd = stem.getAttribute('data-correct-end');
            const userEnd = stem.dataset.matchedEnd;
            
            // Сбрасываем стили
            stem.classList.remove('correct', 'incorrect');

            if (userEnd === correctEnd) {
                correctMatches++;
                stem.classList.add('correct');
            } else if (userEnd !== '') {
                stem.classList.add('incorrect');
            }
        });
        
        if (correctMatches === totalStems) {
            feedbackMessage6.innerHTML = '✨ <strong>Фантастика!</strong> Все слова собраны верно! Ты настоящий мастер слогов. 💯';
            feedbackMessage6.style.color = '#3CB371';
        } else {
            feedbackMessage6.innerHTML = `🧐 <strong>Хорошо!</strong> Правильно ${correctMatches} из ${totalStems}. Попробуй еще раз!`;
            feedbackMessage6.style.color = '#FF6347';
        }
    });
    
    // =================================================================
    // 3. ЛОГИКА ЗАДАНИЯ 10: Словообразование (Word Wheel)
    // =================================================================
    
    const wordInputs10 = document.querySelectorAll('#task-10 input[type="text"]');
    const checkButton10 = document.getElementById('check-button-10');
    const feedbackMessage10 = document.getElementById('feedback-message-10');

    checkButton10.addEventListener('click', () => {
        let correctCount = 0;
        let totalWords = wordInputs10.length;

        wordInputs10.forEach(input => {
            const userAnswer = input.value.trim().toUpperCase();
            const correctAnswer = input.getAttribute('data-correct-word').toUpperCase();

            input.classList.remove('correct', 'incorrect');

            if (userAnswer === correctAnswer) {
                correctCount++;
                input.classList.add('correct');
            } else if (userAnswer.length > 0) {
                input.classList.add('incorrect');
            }
        });

        if (correctCount === totalWords) {
            feedbackMessage10.innerHTML = '🔥 <strong>ПОБЕДА!</strong> Ты составил все слова правильно! 💯';
            feedbackMessage10.style.color = '#3CB371';
        } else {
            feedbackMessage10.innerHTML = `🧐 <strong>Хорошо!</strong> Правильно ${correctCount} из ${totalWords}. Проверь, какие части слова ты соединил неверно!`;
            feedbackMessage10.style.color = '#FF6347';
        }
    });
    
    // =================================================================
    // 4. ЛОГИКА ЗАДАНИЯ 11: Ответь на вопросы
    // =================================================================

    const questionInputs11 = document.querySelectorAll('#task-11 input[type="text"]');
    const checkButton11 = document.getElementById('check-button-11');
    const feedbackMessage11 = document.getElementById('feedback-message-11');

    checkButton11.addEventListener('click', () => {
        let correctCount = 0;
        let totalQuestions = questionInputs11.length;

        questionInputs11.forEach(input => {
            const userAnswer = input.value.trim().toUpperCase();
            const correctAnswer = input.getAttribute('data-correct-word').toUpperCase();

            input.classList.remove('correct', 'incorrect');

            if (userAnswer === correctAnswer) {
                correctCount++;
                input.classList.add('correct');
            } else if (userAnswer.length > 0) {
                input.classList.add('incorrect');
            }
        });

        if (correctCount === totalQuestions) {
            feedbackMessage11.innerHTML = '💡 <strong>Отлично!</strong> Ты ответил на все вопросы правильно! 💯';
            feedbackMessage11.style.color = '#3CB371';
        } else {
            feedbackMessage11.innerHTML = `🤔 <strong>Почти!</strong> Правильно ${correctCount} из ${totalQuestions}. Попробуй еще раз подумать!`;
            feedbackMessage11.style.color = '#FF6347';
        }
    });
    
    // =================================================================
    // 5. ЛОГИКА ЗАДАНИЯ 12: Составь слова из букв
    // =================================================================

    const wordPuzzleInputs12 = document.querySelectorAll('#task-12 input[type="text"]');
    const checkButton12 = document.getElementById('check-button-12');
    const feedbackMessage12 = document.getElementById('feedback-message-12');

    checkButton12.addEventListener('click', () => {
        let correctCount = 0;
        let totalQuestions = wordPuzzleInputs12.length;

        wordPuzzleInputs12.forEach(input => {
            const userAnswer = input.value.trim().toUpperCase();
            const correctAnswer = input.getAttribute('data-correct-word').toUpperCase();

            input.classList.remove('correct', 'incorrect');

            if (userAnswer === correctAnswer) {
                correctCount++;
                input.classList.add('correct');
            } else if (userAnswer.length > 0) {
                input.classList.add('incorrect');
            }
        });

        if (correctCount === totalQuestions) {
            feedbackMessage12.innerHTML = '🎉 <strong>Победа!</strong> Ты составил все слова правильно! 💯';
            feedbackMessage12.style.color = '#3CB371';
        } else {
            feedbackMessage12.innerHTML = `🧠 <strong>Продолжай!</strong> Правильно ${correctCount} из ${totalQuestions}. Попробуй переставить буквы!`;
            feedbackMessage12.style.color = '#FF6347';
        }
    });

}); // End of DOMContentLoaded