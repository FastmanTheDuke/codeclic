<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
require 'config.php';

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, CORS_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $pdo  = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->nom)) {
        $sql  = "INSERT INTO inscriptions_codeclic (nom, prenom, email, statut, message) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);

        if ($stmt->execute([$data->nom, $data->prenom, $data->email, $data->statut, $data->message])) {

            // --- ENVOI DE L'EMAIL VIA PHPMAILER ---
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host       = MAIL_SMTP_HOST;
                $mail->SMTPAuth   = true;
                $mail->Username   = MAIL_USER;
                $mail->Password   = MAIL_PASS;
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = MAIL_SMTP_PORT;

                if (APP_ENV === 'local') {
                    $mail->SMTPOptions = [
                        'ssl' => [
                            'verify_peer'       => false,
                            'verify_peer_name'  => false,
                            'allow_self_signed' => true,
                        ],
                    ];
                }

                $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
                $mail->addAddress(MAIL_TO);

                $mail->isHTML(true);
                $mail->Subject = "Nouvelle demande d'inscription - Code-Clic";

                $messageHtml = nl2br(htmlspecialchars($data->message));
                $mail->Body  = "<h3>Nouvelle inscription reçue</h3>
                                <p><b>Nom :</b> {$data->prenom} {$data->nom}</p>
                                <p><b>Email :</b> {$data->email}</p>
                                <p><b>Statut :</b> {$data->statut}</p>
                                <p><b>Message :</b><br>{$messageHtml}</p>";

                $mail->send();
                $emailStatus = "Email envoyé";
            } catch (Exception $e) {
                $emailStatus = "Erreur email : {$mail->ErrorInfo}";
            }

            echo json_encode([
                "status"  => "success",
                "message" => "Inscription réussie",
                "debug_mail" => $emailStatus,
            ]);
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
    echo json_encode(["status" => "error", "message" => "Connexion BDD échouée"]);
}
