<?php
// --- CONFIGURATION CORS ROBUSTE ---
header("Access-Control-Allow-Origin: http://localhost:3000"); // Autorise seulement ton app React
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Réponse immédiate pour la requête de vérification (Preflight) du navigateur
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- CONNEXION BDD ---
$host = "localhost";
$dbname = "codeclic";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

    // Récupération des données envoyées par React
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    if (!empty($data->email) && !empty($data->nom)) {
        // Insertion conforme aux besoins du flyer (Salariés, Alternants, etc.) [cite: 15, 16]
        $sql = "INSERT INTO inscriptions_codeclic (nom, prenom, email, statut, message) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);

        if ($stmt->execute([$data->nom, $data->prenom, $data->email, $data->statut, $data->message])) {
            // Notification mail au support mentionné dans le flyer [cite: 48]
            mail("support@mdxp.io", "Nouvelle inscription Code-Clic", "Candidat : " . $data->prenom . " " . $data->nom);

            echo json_encode(["status" => "success", "message" => "Inscription réussie"]);
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
    echo json_encode(["status" => "error", "message" => "Lien BDD échoué : " . $e->getMessage()]);
}
?>