import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
    const apiUrl = 'http://localhost/codeclic/codeclic/version-react/api/api.php';

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
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      alert("Impossible de joindre l'API. Vérifiez que XAMPP est lancé.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00818a] selection:text-white">
      {/* HEADER : Lyon 1 / HCL / MD101 */}
      <header className="bg-[#00818a] text-white py-16 px-6 text-center shadow-lg">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl font-black mb-4 uppercase tracking-wider">CODE-CLIC</motion.h1>
        <p className="text-xl font-light opacity-90">Conception d'outils numériques en santé</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12">
        {/* SECTION INFOS : Contenu stratégique du PDF */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-[#00818a] mb-6 tracking-tight">Pourquoi Code-Clic ?</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 text-slate-600">
              <p>• Renforcer la formation au numérique des professionnels de santé (feuille de route 2023-2027).</p>
              <p>• Concevoir des outils numériques en réponse aux besoins du terrain.</p>
              <p>• Mobiliser l'écosystème : UCBL1, HCL, ARS-ARA, GCS Sara.</p>
            </div>
          </section>

          <section className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
            <h2 className="text-2xl font-bold mb-8">Les Modules (2 demi-journées)</h2>
            <div className="grid gap-4">
              {modules.map((m, i) => (
                <div key={i} className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-2xl mr-4">{icons[i]}</span>
                  <span className="text-lg opacity-90">{i + 1}. {m}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SECTION FORMULAIRE : Publics concernés */}
        <div className="lg:col-span-5">
          <div className="sticky top-8 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Inscription</h3>
            {sent ? (
              <div className="text-center py-10 bg-green-50 rounded-2xl text-green-700 font-bold uppercase tracking-widest">✅ Demande transmise !</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Prénom" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]" onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} />
                <input type="text" placeholder="Nom" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]" onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
                <input type="email" placeholder="Email professionnel" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <select className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]" onChange={(e) => setFormData({ ...formData, statut: e.target.value })}>
                  <option value="salarie">Salarié / Alternant / Jeune diplômé</option>
                  <option value="demandeur">Demandeur d'emploi</option>
                  <option value="secteur">Secteur Public ou Privé</option>
                </select>
                <textarea placeholder="Votre besoin ou projet terrain..." className="w-full p-4 bg-slate-50 rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#00818a]" onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                <button type="submit" className="w-full bg-[#00818a] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest">S'inscrire</button>
              </form>
            )}
            <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Qualiopi / DPC</p>
          </div>
        </div>
      </main>

      {/* FOOTER INSTITUTIONNEL : Partenaires Lyon 1, HCL, ARS, etc. */}
      <footer className="bg-white border-t border-slate-200 py-16 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Partenaires de la formation</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-xs font-bold">LYON 1</span>
            <span className="text-xs font-bold">HCL</span>
            <span className="text-xs font-bold">MD101</span>
            <span className="text-xs font-bold">ARS-ARA</span>
            <span className="text-xs font-bold">GCS SARA</span>
            <span className="text-xs font-bold">GCS HOURAA</span>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8 text-[9px] font-black text-slate-400">
              <span>PRÉFÈTE DE RÉGION</span>
              <span>FRANCE 2030</span>
              <span>LA RÉGION AUVERGNE-RHÔNE-ALPES</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Contact : codeclic@univ-lyon1.fr</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;