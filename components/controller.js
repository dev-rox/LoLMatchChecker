import axios from "axios";

const options = {
  method: "GET",
  url: "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/shini%201407/br1",
  headers: { "User-Agent": "insomnia/8.6.1" },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

document
  .getElementById("nickField")
  .addEventListener("keyup", function (event) {
    let searchTerm = event.target.value;
    fetchData(searchTerm);
  });

function fetchData(searchTerm) {
  fetch(
    "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" +
      searchTerm +
      "/br1"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Manipular os dados recebidos da API
      displayResults(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function displayResults(data) {
  // Exibir os resultados da API no elemento com id 'result'
  let resultElement = document.getElementById("result");
  resultElement.innerHTML = ""; // Limpar o conteúdo anterior
  data.forEach((item) => {
    let itemElement = document.createElement("div");
    itemElement.textContent = item.name; // Supondo que os resultados tenham um campo 'name'
    resultElement.appendChild(itemElement);
  });
}
