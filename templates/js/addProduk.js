const checkboxForm = document.getElementById("kategori");
fetch("http://" + IPserver + ":" + PORTserver + "/buku/kategori", {
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

      fetch("http://" + IPserver + ":" + PORTserver + "/buku/add", {
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

// Modal Box
const itemDetailModal = document.querySelector("#add-reting-modal");

function addKategori() {
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

function tamabahkategori() {
  const kat = String(
    document.querySelector("#kategoriinput").value
  ).toLowerCase();
  const checkboxes = checkboxForm.querySelectorAll('input[type="checkbox"]');
  console.log(checkboxes);
  const checkedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );
  var ya = true;
  if (checkedValues) {
    checkedValues.forEach((k) => {
      if (k.toLowerCase() == kat) {
        ya = false;
      }
    });
  }
  if (ya) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = kat;
    checkbox.value = kat;

    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${kat}`));

    checkboxForm.appendChild(label);
  }
}
