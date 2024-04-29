/*************************************/ 
/*    STARTER CODE                   */
/*    No need to touch this code!    */
/*************************************/

/* Your credit card */
const creditCard = { balance: 0, limit: 2000 };
const balanceEl = document.querySelector(".balance-amount");

/* Products you can buy */
const products = [
    { image: "./asset/t-shirt.svg", name: "T-shirt", price: 20, numberPurchased: 0 },
    { image: "./asset/bag.svg", name: "Handbag", price: 200, numberPurchased: 0 },
    { image: "./asset/computer.svg", name: "Computer", price: 2000, numberPurchased: 0 }
];

/* Function to display the current amounts of everything in the DOM */
function displayBalances() {
    const productGroup = document.querySelector(".transaction-panel__product-group");

    // Display the credit card balance
    balanceEl.innerText = "$ " + creditCard.balance;

    // Display the products purchased
    for (let i = 0; i < products.length; i++){

        const productElm = document.createElement("div");
        productElm.classList.add("transaction-panel__product");

        const productImage = document.createElement("img");
        productImage.src = products[i].image;
        productElm.append(productImage);

        const productPriceElm = document.createElement("div");
        productPriceElm.classList.add("transaction-panel__product-price");

        const productLabel = document.createElement("span");
        productLabel.textContent = products[i].name;
        productLabel.classList.add("transaction-panel__product-price--label");
        productPriceElm.append(productLabel);

        const divider = document.createElement("span");
        divider.textContent = "|";
        divider.classList.add("transaction-panel__product-price--divider");
        productPriceElm.append(divider);

        const price = document.createElement("span");
        price.textContent = products[i].price;
        price.classList.add("transaction-panel__product-price--amount");
        productPriceElm.append(price);

        const symbol = document.createElement("span");
        symbol.textContent = "x";
        symbol.classList.add("transaction-panel__product-price--divider");
        productPriceElm.append(symbol);

        const productAmount = document.createElement("span");
        productAmount.textContent = products[i].numberPurchased;
        productAmount.classList.add("transaction-panel__product-price--amount");
        productPriceElm.append(productAmount);


        productGroup.append(productElm);
        productElm.append(productPriceElm);
    }

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
            const purchaseStatus = document.getElementById("status");
            // If the price is within the credit card's limit,
            // 1) charge the card, 2) purchase the product, 3) resolve the promise
            if (creditCard.balance + product.price <= creditCard.limit) {
                creditCard.balance += product.price;
                product.numberPurchased++;

                // show the balance
                balanceEl.innerText = "$ " + product.price;

                // post status
                const status = `🤑 Purchased ${product.name} for $${product.price}`;
                purchaseStatus.innerHTML = status;
                
                return resolve({
                    status,
                    timestamp: Date.now(),
                });
            } else {

                const error = `⛔️ Declined purchase of ${product.name} for $${product.price}`;
                purchaseStatus.innerHTML = error;

            // Otherwise the price exceeds the credit card's limit, so reject the promise
            reject({
                error,
                timestamp: Date.now()
            }); 
            }

        }
    });
}

/*************************************/ 
/*    END OF STARTER CODE            */
/*    Start writing code below!      */
/*************************************/

displayBalances(); // You can call this pre-written function to update the DOM later

const processAll = document.getElementById("process-all");
const processInSequal = document.getElementById("process-sequal");
const purchaseStatus = document.getElementById("status");

// purchase in sequal
const goShopping = async () => {

    try{
        const tShirtResult = await buyProduct(products[0]);
        const handBageResult = await buyProduct(products[1]);
        const computerResult = await buyProduct(products[2]);

    } catch (error){
        console.log(error);
    }
};

processInSequal.addEventListener("click", goShopping);