<!-- check if session has "username". If yes, encode username into JSON. Otherwise username = null. -->

<?php
session_start();

if(isset($_SESSION['username'])) { // session has username?
  echo json_encode(['username' => $_SESSION['username']]); // "username" to JSON
} else {
  echo json_encode(['username' => null]); // no username -> null
}
?>
