import React, { useState } from 'react';
import { motion } from 'framer-motion';

const icons = ["🎤", "🩺", "💡", "🛠️", "🤝"];

function App() {
    const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', statut: 'salarie', message: '' });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fonction de validation du format d'email
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const modules = [
        "Conférence inaugurale",
        "Caractérisation du besoin médical",
        "Conception de l'outil numérique idéal",
        "Mise en situation",
        "Échanges avec l'écosystème numérique en santé"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation avant envoi
        if (!validateEmail(formData.email)) {
            alert("Veuillez saisir une adresse email valide.");
            return;
        }

        setLoading(true);
        //const apiUrl = 'http://localhost/codeclic/codeclic/version-react/api/api.php';
        const apiUrl = window.location.hostname === "localhost"
            ? 'http://localhost/codeclic/codeclic/version-react/api/api.php' // URL de test
            : 'https://votre-domaine.fr/api/api.php'; // URL réelle en ligne
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok && result.status === "success") {
                setSent(true);
            } else {
                alert("Erreur lors de l'envoi.");
            }
        } catch (error) {
            alert("Erreur de connexion. Vérifiez que votre serveur XAMPP est bien lancé.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00818a] selection:text-white">
            <header className="bg-[#00818a] text-white py-16 px-6 text-center shadow-lg">
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black mb-4 tracking-tight uppercase">
                    CODE-CLIC
                </motion.h1>
                <p className="text-xl font-light opacity-90 italic">Conception d'outils numériques en santé</p>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
                {/* Rappel des objectifs stratégiques basés sur le flyer */}
                <div className="lg:col-span-7 space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-[#00818a] mb-6 tracking-tight">Pourquoi cette formation ?</h2>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 text-slate-600">
                            <p>• Renforcer la formation au numérique des professionnels de santé conformément à la feuille de route 2023-2027.</p>
                            <p>• Concevoir des outils numériques répondant concrètement aux besoins du terrain.</p>
                            <p>• Mobiliser l'écosystème régional (UCBL1, HCL, ARS-ARA, GCS Sara, GCS HOURAA).</p>
                        </div>
                    </section>

                    <section className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
                        <h2 className="text-2xl font-bold mb-8 text-center uppercase tracking-widest text-[#00818a]">Le Programme</h2>
                        <div className="grid gap-4">
                            {modules.map((m, i) => (
                                <div key={i} className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
                                    <span className="text-2xl mr-4">{icons[i]}</span>
                                    <span className="text-lg opacity-90">{i + 1}. {m}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-center text-xs text-slate-400">Durée : 2 demi-journées | Campus Lyon-Tech-La Doua / HCL</p>
                    </section>
                </div>

                {/* Formulaire avec validation et état de chargement */}
                <div className="lg:col-span-5">
                    <div className="sticky top-8 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
                        <h3 className="text-2xl font-bold mb-6 text-slate-800">Candidature</h3>
                        {sent ? (
                            <div className="text-center py-10 bg-green-50 rounded-2xl text-green-700 font-bold uppercase tracking-widest">
                                ✅ Inscription envoyée !
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Prénom" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]"
                                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} />
                                    <input type="text" placeholder="Nom" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]"
                                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
                                </div>
                                <input type="email" placeholder="Email professionnel" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                <select className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]"
                                    onChange={(e) => setFormData({ ...formData, statut: e.target.value })}>
                                    <option value="salarie">Salarié / Alternant / Jeune diplômé</option>
                                    <option value="demandeur">Demandeur d'emploi</option>
                                    <option value="autre">Secteurs Public ou Privé</option>
                                </select>
                                <textarea placeholder="Décrivez votre besoin métier ou projet..." className="w-full p-4 bg-slate-50 rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#00818a]"
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-widest shadow-md ${loading ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-[#00818a] text-white hover:bg-[#005f66] active:scale-95'}`}
                                >
                                    {loading ? "Envoi en cours..." : "Valider ma demande"}
                                </button>
                            </form>
                        )}
                        <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                            Obtention d'un certificat Qualiopi / DPC
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer institutionnel regroupant tous les partenaires mentionnés */}
            <footer className="bg-white border-t border-slate-200 py-16 px-6 text-center">
                <div className="max-w-7xl mx-auto">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Partenariats institutionnels</p>
                    <div className="flex flex-wrap justify-center gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700 mb-12">
                        <span className="font-bold text-sm">LYON 1</span>
                        <span className="font-bold text-sm">HCL</span>
                        <span className="font-bold text-sm">MD101</span>
                        <span className="font-bold text-sm">ARS ARA</span>
                        <span className="font-bold text-sm">GCS SARA / HOURAA</span>
                    </div>
                    <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold text-slate-400 uppercase">
                        <div className="flex gap-4">
                            <span>PRÉFÈTE DE RÉGION</span>
                            <span>FRANCE 2030</span>
                            <span>LA RÉGION AUVERGNE-RHÔNE-ALPES</span>
                        </div>
                        <p className="text-sm text-slate-500 lowercase font-medium">Contact : codeclic@univ-lyon1.fr</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;