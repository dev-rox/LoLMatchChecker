const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const RIOT_API_KEY = "RGAPI-00febb6b-55ea-45a1-a981-c51c1ef9d256";

app.use(cors());
app.use(express.json());

app.get("/riot-api/summoner/:summonerName", async (req, res) => {
  const { summonerName } = req.params;
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erro ao acessar a API da Riot:", error);
    res.status(500).json({ error: "Erro ao acessar a API da Riot" });
  }
});

app.listen(PORT, () => {
  console.log(
    `Servidor proxy da Riot API está rodando em http://localhost:${PORT}`
  );
});
