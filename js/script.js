let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Byt huvudbild när man klickar på thumbnail
function changeImage(img) {
  const mainImage = document.getElementById("mainImage");
  mainImage.src = img.src;
}

// Lägg till i cart
function addToCart(name, price, image) {
  const existingProduct = cart.find((item) => item.name === name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  alert(name + " has been added to cart!");
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");

  if (countElement) {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = totalQuantity;
  }
}

function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  const totalElement = document.getElementById("cartTotal");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartContainer.innerHTML += `
      <div class="cart-item">

        <img src="${item.image}" width="100">

        <div>
          <h3>${item.name}</h3>

          <div class="quantity-section">
            <button onclick="decreaseQuantity(${index})">-</button>

            <span>${item.quantity}</span>

            <button onclick="increaseQuantity(${index})">+</button>
          </div>

          <p>${item.price * item.quantity} SEK</p>

          <button onclick="removeItem(${index})">
            Delete
          </button>
        </div>

      </div>
    `;
  });

  totalElement.textContent = total + " SEK";
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Slider
const slider = document.getElementById("slider");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (slider && nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  });
}

displayCart();
updateCartCount();

function increaseQuantity(index) {
  cart[index].quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
  updateCartCount();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
  updateCartCount();
}

// function increaseQuantity(index) {
//     cart[index].quantity ++;

//     localStorage.setItem("cart", JSON.stringify(cart));

//     displayCart();
//     updateCartCount();
// }

// function decreaseQuantity(index) {
//     if (cart[index].quantity > 1) {
//         cart[index].quantity--1;
//     } else {
//         cart.splice(index, 1);
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
// }
