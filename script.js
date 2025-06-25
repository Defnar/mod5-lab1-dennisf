const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");
const quantityInput = document.getElementById("quantity");

let totalPrice = 0;

// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  
  //I found an odd bug where,when removing an item, ended up with -0 as a total.  google told me that adding 0 to the amount fixes this
  amount += 0;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
  const item = event.target.closest("li");
  const price = Number(
    (parseFloat(item.dataset.price) * Number(item.dataset.quantity)).toFixed(2)
  );
  updateTotalPrice(-price);
  item.remove();
}

addProductButton.addEventListener("click", (event) => {
  //variable declarations
  const prodName = productNameInput.value;

  //welcome to the wild wild west of javascript.  apparently tofixed returns a string? I hate this
  const prodPrice = Number(Number(productPriceInput.value).toFixed(2));
  const quantity = Number(Number(quantityInput.value).toFixed(0));

  //checks if button is pressed, ensures all values are correctly filled in
  if (
    event.target.id === "add-product" &&
    prodName != "" &&
    prodPrice > 0 &&
    quantity > 0
  ) {
    //create list item and adds price to data

    let newItem = document.createElement("li");
    let spanItem = document.createElement("span");
    spanItem.textContent = quantity;
    spanItem.className = "quantity-span";
    let spanItem2 = document.createElement("span");
    spanItem2.textContent = ` ${prodName} | ${prodPrice.toFixed(2)}`;
    newItem.appendChild(spanItem);
    newItem.appendChild(spanItem2);

    newItem.dataset.price = prodPrice;
    newItem.dataset.quantity = quantity;

    const quantityInp = document.createElement("input");
    quantityInp.style.display = "none";
    quantityInp.type = "number";
    quantityInp.className = "quantity-edit-input";
    newItem.appendChild(quantityInp);

    const quantitySubmit = document.createElement("button");
    quantitySubmit.textContent = "submit";
    quantitySubmit.className = "quantity-submit-button";
    quantitySubmit.style.display = "none";
    newItem.appendChild(quantitySubmit);

    //create an edit quantity button
    const editButton = document.createElement("button");
    editButton.textContent = "edit amount";
    editButton.className = "edit-button";
    newItem.appendChild(editButton);

    //creates delete button to remove item from cart
    const delButton = document.createElement("button");
    delButton.textContent = "✖";
    delButton.className = "delete-button";
    newItem.appendChild(delButton);

    cart.appendChild(newItem);
    updateTotalPrice(prodPrice * quantity);

    //reset input form
    productNameInput.value = "";
    productPriceInput.value = "";
    quantityInput.value = "";
  } else {
    alert(
      "Please ensure all fields are entered and both quantity and price are a positive amount"
    );
  }
});

//listens for event to remove items from cart
cart.addEventListener("click", (event) => {
  //listens for delete button
  if (event.target.classList.contains("delete-button")) {
    removeItem(event);
  }

  //listens for edit button
  if (event.target.classList.contains("edit-button")) {
    const item = event.target.closest("li");
    item.querySelector(".quantity-edit-input").style.display = "block";
    item.querySelector(".quantity-submit-button").style.display = "block";
  }

  //listens for submit button
  if (event.target.classList.contains("quantity-submit-button")) {
    const item = event.target.closest("li");
    const newQuantity = Number(
      Number(item.querySelector(".quantity-edit-input").value).toFixed(0)
    );
    if (newQuantity <= 0) {
      alert("Please ensure quantity is a number greater than 0");
    } else {
      //readjusts quantity, and passes variables into correct funtions to adjust prices
      let quantityDifference = newQuantity - Number(item.dataset.quantity);
      item.dataset.quantity = newQuantity;
      const quantitySpan = item.querySelector(".quantity-span");
      updateTotalPrice(item.dataset.price * quantityDifference);
      quantitySpan.textContent = newQuantity;
      item.querySelector(".quantity-edit-input").style.display = "none";
      item.querySelector(".quantity-submit-button").style.display = "none";
    }
  }
});
