document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Приветствие и Персонализация ---
    
    const childName = localStorage.getItem('childName') || 'Юный Герой';
    const lessonDate = localStorage.getItem('lessonDate');

    document.getElementById('child-name-display').textContent = childName;
    if (lessonDate) {
        // Форматируем дату для более дружелюбного отображения
        const dateObj = new Date(lessonDate);
        document.getElementById('lesson-date-display').textContent = dateObj.toLocaleDateString('ru-RU');
    } else {
        document.getElementById('lesson-date-display').textContent = new Date().toLocaleDateString('ru-RU');
    }


    // --- 2. Логика Drag and Drop ---

    const draggables = document.querySelectorAll('.draggable-items-container img');
    const dropZones = document.querySelectorAll('.target-zone');
    const checkButton = document.getElementById('check-button');
    const feedbackMessage = document.getElementById('feedback-message');
    let draggedItem = null;

    // A. Обработка начала перетаскивания
    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
            // Установка данных, которые будут переданы
            e.dataTransfer.setData('text/plain', e.target.id);
            // Добавляем класс, чтобы сделать перетаскиваемый элемент полупрозрачным
            setTimeout(() => {
                e.target.classList.add('dragging');
            }, 0);
        });

        item.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
            draggedItem = null;
        });
    });

    // B. Обработка областей для сброса
    dropZones.forEach(zone => {
        // Предотвращение стандартного поведения (по умолчанию сброс запрещен)
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        // Обработка сброса
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            if (draggedItem) {
                // Перемещаем элемент в новую зону
                zone.appendChild(draggedItem);
                draggedItem.style.position = 'relative'; // Сбрасываем возможные стили
                draggedItem.style.margin = '5px';
            }
        });
    });
    
    // --- 3. Логика Проверки ---

    checkButton.addEventListener('click', () => {
        let correctCount = 0;
        let totalItems = draggables.length;

        // Перебираем все зоны сброса
        dropZones.forEach(zone => {
            const expectedCategory = zone.getAttribute('data-target');
            
            // Перебираем все картинки, которые находятся в этой зоне
            const droppedItems = zone.querySelectorAll('img');
            droppedItems.forEach(item => {
                const actualCategory = item.getAttribute('data-category');
                
                if (actualCategory === expectedCategory) {
                    correctCount++;
                    item.style.border = '3px solid #3CB371'; // Зеленая рамка - правильно
                } else {
                    item.style.border = '3px solid #FF6347'; // Красная рамка - ошибка
                }
            });
        });

        // Вывод сообщения обратной связи
        if (correctCount === totalItems) {
            feedbackMessage.innerHTML = '🥳 **Супер!** Все картинки лежат в правильных домиках! 💯';
            feedbackMessage.style.color = '#3CB371';
        } else {
            feedbackMessage.innerHTML = `🤔 **Неплохо!** Правильно ${correctCount} из ${totalItems}. Попробуй исправить ошибки!`;
            feedbackMessage.style.color = '#FF6347';
        }
    });

});