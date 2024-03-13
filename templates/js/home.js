var allbuku = null;
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

// Modal Box
const addRetingModal = document.querySelector("#add-reting-modal");
const itemDetailModal = document.querySelector("#item-detail-modal");
const judulModal = document.querySelector("#judul-modal");
const sinopsisModal = document.querySelector("#sinopsis-modal");
const hargaModal = document.querySelector("#harga-modal");
const gambarModal = document.querySelector("#image-modal");
const kategoriModal = document.querySelector("#kategori-modal");
const btnAddKomen = document.querySelector("#btn-add-komen");
const btnSubmit = document.querySelector("#submitBtn");
const judulKomentar = document.querySelector("#judulreting");

function detail(id) {
  var data = null;
  this.allbuku.forEach((item) => {
    if (item.id == id) {
      data = item;
    }
  });
  gambarModal.src = data.cover;
  gambarModal.alt = data.judul;
  judulModal.innerHTML = data.judul;
  sinopsisModal.innerHTML = data.sinopsis;
  hargaModal.innerHTML = "IDR " + data.harga;
  kategoriModal.innerHTML = data.kategori.join(", ");
  judulKomentar.innerHTML = "Komentari " + data.judul;
  btnAddKomen.onclick = function () {
    addKomen(id);
  };
  itemDetailModal.style.display = "flex";
}

function addKomen(id) {
  btnSubmit.onclick = function () {
    submitForm(id);
  };
  addRetingModal.style.display = "flex";
}

function retingclose() {
  addRetingModal.style.display = "none";
}

function submitForm(id) {
  var nilai = document.getElementById("nilai").value;
  var komentar = document.getElementById("komentar").value;
  var id_user = userId;

  formData = {
    nilai: nilai,
    komentar: komentar,
    id_user: id_user,
  };

  fetch("http://127.0.0.1:5000/" + id + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
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
        addRetingModal.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// klik tombol close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};

const loginInfoString = localStorage.getItem("loginInfo");
if (loginInfoString) {
  const loginInfo = JSON.parse(loginInfoString);
  const username = loginInfo.username;
  const userIdElement = document.getElementById("username");
  userIdElement.textContent = username;
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
    this.allbuku = data;
    if (!data.message) {
      data.forEach((item) => {
        var productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
        <div class="product-icons">
          <a href="#"><i data-feather="shopping-cart"></i></a>
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
