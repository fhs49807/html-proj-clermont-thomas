//https://tradestie.com/apps/reddit/api/

// update <div id="reddit-wallstreetbets-stocks"></div> with daily wall-street-bets news data
// code from api creators website

function updateRedditStockData(redditStockData, redditStockElementId) {
  const redditStockElement = document.getElementById(redditStockElementId);

  if (redditStockElement) {
    redditStockElement.innerHTML = `
        `;

    const uniqueStockData = redditStockData.filter(
      (stock, index, self) =>
        index === self.findIndex((s) => s.ticker === stock.ticker)
    );

    for (let i = 0; i < Math.min(uniqueStockData.length, 50); i += 3) {
      const stockSet = uniqueStockData.slice(i, i + 3);

      const rowContainer = document.createElement("div");
      rowContainer.className = "stock-row";

      stockSet.forEach((stock) => {
        const stockItem = document.createElement("div");
        stockItem.className = "stock-item";
        stockItem.innerHTML = `
                    <h3>${stock.ticker}</h3>
                    <p>No. of Comments: ${stock.no_of_comments}</p>
                    <p>Sentiment: ${stock.sentiment}</p>
                    <p>Sentiment Score: ${stock.sentiment_score}</p>
                `;
        rowContainer.appendChild(stockItem);
      });

      redditStockElement.appendChild(rowContainer);
    }
  }
}

//fetch stock news data from API
function fetchRedditWallstreetbetsStockData(dateParam, redditStockElementId) {
  let apiUrl = "https://tradestie.com/api/v1/apps/reddit";

  if (dateParam) {
    apiUrl += `?date=${dateParam}`;
  }

  axios
    .get(apiUrl)
    .then(function (response) {
      const redditStocksData = response.data;

      updateRedditStockData(redditStocksData, redditStockElementId);
    })
    .catch(function (error) {
      console.error(error);
    });
}
