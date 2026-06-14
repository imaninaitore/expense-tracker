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
        this.expenses = [];
    }

    addExpense(expense) {
    this.expenses.push(expense);
    }
   deleteExpense(id) {
    this.expenses = this.expenses.filter(
        expense => expense.id !== id
    );
}

getTotalExpenses() {
    return this.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );
}

filterExpenses(category) {
    return this.expenses.filter(
        expense => expense.category === category
    );
}

}

module.exports = { Expense, ExpenseManager }; 
