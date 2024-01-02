//API implementation of https://www.stockdata.org/

const apiKey = "MzXWBRjue1fixo9pvPhGbmHogh57dOPAmEitmEZJ";

const stockSearchForm = document.querySelector(".stockSearch"); //user input
const portfolioStockList = document.getElementById("portfolioStockList"); //stock list

stockSearchForm.addEventListener("submit", function (e) {
  //once button is pressed --> get user input
  e.preventDefault();
  addStock(); //once add button is pressed, addStock() --> run saveStock.php too save stock to DB

  const stockNameInput = document.getElementById("stockName");
  const stockName = stockNameInput.value;

  fetchStockData(stockName);
});

//Update <ul id="portfolioStockList"></ul> with real-time stock data from API
function createStockListItem(stockDataArray) {
  stockDataArray.forEach((stockData) => {
    const listItem = document.createElement("li");
    listItem.className = "portfolioStockItem";

    listItem.innerHTML = `
    <img src="images/${stockData.ticker.toLowerCase()}_logo.png">
      <div>
        <h3>${stockData.name}</h3>
        <p>Price: ${stockData.price}</p>
        <p>Day High: ${stockData.day_high}</p>
        <p>Day Low: ${stockData.day_low}</p>
      </div>
    `;

    portfolioStockList.appendChild(listItem);
  });
}

function updateStockData(stockDataArray) {
  portfolioStockList.innerHTML = ""; // Clear the existing list

  if (Array.isArray(stockDataArray)) {
    createStockListItem(stockDataArray);
  } else {
    console.error("Stock data array is not valid:", stockDataArray);
  }
}

//fetch stock data from API
function fetchStockData(stockName) {
  const apiUrl = `https://api.stockdata.org/v1/data/quote?symbols=${stockName}&api_token=${apiKey}`;

  return axios
    .get(apiUrl)
    .then(function (response) {
      return response.data.data[0]; // Just the first stock for simplicity
    })
    .catch(function (error) {
      console.error(error);
      return null;
    });
}
// get username from checkUsername.php (from DB) to get the according stock names
function fetchUsername() {
  return axios
    .get("checkUsername.php")
    .then((response) => {
      const username = response.data.username;
      console.log("Username:", username); // check if username is retrieved
      if (username !== null) {
        return username; // return username if it's found
      } else {
        throw new Error("Username not found"); // throw error if username not found
      }
    })
    .catch((error) => {
      throw new Error("Error fetching username"); // throw error if username not found
    });
}

// add stock to database stock list once username and stocknames are successfully retrieved
// ---------------------------------------------------------------------------

function addStock() {
  const stockName = document.getElementById("stockName").value;

  fetchUsername()
    .then((username) => {
      const requestData = JSON.stringify({ username, stockName });
      console.log("Request Data:", requestData);
      return fetch("saveStock.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(username);
          console.log(stockName);
          console.log(data);

          fetchStocks(); //Update the UI with new stock after "add"
        })
        .catch((error) => console.error("Error:", error));
    })
    .catch((error) => console.error("Error fetching username:", error));
}

// get stocks from DB stock list once username and stocknames are successfully retrieved
// ---------------------------------------------------------------------------
// chatGBT used for a lot of debugging as it was not working as intended for a long time

function fetchStocks() {
  return axios
    .get("fetchStock.php")
    .then(function (response) {
      console.log(response); // Log the response for debugging
      const savedStocks = response.data.stocks || [];

      if (!Array.isArray(savedStocks)) {
        console.error("Saved stocks data is not an array:", savedStocks);
        return; // Exit early if savedStocks is not an array
      }

      return Promise.all(savedStocks.map(fetchStockData));
    })
    .then(function (stockDataArray) {
      if (Array.isArray(stockDataArray)) {
        updateStockData(stockDataArray);
      } else {
        console.error("Stock data array is not valid:", stockDataArray);
      }
    })
    .catch(function (error) {
      console.error("Error fetching stocks:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchUsername()
    .then(fetchStocks)
    .catch(function (error) {
      console.error("Error fetching stocks:", error);
    });
});
