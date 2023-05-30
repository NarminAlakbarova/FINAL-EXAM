let titleInp = document.querySelector(".titleinput");
let priceInp = document.querySelector(".priceinput");
let infoInp = document.querySelector(".textinput");
let imgInp = document.querySelector(".imginp");
let form = document.querySelector("form");
let submitBtn = document.querySelector(".btn-primary");
let title = document.querySelector(".text-center");
const BASE_URL = "http://localhost:8080/services";

let id = new URLSearchParams(window.location.search).get("id");
async function drawInput() {
  let resp = await axios(`${BASE_URL}/${id}`);
  let data = resp.data;
  titleInp.value = data.title;
  priceInp.value = data.price;
  infoInp.value = data.info;
  submitBtn.innerHTML="Edit"
  title.innerHTML="EDIT"

}
drawInput();
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    title: titleInp.value,
    price: priceInp.value,
    info: infoInp.value,
    img: `./assets/img/${imgInp.value.split("\\")[2]}`,
  };
  if (id) {
    await axios.patch(`${BASE_URL}/${id}`, obj);

  } else {
    await axios.post(BASE_URL, obj);
  }
  window.location.href="index.html"
});
