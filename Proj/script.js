const axios = require('axios');

const apiKey = "6b4642820b7101e067eaf933dfe26bcc8629dbfb7f41e9cea9947cb7e6e7da2d";

const apiUrl = `https://serpapi.com/search.json?engine=google_finance&q=GOOG:NASDAQ&api_key=6b4642820b7101e067eaf933dfe26bcc8629dbfb7f41e9cea9947cb7e6e7da2d`;

const callback = function(response) {
    const data = response.data;

    console.log(data); 
    
    const stockDataContainer = document.getElementById("stock-data-container");

    if (stockDataContainer) {
    
        stockDataContainer.innerHTML = `
            <h2>Stock Information</h2>
            <p>Symbol: ${data.summary.stock}</p>
            <p>Price: ${data.summary.price}</p>
            <!-- Add more data here as needed -->
        `;
    }
};

axios.get(apiUrl)
    .then(callback)
    .catch(function (error) {
        console.error(error);
    });
