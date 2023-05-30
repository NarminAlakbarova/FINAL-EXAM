let row = document.querySelector(".services-row");

const BASE_URL = "http://localhost:8080/services";
let id = new URLSearchParams(window.location.search).get("id");

function drawCards(obj) {
  row.innerHTML = "";

  row.innerHTML = `
    <div class="col-lg-4"></div>
    <div class="col-lg-4  services-col my-3">
      <div class="card">
        <div class="images">
          <img src="${obj.img}" alt="" />
        </div>
        <div class="card-content">
          <h4>${obj.title}</h4>
          <p>
       ${obj.info}
          </p>
          <p>
  Price: ${obj.price}
          </p>
     
        </div>
      </div>
    </div>
    <div class="col-lg-4"></div>
    `;
}

async function getData(){
    let resp=await axios(`${BASE_URL}/${id}`)
    let data=resp.data
    drawCards(data)
}
getData()