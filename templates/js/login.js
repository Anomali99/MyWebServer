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

  var formData = {
    username: username,
    password: password,
  };

  fetch("http://127.0.0.1:5000/user/login", {
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
        var id = data.id;
        var username = data.username;
        var level = data.level;
        saveLoginStatus(id, username, level);
        window.location.href = "home.html";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function saveLoginStatus(iduser, username, level) {
  const loginInfo = {
    status: true,
    iduser: iduser,
    username: username,
    level: level,
  };
  localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
}

function getLoginStatus() {
  const loginInfo = localStorage.getItem("loginInfo");

  if (loginInfo) {
    return JSON.parse(loginInfo);
  } else {
    return { status: false, iduser: null, username: null, level: null };
  }
}

function logout() {
  localStorage.removeItem("loginInfo");
  window.location.href = "index.html";
}