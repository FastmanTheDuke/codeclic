<?php
// Autoriser les requêtes provenant de ton application React (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Configuration BDD
$host = "localhost";
$dbname = "codeclic";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

    // Récupérer les données envoyées par React
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->nom)) {
        $sql = "INSERT INTO inscriptions_codeclic (nom, prenom, email, statut, message) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);

        if ($stmt->execute([$data->nom, $data->prenom, $data->email, $data->statut, $data->message])) {
            // Notification Email [cite: 48]
            mail("codeclic@univ-lyon1.fr", "Nouvelle inscription via React", "Candidat : " . $data->prenom . " " . $data->nom);

            http_response_code(201);
            echo json_encode(["message" => "Inscription réussie"]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Erreur lors de l'enregistrement"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Données incomplètes"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Erreur serveur : " . $e->getMessage()]);
}
?>