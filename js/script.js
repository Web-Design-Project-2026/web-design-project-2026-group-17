// get the cart from localstorage or create an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Function to add a product to the cart
function addToCart(name,price, image) {
    const existingProduct = cart.find((item) => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push ({
            name: name,
            price: price,
            image: image,
            quantity: 1,
        });
    }

    //to save the updated cart in localstorage
    localStorage.setItem("cart", JSON.stringify(cart));

    //and to update the cart icon count
    updateCartCount();
    alert(name + " has been added!");
}

//update cart count
function updateCartCount() {
    const countElement = document.getElementById("cart-count");
    if (countElement) {
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = totalQuantity;
    }
}

//the items display on the cart page
function displayCart () {
    const cartContainer = document.getElementById("cartItems");
    const totalElement = document.getElementById("cartTotal");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) = {
        total += item.price * item.quantity; //calculate total price

        cartContainer.innerHTML += `
        <div class="cart-item">
        <img scr="${item.image}" width="80">
        </div>
        <div>
        <h3>${item.name}</h3>
        <p>${item.price} SEK (xs${item.quantity})</p>
        <button onclick="removeItem(${index})">Delete</button>
        </div>
        </div>
        `;
    });

    if (totalELement) totalElement.textContent = total;
}

//to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}


//slider
const slider = document.getElementById("slider");

document.querySelector(".next").addEventListener("click", () => {
    slider.scrollBy({
        left: 300,
        behavior: "smooth"
    });
});

document.querySelector(".prev").addEventListener("click", () => {
    slider.scrollBy({
        left:300,
        behavior: "smooth"
    });
});

function changeImage(img) {
    const mainImage = document.getElementById("mainImage");
    mainImage.src = img.src;
 }