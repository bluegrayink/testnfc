const calendarGrid = document.getElementById('calendar-grid');
const eventList = document.getElementById('event-list');
const dayRow = document.getElementById('day-row');
const headerTitle = document.getElementById('header-title');

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const monthNames = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
];

const events = {
    '2025-01-18': [
        {
            date: '18-19 January',
            name: 'Costica Shoots: CTS-05',
            location: 'Photography Studio, North East near MRT, Singapore',
            description: 'E4 | From 1-4 PM and 5-8 PM',
            info: 'https://www.instagram.com/p/DD_G1K2SQc2/'
        }
    ],
    '2025-01-19': [
        {
            date: '18-19 January',
            name: 'Costica Shoots: CTS-05',
            location: 'Photography Studio, North East near MRT, Singapore',
            description: 'E4 | From 1-4 PM and 5-8 PM',
            info: 'https://www.instagram.com/p/DD_G1K2SQc2/'
        }
    ]
};


// Initialize day names
function initDayNames() {
    dayRow.innerHTML = '';
    daysOfWeek.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-cell', 'day-header');
        dayCell.textContent = day;
        dayRow.appendChild(dayCell);
    });
}

// Generate calendar
function generateCalendar(year, month) {
    headerTitle.textContent = `${monthNames[month]} ${year}`;
    calendarGrid.innerHTML = '';

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for the first row
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += `<div class="calendar-cell empty"></div>`;
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const cell = document.createElement('div');
        cell.classList.add('calendar-cell');
        cell.textContent = day;
        
        const dayOfWeek = new Date(year, month, day).getDay();

    // Highlight Sundays
    if (dayOfWeek === 0) { // 0 represents Sunday
        cell.classList.add('sunday');
    }

        if (events[date]) {
            cell.classList.add('event');
        }

        const today = new Date();
        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
            cell.classList.add('today');
        }

        cell.dataset.date = date;
        cell.addEventListener('click', () => displayEventDetails(date));
        calendarGrid.appendChild(cell);
    }
}

function displayEventDetails(date) {
    eventList.innerHTML = '<h2>Event Details</h2>';
    const eventData = events[date];

    if (eventData) {
        eventData.forEach(event => {
            // Buat elemen event block
            const eventBlock = document.createElement('div');
            eventBlock.classList.add('event-block');

            // Tambahkan elemen untuk setiap bagian (date, name, location, info)
            const eventDate = document.createElement('div');
            eventDate.textContent = event.date;
            eventDate.style.fontWeight = 'bold';

            const eventName = document.createElement('div');
            eventName.textContent = event.name;

            const eventLocation = document.createElement('div');
            eventLocation.textContent = event.location;

            const eventDescription = document.createElement('div');
            eventDescription.textContent = event.description;

            const eventInfo = document.createElement('a'); // Membuat hyperlink
            eventInfo.href = event.info; // URL
            eventInfo.textContent = 'More Info'; // Teks hyperlink
            eventInfo.target = '_blank'; // Buka di tab baru
            eventInfo.style.color = 'blue'; // Gaya opsional

            // Gabungkan semua elemen ke dalam event block
            eventBlock.appendChild(eventDate);
            eventBlock.appendChild(eventName);
            eventBlock.appendChild(eventLocation);
            eventBlock.appendChild(eventDescription);
            eventBlock.appendChild(eventInfo);

            // Tambahkan event block ke dalam event list
            eventList.appendChild(eventBlock);
        });
    } else {
        const noEventItem = document.createElement('div');
        noEventItem.classList.add('event-item');
        noEventItem.textContent = 'No events on this date.';
        eventList.appendChild(noEventItem);
    }
}


// Initialize
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

initDayNames();
generateCalendar(currentYear, currentMonth);

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
});
