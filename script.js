/*************************************/ 
/*    STARTER CODE                   */
/*    No need to touch this code!    */
/*************************************/

/* Your credit card */
const creditCard = { balance: 0, limit: 2000 };

/* Products you can buy */
const products = [
    { name: "T-shirt", price: 20, numberPurchased: 0 },
    { name: "Handbag", price: 200, numberPurchased: 0 },
    { name: "Computer", price: 1595, numberPurchased: 0 }
];

/* Function to display the current amounts of everything in the DOM */
function displayBalances() {
    const balanceEl = document.querySelector(".card-balance");
    const myProductsEl = document.querySelector(".my-products");

    // Display the credit card balance
    balanceEl.innerText = "Balance: $" + creditCard.balance;

    // Display the products purchased
    myProductsEl.innerHTML = "";
    products.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.innerText = product.name + ": " + product.numberPurchased;
        myProductsEl.appendChild(listItem);
    });
}

/* Function to buy a product with your credit card */
/* Takes a single product object as a parameter */
/* Returns a Promise */
function buyProduct(product) {
    return new Promise((resolve, reject) => {
        // Wait a second or two to simulate credit card processing delay
        const randomTime = Math.random() * 2000;
        setTimeout(processPayment, randomTime);

        function processPayment() {
            // If the price is within the credit card's limit,
            // 1) charge the card, 2) purchase the product, 3) resolve the promise
            if (creditCard.balance + product.price <= creditCard.limit) {
                creditCard.balance += product.price;
                product.numberPurchased++;
                return resolve({
                    status: `Purchased ${product.name} for $${product.price}`,
                    timestamp: Date.now(),
                });
            }

            // Otherwise the price exceeds the credit card's limit, so reject the promise
            reject({
                status: `Declined purchase of ${product.name} for $${product.price}`,
                timestamp: Date.now()
            }); 
        }
    });
}

/*************************************/ 
/*    END OF STARTER CODE            */
/*    Start writing code below!      */
/*************************************/

displayBalances(); // You can call this pre-written function to update the DOM later

/* async function goShopping() {
    try {
        let tShirtResult = await buyProduct(products[0]);
        console.log(tShirtResult);
        let handbagResult = await buyProduct(products[1]);
        console.log(handbagResult);
        let computerResult = await buyProduct(products[2]);
        console.log(computerResult);
        displayBalances();
    
    } catch (error) {
        console.log(error);
    }
} */

async function buyAllProducts() {
    try {
        let promiseAllResult = await Promise.all([
            await buyProduct(products[0]),
            await buyProduct(products[1]),
            await buyProduct(products[2])
        ]);
        displayBalances();
        console.log("Purchased 3 products");
    } catch (error) {
        displayBalances();
        console.log("Failed to purchase all 3 products");
    }
}

/** Function to return a product
 * Takes a single product object as a parameter
 * Returns a promise
 */
function returnProduct(product) {
    return new Promise((resolve, reject) => {
        // Wait a simulated random time, 1 or 2 seconds, to simulate
        // credit card processing time delay
        const randomTime = Math.random() * 2000;
        setTimeout(processRefund, randomTime);

        function processRefund() {
            if(product.numberPurchased != 0) {
                creditCard.balance -= product.price;
                product.numberPurchased--;
                console.log(`Refunded ${product.name} for $${product.price}`);
                return resolve({
                    status: `Refunded ${product.name} for $${product.price}`,
                    timestamp: Date.now()
                });
            }
            
            // reject the promise if we don't own the item
            reject({
                status: `You do not own ${product.name}. Refund declined`,
                timestamp: Date.now()
            }); 
        }
    });
}

async function returnOneProduct(product) {
    try {
        (product.numberPurchased != 0) ? 
        await returnProduct(product) : false;
        displayBalances();
    } catch (error) {
        console.log(error);
    } 

}

// goShopping();
buyAllProducts()
.then(resolve => returnOneProduct(products[0]));



/* .then((resolve) => {
    try {
        returnProduct(products[0])
    } catch (error) {
        console.log(error)
    }
})
.then((resolve) => displayBalances())
.then((resolve) => {
    try {
        returnProduct(products[0])
    } catch (error) {
        console.log(error)
    }
}); */
    


