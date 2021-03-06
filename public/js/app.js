console.log("Hello from the other side.");

const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("/weather?address= " + encodeURI(location) + "").then((res) => {
    res.json().then((res) => {
      if (res.error) {
        messageOne.textContent = `${res.error}`;
      } else {
        messageOne.textContent = `${res.location}`;
        messageTwo.textContent = `${res.forecast} , ${res.address}`;
      }
    });
  });
});
