import { Users, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const ElevesList = () => {
  const navigate = useNavigate();

  return (
    <GenericCRUDPage
      config={{
        endpoint: '/eleves',
        title: 'Gestion des Élèves',
        subtitle: 'Liste et suivi de tous les élèves inscrits dans l\'établissement',
        icon: <Users />,
        primaryKey: 'matricule',
        breadcrumb: [{ label: 'Scolarité' }, { label: 'Élèves' }],
        searchPlaceholder: "Rechercher un élève (nom, matricule)...",
        onRowClick: (row) => navigate(`/scolarite/eleves/${row.matricule}`),
        columns: [
          { key: 'nom', label: 'Nom Complet', render: (_, row) => {
             const fullName = `${row.nom || 'Élève'} ${row.prenom || ''}`.trim();
             return (
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <img src={`https://ui-avatars.com/api/?name=${fullName.replace(/ /g, '+')}&background=random&color=fff`} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                 <span style={{ fontWeight: 600, color: '#111827' }}>{fullName}</span>
               </div>
             );
          }},
          { key: 'matricule', label: 'Matricule', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val || 0).padStart(4, '0')}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
             <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>
               {val ? 'Actif' : 'Inactif'}
             </span>
          )},
          { key: 'detaille', label: 'Détails', render: (_, row) => (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/scolarite/eleves/${row.matricule}`);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            >
              <Eye size={16} />
              Voir
            </button>
          )}
        ],
        fields: [
          { name: 'nom', label: 'Nom', type: 'text', required: true },
          { name: 'prenom', label: 'Prénom', type: 'text' },
          { name: 'dateNaissance', label: 'Date de naissance', type: 'date' },
          { 
            name: 'idVilleNaissance', 
            label: 'Lieu de naissance (Ville)', 
            type: 'select', 
            optionsEndpoint: '/parametres/villes',
            optionsValueKey: 'idVille',
            optionsLabelKey: 'libelle',
            required: true 
          },
          { 
            name: 'sexe', 
            label: 'Sexe', 
            type: 'select', 
            options: [
              { value: 1, label: 'Masculin' },
              { value: 2, label: 'Féminin' }
            ]
          },
          { name: 'langue', label: 'Langue (FR/EN)', type: 'text' },
          { name: 'photoURL', label: 'URL de la photo', type: 'text' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' },
          { name: 'actif', label: 'Élève actuellement actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
