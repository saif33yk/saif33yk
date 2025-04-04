document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Check if user is admin
            const userId = userCredential.user.uid;
            database.ref('admins/' + userId).once('value')
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        window.location.href = 'admin-panel.html';
                    } else {
                        auth.signOut();
                        showError('You are not authorized as admin');
                    }
                });
        })
        .catch((error) => {
            showError(error.message);
        });
});

function showError(message) {
    document.getElementById('error-message').textContent = message;
}

// Check auth state on page load
auth.onAuthStateChanged((user) => {
    if (user) {
        database.ref('admins/' + user.uid).once('value')
            .then((snapshot) => {
                if (snapshot.exists() && window.location.pathname.includes('login.html')) {
                    window.location.href = 'admin-panel.html';
                }
            });
    } else if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
});
