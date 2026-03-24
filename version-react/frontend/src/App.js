import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Importation des images (Assure-toi que le dossier images est bien dans frontend/src/)
import logoCodeClic from './images/Logo-CODECLIC.png';
import logoLyon1 from './images/Logo-Lyon1-Université-Claude-BERNARD.png';
import logoHCL from './images/Logo-HCL-Hospices-Civils-de-Lyon.jpg';
import logoMD101 from './images/Logo-MD101.png';

const icons = ["🎤", "🩺", "💡", "🛠️", "🤝"];

// Configuration standard pour les animations d'apparition au scroll
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function App() {
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', statut: 'salarie', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
    if (!validateEmail(formData.email)) {
      alert("Veuillez saisir une adresse email valide.");
      return;
    }

    setLoading(true);
    const apiUrl = window.location.hostname === "localhost"
      ? 'http://localhost/codeclic/codeclic/version-react/api/api.php'
      : 'https://votre-domaine.fr/api/api.php';

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
      alert("Erreur de connexion. Vérifiez que votre backend est bien lancé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00818a] selection:text-white ">

      {/* HEADER AVEC LOGO */}
      <header className="bg-white py-12 px-6 text-center shadow-sm border-b border-slate-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex flex-col items-center justify-center"
        >
          {/* Remplacement du texte par le logo */}
          <img src={logoCodeClic} alt="Logo Code-Clic" className="h-32 md:h-40 object-contain mb-6 drop-shadow-lg" />
          <h2 className="text-xl md:text-2xl font-light text-slate-600 tracking-wide">
            Une formation professionnelle à la <span className="font-semibold text-[#00818a]">conception d'outils numériques en santé</span>
          </h2>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-16">

        {/* COLONNE DE GAUCHE : CONTENU DU PDF */}
        <div className="lg:col-span-7 space-y-16">

          {/* Section 1 : Pourquoi */}
          <motion.section variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl font-bold text-[#00818a] mb-6 tracking-tight flex items-center gap-3">
              <span className="bg-[#00818a]/10 p-3 rounded-xl">❓</span> Pourquoi cette formation ?
            </h2>
            <ul className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 text-slate-600 text-lg">
              <li className="flex gap-3"><span className="text-[#00818a] font-bold">•</span> Renforcer la formation et l'accompagnement au numérique des professionnels de santé (feuille route 2023-2027)</li>
              <li className="flex gap-3"><span className="text-[#00818a] font-bold">•</span> Concevoir des outils numériques au service de la santé en réponse à des besoins terrain</li>
              <li className="flex gap-3"><span className="text-[#00818a] font-bold">•</span> Mobiliser l'écosystème régional : École de e-santé de Lyon (UCBL1), HCL, GCS HOURAA, ARS-ARA, GCS Sara, Pôles de compétitivité</li>
            </ul>
          </motion.section>

          {/* Section 2 : Objectifs */}
          <motion.section variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl font-bold text-[#00818a] mb-6 tracking-tight flex items-center gap-3">
              <span className="bg-[#00818a]/10 p-3 rounded-xl">🎯</span> Objectif de la formation
            </h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-slate-600 text-lg space-y-4">
              <p>Proposer un nouveau parcours de formation, par la pratique, inclusif, innovant et pérenne à la conception d'outils numériques.</p>
              <p>Déployer un cadre propice pour le développement des usages et de l'innovation numérique qui s'adapte aux nouveaux environnements professionnels.</p>
              <div className="mt-6 p-4 bg-green-50 text-green-800 font-semibold rounded-xl text-center border border-green-200">
                🎓 Obtenir un certificat de réalisation (Qualiopi/DPC)
              </div>
            </div>
          </motion.section>

          {/* Section 3 : Publics & Impacts */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.section variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <h2 className="text-2xl font-bold text-[#00818a] mb-4">👥 Publics concernés</h2>
              <ul className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3 text-slate-600">
                <li>• Salariés y compris jeunes diplômés et alternants</li>
                <li>• Demandeurs d'emploi</li>
                <li>• Secteurs publics ou privés</li>
              </ul>
            </motion.section>

            <motion.section variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <h2 className="text-2xl font-bold text-[#00818a] mb-4">🚀 Les impacts</h2>
              <ul className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3 text-slate-600 text-sm">
                <li><strong>Pédagogiques :</strong> innovation, inclusion, compréhension numériques, sécurisation des parcours des enjeux environnementaux des solutions.</li>
                <li><strong>Économiques :</strong> attractivité du secteur de la santé, dynamisme territorial, renforcement coopération public/privé, contribution à la qualité des soins.</li>
              </ul>
            </motion.section>
          </div>

          {/* Section 4 : Programme */}
          <motion.section variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="bg-[#00818a] text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest flex items-center gap-4">
              <span>Le Programme</span>
            </h2>

            <div className="grid gap-4 relative z-10">
              {modules.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <span className="text-3xl mr-4">{icons[i]}</span>
                  <span className="text-lg font-medium">{m}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm font-medium">
              <div className="flex items-center gap-2 mb-4 md:mb-0"><span className="text-2xl">⏱️</span> 2 demi-journées</div>
              <div className="flex items-center gap-2"><span className="text-2xl">📍</span> Présentiel (La Doua / HCL) + Distanciel</div>
            </div>
          </motion.section>

        </div>
        {/* SECTION FORMULAIRE : Sticky au défilement */}
        {/* SECTION DROITE : Le formulaire devient l'élément sticky et animé */}
        <div className="lg:col-span-5 relative">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="sticky top-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100"
          >
            <h3 className="text-2xl font-bold mb-6 text-slate-800 text-center uppercase tracking-wider">
              Inscription
            </h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 bg-green-50 rounded-2xl text-green-700 font-bold uppercase tracking-widest"
              >
                ✅ Demande transmise !
              </motion.div>
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
                  <option value="autre">Secteur Public ou Privé</option>
                </select>

                <textarea placeholder="Votre besoin ou projet terrain..." className="w-full p-4 bg-slate-50 rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#00818a]"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-widest shadow-md ${loading ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-[#00818a] text-white hover:bg-[#005f66] active:scale-95'
                    }`}
                >
                  {loading ? "Envoi en cours..." : "S'inscrire"}
                </button>
              </form>
            )}
            <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
              Certifié Qualiopi / DPC
            </p>
            <p className="mt-8 text-center text-sm text-slate-500 font-medium">
              Besoin d'aide ? <a href="mailto:codeclic@univ-lyon1.fr" className="text-[#00818a] hover:underline">codeclic@univ-lyon1.fr</a>
            </p>
          </motion.div>
        </div>


      </main>

      {/* FOOTER PARTENAIRES */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-slate-400 text-sm font-black uppercase tracking-[0.2em] mb-12">Partenariat de la formation</h4>

          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-80 hover:opacity-100 transition-opacity mb-16">
            {/* Logos dynamiques basés sur tes fichiers */}
            <img src={logoLyon1} alt="Lyon 1" className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src={logoHCL} alt="HCL" className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            <img src={logoMD101} alt="MD101" className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-500" />

            {/* Textes de fallback pour les logos manquants du PDF */}
            <span className="font-bold text-xl text-slate-600 grayscale hover:grayscale-0">Include</span>
            <span className="font-bold text-xl text-slate-600 grayscale hover:grayscale-0">ARS ARA</span>
            <span className="font-bold text-xl text-slate-600 grayscale hover:grayscale-0">GCS SARA</span>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Ce projet a été soutenu par :</p>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-slate-500 uppercase">
              <span>Préfète de la région Auvergne-Rhône-Alpes</span>
              <span>France 2030</span>
              <span>La Région Auvergne-Rhône-Alpes</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;