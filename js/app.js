// IF WE MOVE THIS CLASS BELOW eventListeners METHOD IT WILL NOT BE ACCESSIBLE THERE
class UI {
    constructor() {
        this.budgetForm = document.getElementById("budget-form");
        this.budgetForm = document.getElementById("expense-form");
        this.budgetAmount = document.getElementById("budget-amount")
        this.expenseAmount = document.getElementById("expense-amount")
        this.balanceAmount = document.getElementById("balance-amount")
        this.budgetInput = document.getElementById("budget-input")
        this.expenseInput = document.getElementById("expense-input")
        this.amountInput = document.getElementById("amount-input")
        this.expenseList = document.getElementById("expense-list")
        this.balance = document.getElementById("balance")
        this.budgetFeedback = document.querySelector(".budget-feedback")
        this.expenseFeedback = document.querySelector(".expense-feedback")
    }  

    //submit budget method
    submitBudgetForm() {
        const value = this.budgetInput.value;
        if (value === '' || value < 0) {
            this.budgetFeedback.classList.add("show-alert");
            this.budgetFeedback.innerHTML = '<p>Value cannot be empty or negative</p>';
            this.hideFeedback(this.budgetFeedback, 3000);
        } else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';
            this.showBalance();
        }
    }

    showBalance() {
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
        if (total < 0) {
            this.balance.classList.remove("show-green", "show-black");
            this.balance.classList.add("show-red");
        } else if (total === 0) {
            this.balance.classList.remove("show-green", "show-red");
            this.balance.classList.add("show-black");
        } else { 
            this.balance.classList.remove("show-black", "show-red");
            this.balance.classList.add("show-green");
        }
    }

    totalExpense() {
        let total = 400;
        return total;
    }

    hideFeedback(feedbackDiv, miliseconds) {
        return setTimeout(function () { feedbackDiv.classList.remove("show-alert");}, miliseconds);
    }
    
}

function eventListeners() {
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    const ui = new UI();

    //BUDGET FORM SUBMIT
    budgetForm.addEventListener("submit", function(event) {
        event.preventDefault();
        ui.submitBudgetForm();
    });

    //EXPENSE FORM SUBMIT
    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();
        ui.submitExpenseForm();
    });

    //EXPENSE LIST SUBMIT
    expenseList.addEventListener("click", function () {

    });
}

document.addEventListener("DOMContentLoaded", function() {
    eventListeners();
})