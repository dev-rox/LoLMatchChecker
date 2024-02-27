const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const RIOT_API_KEY = "RGAPI-00febb6b-55ea-45a1-a981-c51c1ef9d256";

app.use(cors());
app.use(express.json());

async function getPuuid(summonerName) {
  console.log("rodou a func getPuuid");
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });
    const data = await response.json();
    return data && data.puuid ? data.puuid : null; // Retorna 'puuid' se existir
  } catch (error) {
    console.error("Erro ao acessar a API da Riot:", error);
    return null; // Retorna null em caso de erro
  }
}

async function getSummonerId(puuid) {
  console.log("rodou a func getSummonerId");
  const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });
    const data = await response.json();
    return data && data.id ? data.id : null; // Retorna 'id' se existir
  } catch (error) {
    console.error("Erro ao acessar a API da Riot:", error);
    return null; // Retorna null em caso de erro
  }
}

async function getElo(summonerId) {
  console.log("rodou a func getElo");
  const url = `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_API_KEY,
      },
    });
    const data = await response.json();
    return data && data.length > 0 ? data : null; // Retorna as informações de classificação se existirem
  } catch (error) {
    console.error("Erro ao acessar a API da Riot:", error);
    return null; // Retorna null em caso de erro
  }
}

app.get("/riot-api/summoner/:summonerName", async (req, res) => {
  const { summonerName } = req.params;
  const puuid = await getPuuid(summonerName);
  if (puuid !== null) {
    const summonerId = await getSummonerId(puuid);
    if (summonerId !== null) {
      const elo = await getElo(summonerId);
      if (elo !== null) {
        res.json({ elo });
      } else {
        res.status(500).json({ error: "Erro ao obter o elo" });
      }
    } else {
      res.status(500).json({ error: "Erro ao obter o summonerId" });
    }
  } else {
    res.status(500).json({ error: "Erro ao acessar a API da Riot" });
  }
});

app.listen(PORT, () => {
  console.log(
    `Servidor proxy da Riot API está rodando em http://localhost:${PORT}`
  );
});
