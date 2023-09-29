function updateStockData(stockData, stockElementId) {
    const stockElement = document.getElementById(stockElementId);

    if (stockElement) {
        stockElement.innerHTML = `
            <img src="images/${stockData.summary.stock.toLowerCase()}_logo.png">
            <div>
                <h3>${stockData.summary.price}</h3>
                <p>${stockData.summary.stock}</p>
            </div>
        `;
    }
}

function fetchStockData(stockSymbol, apiKey, stockElementId) {
    const apiUrl = `https://serpapi.com/search.json?engine=google_finance&q=${stockSymbol}:NASDAQ&api_key=${apiKey}`;

    axios.get(apiUrl)
        .then(function (response) {
            const stockData = response.data;

            updateStockData(stockData, stockElementId);
        })
        .catch(function (error) {
            console.error(error);
        });
}

const apiKey = "6b4642820b7101e067eaf933dfe26bcc8629dbfb7f41e9cea9947cb7e6e7da2d";

fetchStockData("GOOG", apiKey, "google-stock");
fetchStockData("AMZN", apiKey, "amazon-stock");
fetchStockData("META", apiKey, "meta-stock");
