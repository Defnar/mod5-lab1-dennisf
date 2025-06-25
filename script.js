const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");

let totalPrice = 0;

// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
  const item = event.target.closest("li");
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}

addProductButton.addEventListener("click", (event) => {
  //variable declarations
  const prodName = productNameInput.value;

  //welcome to the wild wild west of javascript.  apparently tofixed returns a string? I hate this
  const prodPrice = Number(Number(productPriceInput.value).toFixed(2));

  //checks if button is pressed, ensures all values are correctly filled in
  if (event.target.id === "add-product" && prodName != "" && prodPrice > 0) {
    //create list item and adds price to data

    let newItem = document.createElement("li");
    newItem.textContent = `${prodName} | ${prodPrice.toFixed(2)}`;
    newItem.dataset.price = prodPrice;

    //creates delete button to remove item from cart
    const delButton = document.createElement("button");
    delButton.textContent = "✖";
    delButton.className = "delete-button";
    newItem.appendChild(delButton);

    cart.appendChild(newItem);
    updateTotalPrice(prodPrice);

    //reset input form
    productNameInput.value = "";
    productPriceInput.value = "";
  } else {
    alert(
      "Please ensure all fields are entered and price is a positive amount"
    );
  }
});

//listens for event to remove items from cart
cart.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    removeItem(event);
  }
});
