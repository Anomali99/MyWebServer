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

const checkboxForm = document.getElementById("kategori");
fetch("http://127.0.0.1:5000/buku/kategori", {
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
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = item.kategori;
        checkbox.value = item.kategori;

        const label = document.createElement("label");
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${item.kategori}`));

        checkboxForm.appendChild(label);
      });
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function getCheckedValues() {
  const checkboxes = checkboxForm.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const checkedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );
  return checkedValues;
}

function encodeImageToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

function submitForm() {
  var judul = document.getElementById("judul").value;
  var sinopsis = document.getElementById("sinopsis").value;
  var harga = document.getElementById("harga").value;
  var stok = document.getElementById("stok").value;
  var kategori = getCheckedValues();
  var file = document.getElementById("cover").files[0];
  var filename = file.name;

  encodeImageToBase64(file)
    .then((base64Data) => {
      var formData = {
        judul: judul,
        sinopsis: sinopsis,
        harga: harga,
        stok: stok,
        kategori: kategori,
        cover: base64Data,
        filename: filename,
      };

      fetch("http://127.0.0.1:5000/buku/add", {
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
            // window.location.href = "login.html";
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}
