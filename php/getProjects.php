<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require __DIR__ . '/classes/Database.php';

$db_connection = new Database();
try {
    $conn = $db_connection->dbConnection();
    
    // Fetch all projects
    $fetch_projects = "SELECT * FROM `projects`";
    $query_stmt = $conn->prepare($fetch_projects);
    $query_stmt->execute();
    $projects = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Fetch tasks for each project
    foreach ($projects as &$project) {
        $project_id = $project['id'];
        $fetch_tasks = "SELECT t.* FROM `tasks` t WHERE t.project_id = :project_id";
        $query_stmt = $conn->prepare($fetch_tasks);
        $query_stmt->bindParam(':project_id', $project_id, PDO::PARAM_INT);
        $query_stmt->execute();
        $tasks = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
        $project['tasks'] = $tasks;
    }
    
    // Return projects with tasks as JSON response
    echo json_encode($projects);
    
} catch (PDOException $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
$conn = null;
?>
