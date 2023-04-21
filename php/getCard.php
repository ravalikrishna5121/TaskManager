<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require __DIR__.'/classes/Database.php';

$db_connection = new Database();
$conn = $db_connection->dbConnection();

// Select all cards from the cards table
$sql="SELECT * FROM `tasks`";
$stmt = $conn->prepare($sql);
$stmt->execute();

// Fetch all the cards as an associative array
$cards = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return the cards as a JSON response
echo json_encode($cards);

