'use client';
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
