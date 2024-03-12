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

function submitForm() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var nama = document.getElementById("nama").value;
  var telepon = document.getElementById("telepon").value;

  var formData = {
    username: username,
    password: password,
    nama: nama,
    telepon: telepon,
  };

  fetch("http://127.0.0.1:5000/user/register", {
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
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
