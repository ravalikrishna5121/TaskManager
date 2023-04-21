<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    $returnData = msg(0, 404, 'Page Not Found!');
}

// IF THERE ARE NO EMPTY FIELDS THEN-
else {


    $title = trim($data->title);
    $type = trim($data->type);
    $start_date = trim($data->start_date);
    $end_date = trim($data->end_date);
        try {

                $insert_query = "INSERT INTO `projects`(`title`,`type`,`start_date`,estimate_end_date) VALUES(:title,:type,:start_date,:end_date)";

                $insert_stmt = $conn->prepare($insert_query);

                // DATA BINDING
                $insert_stmt->bindValue(':title', htmlspecialchars(strip_tags($title)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':type', htmlspecialchars(strip_tags($type)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':start_date', htmlspecialchars(strip_tags($start_date)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':end_date', htmlspecialchars(strip_tags($end_date)), PDO::PARAM_STR);

                $insert_stmt->execute();

                $returnData = msg(1, 201, 'You have successfully registered.');

        
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    }

echo json_encode($returnData);