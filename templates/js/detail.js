const idBuku = JSON.parse(localStorage.getItem("currentBuku")).id;
console.log(idBuku);

fetch("http://127.0.0.1:5000/buku/" + idBuku, {
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
      document.getElementById("img").src = data.cover;
      document.getElementById("judulBuku").innerHTML = data.judul;
      document.getElementById("kategoriBuku").innerHTML =
        data.kategori.join(", ");
      document.getElementById("sinopsis").innerHTML = data.sinopsis;
      data.reting.forEach((item) => {
        var productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
        <div class="row">
        <h3>${item.id_users}</h3>
        <h5>tanggal: ${item.tanggal}</h5>
        <h5>nilai: ${item.nilai}/10</h5>
        </div>
        <p>${item.komentar}</p>
        <br>
      `;
        document.getElementById("reting").appendChild(productCard);
      });
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Modal Box
const itemDetailModal = document.querySelector("#add-reting-modal");

function addKomen() {
  itemDetailModal.style.display = "flex";
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

function kirimKomen() {
  var nilai = document.getElementById("nilai").value;
  var komentar = document.getElementById("komentar").value;
  var id_user = JSON.parse(localStorage.getItem("loginInfo")).iduser;

  var formData = {
    nilai: nilai,
    komentar: komentar,
    id_user: id_user,
  };

  fetch("http://127.0.0.1:5000/reting/" + idBuku + "/add", {
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
