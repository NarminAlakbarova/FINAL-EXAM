let burgerMenu = document.querySelector(".burger-menu");
let menuIcon = document.querySelector(".menu-icon");
let header = document.querySelector("header");
let row = document.querySelector(".services-row");
let searchInp = document.querySelector(".search");
let sortBtn = document.querySelector(".sortbtn");
let loadBtn = document.querySelector(".loadbtn");

let filteredData = [];
let allData = [];
let max = 3;
const BASE_URL = "http://localhost:8080/services";
const FAV_URL = "http://localhost:8080/fav";

menuIcon.addEventListener("click", function () {
  burgerMenu.classList.toggle("show");
});

function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    header.style.background = "#1F1F1F";
  } else {
    header.style.background = "";
  }
}
window.addEventListener("scroll", scrollFunction);

function drawCards(arr) {
  row.innerHTML = "";
  arr.forEach((item) => {
    row.innerHTML += `
    <div class="col-lg-4 col-md-6 services-col my-3">
    <div class="card">
      <div class="images">
        <img src="${item.img}" alt="" />
      </div>
      <div class="card-content">
        <h4>${item.title}</h4>
        <p>
        ${item.info}
        </p>
        <p>
       Price: ${item.price}
        </p>
        <div class="icons">
        <a class="fa-solid fa-info" href="details.html?id=${item.id}"></a>
        <a class="fa-solid fa-trash" onclick=deleteCards(${item.id})></a>
        <a class="fa-regular fa-pen-to-square" href="form.html?id=${item.id}"></a>
        <a class="fa-solid fa-heart" onclick=addFav(${item.id})></a>
      </div>
      </div>
    </div>
  </div>
    
    `;
  });
}

async function getAllData() {
  let resp = await axios(BASE_URL);
  let data = resp.data;
  allData = data;
  filteredData =
    filteredData.length || searchInp.value ? filteredData : allData;
  drawCards(filteredData.slice(0, max));
}
getAllData();

loadBtn.addEventListener("click", function () {
  max += 3;
  if (max >= allData.length) {
    loadBtn.style.display = "none";
  }
  if (filteredData.length) {
    drawCards(filteredData.slice(0, max));
  } else {
    getAllData();
  }
});

sortBtn.addEventListener("click", function () {
  if (sortBtn.innerHTML == "Sort") {
    filteredData = filteredData.sort((a, b) => a.price - b.price);
    getAllData();
    sortBtn.innerHTML = "Ascending";
  } else if (sortBtn.innerHTML == "Ascending") {
    filteredData = filteredData.sort((a, b) => b.price - a.price);
    sortBtn.innerHTML = "Descending";
    getAllData();
  } else if (sortBtn.innerHTML == "Descending") {
    filteredData = allData;
    drawCards(filteredData.slice(0, max));
    sortBtn.innerHTML = "Sort";
  }
});

searchInp.addEventListener("input", function (e) {
  filteredData = allData;
  filteredData = filteredData.filter((item) =>
    item.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  getAllData();
});

async function deleteCards(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  await axios.delete(`${FAV_URL}/${id}`);
}

async function addFav(id) {
  let favResp = await axios(`${FAV_URL}`);
  let favData = favResp.data;

  let resp = await axios(`${BASE_URL}/${id}`);
  let data = resp.data;

  let check = favData.find((item) => item.id == id);
  if (!check) {
    await axios.post(FAV_URL, data);
    alert("You added favorites!");
    favCaunter();
  } else {
    alert("You alredy added!");
  }
}

async function favCaunter() {
  let resp = await axios(FAV_URL);
  let data = resp.data;
  let newFavCounter = data.length;

  document.querySelector(".counter").innerHTML = newFavCounter.toString();
}
favCaunter();
