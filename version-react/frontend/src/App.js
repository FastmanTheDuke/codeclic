import React, { useState } from 'react';
import { motion } from 'framer-motion';

const icons = ["🎤", "🩺", "💡", "🛠️", "🤝"];

function App() {
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', statut: 'salarie', message: ''
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false); // État de chargement

  const modules = [
    "Conférence inaugurale",
    "Caractérisation du besoin médical",
    "Conception de l'outil numérique idéal",
    "Mise en situation",
    "Échanges avec l'écosystème numérique en santé"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Active le chargement

    const apiUrl = 'http://localhost/codeclic/codeclic/version-react/api/api.php';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setSent(true);
      } else {
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      console.error("Erreur détaillée :", error);
      alert("Erreur de connexion au serveur.");
    } finally {
      setLoading(false); // Désactive le chargement, quoi qu'il arrive
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00818a] selection:text-white">
      {/* HEADER : Lyon 1 / HCL / MD101 */}
      <header className="bg-[#00818a] text-white py-20 px-6 text-center shadow-lg">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl font-black mb-4 uppercase tracking-wider">
          CODE-CLIC
        </motion.h1>
        <p className="text-2xl font-light opacity-90">Formation à la conception d'outils numériques en santé</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-[#00818a] mb-6 tracking-tight">Pourquoi Code-Clic ?</h2>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4 text-slate-600">
              <p>• Renforcer l'accompagnement au numérique des professionnels de santé (2023-2027).</p>
              <p>• Concevoir des outils numériques en réponse aux besoins du terrain.</p>
              <p>• Mobiliser l'écosystème régional : UCBL1, HCL, ARS, GCS Sara.</p>
            </div>
          </section>

          <section className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
            <h2 className="text-2xl font-bold mb-8">Les 5 Modules de Formation</h2>
            <div className="grid gap-4">
              {modules.map((m, i) => (
                <div key={i} className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-2xl mr-4">{icons[i]}</span>
                  <span className="text-lg opacity-90">{i + 1}. {m}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-400">Durée : 2 demi-journées | Campus Lyon-Tech-La Doua / HCL</p>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-8 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Candidature</h3>
            {sent ? (
              <div className="text-center py-10 bg-green-50 rounded-2xl text-green-700 font-bold uppercase tracking-widest">
                ✅ Demande transmise !
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Prénom" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]"
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} />
                <input type="text" placeholder="Nom" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]"
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
                <input type="email" placeholder="Email professionnel" required className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <select className="w-full p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a]"
                  onChange={(e) => setFormData({ ...formData, statut: e.target.value })}>
                  <option value="salarie">Salarié / Alternant / Jeune diplômé</option>
                  <option value="demandeur">Demandeur d'emploi</option>
                  <option value="autre">Secteur Public ou Privé</option>
                </select>
                <textarea placeholder="Décrivez votre besoin terrain..." className="w-full p-4 bg-slate-50 rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#00818a]"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-widest ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#00818a] text-white hover:shadow-lg active:scale-95'}`}
                >
                  {loading ? "Envoi en cours..." : "S'inscrire"}
                </button>
              </form>
            )}
            <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Certifié Qualiopi / DPC
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Partenaires institutionnels</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-xs font-black">LYON 1</span>
            <span className="text-xs font-black">HCL</span>
            <span className="text-xs font-black">MD101</span>
            <span className="text-xs font-black">ARS-ARA</span>
            <span className="text-xs font-black">GCS SARA</span>
            <span className="text-xs font-black">GCS HOURAA</span>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-6 text-[9px] font-black text-slate-400">
              <span>PRÉFÈTE DE RÉGION</span>
              <span>FRANCE 2030</span>
              <span>LA RÉGION AUVERGNE-RHÔNE-ALPES</span>
            </div>
            <p className="text-sm text-slate-500 italic">Contact : <a href="mailto:codeclic@univ-lyon1.fr" className="text-[#00818a] font-bold">codeclic@univ-lyon1.fr</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;