var trans = null;

fetch("http://" + IPserver + ":" + PORTserver + "/transaksi/all", {
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
      trans = data;
      data.forEach((item) => {
        var productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
        <div class="row" onclick="detailtransaksi('${item.id}')">
        <h1>${item.id}</h1>
        <h1>${item.tanggal}</h1>
        <h1>IDR ${item.total}</h1>
        <h1>${item.status}</h1>
        </div>
      `;
        document.getElementById("reting").appendChild(productCard);
      });
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Modal Box
const id_userInput = document.querySelector("#id_user");
const id_transInput = document.querySelector("#id_trans");
const totalInput = document.querySelector("#total");
const tanggalInput = document.querySelector("#tanggal");
const waktuInput = document.querySelector("#waktu");
const statusInput = document.querySelector("#status");

const modal = document.querySelector("#add-reting-modal");
const detailTrans = document.getElementById("detailTrans");

function detailtransaksi(id) {
  modal.style.display = "flex";

  trans.forEach((tr) => {
    if (tr.id == id) {
      console.log(tr);
      id_userInput.value = tr.id_user;
      id_transInput.value = tr.id;
      totalInput.value = "IDR " + tr.total;
      tanggalInput.value = tr.tanggal;
      waktuInput.value = tr.waktu;
      Array.from(statusInput.options).forEach(function (option) {
        if (option.value == tr.status) {
          option.selected = true;
        }
      });
      var childElements = detailTrans.children;
      for (var i = 0; i < childElements.length; i++) {
        var child = childElements[i];
        if (child.tagName.toLowerCase() !== "h2") {
          child.remove();
        }
      }
      tr.detail.forEach((det) => {
        var productCard = document.createElement("form");
        productCard.style.backgroundColor = "rgba(1, 1, 3, 0.2)";
        productCard.style.border = "1px solid #666";

        productCard.innerHTML = `
        <div class="input-group">
          <label for="id${det.id_buku}">id buku</label>
          <input
            type="text"
            id="id${det.id_buku}"
            name="id${det.id_buku}"
            value="${det.id_buku}"
            required
            readonly
          />
        </div>
        <div class="input-group">
          <label for="id${det.jumlah}">jumlah</label>
          <input
            type="text"
            id="id${det.jumlah}"
            name="id${det.jumlah}"
            value="${det.jumlah}"
            required
            readonly
          />
        </div>
        <div class="input-group">
          <label for="id${det.subtotal}">subtotal</label>
          <input
            type="text"
            id="id${det.subtotal}"
            name="id${det.subtotal}"
            value="IDR ${det.subtotal}"
            required
            readonly
          />
        </div>
      `;
        detailTrans.appendChild(productCard);
      });
    }
  });
}

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

function retingclose() {
  modal.style.display = "none";
}

function simpan() {
  var idTrans = id_transInput.value;
  var status = statusInput.value;

  var formData = {
    status: status,
  };

  console.log(formData);

  fetch(
    "http://" + IPserver + ":" + PORTserver + "/transaksi/" + idTrans + "/edit",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
      if (data.message == "transaksi berhasil diubah") {
        window.location.href = "transaksi.html";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
