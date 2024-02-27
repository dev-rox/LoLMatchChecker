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
      document.getElementById("result").innerText = JSON.stringify(
        data,
        null,
        2
      );
    } catch (error) {
      console.error("Erro ao buscar invocador:", error);
      document.getElementById("result").innerText = "Erro ao buscar invocador";
    }
  });
