document
  .getElementById("searchForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const summonerName = document.getElementById("summonerName").value;
    try {
      const response = await fetch(
        `http://localhost:3000/riot-api/summoner/${encodeURIComponent(
          summonerName
        )}`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      let display = document.getElementById("result");
      data.elo.forEach((element) => {
        console.log(element.leagueId);
        let elo = "./components/404.png"; //imagem padrao
        switch (element.tier.toLowerCase()) {
          case "gold":
            elo = "./components/gold.webp";
            break;
          case "emerald":
            elo = "./components/emerald.webp";
            break;
        }

        let box = document.createElement("div");
        box.innerHTML = `
        <div>
        <p>Elo: ${element.tier}</p>
        <img src="${elo}"/>
        </div>
        `;
        // let paragrafo = document.createElement("p");
        // paragrafo.textContent = element.tier;
        display.appendChild(box);
      });
    } catch (error) {
      console.error("Erro ao buscar invocador:", error);
      document.getElementById("result").innerText = "Erro ao buscar invocador";
    }
  });
