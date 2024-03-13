// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};
refresKeranjang();

// Klik di luar elemen
const hm = document.querySelector("#menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

function detail(id) {
  localStorage.setItem("currentBuku", JSON.stringify({ id: id }));
  window.location.href = "detail.html";
}

const loginInfoString = localStorage.getItem("loginInfo");
if (loginInfoString) {
  const loginInfo = JSON.parse(loginInfoString);
  const username = loginInfo.username;
  const userIdElement = document.getElementById("username");
  userIdElement.textContent = username;
} else {
  logout();
}

function logout() {
  localStorage.removeItem("loginInfo");
  window.location.href = "index.html";
}

function getLoginStatus() {
  const loginInfo = localStorage.getItem("loginInfo");

  if (loginInfo) {
    return JSON.parse(loginInfo);
  } else {
    return { status: false, iduser: null, username: null, level: null };
  }
}

const transaksiLink = document.getElementById("transaksi");
const pegawaiLink = document.getElementById("pegawai");
const produkLink = document.getElementById("produk");

const userLevel = getLoginStatus().level;
const userId = getLoginStatus().iduser;
console.log(userId);

if (userLevel == "pegawai") {
  transaksiLink.style.display = "inline-block";
  pegawaiLink.style.display = "inline-block";
  produkLink.style.display = "inline-block";
} else {
  transaksiLink.style.display = "none";
  pegawaiLink.style.display = "none";
  produkLink.style.display = "none";
}

const allproduk = document.getElementById("allproduk");
fetch("http://127.0.0.1:5000/buku", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    if (!data.message) {
      data.forEach((item) => {
        var productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
        <div class="product-icons">
          <a href="#products" onclick="masukankeranjang('${item.id}', '${
          item.judul
        }', '${item.harga}', '${
          item.cover
        }')"><i data-feather="shopping-cart"></i></a>
          <a href="#products" class="item-detail-button"
          onclick="detail('${item.id}')"><i data-feather="eye"></i
          ></a>
        </div>
        <div class="product-image">
          <img src="${item.cover}" alt="${item.judul}" />
        </div>
        <div class="product-content">
          <h3>${item.judul}</h3>
          <p>${item.kategori.join(", ")}</p>
          <div class="product-price">IDR ${item.harga}</div>
        </div>
      `;
        allproduk.appendChild(productCard);
      });
      feather.replace();
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function refresKeranjang() {
  shoppingCart.innerHTML = "";
  keranjang = JSON.parse(localStorage.getItem("keranjang"));
  if (keranjang) {
    keranjang.forEach((item) => {
      var productCard = document.createElement("div");
      productCard.className = "cart-item";
      productCard.innerHTML = `
          <img src="${item.cover}" alt="${item.judul}" />
          <div class="item-detail">
            <h3>${item.judul}</h3>
            <div class="item-price">IDR ${item.harga}    </div>
            <div class="item-price">jumlah: ${item.jumlah}</div>
          </div>
          <i data-feather="trash-2" class="remove-item"></i>
  `;
      shoppingCart.appendChild(productCard);
      feather.replace();
    });
  }
}

function masukankeranjang(id, judul, harga, cover) {
  keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const produk = {
    id: id,
    judul: judul,
    harga: harga,
    cover: cover,
    jumlah: 1,
  };
  keranjang.push(produk);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  refresKeranjang();
}
