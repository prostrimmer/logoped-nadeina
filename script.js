document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылку на форму по ее ID
    const form = document.getElementById('start-lesson-form');

    // Добавляем обработчик события отправки формы
    if (form) {
        form.addEventListener('submit', (event) => {
            // Отменяем стандартное действие отправки формы (перезагрузку страницы)
            event.preventDefault();

            // 1. Получаем значения из полей ввода
            const childNameInput = document.getElementById('child-name');
            const lessonDateInput = document.getElementById('lesson-date');

            const childName = childNameInput ? childNameInput.value.trim() : 'Юный Герой';
            const lessonDate = lessonDateInput ? lessonDateInput.value : new Date().toISOString().split('T')[0];

            // Проверка, что имя не пустое
            if (childName === '') {
                alert('Пожалуйста, введите свое имя!');
                childNameInput.focus();
                return;
            }

            // 2. Сохраняем данные для использования на следующей странице (lesson-1.html)
            // Используем localStorage для простоты
            localStorage.setItem('childName', childName);
            localStorage.setItem('lessonDate', lessonDate);
            
            console.log(`Данные сохранены: Имя: ${childName}, Дата: ${lessonDate}`);

            // 3. Перенаправляем пользователя на страницу первого занятия
            window.location.href = 'lesson-1.html';
        });
    }
});