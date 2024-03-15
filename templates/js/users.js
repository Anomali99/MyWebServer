fetch("http://192.168.68.219:5127/user", {
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
        <div class="row">
        <h1>${item.id}</h1>
        <h1>${item.nama}</h1>
        <h1>${item.username}</h1>
        <h1>${item.telepon}</h1>
        <h1>${item.level}</h1>
        </div>
      `;
        document.getElementById("reting").appendChild(productCard);
      });
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
