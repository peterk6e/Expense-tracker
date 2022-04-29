const form = document.getElementById("transaction-form");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const balance = document.getElementById("balance-amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const history = document.getElementById("history");

form.addEventListener("submit", (event) => addTransaction(event));

function updateLocalStorage() {}

//formatNumber
function fn(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

function updateBalance() {
  balance.value = balance.value + amount.value;
}

function updateExInc() {
  if (amount.value > 0) {
    income.value = income.value + amount.value;
  } else {
    expense.value = expense.value + amount.value;
  }
}

function cancelTransaction(amount) {
  if (amount > 0) {
    balance.value -= amount;
    income.value -= amount;
  } else {
    balance.value += amount;
    expense.value += amount;
  }
}

function addTransactionInHistory() {
  const newTransaction = document.createElement("div");
  const deleteTransaction = document.createElement("div");
  
  deleteTransaction.className = "deleteTransaction";
  deleteTransaction.innerText = "X";
  deleteTransaction.addEventListener("click", () => {
    cancelTransaction(amount.value);
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
  }
}
