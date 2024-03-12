const navbarNav = document.querySelector(".navbar-nav");
const menu = document.querySelector("#menu");

menu.onclick = () => {
  navbarNav.classList.toggle("active");
};

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

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

if (userLevel == "pegawai") {
  transaksiLink.style.display = "inline-block";
  pegawaiLink.style.display = "inline-block";
  produkLink.style.display = "inline-block";
} else {
  transaksiLink.style.display = "none";
  pegawaiLink.style.display = "none";
  produkLink.style.display = "none";
}
