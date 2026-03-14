import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Séparation des icônes pour une meilleure lecture du compilateur
const icons = ["🎤", "🩺", "💡", "🛠️", "🤝"];

function App() {
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', statut: 'salarie', message: ''
  });
  const [sent, setSent] = useState(false);

  const modules = [
    "Conférence inaugurale",
    "Caractérisation du besoin médical",
    "Conception de l'outil numérique idéal",
    "Mise en situation",
    "Échanges avec l'écosystème numérique en santé"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/version-react/api/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSent(true);
      }
    } catch (error) {
      console.error("Erreur de connexion à l'API:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00818a] selection:text-white">

      {/* HEADER : Identité visuelle Lyon 1 / HCL / MD101 */}
      <header className="relative bg-[#00818a] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black mb-4 tracking-tight">
            CODE-CLIC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-light max-w-2xl mx-auto">
            Conception d'outils numériques en santé [cite: 6]
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">

        {/* SECTION CONTENU : Objectifs et Modules [cite: 8, 11, 18] */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-[#00818a] mb-6">Objectifs de la formation</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 text-slate-600">
              <p>• Renforcer la formation au numérique des professionnels de santé[cite: 8].</p>
              <p>• Proposer un parcours inclusif et innovant par la pratique[cite: 12].</p>
              <p>• Mobiliser l'écosystème : UCBL1, HCL, ARS-ARA, GCS Sara[cite: 10].</p>
            </div>
          </section>

          <section className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
            <h2 className="text-2xl font-bold mb-8">Programme (2 demi-journées) [cite: 24]</h2>
            <div className="space-y-4">
              {modules.map((m, i) => (
                <div key={i} className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-2xl mr-4">{icons[i]}</span>
                  <span className="text-lg opacity-90">{i + 1}. {m} [cite: 19, 20, 21, 22]</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SECTION FORMULAIRE : Publics concernés  */}
        <div className="lg:col-span-5">
          <div className="sticky top-8 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-6">Demande d'inscription</h3>

            {sent ? (
              <div className="text-center py-8 bg-green-50 rounded-2xl text-green-700">
                <p className="text-4xl mb-2">✅</p>
                <p className="font-bold">Demande transmise !</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Prénom" required className="w-full p-4 bg-slate-50 rounded-xl outline-none"
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} />

                <input type="text" placeholder="Nom" required className="w-full p-4 bg-slate-50 rounded-xl outline-none"
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />

                <input type="email" placeholder="Email" required className="w-full p-4 bg-slate-50 rounded-xl outline-none"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                <select className="w-full p-4 bg-slate-50 rounded-xl outline-none"
                  onChange={(e) => setFormData({ ...formData, statut: e.target.value })}>
                  <option value="salarie">Salarié / Alternant [cite: 16]</option>
                  <option value="demandeur">Demandeur d'emploi [cite: 17]</option>
                  <option value="secteur">Secteur Public ou Privé [cite: 17]</option>
                </select>

                <textarea placeholder="Votre besoin terrain[cite: 9]..." className="w-full p-4 bg-slate-50 rounded-xl h-24 outline-none"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

                <button type="submit" className="w-full bg-[#00818a] text-white py-4 rounded-xl font-bold hover:bg-[#005f66] transition-all">
                  S'inscrire à la formation
                </button>
              </form>
            )}
            <p className="mt-6 text-center text-xs text-slate-400 font-medium">Obtenir un certificat Qualiopi/DPC [cite: 14]</p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 text-center">
        <p className="text-sm text-slate-500 italic">Contact : codeclic@univ-lyon1.fr [cite: 48]</p>
      </footer>
    </div>
  );
}

export default App;