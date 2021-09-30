//let balance = 500.00;

class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
  	this.transactions.push(transaction);
  }
}

// abstract class
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
/*
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
*/
  get value() {
    return -this.amount;
  }
  /*
  commit() {
   // this.account.balance -= this.amount;
    this.account.balance += this.value;
  }*/
  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  /*
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
*/
  get value() {
    return this.amount;
  }
 /*
  commit() {
    //this.account.balance += this.amount;
    this.account.balance += this.value;
  }
  */
  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account();

console.log('Account Balance: ', myAccount.balance);

const t1 = new Withdrawal(1.00, myAccount);
console.log('Transaction 1:', t1.commit());
console.log('New Balance: ', myAccount.balance);

const t2 = new Deposit(9.99, myAccount);
console.log('Transaction 2:', t2.commit());
console.log('New Balance: ', myAccount.balance);

const t3 = new Withdrawal(9.99, myAccount);
console.log('Transaction 3:', t3.commit());

console.log('New Balance: ', myAccount.balance);

console.log('Transaction History: ', myAccount.transactions);
/*
const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
*/
/*const myAccount = new Account("snow-patrol");
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log('Transaction 1:', t1.account.balance);
*/
/*
t1 = new Withdrawal(50.25);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99);
t2.commit();
console.log('Transaction 2:', t2);

console.log('Balance:', balance);

t3 = new Deposit(120.00);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', balance);

const myAccount = new Account("snow-patrol");
console.log(myAccount.username);
console.log(myAccount.balance);
*/


