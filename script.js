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
    { name: "Computer", price: 2000, numberPurchased: 0 }
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






