const apiKey = "MzXWBRjue1fixo9pvPhGbmHogh57dOPAmEitmEZJ";

const stockSearchForm = document.querySelector(".stockSearch");

stockSearchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const stockNameInput = document.getElementById("stockName");
    const stockName = stockNameInput.value;

    fetchStockData(stockName);
});

function updateStockData(stockData, stockElementId) {
    const stockElement = document.getElementById(stockElementId);

    if (stockElement) {
        stockElement.innerHTML = `
            <div class="portfolioStockContainer">
                <img src="images/${stockData.data[0].ticker.toLowerCase()}_logo.png">
                <div>
                    <h3>${stockData.data[0].name}</h3>
                    <p>Price: ${stockData.data[0].price}</p>
                    <p>Day High: ${stockData.data[0].day_high}</p>
                    <p>Day Low: ${stockData.data[0].day_low}</p>
                </div>
            </div>
        `;
    }
}

function fetchStockData(stockName) {
    const stockElementId = "portfolioStockData";
    const apiUrl = `https://api.stockdata.org/v1/data/quote?symbols=${stockName}&api_token=${apiKey}`;

    axios.get(apiUrl)
        .then(function (response) {
            const stockData = response.data;

            updateStockData(stockData, stockElementId);
        })
        .catch(function (error) {
            console.error(error);
        });
}
