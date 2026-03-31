import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOKEN_KEY = 'codeclic_admin_token';

const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost/codeclic/codeclic/version-react/api/admin_api.php'
  : './api/admin_api.php';

const EXPORT_URL = window.location.hostname === 'localhost'
  ? 'http://localhost/codeclic/codeclic/version-react/api/export.php'
  : './api/export.php';

// --- Stat card ---
function StatCard({ icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
    >
      <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center text-xl mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-800">{value ?? '—'}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </motion.div>
  );
}

// --- Login ---
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });
      const data = await res.json();
      if (data.token) {
        sessionStorage.setItem(TOKEN_KEY, data.token);
        onLogin(data.token);
      } else {
        setError('Mot de passe incorrect.');
      }
    } catch {
      setError('Impossible de contacter le serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2a3a] to-[#12b5be]/20 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#00818a]/10 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-slate-800">Administration</h1>
          <p className="text-slate-400 text-sm mt-1">Code-Clic — Accès sécurisé</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a] text-slate-800 text-center tracking-widest"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${loading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#00818a] text-white hover:bg-[#005f66] active:scale-95'
              }`}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// --- Main Admin Dashboard ---
function Dashboard({ token, onLogout, onBack }) {
  const [inscriptions, setInscriptions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('date_inscription');
  const [sortDir, setSortDir] = useState('desc');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [listRes, statsRes] = await Promise.all([
        fetch(`${API_URL}?action=list`, { headers }),
        fetch(`${API_URL}?action=stats`, { headers }),
      ]);
      if (listRes.status === 401) { onLogout(); return; }
      const listData = await listRes.json();
      const statsData = await statsRes.json();
      setInscriptions(listData.inscriptions || []);
      setStats(statsData);
    } catch {
      setError('Erreur de chargement des données.');
    } finally {
      setLoading(false);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await fetch(`${API_URL}?action=delete&id=${id}`, { method: 'DELETE', headers });
      setInscriptions(prev => prev.filter(i => i.id !== id));
      if (stats) setStats(prev => ({ ...prev, total: (prev.total || 1) - 1 }));
      setDeleteConfirm(null);
      if (selectedRow?.id === id) setSelectedRow(null);
    } catch {
      setError('Erreur lors de la suppression.');
    } finally {
      setDeleting(false);
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const statutLabel = {
    salarie: 'Salarié / Alternant',
    demandeur: "Demandeur d'emploi",
    autre: 'Secteur Public/Privé',
  };

  const statutColor = {
    salarie: 'bg-blue-50 text-blue-700',
    demandeur: 'bg-orange-50 text-orange-700',
    autre: 'bg-purple-50 text-purple-700',
  };

  const cols = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'email', label: 'Email' },
    { key: 'statut', label: 'Statut' },
    { key: 'date_inscription', label: 'Date' },
  ];

  const filtered = inscriptions
    .filter(i => {
      if (!filter) return true;
      const q = filter.toLowerCase();
      return [i.nom, i.prenom, i.email, i.statut, i.message].join(' ').toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const va = (a[sortField] || '').toString();
      const vb = (b[sortField] || '').toString();
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#0a2a3a] to-[#12b5be] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-xl">🛡️</div>
          <div>
            <p className="font-bold text-base leading-none">Administration</p>
            <p className="text-white/50 text-xs mt-0.5">Code-Clic</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={EXPORT_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
          >
            <span>📥</span>
            <span className="hidden sm:inline">Export CSV</span>
          </a>
          <button
            onClick={fetchData}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
            title="Actualiser"
          >
            🔄
          </button>
          <button
            onClick={onBack}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
          >
            <span className="hidden sm:inline">← </span>Site
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl text-sm font-medium transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon="👥" label="Total inscriptions" value={stats.total} color="bg-[#00818a] text-white" delay={0} />
            <StatCard icon="📅" label="Cette semaine" value={stats.last_week} color="bg-green-500 text-white" delay={0.05} />
            <StatCard icon="💼" label="Salariés / Alternants" value={stats.by_statut?.salarie ?? 0} color="bg-blue-500 text-white" delay={0.1} />
            <StatCard icon="🏛️" label="Public / Privé" value={stats.by_statut?.autre ?? 0} color="bg-purple-500 text-white" delay={0.15} />
          </div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm flex items-center gap-3"
            >
              <span className="text-xl">⚠️</span> {error}
              <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Table header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-bold text-slate-800">
              Inscriptions
              <span className="ml-2 text-sm font-normal text-slate-400">({filtered.length})</span>
            </h2>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Rechercher..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00818a] text-sm w-56"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-slate-400">
              <div className="text-center">
                <div className="text-4xl mb-3 animate-pulse">⏳</div>
                <p className="text-sm">Chargement...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-24 text-slate-400">
              <div className="text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-sm">{filter ? 'Aucun résultat pour cette recherche.' : 'Aucune inscription pour le moment.'}</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-400 text-xs uppercase tracking-wider">
                    {cols.map(col => (
                      <th
                        key={col.key}
                        onClick={() => toggleSort(col.key)}
                        className="px-5 py-3.5 text-left cursor-pointer hover:text-[#00818a] select-none whitespace-nowrap transition-colors"
                      >
                        {col.label}
                        {sortField === col.key && (
                          <span className="ml-1 text-[#00818a]">{sortDir === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </th>
                    ))}
                    <th className="px-5 py-3.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((row) => (
                    <React.Fragment key={row.id}>
                      <tr
                        onClick={() => setSelectedRow(selectedRow?.id === row.id ? null : row)}
                        className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                      >
                        <td className="px-5 py-3.5 font-semibold text-slate-800">{row.nom}</td>
                        <td className="px-5 py-3.5 text-slate-600">{row.prenom}</td>
                        <td className="px-5 py-3.5">
                          <a
                            href={`mailto:${row.email}`}
                            onClick={e => e.stopPropagation()}
                            className="text-[#00818a] hover:underline"
                          >
                            {row.email}
                          </a>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statutColor[row.statut] || 'bg-slate-100 text-slate-600'}`}>
                            {statutLabel[row.statut] || row.statut}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                          {formatDate(row.date_inscription)}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          {deleteConfirm === row.id ? (
                            <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                              <button
                                onClick={() => handleDelete(row.id)}
                                disabled={deleting}
                                className="text-xs px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
                              >
                                {deleting ? '...' : 'Confirmer'}
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                              >
                                Annuler
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => { e.stopPropagation(); setDeleteConfirm(row.id); }}
                              className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all p-1 rounded-lg hover:bg-red-50"
                              title="Supprimer"
                            >
                              🗑️
                            </button>
                          )}
                        </td>
                      </tr>

                      {/* Expanded row detail */}
                      <AnimatePresence>
                        {selectedRow?.id === row.id && (
                          <tr>
                            <td colSpan={6} className="p-0">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 py-4 bg-[#00818a]/5 border-l-4 border-[#00818a]">
                                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message / Projet terrain</p>
                                  <p className="text-slate-700 text-sm leading-relaxed">
                                    {row.message || <span className="text-slate-400 italic">Aucun message renseigné.</span>}
                                  </p>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Cliquez sur une ligne pour voir le message complet</span>
              <span>{filtered.length} inscription{filtered.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// --- AdminPage root ---
function AdminPage({ onBack }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');

  const handleLogin = (t) => setToken(t);

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
  };

  if (!token) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} onBack={onBack} />;
}

export default AdminPage;
