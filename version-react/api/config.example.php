<?php
// ============================================================
//  config.example.php — Modèle de configuration Code-Clic
//  Copiez ce fichier en config.php et remplissez vos valeurs.
//  Ce fichier PEUT être commité (pas de secrets).
// ============================================================

// --- Environnement : 'local' ou 'production' ---
define('APP_ENV', 'local');

// --- Base de données ---
if (APP_ENV === 'production') {
    define('DB_HOST', 'VOTRE_HOST_MYSQL_PROD');
    define('DB_NAME', 'VOTRE_NOM_BDD_PROD');
    define('DB_USER', 'VOTRE_UTILISATEUR_BDD_PROD');
    define('DB_PASS', 'VOTRE_MOT_DE_PASSE_BDD_PROD');
} else {
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'codeclic');
    define('DB_USER', 'root');
    define('DB_PASS', '');
}

// --- Email (PHPMailer / SMTP) ---
define('MAIL_SMTP_HOST',    'smtp.gmail.com');
define('MAIL_SMTP_PORT',    587);
define('MAIL_USER',         'votre@email.com');
define('MAIL_PASS',         'VOTRE_MOT_DE_PASSE_APPLICATION');
define('MAIL_FROM',         'no-reply@votredomaine.fr');
define('MAIL_FROM_NAME',    'Code-Clic Plateforme');
define('MAIL_TO',           'reception@votredomaine.fr');

// --- Administration ---
define('ADMIN_PASSWORD', 'CHOISISSEZ_UN_MOT_DE_PASSE_FORT');
define('ADMIN_TOKEN',    'GENEREZ_UNE_CHAINE_ALEATOIRE_LONGUE');

// --- CORS — Origines autorisées ---
define('CORS_ORIGINS', [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://votredomaine.fr',
]);
