const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');
const productContainer = document.getElementById("product-cotainer");
 
let totalPrice = 0;
 
// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}
 
// Function to remove an item
function removeItem(event) {
  const item = event.target.closest('li');
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}

addProductButton.addEventListener("click", (event)=>
{
    //variable declarations
    const prodName = productNameInput.value;
    const prodPrice = Number(productPriceInput.value);

    //checks if button is pressed, ensures all values are correctly filled in
    if (event.target.id === "add-product" && prodName != "" && prodPrice != "" && prodPrice > 0) {
        let newItem = document.createElement("li");
        newItem.textContent = `${prodName} | ${prodPrice.toFixed(2)}`;
        newItem.dataset.price = prodPrice;
        cart.appendChild(newItem);
        updateTotalPrice(prodPrice);

        
        //reset input form
        productNameInput.value = "";
        productPriceInput = "";
    }
})