const calendarGrid = document.getElementById('calendar-grid');
const eventList = document.getElementById('event-list');
const events = {
    '2024-12-21': ['21-22 Des : Comic Fiesta (CF) Malaysia - Booth Senyuki'],
    '2024-12-22': ['21-22 Des : Comic Fiesta (CF) Malaysia - Booth Senyuki'],
    '2025-02-08': ['08-09 Feb : Mukashi - SPARK'],
    '2025-02-09': ['08-09 Feb : Mukashi - SPARK']
}; // Object to store events

const monthNames = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
];

// Function to generate a calendar
function generateCalendar(year, month) {
    document.getElementById('calendar-header').textContent = `${monthNames[month]} ${year}`;
    calendarGrid.innerHTML = ''; // Clear previous calendar
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for the first row
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += `<div class="calendar-cell"></div>`;
    }

    // Generate calendar days
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.classList.add('calendar-cell');
        cell.textContent = day;
        const date = `${year}-${month + 1}-${String(day).padStart(2, '0')}`;
        cell.dataset.date = date; // Add data attribute

        // Highlight today's date
        const today = new Date();
        if (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year) {
            cell.classList.add('today');
        }

        // Highlight event dates
        if (events[date]) {
            cell.classList.add('event');
        }

        // Add click event to cell
        cell.addEventListener('click', () => {
            displayEventDetails(date);
        });

        calendarGrid.appendChild(cell);
    }
}

// Function to display event details
function displayEventDetails(date) {
    eventList.innerHTML = '<h2>Event Details</h2>';
    if (events[date]) {
        events[date].forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');
            eventItem.textContent = `${event}`;
            eventList.appendChild(eventItem);
        });
    } else {
        const noEventItem = document.createElement('div');
        noEventItem.classList.add('event-item');
        noEventItem.textContent = 'No events on this date.';
        eventList.appendChild(noEventItem);
    }
}

// Initialize calendar
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

generateCalendar(currentYear, currentMonth);

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth -= 1;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    }
    generateCalendar(currentYear, currentMonth);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth += 1;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    generateCalendar(currentYear, currentMonth);
});
