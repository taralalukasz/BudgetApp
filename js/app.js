// IF WE MOVE THIS CLASS BELOW eventListeners METHOD IT WILL NOT BE ACCESSIBLE THERE
class UI {
    constructor() {
        this.budgetForm = document.getElementById("budget-form");
        this.expenseForm = document.getElementById("expense-form");
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
        
        this.itemId = 0;
        this.itemList = [];
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

    submitExpenseForm() {
        const value = this.expenseInput.value;
        const amount = this.amountInput.value;

        if (value === '' || amount === '' || amount < 0) {
            this.expenseFeedback.classList.add("show-alert");
            this.expenseFeedback.innerHTML = '<p>Value and amount cannot be empty or negative</p>';
            this.hideFeedback(this.expenseFeedback, 3000);
        } else {
            this.expenseInput.value = '';
            this.amountInput.value = '';

            let expense = {
                id : this.itemId,
                expenseValue : value,
                expenseAmount : amount
            }

            this.addExpense(expense);

            this.itemId++;
            this.itemList.push(expense);

            //SHOW BALANCE TODO
            this.showBalance();
        }
    }

    addExpense(expense) {
        const div = document.createElement('div');
        div.classList.add('row');
        div.innerHTML = `
                  <div class="show-red col-xs-4">
                    <h6 class="">${expense.expenseValue}</h6>
                  </div>
                  <div class="show-red col-xs-4">
                    <h5 class="">${expense.expenseAmount}</h5>
                  </div>
                  <div class="col-xs-2">
                    <a href="#" class="edit-icon" data-id="${expense.id}">
                      <i class="fas fa-edit">edit</i>
                    </a>
                  </div>
                  <div class="col-xs-2">
                    <a href="#" class="delete-icon" data-id="${expense.id}">
                      <i class="fas fa-edit">remove</i>
                    </a>
                  </div>
        `;

        this.expenseList.appendChild(div);
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
        let total = 0;
        if (this.itemList.length > 0) {
            total = this.itemList.reduce((acc, curr) => acc += parseInt(curr.expenseAmount), 0);
        }
        this.expenseAmount.textContent = total;
        return total;
    }

    hideFeedback(feedbackDiv, miliseconds) {
        return setTimeout(function () { feedbackDiv.classList.remove("show-alert");}, miliseconds);
    }

    editExpense(expenseLink) {
        let id = parseInt(expenseLink.dataset.id);
        let parent = expenseLink.parentElement.parentElement;
        //remove from view
        this.expenseList.removeChild(parent);
        //choose element from the cache array
        let elementToBeDeleted = this.itemList.filter((a) => a.id === id)[0];
        // put info back to form
        this.expenseInput.value = elementToBeDeleted.expenseValue;
        this.amountInput.value = elementToBeDeleted.expenseAmount;
        //remove old element from cache
        let tempList = this.itemList.filter((a) => a.id !== elementToBeDeleted.id);
        this.itemList = tempList;
        //update balance
        this.showBalance();
    }
    
    deleteExpense(expenseLink) {
        let id = parseInt(expenseLink.dataset.id);
        let parent = expenseLink.parentElement.parentElement;
        //remove from view
        this.expenseList.removeChild(parent);
        //choose element from the cache array
        let elementToBeDeleted = this.itemList.filter((a) => a.id === id)[0];
        //remove old element from cache
        let tempList = this.itemList.filter((a) => a.id !== elementToBeDeleted.id);
        this.itemList = tempList;
        //update balance
        this.showBalance();
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
    expenseList.addEventListener("click", function (event) {
        if (event.target.parentElement.classList.contains('edit-icon')) {
            ui.editExpense(event.target.parentElement);
        } else if (event.target.parentElement.classList.contains('delete-icon')) {
            ui.deleteExpense(event.target.parentElement);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    eventListeners();
})