const axios = require('axios');

const apiKey = "6b4642820b7101e067eaf933dfe26bcc8629dbfb7f41e9cea9947cb7e6e7da2d";

const apiUrl = `https://serpapi.com/search.json?engine=google_finance&q=GOOG:NASDAQ&api_key=6b4642820b7101e067eaf933dfe26bcc8629dbfb7f41e9cea9947cb7e6e7da2d`;

const callback = function(response) {
    const data = response.data;

    console.log(data); 
    
    const stockDataContainer = document.getElementById("stock-data-container");
    const newsFeedContainer = document.getElementById("news-feed-container");


    if (stockDataContainer) {
    
        stockDataContainer.innerHTML = `
            
            <p>Symbol: ${data.summary.stock}</p>
            <p>Price: ${data.summary.price}</p>
        `;
        newsFeedContainer.innerHTML = `
            <h2>News Feed</h2>
            <ul>
                ${data.news_results.map(newsItem => `
                    <li>
                        <h3>${newsItem.title}</h3>
                        <p>Source: ${newsItem.source}</p>
                        <p>Date: ${newsItem.date}</p>
                    </li>
                `).join('')}
            </ul>
        `;
    }
};

axios.get(apiUrl)
    .then(callback)
    .catch(function (error) {
        console.error(error);
    });
