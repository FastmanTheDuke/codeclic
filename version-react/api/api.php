<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Charge PHPMailer via Composer

//header("Access-Control-Allow-Origin: http://localhost:3000");
//header("Access-Control-Allow-Origin: https://md101.io");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "localhost";
$dbname = "codeclic";
$user = "root";
$pass = "";

$host = "mdconsulsjay.mysql.db";
$dbname = "mdconsulsjay";
$user = "mdconsulsjay";
$pass = "nSmtP2jDkZNx";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->nom)) {
        $sql = "INSERT INTO inscriptions_codeclic (nom, prenom, email, statut, message) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);

        if ($stmt->execute([$data->nom, $data->prenom, $data->email, $data->statut, $data->message])) {

            // --- ENVOI DE L'EMAIL VIA PHPMAILER ---
            $mail = new PHPMailer(true);
            try {
                // Paramètres du serveur (Exemple Mailtrap ou Gmail)
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com'; // Remplacez par votre hôte
                $mail->SMTPAuth = true;
                $mail->Username = 'support@mdxp.io';      // Remplacez par votre user
                $mail->Password = 'bszophzxgwliqian';  // Remplacez par votre pass
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                // Contournement du problème de certificat SSL en local (Windows/XAMPP)
                $mail->SMTPOptions = array(
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    )
                );

                // Destinataires
                $mail->setFrom('no-reply@mdxp.io', 'Code-Clic Plateforme');
                $mail->addAddress('support@mdxp.io'); // Email de réception

                // Contenu
                $mail->isHTML(true);
                $mail->Subject = "Nouvelle demande d'inscription - Code-Clic";

                // Sécurisation et conversion des sauts de ligne en balises <br>
                $messageHtml = nl2br(htmlspecialchars($data->message));

                $mail->Body = "<h3>Nouvelle inscription reçue</h3>
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
                "status" => "success",
                "message" => "Inscription réussie",
                "debug_mail" => $emailStatus
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