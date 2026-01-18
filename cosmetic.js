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
// ================================
// FEEDBACK FUNCTIONALITY
// ================================

// Load old feedback from localStorage
let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

// Load feedback when page opens
window.onload = function () {
  displayFeedback();
};

function submitFeedback() {
  const name = document.getElementById("fbName").value.trim();
  const rating = document.getElementById("fbRating").value;
  const message = document.getElementById("fbMessage").value.trim();

  // VALIDATION
  if (name === "" || message === "") {
    alert("⚠ Please fill out all fields before submitting.");
    return;
  }

  // CREATE FEEDBACK OBJECT
  const feedback = { name, rating, message };

  // ADD TO LIST
  feedbackList.push(feedback);

  // STORE IN DOCUMENT (localStorage)
  localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

  // SHOW ON PAGE
  displayFeedback();

  // CLEAR FIELDS
  document.getElementById("fbName").value = "";
  document.getElementById("fbRating").value = "5";
  document.getElementById("fbMessage").value = "";

  alert("✅ Feedback submitted successfully!");
}

function displayFeedback() {
  const output = document.getElementById("feedbackOutput");
  output.innerHTML = "";

  feedbackList.forEach(fb => {
    let box = document.createElement("div");
    box.classList.add("feedback-box");

    box.innerHTML = `
      <h4>${fb.name} — ⭐${fb.rating}</h4>
      <p>${fb.message}</p>
    `;

    output.appendChild(box);
  });
}

