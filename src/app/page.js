'use client';

import React, { useState } from 'react';
import { 
  BarChart, Wallet, Users, FileText, Plus, Search, 
  Printer, CheckCircle, TrendingUp, DollarSign, AlertCircle 
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('caisse');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Données de démonstration
  const [eleves, setEleves] = useState([
    { id: 1, nom: 'SABO', prenom: 'Aurel', classe: '6ème A', fraisTotal: 150000, paye: 100000 },
    { id: 2, nom: 'DOSCOU', prenom: 'Marie', classe: '3ème B', fraisTotal: 180000, paye: 180000 },
    { id: 3, nom: 'KPADONOU', prenom: 'Jean', classe: 'Tle C', fraisTotal: 220000, paye: 110000 },
  ]);

  const [historique, setHistorique] = useState([
    { id: 'REC-001', eleve: 'SABO Aurel', montant: 50000, date: '2026-08-27', motif: 'Tranche 2' },
    { id: 'REC-002', eleve: 'DOSCOU Marie', montant: 80000, date: '2026-08-27', motif: 'Solde' },
  ]);

  // Formulaire d'encaissement
  const [selectedEleveId, setSelectedEleveId] = useState('');
  const [montantSaisi, setMontantSaisi] = useState('');
  const [motifSaisi, setMotifSaisi] = useState('Scolarité');

  const handleEncaissement = (e) => {
    e.preventDefault();
    if (!selectedEleveId || !montantSaisi) return;

    const eleveId = parseInt(selectedEleveId);
    const montant = parseFloat(montantSaisi);

    // Mise à jour de l'élève
    setEleves(eleves.map(el => {
      if (el.id === eleveId) {
        return { ...el, paye: el.paye + montant };
      }
      return el;
    }));

    const eleveObj = eleves.find(el => el.id === eleveId);

    // Ajout à l'historique
    const newRecette = {
      id: `REC-00${historique.length + 1}`,
      eleve: `${eleveObj.nom} ${eleveObj.prenom}`,
      montant: montant,
      date: new Date().toISOString().split('T')[0],
      motif: motifSaisi
    };

    setHistorique([newRecette, ...historique]);
    setMontantSaisi('');
    alert('Paiement enregistré avec succès !');
  };

  const totalRecouvre = eleves.reduce((sum, el) => sum + el.paye, 0);
  const totalAttendu = eleves.reduce((sum, el) => sum + el.fraisTotal, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar Top */}
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Wallet className="h-6 w-6" /> ComptaÉcole v3
          </h1>
          <span className="bg-blue-800 text-xs px-3 py-1 rounded-full border border-blue-700">
            Année Académique 2026-2027
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Navigation Onglets */}
        <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-lg p-2 shadow-sm gap-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${activeTab === 'dashboard' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <BarChart className="h-4 w-4" /> Tableau de Bord
          </button>
          <button 
            onClick={() => setActiveTab('caisse')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${activeTab === 'caisse' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Wallet className="h-4 w-4" /> Caisse & Encaissement
          </button>
          <button 
            onClick={() => setActiveTab('eleves')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${activeTab === 'eleves' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Users className="h-4 w-4" /> Élèves & Suivi
          </button>
          <button 
            onClick={() => setActiveTab('historique')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${activeTab === 'historique' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FileText className="h-4 w-4" /> Historique / Reçus
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Recouvré</p>
                  <p className="text-2xl font-bold text-green-600">{totalRecouvre.toLocaleString()} FCFA</p>
                </div>
                <div className="p-3 bg-green-50 text-green-600 rounded-lg"><TrendingUp /></div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Reste à Recouvrer</p>
                  <p className="text-2xl font-bold text-orange-600">{(totalAttendu - totalRecouvre).toLocaleString()} FCFA</p>
                </div>
                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><AlertCircle /></div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Élèves</p>
                  <p className="text-2xl font-bold text-blue-900">{eleves.length}</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-900 rounded-lg"><Users /></div>
              </div>
            </div>
          </div>
        )}

        {/* Caisse Tab */}
        {activeTab === 'caisse' && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="text-green-600" /> Nouvel Encaissement
            </h2>
            <form onSubmit={handleEncaissement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner l'Élève</label>
                <select 
                  value={selectedEleveId} 
                  onChange={(e) => setSelectedEleveId(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">-- Choisir un élève --</option>
                  {eleves.map(el => (
                    <option key={el.id} value={el.id}>
                      {el.nom} {el.prenom} ({el.classe}) - Reste: {(el.fraisTotal - el.paye).toLocaleString()} FCFA
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Montant à Encaisser (FCFA)</label>
                <input 
                  type="number" 
                  value={montantSaisi} 
                  onChange={(e) => setMontantSaisi(e.target.value)}
                  placeholder="Ex: 50000"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motif du Paiement</label>
                <input 
                  type="text" 
                  value={motifSaisi} 
                  onChange={(e) => setMotifSaisi(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 rounded-lg shadow transition flex justify-center items-center gap-2"
              >
                <Plus className="h-5 w-5" /> Valider le Paiement
              </button>
            </form>
          </div>
        )}

        {/* Élèves Tab */}
        {activeTab === 'eleves' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Liste et Suivi des Paiements</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                    <th className="p-3">Nom & Prénom</th>
                    <th className="p-3">Classe</th>
                    <th className="p-3">Total Scolarité</th>
                    <th className="p-3">Montant Payé</th>
                    <th className="p-3">Reste</th>
                    <th className="p-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm text-gray-700">
                  {eleves.map(el => {
                    const reste = el.fraisTotal - el.paye;
                    return (
                      <tr key={el.id} className="hover:bg-gray-50">
                        <td className="p-3 font-medium">{el.nom} {el.prenom}</td>
                        <td className="p-3">{el.classe}</td>
                        <td className="p-3">{el.fraisTotal.toLocaleString()} FCFA</td>
                        <td className="p-3 text-green-600 font-semibold">{el.paye.toLocaleString()} FCFA</td>
                        <td className="p-3 text-red-500 font-semibold">{reste.toLocaleString()} FCFA</td>
                        <td className="p-3">
                          {reste === 0 ? (
                            <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">Solder</span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full font-medium">En cours</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Historique Tab */}
        {activeTab === 'historique' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Historique des Reçus</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                    <th className="p-3">N° Reçu</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Élève</th>
                    <th className="p-3">Motif</th>
                    <th className="p-3">Montant</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm text-gray-700">
                  {historique.map(rec => (
                    <tr key={rec.id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono font-medium text-blue-900">{rec.id}</td>
                      <td className="p-3">{rec.date}</td>
                      <td className="p-3">{rec.eleve}</td>
                      <td className="p-3">{rec.motif}</td>
                      <td className="p-3 font-bold text-green-600">{rec.montant.toLocaleString()} FCFA</td>
                      <td className="p-3">
                        <button 
                          onClick={() => window.print()}
                          className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md transition"
                        >
                          <Printer className="h-3.5 w-3.5" /> Imprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('caisse');

  const [eleves, setEleves] = useState([
    { id: 1, matricule: 'MAT-2026-001', nom: 'KOUASSI Jean', classe: '6ème A', frais_totaux: 1500, frais_dus: 1000, nom_tuteur: 'KOUASSI Michel', telephone_tuteur: '+229 97 00 00 01' },
    { id: 2, matricule: 'MAT-2026-002', nom: 'ADAMOU Aminata', classe: '6ème A', frais_totaux: 1500, frais_dus: 1500, nom_tuteur: 'ADAMOU Ibrahim', telephone_tuteur: '+229 97 00 00 02' },
    { id: 3, matricule: 'MAT-2026-003', nom: 'SABO Elona', classe: '5ème B', frais_totaux: 1500, frais_dus: 750, nom_tuteur: 'SABO Denis', telephone_tuteur: '+229 97 00 00 03' }
  ]);

  const [historique, setHistorique] = useState([
    { id: 'REC-104921', date: '25/08/2026 10:30', matricule: 'MAT-2026-001', eleve: 'KOUASSI Jean', classe: '6ème A', montant: 500, mode: 'Espèces' },
    { id: 'REC-104922', date: '26/08/2026 14:15', matricule: 'MAT-2026-003', eleve: 'SABO Elona', classe: '5ème B', montant: 750, mode: 'Mobile Money' }
  ]);

  const [selectedEleveId, setSelectedEleveId] = useState(1);
  const [montantInput, setMontantInput] = useState('');
  const [modeInput, setModeInput] = useState('Espèces');
  const [receipt, setReceipt] = useState(null);

  const [newNom, setNewNom] = useState('');
  const [newMatricule, setNewMatricule] = useState('');
  const [newClasse, setNewClasse] = useState('6ème A');
  const [newTuteur, setNewTuteur] = useState('');
  const [newTel, setNewTel] = useState('');
  const [newFrais, setNewFrais] = useState(1500);

  const eleveActuel = eleves.find(e => e.id === Number(selectedEleveId)) || eleves[0];
  const montantVerser = Number(montantInput) || 0;
  const soldeApres = Math.max(0, eleveActuel ? eleveActuel.frais_dus - montantVerser : 0);

  const totalRecouvre = historique.reduce((acc, cur) => acc + cur.montant, 0);
  const totalImpayes = eleves.reduce((acc, cur) => acc + cur.frais_dus, 0);
  const totalAttendu = eleves.reduce((acc, cur) => acc + cur.frais_totaux, 0);

  const handleValiderVersement = () => {
    if (!montantInput || montantVerser <= 0) return;

    const newRec = {
      id: 'REC-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString('fr-FR'),
      matricule: eleveActuel.matricule,
      eleve: eleveActuel.nom,
      classe: eleveActuel.classe,
      montant: montantVerser,
      mode: modeInput,
      ancienSolde: eleveActuel.frais_dus,
      nouveauSolde: soldeApres
    };

    setReceipt(newRec);
    setHistorique([newRec, ...historique]);
    setEleves(eleves.map(e => e.id === eleveActuel.id ? { ...e, frais_dus: soldeApres } : e));
    setMontantInput('');
  };

  const handleAddEleve = (e) => {
    e.preventDefault();
    if (!newNom || !newMatricule) return;
    const item = {
      id: Date.now(),
      matricule: newMatricule,
      nom: newNom,
      classe: newClasse,
      frais_totaux: Number(newFrais),
      frais_dus: Number(newFrais),
      nom_tuteur: newTuteur,
      telephone_tuteur: newTel
    };
    setEleves([...eleves, item]);
    setNewNom('');
    setNewMatricule('');
    setNewTuteur('');
    setNewTel('');
    alert('Élève ajouté avec succès !');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <header style={{ background: '#1f4e79', color: '#fff', padding: '20px', borderRadius: '10px 10px 0 0', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h1 style={{ margin: 0, fontSize: '24px', textAlign: 'center' }}>🎓 Système de Caisse & Gestion Scolaire</h1>
          <p style={{ margin: '5px 0 0 0', textAlign: 'center', opacity: 0.9, fontSize: '14px' }}>Gestion des versements, impayés & suivi de trésorerie</p>
        </header>

        <nav style={{ display: 'flex', background: '#ffffff', borderBottom: '2px solid #1f4e79', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('caisse')} 
            style={{ flex: 1, padding: '14px', border: 'none', background: activeTab === 'caisse' ? '#1f4e79' : 'transparent', color: activeTab === 'caisse' ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer', minWidth: '120px' }}>
            💳 Encaisser (Caisse)
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            style={{ flex: 1, padding: '14px', border: 'none', background: activeTab === 'dashboard' ? '#1f4e79' : 'transparent', color: activeTab === 'dashboard' ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer', minWidth: '120px' }}>
            📊 Trésorerie & Bilan
          </button>
          <button 
            onClick={() => setActiveTab('eleves')} 
            style={{ flex: 1, padding: '14px', border: 'none', background: activeTab === 'eleves' ? '#1f4e79' : 'transparent', color: activeTab === 'eleves' ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer', minWidth: '120px' }}>
            👨‍🎓 Liste des Élèves ({eleves.length})
          </button>
          <button 
            onClick={() => setActiveTab('historique')} 
            style={{ flex: 1, padding: '14px', border: 'none', background: activeTab === 'historique' ? '#1f4e79' : 'transparent', color: activeTab === 'historique' ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer', minWidth: '120px' }}>
            📜 Historique Versements
          </button>
        </nav>

        {activeTab === 'caisse' && (
          <div style={{ background: '#fff', padding: '25px', borderRadius: '0 0 10px 10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#1f4e79', marginTop: 0 }}>Enregistrer un nouveau versement</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>1. Sélectionner l'Élève :</label>
                <select value={selectedEleveId} onChange={e => { setSelectedEleveId(e.target.value); setReceipt(null); }} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                  {eleves.map(e => (
                    <option key={e.id} value={e.id}>{e.matricule} - {e.nom} ({e.classe})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>2. Mode de Règlement :</label>
                <select value={modeInput} onChange={e => setModeInput(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                  <option value="Espèces">Espèces</option>
                  <option value="Mobile Money (MTN/Moov)">Mobile Money (MTN / Moov)</option>
                  <option value="Chèque Bancaire">Chèque Bancaire</option>
                  <option value="Virement Bancaire">Virement Bancaire</option>
                </select>
              </div>
            </div>

            <div style={{ background: '#eef4f8', padding: '15px', borderRadius: '6px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div><span style={{ color: '#555' }}>Scolarité Totale :</span> <strong>{eleveActuel.frais_totaux} FCFA / €</strong></div>
              <div><span style={{ color: '#555' }}>Reste à Payer Actuel :</span> <strong style={{ color: '#d9534f' }}>{eleveActuel.frais_dus} FCFA / €</strong></div>
              <div><span style={{ color: '#555' }}>Nouveau Solde après versement :</span> <strong style={{ color: '#28a745' }}>{soldeApres} FCFA / €</strong></div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>3. Montant du Versement :</label>
              <input 
                type="number" 
                value={montantInput} 
                onChange={e => setMontantInput(e.target.value)} 
                placeholder="Entrez le montant encaissé ex: 500" 
                style={{ width: '97%', padding: '12px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} 
              />
            </div>

            <button 
              onClick={handleValiderVersement} 
              style={{ background: '#1f4e79', color: '#fff', border: 'none', padding: '14px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
              ✅ Enregistrer & Générer le Reçu Officiel
            </button>

            {receipt && (
              <div style={{ marginTop: '30px', border: '2px dashed #1f4e79', padding: '20px', borderRadius: '8px', background: '#fff' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #ddd', pb: '10px', marginBottom: '15px' }}>
                  <h3 style={{ margin: 0, color: '#1f4e79' }}>REÇU DE PAIEMENT SCOLATION</h3>
                  <small>N° Ticket : {receipt.id} | Date : {receipt.date}</small>
                </div>
                <table style={{ width: '100%', textAlign: 'left', lineHeight: '1.8' }}>
                  <tbody>
                    <tr><td><strong>Élève :</strong> {receipt.eleve}</td><td><strong>Matricule :</strong> {receipt.matricule}</td></tr>
                    <tr><td><strong>Classe :</strong> {receipt.classe}</td><td><strong>Mode :</strong> {receipt.mode}</td></tr>
                    <tr><td><strong>Montant Payé :</strong> <span style={{ color: '#28a745', fontSize: '18px', fontWeight: 'bold' }}>{receipt.montant} FCFA / €</span></td><td><strong>Reste à Payer :</strong> {receipt.nouveauSolde} FCFA / €</td></tr>
                  </tbody>
                </table>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small style={{ fontStyle: 'italic' }}>Signature de la Caisse / Cachet</small>
                  <button onClick={() => window.print()} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
                    🖨️ Imprimer le reçus (PDF)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div style={{ background: '#fff', padding: '25px', borderRadius: '0 0 10px 10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#1f4e79', marginTop: 0 }}>Tableau de Bord & Vue d'ensemble de la Caisse</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#d4edda', borderLeft: '5px solid #28a745', padding: '15px', borderRadius: '5px' }}>
                <span style={{ color: '#155724', fontSize: '14px', fontWeight: 'bold' }}>TOTAL EN CAISSE (Encaissements)</span>
                <h2 style={{ color: '#155724', margin: '5px 0 0 0' }}>{totalRecouvre} FCFA / €</h2>
              </div>

              <div style={{ background: '#f8d7da', borderLeft: '5px solid #dc3545', padding: '15px', borderRadius: '5px' }}>
                <span style={{ color: '#721c24', fontSize: '14px', fontWeight: 'bold' }}>RESTE A RECOUVRER (Impayés)</span>
                <h2 style={{ color: '#721c24', margin: '5px 0 0 0' }}>{totalImpayes} FCFA / €</h2>
              </div>

              <div style={{ background: '#cce5ff', borderLeft: '5px solid #004085', padding: '15px', borderRadius: '5px' }}>
                <span style={{ color: '#004085', fontSize: '14px', fontWeight: 'bold' }}>TOTAL PREVISIONNEL (Frais exigibles)</span>
                <h2 style={{ color: '#004085', margin: '5px 0 0 0' }}>{totalAttendu} FCFA / €</h2>
              </div>
            </div>

            <h3 style={{ color: '#1f4e79' }}>Statistiques de Recouvrement</h3>
            <div style={{ background: '#e9ecef', borderRadius: '10px', overflow: 'hidden', height: '25px', marginBottom: '10px' }}>
              <div style={{ width: `${Math.round((totalRecouvre / totalAttendu) * 100)}%`, background: '#28a745', height: '100%', color: '#fff', textAlign: 'center', lineHeight: '25px', fontSize: '12px', fontWeight: 'bold' }}>
                {Math.round((totalRecouvre / totalAttendu) * 100)}% recouvrés
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eleves' && (
          <div style={{ background: '#fff', padding: '25px', borderRadius: '0 0 10px 10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#1f4e79', marginTop: 0 }}>Répertoire Général des Élèves</h2>
            
            <details style={{ marginBottom: '20px', background: '#f8fafc', padding: '15px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <summary style={{ fontWeight: 'bold', cursor: 'pointer', color: '#1f4e79' }}>➕ Inscrire un nouvel élève</summary>
              <form onSubmit={handleAddEleve} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' }}>
                <input placeholder="Matricule (ex: MAT-2026-004)" value={newMatricule} onChange={e => setNewMatricule(e.target.value)} required style={{ padding: '8px' }} />
                <input placeholder="Nom et Prénom" value={newNom} onChange={e => setNewNom(e.target.value)} required style={{ padding: '8px' }} />
                <input placeholder="Classe" value={newClasse} onChange={e => setNewClasse(e.target.value)} required style={{ padding: '8px' }} />
                <input placeholder="Frais de Scolarité Totaux" type="number" value={newFrais} onChange={e => setNewFrais(e.target.value)} required style={{ padding: '8px' }} />
                <input placeholder="Nom du Tuteur / Parent" value={newTuteur} onChange={e => setNewTuteur(e.target.value)} style={{ padding: '8px' }} />
                <input placeholder="Téléphone Tuteur" value={newTel} onChange={e => setNewTel(e.target.value)} style={{ padding: '8px' }} />
                <button type="submit" style={{ gridColumn: 'span 2', background: '#28a745', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Ajouter l'élève</button>
              </form>
            </details>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#1f4e79', color: '#fff' }}>
                    <th style={{ padding: '10px' }}>Matricule</th>
                    <th style={{ padding: '10px' }}>Élève</th>
                    <th style={{ padding: '10px' }}>Classe</th>
                    <th style={{ padding: '10px' }}>Tuteur & Tel</th>
                    <th style={{ padding: '10px' }}>Solde Dû</th>
                    <th style={{ padding: '10px' }}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {eleves.map((e, index) => (
                    <tr key={e.id} style={{ borderBottom: '1px solid #ddd', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}>{e.matricule}</td>
                      <td style={{ padding: '10px' }}>{e.nom}</td>
                      <td style={{ padding: '10px' }}>{e.classe}</td>
                      <td style={{ padding: '10px' }}>{e.nom_tuteur} ({e.telephone_tuteur})</td>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: e.frais_dus > 0 ? '#d9534f' : '#28a745' }}>{e.frais_dus} FCFA / €</td>
                      <td style={{ padding: '10px' }}>
                        {e.frais_dus === 0 ? (
                          <span style={{ background: '#d4edda', color: '#155724', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>Solde Réglé</span>
                        ) : (
                          <span style={{ background: '#f8d7da', color: '#721c24', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>Impayé</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'historique' && (
          <div style={{ background: '#fff', padding: '25px', borderRadius: '0 0 10px 10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#1f4e79', marginTop: 0 }}>Journal Général des Encaissements</h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#1f4e79', color: '#fff' }}>
                    <th style={{ padding: '10px' }}>N° Reçu</th>
                    <th style={{ padding: '10px' }}>Date & Heure</th>
                    <th style={{ padding: '10px' }}>Matricule</th>
                    <th style={{ padding: '10px' }}>Élève</th>
                    <th style={{ padding: '10px' }}>Montant Versé</th>
                    <th style={{ padding: '10px' }}>Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {historique.map((h, index) => (
                    <tr key={h.id} style={{ borderBottom: '1px solid #ddd', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: '#1f4e79' }}>{h.id}</td>
                      <td style={{ padding: '10px' }}>{h.date}</td>
                      <td style={{ padding: '10px' }}>{h.matricule}</td>
                      <td style={{ padding: '10px' }}>{h.eleve} ({h.classe})</td>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: '#28a745' }}>+{h.montant} FCFA / €</td>
                      <td style={{ padding: '10px' }}>{h.mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
