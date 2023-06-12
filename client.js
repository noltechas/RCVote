function login(username, password) {
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
    }).then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            alert('Failed to log in');
        }
    });
}

function logout() {
    fetch('/logout').then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    });
}

function createPoll(name) {
    fetch('/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'name=' + encodeURIComponent(name)
    }).then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            alert('Failed to create poll');
        }
    });
}
