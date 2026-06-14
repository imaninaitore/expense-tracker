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

    addExpense(expense) {
    this.expenses.push(expense);
    this.save();
    }
}

const manager = new ExpenseManager(); //creates controller saying that this now manages all expenses

//elements
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const addButton = document.getElementById("AddButton");
const filter = document.getElementById("filter");


//add expense function
function addExpense(description, amount, category) {
    const expense = new Expense (   //creating new expense object using the expense class blueprint
        Date.now(),
        description,
        Number(amount), //converts string to number
        category
    );

    manager.addExpense(expense);

    renderExpenses();
}

// delete function
function deleteExpense(id) {

    manager.expenses = manager.expenses.filter(expense => expense.id !== id);  //removes expense with matching id

    manager.save();
    renderExpenses();
}

//render function
function renderExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    const selectedFilter = filter.value;

    const filteredExpenses = manager.expenses.filter(expense => {
        return selectedFilter === "All" || expense.category === selectedFilter; //filtering using functional programming 
});

filteredExpenses.forEach(expense => {
//destructuring  - unpacking the objects into variables
 const { id, description, amount, category } = expense;    

     total += Number(amount); // calculating totals using loop- adds each expense amount to total

        const div = document.createElement("div");

        div.textContent = `${description} - Ksh ${amount} - ${category}`;

        const btn = document.createElement("button");
        btn.textContent = "Delete";

        btn.onclick = () => deleteExpense(id);

        div.appendChild(btn);
        expenseList.appendChild(div);
    });

    totalDisplay.textContent = total;
}


//add btn handler
addButton.addEventListener("click", function (e) {
    e.preventDefault(); // IMPORTANT (stops refresh issues)

    const description = document.getElementById("expense-description").value.trim();
    const amount = document.getElementById("amount").value;

    const selectedCategory = document.querySelector('input[name="category"]:checked');

    if (!description || !amount) {
        alert("Please fill in description and amount");
        return;
    }

    if (!selectedCategory) {
        alert("Select a category");
        return;
    }

    const category = selectedCategory.value;

    addExpense(description, amount, category);

    document.getElementById("expense-description").value = "";
    document.getElementById("amount").value = "";
    selectedCategory.checked = false;

});

//make filter reactive
filter.addEventListener("change", function () {
        renderExpenses();
});
renderExpenses();