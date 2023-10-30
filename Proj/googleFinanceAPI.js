function updateStockData(stockData, stockElementId) {
    const stockElement = document.getElementById(stockElementId);

    if (stockElement) {
        stockElement.innerHTML = `
            <img src="images/${stockData.data[0].ticker.toLowerCase()}_logo.png">
            <div>
                <h3>${stockData.data[0].name}</h3>
                <p>Price: $${stockData.data[0].price}</p>
                <p>Day High: $${stockData.data[0].day_high}</p>
                <p>Day Low: $${stockData.data[0].day_low}</p>
            </div>
        `;
    }
}

function fetchStockData(stockSymbol, apiKey, stockElementId) {
    const apiUrl = `https://api.stockdata.org/v1/data/quote?symbols=${stockSymbol}&api_token=${apiKey}`;

    axios.get(apiUrl)
        .then(function (response) {
            const stockData = response.data;

            updateStockData(stockData, stockElementId);
        })
        .catch(function (error) {
            console.error(error);
        });
}

const apiKey = "MzXWBRjue1fixo9pvPhGbmHogh57dOPAmEitmEZJ";

fetchStockData("GOOG", apiKey, "google-stock");
fetchStockData("AMZN", apiKey, "amazon-stock");
fetchStockData("META", apiKey, "meta-stock");
fetchStockData("TSLA", apiKey, "tesla-stock");
fetchStockData("aapl", apiKey, "apple-stock");
