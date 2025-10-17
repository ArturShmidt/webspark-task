// Функція ініціалізації датапікера
function initializeDatePicker(inputId) {
    const wrapper = document.querySelector(`#${inputId}`).closest('.datepicker');
    const input = wrapper.querySelector('input');
    const calendarButton = wrapper.querySelector('.datepicker__calendar');
    const clearButton = wrapper.querySelector('.datepicker__clear');

    const fp = flatpickr(input, {
        dateFormat: "d-m-Y",
        minDate: "today",
        maxDate: new Date().fp_incr(365),
        allowInput: true,
        clickOpens: false, // Вимикаємо автоматичне відкриття при кліку на інпут
        onChange: (selectedDates, dateStr) => {
            // Прибираємо зміну видимості кнопки очищення
        }
    });

    // Відкриття календаря при кліку на іконку календаря
    calendarButton.addEventListener('click', () => {
        fp.open();
    });

    // Очищення дати при кліку на хрестик
    clearButton.addEventListener('click', () => {
        fp.clear();
    });
}

// Ініціалізація обох датапікерів
initializeDatePicker('date-start');
initializeDatePicker('date-end');

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.toggle-btn');
    const gridBtn = document.querySelector('.grid-btn');
    const containersGrid = document.querySelector('.containers-grid');
    const containers = document.querySelector('.containers');

    let currentLayout = 'flex'; // початковий стан

    function applyLayout(layout) {
        if (layout === 'grid') {
            containers.classList.add('hidden');
            containersGrid.classList.remove('hidden');

            const toggleBlocks = document.querySelectorAll('.toggle-btn-block');
            toggleBlocks.forEach(block => block.style.backgroundColor = '#C8C8C8');
            gridBtn.querySelector('img').src = 'src/assets/img/Grid-grey.svg';

            currentLayout = 'grid';
        } else {
            containers.classList.remove('hidden');
            containersGrid.classList.add('hidden');

            const toggleBlocks = document.querySelectorAll('.toggle-btn-block');
            toggleBlocks.forEach(block => block.style.backgroundColor = '');
            gridBtn.querySelector('img').src = 'src/assets/img/Grid.svg';

            currentLayout = 'flex';
        }
    }

    function updateLayout() {
        const isMobile = window.innerWidth <= 676;

        if (isMobile) {
            // Мобільна версія — автоматичне перемикання
            containers.classList.add('hidden');
            containersGrid.classList.remove('hidden');
        } else {
            // Десктоп — повертаємо обраний користувачем режим
            applyLayout(currentLayout);
        }
    }

    // Початкова ініціалізація
    updateLayout();

    // Обробка зміни розміру вікна
    window.addEventListener('resize', updateLayout);

    // Обробка кнопок (лише для десктопу)
    toggleBtn.addEventListener('click', function () {
        if (window.innerWidth > 676) {
            applyLayout('flex');
        }
    });

    gridBtn.addEventListener('click', function () {
        if (window.innerWidth > 676) {
            applyLayout('grid');
        }
    });
});
