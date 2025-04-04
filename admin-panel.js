// Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.querySelector(e.target.getAttribute('href')).classList.remove('hidden');
    });
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
});

// Event Management
const eventForm = document.getElementById('event-form');
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newEvent = {
        title: document.getElementById('event-title').value,
        description: document.getElementById('event-desc').value,
        date: document.getElementById('event-date').value,
        image: document.getElementById('event-image').value,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        createdBy: auth.currentUser.uid
    };
    
    database.ref('events').push(newEvent)
        .then(() => {
            eventForm.reset();
            showMessage('Event created successfully!', 'success');
        })
        .catch(error => {
            showMessage('Error creating event: ' + error.message, 'error');
        });
});

// Real-time Event List
database.ref('events').on('value', (snapshot) => {
    const eventsContainer = document.querySelector('.events-list');
    eventsContainer.innerHTML = '';
    
    snapshot.forEach((childSnapshot) => {
        const event = childSnapshot.val();
        const eventElement = document.createElement('div');
        eventElement.className = 'event-card';
        eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <img src="${event.image || 'default-event.jpg'}" alt="${event.title}">
            <p>${event.description}</p>
            <small>${new Date(event.date).toLocaleString()}</small>
            <button class="delete-event" data-id="${childSnapshot.key}">Delete</button>
        `;
        eventsContainer.appendChild(eventElement);
    });
    
    // Add delete event listeners
    document.querySelectorAll('.delete-event').forEach(button => {
        button.addEventListener('click', (e) => {
            const eventId = e.target.getAttribute('data-id');
            database.ref('events/' + eventId).remove()
                .then(() => showMessage('Event deleted', 'success'))
                .catch(error => showMessage('Error deleting event', 'error'));
        });
    });
});

// Site Analytics
database.ref('analytics').on('value', (snapshot) => {
    const stats = snapshot.val();
    const statsGrid = document.querySelector('.stats-grid');
    
    statsGrid.innerHTML = `
        <div class="stat-card">
            <h3>Visitors Today</h3>
            <p>${stats.visitorsToday || 0}</p>
        </div>
        <div class="stat-card">
            <h3>Total Events</h3>
            <p>${stats.totalEvents || 0}</p>
        </div>
        <!-- Add more stats as needed -->
    `;
});

function showMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.className = `message ${type}`;
    messageBox.textContent = message;
    document.body.appendChild(messageBox);
    setTimeout(() => messageBox.remove(), 3000);
}
