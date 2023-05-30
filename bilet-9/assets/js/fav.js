const FAV_URL = "http://localhost:8080/fav";
let row = document.querySelector(".services-row");
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
      
          <a class="fa-solid fa-trash" onclick=deleteCards(${item.id})></a>
        
        </div>
        </div>
      </div>
    </div>
      
      `;
  });
}
async function getAllData() {
  let resp = await axios(FAV_URL);
  let data = resp.data;
  drawCards(data);
}
getAllData();

async function deleteCards(id) {
  await axios.delete(`${FAV_URL}/${id}`);
}
