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

    // --- Блок 2: Слоговые ряды (самооценка для устных повторений) ---
    const checkButtonSyllables = document.getElementById('check-button-syllables');
    const feedbackSyllables = document.getElementById('feedback-message-syllables');
    checkButtonSyllables.addEventListener('click', () => {
        feedbackSyllables.innerHTML = '🎉 <strong>Молодец!</strong> Если ты повторил все ряды, то всё правильно. Если нет — попробуй ещё раз! 💯';
        feedbackSyllables.style.color = '#3CB371';
    });

    // --- Блок 3: Закончи слово (клик на "С" — выбор, клик на окончание — текст 'С' + текст, зелёный) ---
    const sKeys = document.querySelectorAll('.s-key');
    const endItems = document.querySelectorAll('.end-item');
    const checkButtonCompleteWord = document.getElementById('check-button-complete-word');
    const feedbackCompleteWord = document.getElementById('feedback-message-complete-word');
    let selectedS = null;

    sKeys.forEach(key => {
        key.addEventListener('click', () => {
            sKeys.forEach(k => k.classList.remove('selected'));
            key.classList.add('selected');
            selectedS = key;
            feedbackCompleteWord.innerHTML = '🧩 Выбрал "С"! Теперь кликни на жёлтую клавишу.';
            feedbackCompleteWord.style.color = '#0000FF';
        });
    });

    endItems.forEach(item => {
        item.addEventListener('click', () => {
            if (selectedS) {
                const originalText = item.dataset.word;
                const fullWord = 'С' + originalText.toUpperCase();
                item.textContent = fullWord;
                item.classList.add('completed');
                selectedS.classList.remove('selected');
                selectedS = null;
                feedbackCompleteWord.innerHTML = `✅ Перенёс "С"! Получилось слово: ${fullWord}`;
                feedbackCompleteWord.style.color = '#3CB371';
            } else {
                feedbackCompleteWord.innerHTML = '❌ Сначала кликни на красную клавишу "С"!';
                feedbackCompleteWord.style.color = '#FF6347';
            }
        });
    });

    checkButtonCompleteWord.addEventListener('click', () => {
        let correctCount = 0;
        endItems.forEach(item => {
            if (item.classList.contains('completed')) {
                correctCount++;
                item.classList.add('correct');
            } else {
                item.classList.add('incorrect');
            }
        });

        if (correctCount === 3) {
            feedbackCompleteWord.innerHTML = '🔥 <strong>ПОБЕДА!</strong> Все слова готовы: САД, СОК, СЫР! 💯';
            feedbackCompleteWord.style.color = '#3CB371';
        } else {
            feedbackCompleteWord.innerHTML = `🧠 <strong>Продолжай!</strong> Готово ${correctCount} из 3. Добавь "С" ко всем!`;
            feedbackCompleteWord.style.color = '#FF6347';
        }
    });

    // --- Блок 4: Рассмотри картинки и определи место звука С в названии каждой (проверка input, подсветка букв, фокус на С) ---
    const positionSInputs = document.querySelectorAll('#task-position-s input[type="text"]');
    const checkButtonPositionS = document.getElementById('check-button-position-s');
    const feedbackPositionS = document.getElementById('feedback-message-position-s');

    // Авто uppercase в input
    positionSInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.toUpperCase();
        });
    });

    checkButtonPositionS.addEventListener('click', () => {
        let correctCount = 0;
        let totalInputs = positionSInputs.length;

        positionSInputs.forEach(input => {
            const userLetter = input.value.toLowerCase().trim();
            const correctLetter = input.dataset.correct.toLowerCase();
            input.classList.remove('correct', 'incorrect');

            if (userLetter === correctLetter && userLetter !== '') {
                correctCount++;
                input.classList.add('correct');
                if (correctLetter === 'с') {
                    input.style.boxShadow = '0 0 15px #3CB371'; /* Фокус на С */
                }
            } else if (userLetter !== '') {
                input.classList.add('incorrect');
            }
        });

        if (correctCount === totalInputs) {
            feedbackPositionS.innerHTML = '🎉 <strong>Отлично!</strong> Ты правильно написал все названия и нашёл место С в каждом! 💯';
            feedbackPositionS.style.color = '#3CB371';
        } else {
            feedbackPositionS.innerHTML = `🤔 <strong>Почти!</strong> Правильно ${correctCount} из ${totalInputs} букв. Проверь место С!`;
            feedbackPositionS.style.color = '#FF6347';
        }
    });

    // --- Блок 5: В каждой группе найди и отмети лишнюю картинку (левый клик — синяя рамка; повторный левый — красная; правый — удаление; проверка) ---
    const lishniyImageItems = document.querySelectorAll('#task-lishniy .image-item');
    const checkButtonLishniy = document.getElementById('check-button-lishniy');
    const feedbackLishniy = document.getElementById('feedback-message-lishniy');

    lishniyImageItems.forEach(item => {
        const img = item.querySelector('.group-image');

        // Левый клик: toggle selected (синяя рамка) → marked (красная статическая)
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.classList.contains('marked')) return;
            if (item.classList.contains('selected')) {
                item.classList.remove('selected');
                item.classList.add('marked');
                feedbackLishniy.innerHTML = '🔴 Отметил лишнюю! Чтобы убрать, кликни правой кнопкой мыши.';
                feedbackLishniy.style.color = '#FF6347';
            } else {
                item.classList.add('selected');
                feedbackLishniy.innerHTML = '🔵 Выбрал! Кликни ещё раз, чтобы отметить красным.';
                feedbackLishniy.style.color = '#0000FF';
            }
        });

        // Правый клик: удаление marked (красной рамки)
        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (item.classList.contains('marked')) {
                item.classList.remove('marked');
                feedbackLishniy.innerHTML = '🗑️ Убрал отметку.';
                feedbackLishniy.style.color = '#3CB371';
            }
        });
    });

    checkButtonLishniy.addEventListener('click', () => {
        let correctCount = 0;
        lishniyImageItems.forEach(item => {
            const isLishniy = item.dataset.lishniy === 'true';
            if (item.classList.contains('marked') && isLishniy) {
                correctCount++;
                item.classList.add('correct');
            } else if (item.classList.contains('marked')) {
                item.classList.add('incorrect');
            } else if (isLishniy) {
                item.classList.add('missed');
            }
        });

        if (correctCount === 0) {
            feedbackLishniy.innerHTML = '🎉 <strong>Отлично!</strong> Ты нашёл все лишние картинки! 💯';
            feedbackLishniy.style.color = '#3CB371';
        } else {
            feedbackLishniy.innerHTML = `🤔 <strong>Почти!</strong> Правильно ${correctCount} из 4. Попробуй ещё раз!`;
            feedbackLishniy.style.color = '#FF6347';
        }
    });

    console.log('Занятие 4 загружено. Все задания готовы!');
    // --- Блок 6: Определение первого звука (проверка одной input под каждой картинкой, подсветка, счёт по 6) ---
