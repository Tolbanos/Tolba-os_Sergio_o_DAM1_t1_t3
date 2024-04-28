document
  .getElementById("apply-filters")
  .addEventListener("click", loadAndFilterProducts);

function loadAndFilterProducts() {
  const minPrice = document.getElementById("min-price").value;
  const category = document.getElementById("category").value.toLowerCase();
  const brand = document.getElementById("brand").value.toLowerCase();

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      let products = data.products;
      if (minPrice) {
        products = products.filter((p) => p.price >= minPrice);
      }
      if (category) {
        products = products.filter((p) =>
          p.category.toLowerCase().includes(category)
        );
      }
      if (brand) {
        products = products.filter((p) =>
          p.brand.toLowerCase().includes(brand)
        );
      }
      displayProducts(products);
    });
}

function displayProducts(products) {
  const results = document.querySelector(".product-results");
  results.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-card card mb-3";
    productDiv.innerHTML = `
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.price} USD</p>
              <p class="card-text"><small class="text-muted">${product.category}</small></p>
              <button onclick="addToCart(${product.id})" class="btn btn-success">Añadir a carrito</button>
          </div>
      `;
    results.appendChild(productDiv);
  });
}

const cart = [];

function addToCart(productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      cart.push(product);
      updateCart();
      Swal.fire({
        title: "Producto añadido!",
        text: product.title + " ha sido añadido a tu carrito.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    });
}

function updateCart() {
  const cartDiv = document.querySelector(".shopping-cart");
  cartDiv.innerHTML = "";
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `${item.title} - ${item.price} USD`;
    cartDiv.appendChild(itemDiv);
  });
}
