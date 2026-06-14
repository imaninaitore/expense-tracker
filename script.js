class Expense {
    constructor(id, description, amount, category) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.category = category;
    }
}
//the control center
class ExpenseManager {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    }

    save() {
        localStorage.setItem("expenses", JSON.stringify(this.expenses));
    }
}

const manager = new ExpenseManager(); //creates controller saying that this now manages all expenses
//state
let expenses = [];

//elements
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const addButton = document.getElementById("AddButton");
const filter = document.getElementById("filter");


//load from local storage
expenses = JSON.parse(localStorage.getItem("expenses")) || [];

//save
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

//add expense function
function addExpense(description, amount, category) {
    const expense = new Expense ( //creating new expense object using the expense class blueprint
        Date.now(),
        description,
        Number(amount), //converts string to number
        category
    );

    manager.expenses.push(expense); //storing inside manager

    manager.save(); //saving to localstorage
    renderExpenses();
}

// delete function
function deleteExpense(id) {

    expenses = expenses.filter(expense => expense.id !== id);

    saveData();
    renderExpenses();
}

//render function
function renderExpenses() {

    expenseList.innerHTML = "";
    let total = 0;

    const selectedFilter = filter.value;

    expenses.forEach(expense => {

        // FILTER LOGIC
        if (selectedFilter !== "All" && expense.category !== selectedFilter) {
            return;
        }

         total += Number(expense.amount);

        const div = document.createElement("div");

        div.textContent =
        `${expense.description} - Ksh ${expense.amount} - ${expense.category}`;

        const btn = document.createElement("button");
        btn.textContent = "Delete";

        btn.onclick = () => deleteExpense(expense.id);

        div.appendChild(btn);
        expenseList.appendChild(div);
    });

    totalDisplay.textContent = total;
}


//add btn handler
addButton.addEventListener("click", function () {

    const description =
    document.getElementById("expense-description").value;

    const amount =
    document.getElementById("amount").value;

    const selectedCategory = document.querySelector(
        'input[name="category"]:checked'
    );

    if (!selectedCategory) {
        alert("Select a category");
        return;
    }

    const category = selectedCategory.value;

    addExpense(description, amount, selectedCategory.value);

    // clear inputs
    document.getElementById("expense-description").value = "";
    document.getElementById("amount").value = "";
    selectedCategory.checked = false;
});

//make filter reactive
filter.addEventListener("change", function () {
        renderExpenses();
});

renderExpenses();