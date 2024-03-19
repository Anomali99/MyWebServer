feather.replace();

const loginInfoString = localStorage.getItem("loginInfo");
if (loginInfoString) {
  window.location.href = "home.html";
}

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
