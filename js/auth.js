// User data (in a real app, this would be stored securely on the server)
const users = [
    { username: 'admin', password: 'Cliftex@123', role: 'admin' },
    { username: 'it', password: 'it123', role: 'it' },
    { username: 'operator', password: 'operator123', role: 'operator' }
];

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
});

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');
    
    if (!username || !password) {
        errorElement.textContent = 'PLEASE ENTER BOTH USERNAME AND PASSWORD';
        return;
    }
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store user data in localStorage (in a real app, use more secure methods)
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        errorElement.textContent = 'INVALID USERNAME OR PASSWORD';
    }
}
