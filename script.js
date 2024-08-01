let users = {};
let currentUser = null;

function signup() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username in users) {
    alert('Username already exists. Please choose a different username.');
  } else {
    users[username] = { password: password, balance: 2000, transactions: [] };
    alert('Sign up successful. Please log in.');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (users[username] && users[username].password === password) {
    currentUser = username;
    alert('Login successful.');
    document.getElementById('auth').style.display = 'none';
    document.getElementById('navbar').style.display = 'block';
    showSection('accountDetails');
    updateBalanceDisplay();
    displayTransactionHistory();
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

function updateBalanceDisplay() {
  document.getElementById('balance').textContent = users[currentUser].balance.toFixed(2);
}

function addFunds() {
  const amount = parseFloat(document.getElementById('addAmount').value);
  const message = document.getElementById('addFundsMessage');

  if (isNaN(amount) || amount <= 0) {
    message.textContent = 'Please enter a valid amount greater than zero.';
    message.style.color = 'red';
  } else {
    users[currentUser].balance += amount;
    updateBalanceDisplay();
    message.textContent = `Funds added successfully! New balance: $${users[currentUser].balance.toFixed(2)}`;
    message.style.color = 'green';
    document.getElementById('addAmount').value = '';
  }
}

function withdrawFunds() {
  const amount = parseFloat(document.getElementById('withdrawAmount').value);
  const message = document.getElementById('withdrawFundsMessage');

  if (isNaN(amount) || amount <= 0) {
    message.textContent = 'Please enter a valid amount greater than zero.';
    message.style.color = 'red';
  } else if (amount > users[currentUser].balance) {
    message.textContent = 'Insufficient balance.';
    message.style.color = 'red';
  } else {
    users[currentUser].balance -= amount;
    updateBalanceDisplay();
    message.textContent = `Funds withdrawn successfully! New balance: $${users[currentUser].balance.toFixed(2)}`;
    message.style.color = 'green';
    document.getElementById('withdrawAmount').value = '';
  }
}

function transferMoney() {
  const recipient = document.getElementById('recipient').value;
  const recipientAccount = document.getElementById('recipientAccount').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const message = document.getElementById('message');

  if (!recipient || !recipientAccount || isNaN(amount) || amount <= 0) {
    message.textContent = 'Please fill in all fields with valid data.';
    message.style.color = 'red';
  } else if (amount > users[currentUser].balance) {
    message.textContent = 'Insufficient balance.';
    message.style.color = 'red';
  } else {
    users[currentUser].balance -= amount;
    updateBalanceDisplay();

    // Record transaction
    const transaction = {
      recipient,
      recipientAccount,
      amount,
      date: new Date().toLocaleString()
    };
    users[currentUser].transactions.push(transaction);

    message.textContent = `Transaction successful! New balance: $${users[currentUser].balance.toFixed(2)}`;
    message.style.color = 'green';

    displayTransactionHistory();
    document.getElementById('recipient').value = '';
    document.getElementById('recipientAccount').value = '';
    document.getElementById('amount').value = '';
  }
}

function anotherTransaction() {
  document.getElementById('recipient').value = '';
  document.getElementById('recipientAccount').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('message').textContent = '';
}

function displayTransactionHistory() {
  const historyDiv = document.getElementById('transactionHistory');
  historyDiv.innerHTML = ''; // Clear previous history
  const transactions = users[currentUser].transactions;

  if (transactions.length === 0) {
    historyDiv.textContent = 'No transactions yet.';
  } else {
    transactions.forEach(transaction => {
      const transactionItem = document.createElement('div');
      transactionItem.classList.add('transaction-item');
      transactionItem.innerHTML = `
        <p><strong>Recipient:</strong> ${transaction.recipient}</p>
        <p><strong>Account:</strong> ${transaction.recipientAccount}</p>
        <p><strong>Amount:</strong> $${transaction.amount.toFixed(2)}</p>
        <p><strong>Date:</strong> ${transaction.date}</p>
        <hr>
      `;
      historyDiv.appendChild(transactionItem);
    });
  }
}

function logout() {
  document.getElementById('auth').style.display = 'block';
  document.getElementById('navbar').style.display = 'none';
  document.getElementById('accountDetails').style.display = 'none';
  document.getElementById('transaction').style.display = 'none';
  document.getElementById('history').style.display = 'none';
  document.getElementById('addFunds').style.display = 'none';
  document.getElementById('withdrawFunds').style.display = 'none';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  currentUser = null;
}
