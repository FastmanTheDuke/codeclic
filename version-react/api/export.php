<?php
require 'config.php';

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=inscriptions_codeclic_' . date('Y-m-d') . '.csv');

try {
    $pdo   = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    $query = $pdo->query("SELECT nom, prenom, email, statut, message, date_inscription FROM inscriptions_codeclic ORDER BY date_inscription DESC");

    $output = fopen('php://output', 'w');
    fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));
    fputcsv($output, ['Nom', 'Prénom', 'Email', 'Statut', 'Message/Projet', 'Date Inscription']);

    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        fputcsv($output, $row);
    }
    fclose($output);
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
