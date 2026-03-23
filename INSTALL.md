🏥 Guide Technique et Déploiement - CODE-CLIC (Version React)
Ce document détaille les spécifications techniques, les commandes de maintenance et la procédure de mise en production de la Web App Code-Clic.

🎯 Objectifs du Projet
Le projet est un programme de formation professionnelle né d'un partenariat entre l'Université Lyon 1, les Hospices Civils de Lyon (HCL) et MD101. L'objectif est de :

Renforcer l'accompagnement au numérique des professionnels de santé (Feuille de route 2023-2027).

Concevoir des outils numériques répondant concrètement aux besoins du terrain.

Mobiliser l'écosystème régional (UCBL1, HCL, GCS HOURAA, ARS-ARA, GCS Sara).

🛠 Commandes de Développement
Toutes les commandes suivantes doivent être exécutées dans le dossier version-react/frontend/.

Installation des dépendances
npm install

Lancement en mode développement
Lance l'application sur http://localhost:3000.
npm start

Exécution des tests
Lance le testeur interactif pour valider les composants.
npm test

Compilation pour la production
Génère un dossier build/ contenant les fichiers optimisés et minifiés prêts pour le déploiement.
npm run build

🗄 Configuration de la Base de Données
Le backend PHP utilise une base de données MySQL nommée codeclic. Voici les requêtes SQL pour initialiser l'environnement :

Création de la base de données

CREATE DATABASE IF NOT EXISTS codeclic CHARACTER SET utf8 COLLATE utf8_general_ci;
USE codeclic;

Création de la table des inscriptions
Cette structure est basée sur les champs requis par l'API et le flyer de formation.

CREATE TABLE IF NOT EXISTS inscriptions_codeclic (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    statut VARCHAR(50) NOT NULL, -- Salarié, Demandeur d'emploi, etc.
    message TEXT,                -- Description du besoin terrain
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


🚀 Passage en Production
1. Ajustements Frontend (App.js)
Avant de compiler avec npm run build, assurez-vous que l'URL de l'API est dynamique :
const apiUrl = window.location.hostname === "localhost" 
    ? 'http://localhost/codeclic/codeclic/version-react/api/api.php' 
    : 'https://votre-domaine.fr/api/api.php';

2. Sécurisation Backend (api/api.php)
CORS : Remplacez l'astérisque ou le localhost par votre domaine réel :
header("Access-Control-Allow-Origin: https://votre-domaine.fr");

Connexion BDD : Modifiez les variables $host, $dbname, $user et $pass avec les accès fournis par votre hébergeur.

3. Configuration Serveur (.htaccess)
Pour permettre à React de gérer le routage sans erreurs 404, créez un fichier .htaccess à la racine de votre hébergement :
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]







