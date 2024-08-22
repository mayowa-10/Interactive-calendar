document.addEventListener('DOMContentLoaded', function() {
    const monthYear = document.getElementById('month-year');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const calendarDays = document.querySelector('.calendar-days');
    const eventModal = document.getElementById('event-modal');
    const closeModal = document.querySelector('.close');
    const eventDate = document.getElementById('event-date');
    const eventTitle = document.getElementById('event-title');
    const eventForm = document.getElementById('event-form');
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    function renderCalendar(month, year) {
        monthYear.innerText = `${months[month]} ${year}`;
        calendarDays.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            calendarDays.innerHTML += '<div></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.innerText = day;
            dayElement.addEventListener('click', () => openEventModal(day, month, year));
            calendarDays.appendChild(dayElement);
        }
    }

    function openEventModal(day, month, year) {
        eventModal.style.display = 'flex';
        eventDate.value = `${months[month]} ${day}, ${year}`;
    }

    function closeModalEvent() {
        eventModal.style.display = 'none';
    }

    prevButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    closeModal.addEventListener('click', closeModalEvent);

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Event "${eventTitle.value}" added on ${eventDate.value}`);
        eventTitle.value = '';
        closeModalEvent();
    });

    renderCalendar(currentMonth, currentYear);
});
