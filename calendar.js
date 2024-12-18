document.addEventListener("DOMContentLoaded", function () {
            const calendarHeader = document.getElementById('calendar-header');
            const calendarGrid = document.getElementById('calendar-grid');
            const eventList = document.getElementById('event-list');
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

            // Simpan data event
             const events = {
            '2024-12-21': ['Comic Fiesta (CF) Malaysia 2024 - Booth Senyuki'],
            '2024-12-22': ['Comic Fiesta (CF) Malaysia 2024 - Booth Senyuki']
            }; 
           
            // Fungsi Render Kalender
            function renderCalendar(month, year) {
                calendarHeader.innerText = `${monthNames[month]} ${year}`;
                calendarGrid.innerHTML = "";

                // Render Nama Hari
                dayNames.forEach(day => {
                    const dayHeader = document.createElement("div");
                    dayHeader.classList.add("calendar-cell", "day-header");
                    dayHeader.innerText = day;
                    calendarGrid.appendChild(dayHeader);
                });

                // Tanggal awal bulan dan jumlah hari dalam bulan
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                // Sel kosong sebelum tanggal 1
                for (let i = 0; i < firstDay; i++) {
                    const emptyCell = document.createElement("div");
                    emptyCell.classList.add("calendar-cell");
                    calendarGrid.appendChild(emptyCell);
                }

                // Isi tanggal
                for (let day = 1; day <= daysInMonth; day++) {
                    const dateCell = document.createElement("div");
                    dateCell.classList.add("calendar-cell");
                    dateCell.innerText = day;

                    // Highlight hari ini
                    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        dateCell.classList.add("today");
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
                    eventItem.textContent = `${date}: ${event}`;
                    eventList.appendChild(eventItem);
                });
            } else {
                const noEventItem = document.createElement('div');
                noEventItem.classList.add('event-item');
                noEventItem.textContent = 'Tidak ada Event';
                eventList.appendChild(noEventItem);
            }
        }

                // Sel kosong tambahan agar baris genap (jika perlu)
                const totalCells = firstDay + daysInMonth;
                const remainingCells = (7 - (totalCells % 7)) % 7;
                for (let i = 0; i < remainingCells; i++) {
                    const emptyCell = document.createElement("div");
                    emptyCell.classList.add("calendar-cell");
                    calendarGrid.appendChild(emptyCell);
                }
            }

            // Fungsi Pindah Bulan
            function changeMonth(delta) {
                currentMonth += delta;
                if (currentMonth < 0) {
                    currentMonth = 11; // Desember
                    currentYear--;
                } else if (currentMonth > 11) {
                    currentMonth = 0; // Januari
                    currentYear++;
                }
                renderCalendar(currentMonth, currentYear);
            }

            // Event Listener Tombol
            prevMonthBtn.addEventListener("click", function () {
                changeMonth(-1);
            });

            nextMonthBtn.addEventListener("click", function () {
                changeMonth(1);
            });

            // Render Kalender Awal
            renderCalendar(currentMonth, currentYear);
        });
