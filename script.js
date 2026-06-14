//  //get the HTML elements
//  const expenseInput = document.getElementById('expense-description');
//  const amountInput = document.getElementById('amount');
//  const expenseList = document.getElementById('expense-list');
// const AddButton =document.getElementById('AddButton');

// //ADD EXPENSE
// //detect button click and also get user input values
// AddButton.addEventListener("click", function (){
//     const expenseDescription = expenseDescriptionInput.value;

//     const amount = amountInput.value;

//     const chosenCategory = document.querySelector(
//         'input[name="category"]:checked'
//     );
//     // check if category is selected - to prevent errors
//     if (!Category) {
//     alert("Please select a category");
//     return;}
// // store the category value
//     const category = chosenCategory.value;

//     // Create new div
//     const expenseItem = document.createElement("div");

//     // Add text
//     expenseItem.textContent =`${expenseDescription} - Ksh ${amount} - ${category}`;


//     //create delete button
//     const deleteButton =
//     document.createElement("button");
//     deleteButton.textContent = "Delete";

//     //make the delete btn work
//         deleteButton.addEventListener("click", function () {
//         expenseItem.remove();
//         });

//     // Add delete button to expense item
//     expenseItem.appendChild(deleteButton);

//     // Show on page
//     expenseList.appendChild(expenseItem);

//     //clear inputs
//     expenseDescription.value = "";
//     amountInput.value = "";

//     chosenCategory.checked = false;
// });


let expenses = [];
let total = 0;

const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const addButton = document.getElementById("AddButton");

//load from local storage
expenses = JSON.parse(localStorage.getItem("expenses")) || [];
//save
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

//add expense function
function addExpense(description, amount, category) {

    const expense = {
        id: Date.now(),
        description,
        amount,
        category
    };

    expenses.push(expense);

    saveData();
    renderExpenses();
}
//render function
function renderExpenses() {

    expenseList.innerHTML = "";
    total = 0;

    const selectedFilter = filterCategory.value;

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
// delete function
function deleteExpense(id) {

    expenses = expenses.filter(expense => expense.id !== id);

    saveData();
    renderExpenses();
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

    addExpense(description, amount, category);

    // clear inputs
    document.getElementById("expense-description").value = "";
    document.getElementById("amount").value = "";
    selectedCategory.checked = false;
});


//filter function
const filter = document.getElementById("filter");
