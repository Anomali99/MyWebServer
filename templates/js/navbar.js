feather.replace();

function getIpServer() {
  const IPserver = localStorage.getItem("IPserver");
  if (IPserver) {
    console.log(IPserver);
    return JSON.parse(IPserver);
  } else {
    return { status: false, iduser: null, username: null, level: null };
  }
}

const IPserver = getIpServer().ip;
const PORTserver = getIpServer().port;

const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
  refresKeranjang();
};

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

function refresKeranjang() {
  const listItem = document.querySelector("#itemlist");
  const total = document.querySelector("#totalharga");
  var hasil = 0;
  listItem.innerHTML = "";
  keranjang = JSON.parse(localStorage.getItem("keranjang"));
  if (keranjang) {
    keranjang.forEach((item) => {
      hasil = hasil + parseInt(item.harga);
      var productCard = document.createElement("div");
      productCard.className = "cart-item";
      productCard.innerHTML = `
      <img src="${item.cover}" alt="${item.judul}" />
      <div class="item-detail">
      <h3>${item.judul}</h3>
      <div class="item-price">IDR ${item.harga}    </div>
      <div class="item-price">jumlah: ${item.jumlah}</div>
      </div>
      <i data-feather="trash-2" class="remove-item" onclick="hapuskeranjang('${item.id}')"></i>
      `;
      listItem.appendChild(productCard);
      feather.replace();
    });
  }
  total.innerHTML = "Total : IDR " + String(hasil);
}

function masukankeranjang(id, judul, harga, cover) {
  var keranjang = [];
  var add = true;
  var old = JSON.parse(localStorage.getItem("keranjang"));
  if (old) {
    old.forEach((buku) => {
      if (buku.id == id) {
        var jml = parseInt(buku.jumlah) + 1;
        var total = parseInt(harga) * jml;
        const produk = {
          id: id,
          judul: judul,
          harga: total,
          cover: cover,
          jumlah: jml,
        };
        add = false;
        keranjang.push(produk);
      } else {
        keranjang.push(buku);
      }
    });
  }
  if (add) {
    const produk = {
      id: id,
      judul: judul,
      harga: harga,
      cover: cover,
      jumlah: 1,
    };
    keranjang.push(produk);
  }
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

function hapuskeranjang(id) {
  keranjang = [];
  JSON.parse(localStorage.getItem("keranjang")).forEach((buku) => {
    if (buku.id != id) {
      keranjang.push(buku);
    }
  });
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

function beli() {
  var total = 0;
  var id_user = getLoginStatus().iduser;
  var detail = [];
  keranjang = JSON.parse(localStorage.getItem("keranjang"));
  if (keranjang) {
    keranjang.forEach((item) => {
      var det = {
        subtotal: item.harga,
        jumlah: item.jumlah,
        id_buku: item.id,
      };
      detail.push(det);
      total = total + parseInt(item.harga);
    });
    console.log(
      JSON.stringify({
        total: total,
        id_user: id_user,
        detail: detail,
      })
    );
    fetch("http://" + IPserver + ":" + PORTserver + "/transaksi/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total: total,
        id_user: id_user,
        detail: detail,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message == "transaksi berhasil") {
          localStorage.removeItem("keranjang");
          refresKeranjang();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
}

const cariinput = document.querySelector("#search-box");
function caribuku() {
  localStorage.setItem("caribuku", JSON.stringify({ key: cariinput.value }));
  window.location.href = "cari.html";
}
