// Check if user is already logged in
auth.onAuthStateChanged(user => {
    if (user) {
        checkIfAdmin(user.uid);
    }
});

function checkIfAdmin(uid) {
    db.ref('admins/' + uid).once('value').then(snapshot => {
        if (snapshot.exists()) {
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('admin-panel').classList.remove('hidden');
            loadContent();
        }
    });
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            checkIfAdmin(userCredential.user.uid);
        })
        .catch(error => {
            document.getElementById('login-error').textContent = error.message;
        });
}

function logout() {
    auth.signOut().then(() => {
        window.location.reload();
    });
}

function addContent() {
    const title = document.getElementById('content-title').value;
    const text = document.getElementById('content-text').value;
    
    db.ref('websiteContent').push({
        title: title,
        content: text,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
        document.getElementById('content-title').value = '';
        document.getElementById('content-text').value = '';
    });
}

function loadContent() {
    db.ref('websiteContent').on('value', snapshot => {
        const contentList = document.getElementById('content-list');
        contentList.innerHTML = '';
        
        snapshot.forEach(childSnapshot => {
            const content = childSnapshot.val();
            const div = document.createElement('div');
            div.innerHTML = `
                <h4>${content.title}</h4>
                <p>${content.content}</p>
                <button onclick="deleteContent('${childSnapshot.key}')">Delete</button>
                <hr>
            `;
            contentList.appendChild(div);
        });
    });
}

function deleteContent(key) {
    db.ref('websiteContent/' + key).remove();
}
