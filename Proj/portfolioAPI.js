//API implementation of https://www.stockdata.org/

const apiKey = "MzXWBRjue1fixo9pvPhGbmHogh57dOPAmEitmEZJ";

const stockSearchForm = document.querySelector(".stockSearch"); //user input
const portfolioStockList = document.getElementById("portfolioStockList"); //stock list

stockSearchForm.addEventListener("submit", function (e) {
  //once button is pressed --> get user input
  e.preventDefault();

  const stockNameInput = document.getElementById("stockName");
  const stockName = stockNameInput.value;

  fetchStockData(stockName);
});

//Update <ul id="portfolioStockList"></ul> with real-time stock data from API
function createStockListItem(stockData) {
  const listItem = document.createElement("li");
  listItem.className = "portfolioStockItem";

  listItem.innerHTML = `
        <img src="images/${stockData.data[0].ticker.toLowerCase()}_logo.png">
        <div>
            <h3>${stockData.data[0].name}</h3>
            <p>Price: ${stockData.data[0].price}</p>
            <p>Day High: ${stockData.data[0].day_high}</p>
            <p>Day Low: ${stockData.data[0].day_low}</p>
        </div>
    `;

  portfolioStockList.appendChild(listItem);
}

function updateStockData(stockData) {
  createStockListItem(stockData);
}

//fetch stock data from API
function fetchStockData(stockName) {
  const apiUrl = `https://api.stockdata.org/v1/data/quote?symbols=${stockName}&api_token=${apiKey}`;

  axios
    .get(apiUrl)
    .then(function (response) {
      const stockData = response.data;

      updateStockData(stockData);
    })
    .catch(function (error) {
      console.error(error);
    });
}
