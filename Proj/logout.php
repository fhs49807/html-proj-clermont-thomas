<?php
// Check if a user is logged in. If yes destroy session.

session_start();

// check if user is logged in
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
    
    $_SESSION = array();  //empty session array to clear all sessions open

    session_destroy(); // destroy session
}

header("Location: loggedOut.html"); // redirect to login page
exit();
?>
