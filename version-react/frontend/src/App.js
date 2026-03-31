import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminPage from './AdminPage';

import logoCodeClic from './images/Logo-CODECLIC.png';
import logoLyon1 from './images/Logo-Lyon1-Université-Claude-BERNARD.png';
import logoHCL from './images/Logo-HCL-Hospices-Civils-de-Lyon.jpg';
import logoMD101 from './images/Logo-MD101.png';
import logoGCSH from './images/Logo-GCS-houraa.jpg';
import logoGCSARA from './images/Logo-gcs-ara.jpg';
import logoESL from './images/Logo-ecole-de-sante-de-Lyon.jpg';


const icons = ["🎤", "🩺", "💡", "🛠️", "🤝"];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// --- Navbar ---
function Navbar({ onAdminClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: 'pourquoi', label: 'Pourquoi ?' },
    { id: 'objectifs', label: 'Objectifs' },
    { id: 'programme', label: 'Programme' },
    { id: 'infos', label: 'Infos pratiques' },
    { id: 'inscription', label: "S'inscrire", highlight: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a2a3a]/95 backdrop-blur-md shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <img src={logoCodeClic} alt="Code-Clic" className="h-9 object-contain drop-shadow" />
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${link.highlight
                ? 'bg-[#00818a] text-white hover:bg-[#005f66] shadow-md'
                : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white p-2 rounded-xl hover:bg-white/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a2a3a]/98 backdrop-blur-md border-t border-white/10 px-6 pb-4"
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-3 text-white/80 hover:text-white border-b border-white/5 last:border-0 text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- Home Page ---
function HomePage({ onAdminClick }) {
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', statut: 'Salarié secteur public', message: '', autreStatut: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(
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
    if (!validateEmail(formData.email)) {
      alert("Veuillez saisir une adresse email valide.");
      return;
    }
    setLoading(true);
    const apiUrl = window.location.hostname === "localhost"
      ? 'http://localhost/codeclic/codeclic/version-react/api/api.php'
      : './api/api.php';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          statut: formData.statut === 'Autre' && formData.autreStatut.trim()
            ? `Autre : ${formData.autreStatut.trim()}`
            : formData.statut,
        }),
      });
      const result = await response.json();
      if (response.ok && result.status === "success") {
        setSent(true);
      } else {
        alert("Erreur lors de l'envoi.");
      }
    } catch {
      alert("Erreur de connexion. Vérifiez que votre backend est bien lancé.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00818a] selection:text-white">
      <Navbar onAdminClick={onAdminClick} />

      {/* HEADER */}
      <header className="bg-gradient-to-br from-[#12b5be] to-[#2c3e50] pt-28 pb-16 px-6 text-center shadow-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-80 hover:opacity-100 transition-opacity mb-10"
        >
          <img src={logoLyon1} alt="Lyon 1" className="h-18 object-contain h-lyon" />
          <img src={logoHCL} alt="HCL" className="h-18 object-contain h-hcl" />
          <img src={logoMD101} alt="MD101" className="h-12 object-contain h-md101" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <img src={logoCodeClic} alt="Logo Code-Clic" className="h-32 md:h-40 object-contain mb-6 drop-shadow-lg" />
          <h2 className="text-xl md:text-2xl font-light text-white/90 tracking-wide max-w-2xl">
            Une formation professionnelle à la{' '}<br />
            <span className="font-semibold text-white">conception d'outils numériques en santé</span>
          </h2>

          {/* CTA rapide header */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-[#00818a] font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-sm"
            >
              S'inscrire maintenant
            </button>
            <button
              onClick={() => document.getElementById('programme')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white/10 text-white font-medium rounded-2xl border border-white/20 hover:bg-white/20 transition-all text-sm"
            >
              Voir le programme
            </button>
          </div>
        </motion.div>
      </header>

      {/* CHIFFRES CLÉS */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '2', unit: 'demi-journées', label: 'de formation' },
            { value: '5', unit: 'modules', label: 'pratiques' },
            { value: '100%', unit: 'certifié', label: 'Qualiopi / DPC' },
            { value: 'Lyon', unit: '+ distanciel', label: 'Campus La Doua & HCL' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-[#00818a]">{item.value}</div>
              <div className="text-sm font-semibold text-slate-700">{item.unit}</div>
              <div className="text-xs text-slate-400 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-16">

        {/* COLONNE GAUCHE */}
        <div className="lg:col-span-7 space-y-16">

          {/* Section 1 : Pourquoi */}
          <motion.section id="pourquoi" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl font-bold text-[#00818a] mb-6 tracking-tight flex items-center gap-3">
              <span className="bg-[#00818a]/10 p-3 rounded-xl">❓</span> Pourquoi cette formation ?
            </h2>
            <ul className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-5 text-slate-600 text-lg">
              <li className="flex gap-4">
                <span className="mt-1 w-6 h-6 rounded-full bg-[#00818a]/10 text-[#00818a] flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                <span>Renforcer la formation et l'accompagnement au numérique des professionnels de santé (feuille de route 2023–2027)</span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 w-6 h-6 rounded-full bg-[#00818a]/10 text-[#00818a] flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                <span>Concevoir des outils numériques au service de la santé en réponse à des besoins terrain</span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 w-6 h-6 rounded-full bg-[#00818a]/10 text-[#00818a] flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                <span>Mobiliser l'écosystème régional : École de e-santé de Lyon (UCBL1), HCL, GCS HOURAA, ARS-ARA, GCS Sara, Clusters, Pôles de compétitivité</span>
              </li>
            </ul>
          </motion.section>

          {/* Section 2 : Objectifs */}
          <motion.section id="objectifs" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl font-bold text-[#00818a] mb-6 tracking-tight flex items-center gap-3">
              <span className="bg-[#00818a]/10 p-3 rounded-xl">🎯</span> Objectif de la formation
            </h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-slate-600 text-lg space-y-4">
              <p>Proposer un nouveau parcours de formation, par la pratique, inclusif, innovant et pérenne à la conception d'outils numériques.</p>
              <p>Déployer un cadre propice pour le développement des usages et de l'innovation numérique qui s'adapte aux nouveaux environnements professionnels.</p>
              <div className="mt-6 p-4 bg-green-50 text-green-800 font-semibold rounded-xl text-center border border-green-200">
                🎓 Obtenir un certificat de réalisation (Qualiopi / DPC)
              </div>
            </div>
          </motion.section>

          {/* Section 3 : Publics & Impacts */}
          <div id="publics" className="grid md:grid-cols-2 gap-8">
            <motion.section variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <h2 className="text-2xl font-bold text-[#00818a] mb-4">👥 Publics concernés</h2>
              <ul className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3 text-slate-600">
                <li className="flex items-center gap-3"><span className="text-[#00818a]">✓</span> Salarié secteur public</li>
                <li className="flex items-center gap-3"><span className="text-[#00818a]">✓</span> Salarié secteur privé</li>
                <li className="flex items-center gap-3"><span className="text-[#00818a]">✓</span> Alternant</li>
                <li className="flex items-center gap-3"><span className="text-[#00818a]">✓</span> Demandeur d'emploi</li>
                <li className="flex items-center gap-3"><span className="text-[#00818a]">✓</span> Autre</li>

              </ul>
            </motion.section>

            <motion.section variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <h2 className="text-2xl font-bold text-[#00818a] mb-4">🚀 Les impacts</h2>
              <ul className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4 text-slate-600 text-sm">
                <li>
                  <span className="font-semibold text-slate-700 block mb-1">Pédagogiques</span>
                  Innovation, inclusion, compréhension numérique, sécurisation des parcours et des enjeux environnementaux.
                </li>
                <li>
                  <span className="font-semibold text-slate-700 block mb-1">Économiques</span>
                  Attractivité du secteur santé, dynamisme territorial, coopération public/privé, qualité des soins.
                </li>
              </ul>
            </motion.section>
          </div>

          {/* Section 4 : Programme */}
          <motion.section id="programme" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="bg-[#00818a] text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest">Le Programme</h2>

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
                  <div>
                    <span className="text-xs text-white/50 font-medium uppercase tracking-widest">Module {i + 1}</span>
                    <p className="text-lg font-medium leading-tight">{m}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm font-medium gap-4">
              <div className="flex items-center gap-2"><span className="text-2xl">⏱️</span> 2 demi-journées</div>
              <div className="flex items-center gap-2"><span className="text-2xl">📍</span> Présentiel (Campus La Doua / HCL) + Distanciel</div>
            </div>
          </motion.section>

          {/* Section 5 : Infos pratiques */}
          <motion.section id="infos" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl font-bold text-[#00818a] mb-6 tracking-tight flex items-center gap-3">
              <span className="bg-[#00818a]/10 p-3 rounded-xl">📋</span> Informations pratiques
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '📅', title: 'Durée', desc: '2 demi-journées de formation intensive' },
                { icon: '📍', title: 'Lieu', desc: 'Campus La Doua (UCBL) & Hospices Civils de Lyon — également en distanciel' },
                { icon: '🎓', title: 'Certification', desc: 'Certificat de réalisation Qualiopi / DPC remis à l\'issue de la formation' },
                { icon: '👤', title: 'Pré-requis', desc: 'Ouvert à tous les professionnels de santé et du numérique, sans pré-requis' },
                { icon: '💰', title: 'Financement', desc: 'Prise en charge possible via OPCO, CPF ou financements publics selon votre statut' },
                { icon: '📬', title: 'Contact', desc: (<a href="mailto:codeclic@univ-lyon1.fr" className="text-[#00818a] hover:underline font-medium">codeclic@univ-lyon1.fr</a>) },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start"
                >
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm mb-1">{item.title}</p>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>

        {/* COLONNE DROITE : Formulaire sticky */}
        <div id="inscription" className="lg:col-span-5 relative">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="sticky top-24 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px bg-slate-200 flex-1"></div>
              <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-wider">Inscription</h3>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">✅</div>
                <p className="text-green-700 font-bold text-xl uppercase tracking-widest mb-2">Demande transmise !</p>
                <p className="text-slate-500 text-sm">Nous vous contacterons prochainement.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Prénom</label>
                    <input
                      type="text"
                      placeholder="Marie"
                      required
                      className="w-full p-3.5 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a] text-slate-800 placeholder-slate-300"
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Nom</label>
                    <input
                      type="text"
                      placeholder="Dupont"
                      required
                      className="w-full p-3.5 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a] text-slate-800 placeholder-slate-300"
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Email professionnel</label>
                  <input
                    type="email"
                    placeholder="marie.dupont@chu-lyon.fr"
                    required
                    className="w-full p-3.5 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a] text-slate-800 placeholder-slate-300"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Statut</label>
                  <select
                    className="w-full p-3.5 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a] text-slate-700"
                    onChange={(e) => setFormData({ ...formData, statut: e.target.value, autreStatut: '' })}
                  >
                    <option value="Salarié secteur public">Salarié secteur public</option>
                    <option value="Salarié secteur privé">Salarié secteur privé</option>
                    <option value="Alternant">Alternant</option>
                    <option value="Demandeur d'emploi">Demandeur d'emploi</option>
                    <option value="Autre">Autre : préciser</option>
                  </select>
                </div>

                <AnimatePresence>
                  {formData.statut === 'Autre' && (
                    <motion.div
                      key="autre-statut"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className=""
                    >
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Précisez votre statut</label>
                      <textarea

                        placeholder="Ex : Étudiant en médecine, Chercheur..."
                        className="w-full p-3.5 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a] text-slate-800 placeholder-slate-300"
                        value={formData.autreStatut}
                        onChange={(e) => setFormData({ ...formData, autreStatut: e.target.value })}
                      >Ex : Étudiant en médecine, Chercheur...</textarea>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Votre besoin ou projet</label>
                  <textarea
                    placeholder="Décrivez votre contexte ou projet terrain..."
                    className="w-full p-3.5 bg-slate-50 rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#00818a] text-slate-800 placeholder-slate-300 resize-none"
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-widest shadow-md text-sm ${loading
                    ? 'bg-slate-200 cursor-not-allowed text-slate-400'
                    : 'bg-[#00818a] text-white hover:bg-[#005f66] active:scale-95'
                    }`}
                >
                  {loading ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-slate-100 text-center space-y-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Certifié Qualiopi / DPC</p>
              <p className="text-sm text-slate-500">
                Questions ? <a href="mailto:codeclic@univ-lyon1.fr" className="text-[#00818a] hover:underline font-medium">codeclic@univ-lyon1.fr</a>
              </p>
            </div>
          </motion.div>
        </div>

      </main >

      {/* FOOTER */}
      < footer className="bg-gradient-to-br from-[#12b5be] to-[#2c3e50] pt-16 pb-8 px-6" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <img src={logoCodeClic} alt="Code-Clic" className="h-16 object-contain mx-auto mb-4 opacity-90" />
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Formation professionnelle à la conception d'outils numériques en santé
            </p>
          </div>

          <div className="mb-12">
            <h4 className="text-white/50 text-xs uppercase tracking-[0.2em] text-center mb-8">Partenaires de la formation</h4>
            <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16 opacity-70 hover:opacity-100 transition-opacity">
              <img src={logoLyon1} alt="Lyon 1" className="h-14 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              <img src={logoHCL} alt="HCL" className="h-14 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              <img src={logoMD101} alt="MD101" className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              <img src={logoGCSH} alt="Lyon 1" className="h-14 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              <img src={logoGCSARA} alt="HCL" className="h-14 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              <img src={logoESL} alt="MD101" className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-500" />

            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold text-center mb-4">Ce projet a été soutenu par</p>
            <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-white/60 uppercase tracking-wider">
              <span>Préfète de la région Auvergne-Rhône-Alpes</span>
              <span>France 2030</span>
              <span>La Région Auvergne-Rhône-Alpes</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onAdminClick}
              className="text-white/10 hover:text-white/30 text-xs transition-colors select-none"
              title="Administration"
            >
              ·
            </button>
          </div>
        </div>
      </footer >
    </div >
  );
}

// --- App Root ---
function App() {
  const [page, setPage] = useState(() => window.location.hash === '#admin' ? 'admin' : 'home');

  useEffect(() => {
    const handler = () => setPage(window.location.hash === '#admin' ? 'admin' : 'home');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const goAdmin = () => {
    window.location.hash = '#admin';
    setPage('admin');
  };

  const goHome = () => {
    window.location.hash = '';
    setPage('home');
  };

  return (
    <AnimatePresence mode="wait">
      {page === 'admin'
        ? <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AdminPage onBack={goHome} /></motion.div>
        : <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><HomePage onAdminClick={goAdmin} /></motion.div>
      }
    </AnimatePresence>
  );
}

export default App;
