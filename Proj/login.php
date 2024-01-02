<?php
// Handle login form submission. Connect to MySQL database using host, username, password.

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") { // if login form has been submitted with username and password
    $username = $_POST['username'];
    $password = $_POST['password'];

    $conn = new mysqli("localhost", "root", "", "stocktrackerlogin"); // connect to database "stocktrackerlogin"

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error); // throw error if connection fails
    }

    // check if the provided username and password match database
    $stmt = $conn->prepare("SELECT * FROM logindata WHERE Username = ? AND Password = ?");
    $stmt->bind_param("ss", $username, $password);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        echo '<script>
                alert("Try again");
                window.history.back(); // Go back to the previous page
              </script>';
        exit(); 
    } else {
        $_SESSION['username'] = $username;

        header("Location: successfulLogin.html");
        exit();
    }
    
    $stmt->close();
    $conn->close();
}
?>
