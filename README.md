# 🏥 Code-Clic : Formation à la conception d'outils numériques en santé

[cite_start]**Code-Clic** est un programme de formation professionnelle innovant né d'un partenariat stratégique entre l'**Université Lyon 1**, les **Hospices Civils de Lyon (HCL)** et **MD101**[cite: 30, 31, 40, 42]. [cite_start]Ce projet est soutenu par la Région Auvergne-Rhône-Alpes et l'ARS[cite: 45, 53, 54].

## 🎯 Objectifs du projet
[cite_start]L'objectif est de proposer un parcours de formation par la pratique, inclusif et pérenne[cite: 12]. La formation permet de :
* [cite_start]Renforcer l'accompagnement au numérique des professionnels de santé conformément à la feuille de route 2023-2027[cite: 8].
* [cite_start]Concevoir des outils numériques répondant concrètement aux besoins du terrain[cite: 9].
* [cite_start]Mobiliser l'écosystème régional (UCBL1, HCL, GCS HOURAA, ARS-ARA, GCS Sara)[cite: 10].

## 📚 Programme de la formation
[cite_start]La formation dure **2 demi-journées** et se déroule en présentiel (Campus Lyon-Tech-La Doua / HCL) ainsi qu'en distanciel[cite: 24, 25, 26]. Elle est structurée en 5 modules :
1.  [cite_start]**Conférence inaugurale** [cite: 19]
2.  [cite_start]**Caractérisation du besoin médical** [cite: 20]
3.  [cite_start]**Conception de l'outil numérique idéal** [cite: 21]
4.  [cite_start]**Mise en situation** [cite: 21]
5.  [cite_start]**Échanges avec l'écosystème numérique en santé** [cite: 22]

## 🛠 Installation technique
Ce dépôt contient une interface web permettant aux candidats de soumettre leur demande d'inscription.

### Prérequis
* Serveur Web (Apache/Nginx) avec PHP 7.4+
* Base de données MySQL
* Accès à un serveur SMTP pour l'envoi des notifications par email

### Configuration
1.  **Base de données :** Importez le schéma SQL fourni dans `database.sql` (ou créez la table `inscriptions_codeclic`).
2.  **Connexion :** Modifiez les variables `$host`, `$dbname`, `$user`, et `$pass` dans les fichiers `index.php` et `export.php`.
3.  [cite_start]**Emails :** Configurez l'adresse de réception dans `index.php` (par défaut : `codeclic@univ-lyon1.fr`)[cite: 48].

## 👥 Publics concernés
[cite_start]La formation s'adresse aux secteurs publics et privés[cite: 17]:
* [cite_start]Salariés, jeunes diplômés et alternants[cite: 16].
* [cite_start]Demandeurs d'emploi[cite: 17].

## 📄 Certification
[cite_start]Cette formation permet d'obtenir un certificat de réalisation (Qualiopi/DPC)[cite: 14].

---
[cite_start]*Projet soutenu par la Préfecture de la région Auvergne-Rhône-Alpes et France 2030.* [cite: 50, 51]
