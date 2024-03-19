function keycari() {
  const caribuku = localStorage.getItem("caribuku");

  if (caribuku) {
    return JSON.parse(caribuku);
  } else {
    return { key: null };
  }
}

function detail(id) {
  localStorage.setItem("currentBuku", JSON.stringify({ id: id }));
  window.location.href = "detail.html";
}

const allproduk = document.getElementById("allproduk");
fetch("http://" + IPserver + ":" + PORTserver + "/buku/cari/" + keycari().key, {
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
        var productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
        <div class="product-icons">
          <a href="#products" onclick="masukankeranjang('${item.id}', '${
          item.judul
        }', '${item.harga}', '${
          item.cover
        }')"><i data-feather="shopping-cart"></i></a>
          <a href="#products" class="item-detail-button"
          onclick="detail('${item.id}')"><i data-feather="eye"></i
          ></a>
        </div>
        <div class="product-image">
          <img src="${item.cover}" alt="${item.judul}" />
        </div>
        <div class="product-content">
          <h3>${item.judul}</h3>
          <p>${item.kategori.join(", ")}</p>
          <div class="product-price">IDR ${item.harga}</div>
        </div>
      `;
        allproduk.appendChild(productCard);
      });
      feather.replace();
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
