<?php
// Configuration BDD
$host = "localhost";
$dbname = "votre_bdd";
$user = "votre_utilisateur";
$pass = "votre_mot_de_passe";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $query = $pdo->query("SELECT * FROM inscriptions_codeclic ORDER BY date_envoi DESC");
    $rows = $query->fetchAll(PDO::FETCH_ASSOC);

    if (count($rows) > 0) {
        $filename = "inscriptions_codeclic_" . date('Y-m-d') . ".csv";

        // Headers pour forcer le téléchargement
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=' . $filename);

        $output = fopen('php://output', 'w');

        // BOM UTF-8 pour qu'Excel affiche bien les accents
        fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

        // Entêtes des colonnes
        fputcsv($output, array('ID', 'Nom', 'Prénom', 'Email', 'Téléphone', 'Statut', 'Message', 'Date'));

        // Données
        foreach ($rows as $row) {
            fputcsv($output, $row);
        }
        fclose($output);
        exit;
    }
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
?>