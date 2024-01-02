//https://polygon.io/docs/stocks/getting-started

const apiKey = "cmOvv0Op_hvdJaeluOzYPN0UZA3VE8v4";

//fetch historical stock data from API
// ---------------------------------------------------------------------------

function fetchHistoricalStockData(stockName, startDate, endDate) {
  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${stockName}/range/1/day/${startDate}/${endDate}?unadjusted=false&apiKey=${apiKey}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (!data || !data.results || data.results.length === 0) {
        throw new Error("API response did not contain valid data");
      }
      const historicalData = data.results.map((result) => ({
        timestamp: new Date(result.t),
        open: result.o,
        high: result.h,
        low: result.l,
        close: result.c,
      }));
      return historicalData;
    })
    .catch((error) => {
      console.error("Error fetching historical stock data:", error);
      return null;
    });
}

// display stock chart when button pressen & get user input
// ---------------------------------------------------------------------------

const element = document.getElementById("viewChartButton");
element.addEventListener("click", getUserInput);

let stockChart; // Declare the chart variable (to destroy later if already existent)

function getUserInput() {
  const stockNameInput = document.getElementById("stockName");
  const stockName = stockNameInput.value.toUpperCase();

  const startDateInput = document.getElementById("startDate");
  const startDate = startDateInput.value;

  const endDateInput = document.getElementById("endDate");
  const endDate = endDateInput.value;

  // create candlestick chart based on data & check if a chart already exists and removes it before creating new one
  // ---------------------------------------------------------------------------

  function drawChart() {
    fetchHistoricalStockData(stockName, startDate, endDate).then((data) => {
      if (data) {
        // Check if the chart already exists and destroy it
        if (stockChart) {
          stockChart.destroy();
        }

        var ctx = document.getElementById("stockChart").getContext("2d");

        // Die Charts sollten die Screenbreite nicht überschreiten
        const canvasWidth = window.innerWidth - 20;
        ctx.canvas.width = canvasWidth;

        ctx.canvas.height = 800;

        // Data for chart
        var barData = data.map((result) => ({
          x: result.timestamp.valueOf(), //use luxon to convert date input to right format
          o: result.open,
          h: result.high,
          l: result.low,
          c: result.close,
        }));

        // Create a new Chart chart
        stockChart = new Chart(ctx, {
          type: "candlestick",
          data: {
            datasets: [
              {
                label: stockName + " candlestick chart",
                data: barData,
              },
            ],
          },
        });
      }
    });
  }
  drawChart();
}
