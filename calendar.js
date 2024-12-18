const calendarGrid = document.getElementById('calendar-grid');
        const eventList = document.getElementById('event-list');
        const events = {}; // Object to store events

        // Function to generate a calendar
        function generateCalendar(year, month) {
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
                cell.dataset.date = `${year}-${month + 1}-${day}`; // Add data attribute

                // Highlight today's date
                const today = new Date();
                if (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year) {
                    cell.classList.add('today');
                }

                // Add click event to cell
                cell.addEventListener('click', () => {
                    const date = cell.dataset.date;
                    const eventName = prompt(`Add event for ${date}:`);
                    if (eventName) {
                        if (!events[date]) events[date] = [];
                        events[date].push(eventName);
                        displayEvents();
                    }
                });

                calendarGrid.appendChild(cell);
            }
        }

        // Function to display events
        function displayEvents() {
            eventList.innerHTML = '<h2>Events</h2>';
            for (const date in events) {
                events[date].forEach(event => {
                    const eventItem = document.createElement('div');
                    eventItem.classList.add('event-item');
                    eventItem.textContent = `${date}: ${event}`;
                    eventList.appendChild(eventItem);
                });
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
