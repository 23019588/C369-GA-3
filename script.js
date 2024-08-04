let users = {};
let currentUser = null;

function signup() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Retrieve users from localStorage or initialize an empty object if none exist
  let users = JSON.parse(localStorage.getItem('users')) || {};

  if (username in users) {
    alert('Username already exists. Please choose a different username.');
  } else {
    // Store user data in localStorage
    users[username] = { password: password, balance: 2000, transactions: [] };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful. Please log in.');
    window.location.href = 'login.html';
  }
}


function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Retrieve users from localStorage
  let users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username] && users[username].password === password) {
    localStorage.setItem('currentUser', username);  // Store the logged-in user
    alert('Login successful.');
    window.location.href = 'index.html'; // Redirect to the main page
  } else {
    alert('Invalid username or password.');
  }
}


function showSection(sectionId) {
  const sections = document.getElementsByClassName('section');
  for (let section of sections) {
    section.style.display = 'none';
  }
  document.getElementById(sectionId).style.display = 'block';
}

function logout() {
  currentUser = null;
  alert('Logged out successfully.');
  window.location.href = 'login.html';
}

// Rest of your functions remain unchanged...
