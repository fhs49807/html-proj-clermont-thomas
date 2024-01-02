<?php
// If "username" exists, connect to MySQL database. Retrieve list of stock IDs associated with "username" 

session_start();

// check if sesstion is logged in
if (!isset($_SESSION['username'])) {
    http_response_code(401);
    exit("Unauthorized");
}

$username = $_SESSION['username']; // get user's username

$conn = new mysqli("localhost", "root", "", "stocktrackerlogin"); // connect to DB

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // throw error if connection fails
}

$stmt = $conn->prepare("SELECT stockID FROM userstocks WHERE userID = ?"); // get stockID and userID from table "userstocks" in DB
if (!$stmt) {
    die("Error preparing statement: " . $conn->error);
}

if (!$stmt->bind_param("s", $username)) {
    die("Error binding parameters: " . $stmt->error);
}

if (!$stmt->execute()) {
    die("Error executing statement: " . $stmt->error);
}

$result = $stmt->get_result();

if (!$result) {
    die("Error getting result set: " . $stmt->error);
}


// add stockID stocks to stocks[] array
$stocks = [];
while ($row = $result->fetch_assoc()) {
    $stocks[] = $row['stockID'];
}

if (count($stocks) > 0) {
    echo json_encode(['stocks' => $stocks]);
} else {
    echo json_encode(['stocks' => []]); 
}

$stmt->close();
$conn->close();
?>
