const form = document.getElementById("transaction-form");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const balance = document.getElementById("balance-amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const history = document.getElementById("history");

getLocalStorage();
form.addEventListener("submit", (event) => addTransaction(event));

function saveLocalStorage() {
  localStorage.setItem("balance", balance.value);
  localStorage.setItem("income", income.value);
  localStorage.setItem("expense", expense.value);
}

function getLocalStorage() {
  if (localStorage.getItem("balance"))
    balance.value = localStorage.getItem("balance");
  if (localStorage.getItem("income"))
    income.value = localStorage.getItem("income");
  if (localStorage.getItem("expense"))
    expense.value = localStorage.getItem("expense");
}

//formatNumber
function fn(num1, num2) {
  if (!isNaN(num1) && !isNaN(num2)) {
    let num = parseFloat(num1) + parseFloat(num2);
    return ((Math.round(num) * 100) / 100).toFixed(2);
  }
  return "0.00";
}

function updateBalance() {
  balance.value = fn(balance.value, amount.value);
}

function updateExInc() {
  if (amount.value > 0) {
    income.value = fn(income.value, amount.value);
  } else {
    expense.value = fn(expense.value, amount.value);
  }
}

function cancelTransaction(amount) {
  if (amount > 0) {
    balance.value = fn(balance.value, -amount);
    income.value = fn(income.value, -amount);
  } else {
    balance.value = fn(balance.value, -amount);
    expense.value = fn(expense.value, -amount);
  }
}

function addTransactionInHistory() {
  const newTransaction = document.createElement("div");
  const deleteTransaction = document.createElement("div");

  deleteTransaction.className = "deleteTransaction";
  deleteTransaction.innerText = "X";
  deleteTransaction.value = amount.value;
  deleteTransaction.addEventListener("click", () => {
    cancelTransaction(deleteTransaction.value);
    deleteTransaction.parentElement.remove();
  });

  newTransaction.innerHTML = `<div class="history-description">${description.value}</div>
  <div class="history-amount">${amount.value}</div>`;
  newTransaction.className =
    amount.value > 0 ? "transaction pos" : "transaction neg";

  newTransaction.appendChild(deleteTransaction);
  history.appendChild(newTransaction);
}

function addTransaction(event) {
  event.preventDefault();

  if (amount.value != 0) {
    updateBalance();
    updateExInc();
    addTransactionInHistory();
    amount.value = "";
    description.value = "";
    saveLocalStorage();
  }
}
