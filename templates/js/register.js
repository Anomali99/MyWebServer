function getIpServer() {
  const IPserver = localStorage.getItem("IPserver");
  if (IPserver) {
    console.log(IPserver);
    return JSON.parse(IPserver);
  } else {
    return { status: false, iduser: null, username: null, level: null };
  }
}

const IPserver = getIpServer().ip;
const PORTserver = getIpServer().port;

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

  fetch("http://" + IPserver + ":" + PORTserver + "/user/register", {
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
