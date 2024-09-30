const btnSearch = document.querySelector(".btn-search");
let inputKeyword = document.querySelector(".input-keyword");

inputKeyword.focus();
btnSearch.addEventListener('click', function() {
    search()
    if(inputKeyword.value == '') {
        alert('Field TIdak Boleh Kosong')
    }
})
inputKeyword.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
        search()
    }
})

function search() {
    fetch(
        "http://api.weatherapi.com/v1/current.json?key=26516976a51147f1b9160445232708&q=" +
          inputKeyword.value +
          "&aqi=yes"
      )
        .then((response) => response.json())
        .then((data) => {
          const containerCuaca = document.querySelector(".container-cuaca");
          let element = "";
          element += showElement(data);
          containerCuaca.innerHTML = element;
          inputKeyword.value = "";
          inputKeyword.focus();
        });
}



function showElement(data) {
  return `<div class="card-body">
        <h5 class="card-title">${data.location.name}, ${data.location.region}</h5>
        <h3 class="card-title">${data.location.country}</h3>
        <h5 class="card-title">${data.current.last_updated}</h5>
        <img src="https:${data.current.condition.icon}" class="img-fluid">
        <h3 class="card-text">${data.current.temp_c}℃</h3>
        <h3 class="card-text">${data.current.condition.text}</h3>
      </div>`;
}
