var users = null;

fetch("http://" + IPserver + ":" + PORTserver + "/user", {
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
      users = data;
      data.forEach((item) => {
        var productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
        <div class="row">
        <h1>${item.id}</h1>
        <h1>${item.nama}</h1>
        <h1>${item.telepon}</h1>
        <h1>${item.level}</h1>
        <div class="product-icons">
          <a href="#products" onclick="hapus('${item.id}')"><i data-feather="trash-2"></i></a>
          <a href="#products" class="item-detail-button" onclick="detailuser('${item.id}')" ><i data-feather="eye"></i
          ></a>
        </div>
        </div>
      `;
        document.getElementById("reting").appendChild(productCard);
      });
      feather.replace();
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function hapus(id) {
  fetch("http://" + IPserver + ":" + PORTserver + "/user/" + id + "/remove", {
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
      if (data.message != "gagal menghapus") {
        window.location.href = "users.html";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Modal Box
const itemDetailModal = document.querySelector("#add-reting-modal");
const divPassword = document.querySelector("#div-password");
const divLevel = document.querySelector("#div-level");
const divId = document.querySelector("#div-id");
const submitBtn = document.querySelector("#submitBtn");
const judul = document.querySelector("#judulModal");

const id_userInput = document.querySelector("#id_user");
const namaInput = document.querySelector("#nama");
const usernameInput = document.querySelector("#usernameInput");
const levelInput = document.querySelector("#level");
const passwordInput = document.querySelector("#password");
const teleponInput = document.querySelector("#telepon");

function adduser() {
  itemDetailModal.style.display = "flex";
  submitBtn.style.display = "inline-block";

  divLevel.style.display = "none";
  divId.style.display = "none";
  divPassword.style.display = "flex";
  judul.innerHTML = "Tambah Pegawai";

  id_userInput.value = "";
  namaInput.value = "";
  usernameInput.value = "";
  levelInput.value = "";
  passwordInput.value = "";
  teleponInput.value = "";

  id_userInput.removeAttribute("readonly", true);
  namaInput.removeAttribute("readonly", true);
  usernameInput.removeAttribute("readonly", true);
  levelInput.removeAttribute("readonly", true);
  teleponInput.removeAttribute("readonly", true);
}

function detailuser(id) {
  itemDetailModal.style.display = "flex";

  divLevel.style.display = "flex";
  divId.style.display = "flex";
  divPassword.style.display = "none";
  submitBtn.style.display = "none";
  judul.innerHTML = "Detail User";

  id_userInput.setAttribute("readonly", true);
  namaInput.setAttribute("readonly", true);
  usernameInput.setAttribute("readonly", true);
  levelInput.setAttribute("readonly", true);
  teleponInput.setAttribute("readonly", true);

  users.forEach((user) => {
    if (user.id == id) {
      console.log(user);
      id_userInput.value = user.id;
      namaInput.value = user.nama;
      usernameInput.value = user.username;
      levelInput.value = user.level;
      teleponInput.value = user.telepon;
    }
  });
}

document.querySelector(
  ".modal-reting .modal-container-reting .close-icon"
).onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};

function retingclose() {
  itemDetailModal.style.display = "none";
}

function tambahkan() {
  var nama = namaInput.value;
  var username = usernameInput.value;
  var password = passwordInput.value;
  var telepon = teleponInput.value;

  var formData = {
    nama: nama,
    username: username,
    password: password,
    telepon: telepon,
  };

  fetch("http://" + IPserver + ":" + PORTserver + "/user/addpegawai", {
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
        window.location.href = "users.html";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
