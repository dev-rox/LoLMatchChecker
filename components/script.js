const form = document.getElementById("characterSearch");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nickField = document.getElementById("nickField").value;
  const options = {
    method: "GET",
    url: `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nickField}?api_key=<---PLEASE---INSERT---APIKEY---HERE--->`,
    //   headers: { "User-Agent": "insomnia/8.6.1" },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});
