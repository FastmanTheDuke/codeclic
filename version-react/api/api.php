<?php
// 1. Autoriser React (port 3000) et gérer la vérification "Preflight"
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Si le navigateur demande juste la permission (OPTIONS), on répond OK et on s'arrête là
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Configuration BDD
$host = "localhost";
$dbname = "codeclic";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

    // Récupérer les données JSON de React
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    if (!empty($data->email) && !empty($data->nom)) {
        $sql = "INSERT INTO inscriptions_codeclic (nom, prenom, email, statut, message) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);

        if ($stmt->execute([$data->nom, $data->prenom, $data->email, $data->statut, $data->message])) {
            // Optionnel : Notification email conforme au flyer 
            // @mail("support@mdxp.io", "Nouvelle inscription", "Candidat : " . $data->prenom . " " . $data->nom);
            $to = "support@mdxp.io"; //
            $subject = "Nouvelle inscription Code-Clic";
            $body = "Candidat : " . $data->prenom . " " . $data->nom . "\nStatut : " . $data->statut;

            // Vérification du succès de la fonction mail
            $mail_sent = @mail($to, $subject, $body);

            echo json_encode([
                "status" => "success",
                "message" => "Inscription réussie",
                "mail_status" => $mail_sent ? "Envoyé" : "Erreur configuration serveur mail"
            ]);
            // echo json_encode(["status" => "success", "message" => "Inscription réussie"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Erreur BDD"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Données incomplètes"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Connexion échouée"]);
}