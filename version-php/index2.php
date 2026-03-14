<?php
// --- LOGIQUE SERVEUR PHP ---
$message_status = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Connexion BDD (À adapter avec vos accès)
    $host = "localhost";
    $dbname = "votre_bdd";
    $user = "votre_utilisateur";
    $pass = "votre_mot_de_passe";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

        // Insertion BDD
        $sql = "INSERT INTO inscriptions_codeclic (nom, prenom, email, telephone, statut, message) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $_POST['nom'],
            $_POST['prenom'],
            $_POST['email'],
            $_POST['telephone'],
            $_POST['statut'],
            $_POST['message']
        ]);

        // Envoi Email
        $to = "support@mdxp.io"; // 
        $subject = "Nouvelle demande d'inscription Code-Clic";
        $body = "Nom: " . $_POST['nom'] . "\nEmail: " . $_POST['email'] . "\nStatut: " . $_POST['statut'] . "\nMessage: " . $_POST['message'];
        mail($to, $subject, $body);

        $message_status = "<div class='bg-green-100 text-green-700 p-4 rounded mb-6'>Votre demande a bien été enregistrée !</div>";
    } catch (PDOException $e) {
        $message_status = "<div class='bg-red-100 text-red-700 p-4 rounded mb-6'>Erreur : " . $e->getMessage() . "</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code-Clic | Formation Numérique en Santé</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-50 font-sans">

    <header class="bg-gradient-to-r from-[#00818a] to-[#2c3e50] text-white py-12 px-6 shadow-lg">
        <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div class="mb-8 md:mb-0">
                <h1 class="text-4xl font-bold mb-2">CODE-CLIC</h1>
                [cite_start]<p class="text-xl opacity-90">Conception d'outils numériques en santé [cite: 1]</p>
            </div>
            <div class="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                [cite_start]<p class="font-semibold text-center text-sm uppercase tracking-wider">Certifié Qualiopi /
                    DPC [cite: 3]</p>
            </div>
        </div>
    </header>

    <main class="max-w-5xl mx-auto py-12 px-6 grid md:grid-cols-2 gap-12">

        <div>
            <section class="mb-10">
                <h2 class="text-2xl font-bold text-[#00818a] mb-4">Pourquoi cette formation ?</h2>
                <ul class="space-y-3 text-gray-700">
                    <li class="flex items-start">
                        <span class="text-[#00818a] mr-2">✔</span>
                        [cite_start]Renforcer l'accompagnement au numérique (Feuille de route 2023-2027) [cite: 2]
                    </li>
                    <li class="flex items-start">
                        <span class="text-[#00818a] mr-2">✔</span>
                        [cite_start]Concevoir des outils en réponse aux besoins du terrain [cite: 2]
                    </li>
                    <li class="flex items-start">
                        <span class="text-[#00818a] mr-2">✔</span>
                        [cite_start]Mobiliser l'écosystème régional (Lyon 1, HCL, ARS...) [cite: 2]
                    </li>
                </ul>
            </section>

            <section class="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 class="text-xl font-bold text-[#00818a] mb-4">Programme des Modules</h2>
                <ol class="list-decimal list-inside space-y-2 text-gray-600">
                    [cite_start]<li>Conférence inaugurale [cite: 3]</li>
                    [cite_start]<li>Caractérisation du besoin médical [cite: 3]</li>
                    [cite_start]<li>Conception de l'outil idéal [cite: 3]</li>
                    [cite_start]<li>Mise en situation [cite: 3]</li>
                    [cite_start]<li>Échanges avec l'écosystème numérique [cite: 3]</li>
                </ol>
                [cite_start]<p class="mt-4 text-sm font-medium text-gray-500">Durée : 2 demi-journées (Présentiel &
                    Distanciel) [cite: 3]</p>
            </section>
        </div>

        <div id="inscription" class="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Formulaire d'inscription</h2>

            <?php echo $message_status; ?>

            <form action="#inscription" method="POST" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-1">Prénom</label>
                        <input type="text" name="prenom" required
                            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00818a] outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">Nom</label>
                        <input type="text" name="nom" required
                            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00818a] outline-none">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-semibold mb-1">Email</label>
                    <input type="email" name="email" required
                        class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00818a] outline-none">
                </div>
                <div>
                    <label class="block text-sm font-semibold mb-1">Statut Professionnel</label>
                    <select name="statut" required
                        class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00818a] outline-none">
                        [cite_start]<option value="Salarie">Salarié / Alternant [cite: 3]</option>
                        [cite_start]<option value="Demandeur d'emploi">Demandeur d'emploi [cite: 3]</option>
                        [cite_start]<option value="Secteur Public">Secteur Public [cite: 3]</option>
                        [cite_start]<option value="Secteur Prive">Secteur Privé [cite: 3]</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-semibold mb-1">Message ou projet</label>
                    <textarea name="message" rows="3"
                        class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#00818a] outline-none"
                        placeholder="Décrivez brièvement votre besoin..."></textarea>
                </div>
                <button type="submit"
                    class="w-full bg-[#00818a] text-white font-bold py-3 rounded-lg hover:bg-[#005f66] transition-colors shadow-md">
                    Envoyer ma demande
                </button>
            </form>
        </div>
    </main>

    <footer class="bg-gray-100 py-10 mt-12 text-center text-sm text-gray-500">
        [cite_start]<p>Partenaires : Université Lyon 1, HCL, MD101, Include, ARS, GCS Sara, GCS HOURAA [cite: 1, 4]</p>
        [cite_start]<p class="mt-2 text-[#00818a]">Contact : codeclic@univ-lyon1.fr [cite: 4]</p>
    </footer>

</body>

</html>