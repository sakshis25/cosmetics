let cart = [];
let total = 0;

function addToCart(name, price) {
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");

  cartItems.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price} × ${item.quantity}
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  totalElement.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
}

/* ================================
   PROCEED TO BUY FUNCTIONALITY
================================ */

document.querySelector(".buy").addEventListener("click", proceedToBuy);

function proceedToBuy() {
  if (cart.length === 0) {
    alert("🛒 Your cart is empty. Please add products before proceeding.");
    return;
  }

  let orderSummary = "🧾 Order Summary:\n\n";

  cart.forEach(item => {
    orderSummary += `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });

  orderSummary += `\nTotal Amount: ₹${total}\n\nProceed to place order?`;

  let confirmOrder = confirm(orderSummary);

  if (confirmOrder) {
    alert("✅ Thank you for shopping with LuxeGlow!\nYour order has been placed successfully.");

    // Clear cart after purchase
    cart = [];
    updateCart();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