const firstSoundInputs = document.querySelectorAll('#task-first-sound input[type="text"]');
const checkButtonFirstSound = document.getElementById('check-button-first-sound');
const feedbackFirstSound = document.getElementById('feedback-message-first-sound');

// Авто uppercase в input
firstSoundInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.toUpperCase();
    });
});

checkButtonFirstSound.addEventListener('click', () => {
    let correctCount = 0;
    let totalInputs = firstSoundInputs.length;

    firstSoundInputs.forEach(input => {
        const userLetter = input.value.toUpperCase().trim();
        const correctLetter = input.dataset.correct.toUpperCase();
        input.value = userLetter;
        input.classList.remove('correct', 'incorrect');

        if (userLetter === correctLetter && userLetter !== '') {
            correctCount++;
            input.classList.add('correct');
            input.style.boxShadow = '0 0 10px #3CB371'; /* Фокус на первой букве */
        } else if (userLetter !== '') {
            input.classList.add('incorrect');
            input.style.boxShadow = '0 0 10px #FF6347';
        }
    });

    if (correctCount === totalInputs) {
        feedbackFirstSound.innerHTML = '🎉 <strong>Отлично!</strong> Ты определил первый звук в каждом слове! Прочитай слова вслух: САМОЛЁТ, ОБЛАКО, ЛОТОС, НОСОК, КУРИЦА, ЕНОТ! 💯';
        feedbackFirstSound.style.color = '#3CB371';
    } else {
        feedbackFirstSound.innerHTML = `🤔 <strong>Почти!</strong> Правильно ${correctCount} из ${totalInputs}. Проверь первый звук и прочитай слова!`;
        feedbackFirstSound.style.color = '#FF6347';
    }
});
}); // End of DOMContentLoaded