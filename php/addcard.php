<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") :
    $returnData = msg(0, 404, 'Page Not Found!');

elseif (
    !isset($data->title)
    || !isset($data->project_id)
    || !isset($data->description)
    || !isset($data->priority)
    || !isset($data->assign)
    || empty(trim($data->project_id))
    || empty(trim($data->title))
    || empty(trim($data->description))
    || empty(trim($data->priority))
    || empty(trim($data->assign))
) :
    $fields = ['fields' => ['project_id', 'title', 'description', 'priority', 'assign']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :
    $project_id = trim($data->project_id);
    $title = trim($data->title);
    $description = trim($data->description);
    $priority = trim($data->priority);
    $assign = trim($data->assign);

    try {
        $insert_query = "INSERT INTO `tasks`(`project_id`,`title`,`description`,`priority`,`assign`) VALUES(:project_id,:title,:description,:priority,:assign)";
        $insert_stmt = $conn->prepare($insert_query);

        // DATA BINDING
        $insert_stmt->bindValue(':project_id', htmlspecialchars(strip_tags($project_id)), PDO::PARAM_STR);
        $insert_stmt->bindValue(':title', htmlspecialchars(strip_tags($title)), PDO::PARAM_STR);
        $insert_stmt->bindValue(':description', htmlspecialchars(strip_tags($description)), PDO::PARAM_STR);
        $insert_stmt->bindValue(':priority', htmlspecialchars(strip_tags($priority)), PDO::PARAM_STR);
        $insert_stmt->bindValue(':assign', htmlspecialchars(strip_tags($assign)), PDO::PARAM_STR);

        $insert_stmt->execute();

        $returnData = msg(1, 201, 'Card added successfully.');
    } catch (PDOException $e) {
        $returnData = msg(0, 500, $e->getMessage());
    }
endif;

echo json_encode($returnData);

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}
?>