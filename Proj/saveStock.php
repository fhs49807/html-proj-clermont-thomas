<?php
// Check if user is logged in. Read user input stock name if not empty. Insert username and stock name into "userstocks" table in DB

session_start();

// check if session is logged in
if (!isset($_SESSION['username'])) {
    http_response_code(401);
    exit("Unauthorized");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $stockData = json_decode(file_get_contents("php://input"), true); // read user input (JSON)
    $username = $_SESSION['username'];
    $stockName = $stockData['stockName'];

    // validate if stockName is not empty before proceeding
    if (empty(trim($stockName))) {
        http_response_code(400);
        exit(json_encode(["error" => "Stock name cannot be empty"]));
    }

    $conn = new mysqli("localhost", "root", "", "stocktrackerlogin"); // connect to DB

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error); // throw error if connection failed
    }

    $stmt = $conn->prepare("INSERT INTO userstocks (userID, stockID) VALUES (?, ?)"); // add username and stockname to "userstocks" table
    $stmt->bind_param("ss", $username, $stockName);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Stock added successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error adding stock: " . $conn->error]); // throw error
    }

    $stmt->close();
    $conn->close();
}

?>