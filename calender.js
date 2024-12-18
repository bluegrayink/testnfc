document.addEventListener("DOMContentLoaded", function () {
    const calendarHeader = document.getElementById('calendar-header');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Render Calendar Function
    function renderCalendar(month, year) {
        calendarHeader.innerText = `${monthNames[month]} ${year}`;
        calendarGrid.innerHTML = "";

        // Render Day Names
        dayNames.forEach(day => {
            const dayHeader = document.createElement("div");
            dayHeader.classList.add("calendar-cell", "day-header");
            dayHeader.innerText = day;
            calendarGrid.appendChild(dayHeader);
        });

        // First day of the month and number of days in the month
        const firstDay = new Date(year, month, 1).getDay(); // First day of the month
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month

        // Empty cells before the first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("calendar-cell");
            calendarGrid.appendChild(emptyCell);
        }

        // Fill in the days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement("div");
            dateCell.classList.add("calendar-cell");
            dateCell.innerText = day;

            // Highlight today's date
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dateCell.classList.add("today");
            }

            calendarGrid.appendChild(dateCell);
        }

        // Empty cells at the end of the month to complete the last row
        const totalCells = firstDay + daysInMonth;
        const remainingCells = (7 - (totalCells % 7)) % 7; 
        for (let i = 0; i < remainingCells; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("calendar-cell");
            calendarGrid.appendChild(emptyCell);
        }
    }

    // Change Month Function
    function changeMonth(delta) {
        currentMonth += delta;
        if (currentMonth < 0) {
            currentMonth = 11; // December
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0; // January
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    }

    // Button Event Listeners
    prevMonthBtn.addEventListener("click", function () {
        changeMonth(-1);
    });

    nextMonthBtn.addEventListener("click", function () {
        changeMonth(1);
    });

    // Initial Render
    renderCalendar(currentMonth, currentYear);
});
