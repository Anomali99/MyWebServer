const idBuku = JSON.parse(localStorage.getItem("currentBuku")).id;
console.log(idBuku);

const judul = document.getElementById("bukuJudul");
const sinopsis = document.getElementById("sinopsisBuku");
const harga = document.getElementById("harga");
const stok = document.getElementById("stok");

fetch("http://" + IPserver + ":" + PORTserver + "/buku/" + idBuku, {
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
        "kategori : " + data.kategori.join(", ");
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

      judul.value = data.judul;
      sinopsis.value = data.sinopsis;
      harga.value = data.harga;
      stok.value = data.stok;
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

function hapusBuku() {
  fetch(
    "http://" + IPserver + ":" + PORTserver + "/buku/" + idBuku + "/remove",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.message != "buku gagal dihapus") {
        hapuskeranjang(idBuku);
        window.location.href = "produk.html";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

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

function simpanperubahan() {
  var formData = {
    judul: judul.value,
    sinopsis: sinopsis.value,
    harga: harga.value,
    stok: stok.value,
  };
  console.log(JSON.stringify(formData));

  fetch("http://" + IPserver + ":" + PORTserver + "/buku/" + idBuku + "/edit", {
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
}
