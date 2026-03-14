<?php
$status = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Remplacer par vos accès réels
    $pdo = new PDO("mysql:host=localhost;dbname=codeclic;charset=utf8", "root", "");
    $sql = "INSERT INTO inscriptions_codeclic (nom, prenom, email, statut, message) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    if ($stmt->execute([$_POST['nom'], $_POST['prenom'], $_POST['email'], $_POST['statut'], $_POST['message']])) {
        mail("support@mdxp.io", "Nouvelle inscription", "Candidat : " . $_POST['prenom'] . " " . $_POST['nom']);
        $status = "success";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Code-Clic | Inscription</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-slate-50 text-slate-900">
    <header class="bg-[#00818a] text-white p-10 text-center shadow-md">
        <h1 class="text-4xl font-bold uppercase tracking-widest">Code-Clic</h1>
        [cite_start]<p class="mt-2 text-lg">Conception d'outils numériques en santé [cite: 6]</p>
    </header>

    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 p-8">
        <aside class="space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#00818a]">
                [cite_start]<h2 class="font-bold text-[#00818a] text-xl">Pourquoi cette formation ? [cite: 7]</h2>
                <ul class="mt-3 space-y-2 text-sm italic">
                    [cite_start]<li>• Renforcer le numérique en santé (2023-2027) [cite: 8]</li>
                    [cite_start]<li>• Répondre aux besoins du terrain [cite: 9]</li>
                </ul>
            </div>
            <div class="bg-[#2c3e50] text-white p-6 rounded-lg shadow-sm">
                [cite_start]<h2 class="font-bold text-xl mb-3">Les Modules [cite: 18]</h2>
                [cite_start]<p class="text-xs mb-2">Durée : 2 demi-journées [cite: 24]</p>
                <ol class="text-sm space-y-1 opacity-90">
                    <li>1. [cite_start]Conférence inaugurale [cite: 19]</li>
                    <li>2. [cite_start]Caractérisation du besoin [cite: 20]</li>
                    <li>3. [cite_start]Conception de l'outil idéal [cite: 21]</li>
                    <li>4. [cite_start]Mise en situation [cite: 21]</li>
                    <li>5. [cite_start]Échanges écosystème [cite: 22]</li>
                </ol>
            </div>
        </aside>

        <section class="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <?php if ($status == "success"): ?>
                <div class="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">Demande envoyée !</div>
            <?php endif; ?>
            <form method="POST" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <input type="text" name="prenom" placeholder="Prénom" required class="w-full p-2 border rounded">
                    <input type="text" name="nom" placeholder="Nom" required class="w-full p-2 border rounded">
                </div>
                <input type="email" name="email" placeholder="Email" required class="w-full p-2 border rounded">
                <select name="statut" class="w-full p-2 border rounded text-slate-500">
                    [cite_start]<option value="salarie">Salarié / Alternant [cite: 16]</option>
                    [cite_start]<option value="demandeur">Demandeur d'emploi [cite: 17]</option>
                    </ol>
                    <textarea name="message" placeholder="Votre projet..."
                        class="w-full p-2 border rounded h-24"></textarea>
                    <button
                        class="w-full bg-[#00818a] text-white py-3 rounded font-bold hover:bg-[#005f66] transition">S'inscrire</button>
            </form>
        </section>
    </div>
    <footer class="text-center p-6 text-slate-400 text-xs">
        [cite_start]Partenaires : Lyon 1, HCL, MD101, ARS-ARA, GCS Sara [cite: 10, 43, 45, 46]
    </footer>
</body>

</html>