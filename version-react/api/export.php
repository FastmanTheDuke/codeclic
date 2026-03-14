<?php
// export.php - À placer dans le dossier /api
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=inscriptions_codeclic_' . date('Y-m-d') . '.csv');

$host = "localhost";
$dbname = "codeclic";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $query = $pdo->query("SELECT nom, prenom, email, statut, message, date_inscription FROM inscriptions_codeclic ORDER BY date_inscription DESC");

    $output = fopen('php://output', 'w');
    // Ajout du BOM pour la compatibilité des accents sous Excel
    fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

    // En-têtes basés sur le flyer [cite: 15, 18]
    fputcsv($output, array('Nom', 'Prénom', 'Email', 'Statut', 'Message/Projet', 'Date Inscription'));

    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        fputcsv($output, $row);
    }
    fclose($output);
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
?>