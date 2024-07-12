const scriptURL =
  "https://script.google.com/macros/s/AKfycbyWsv3urlsd9-fF6raH_SPf4zwFsJJmJX0JVTUfreFROMzjSfRRUVh8wgQ9gfZ5ZHqmqg/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Thank You For Subscribing";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
