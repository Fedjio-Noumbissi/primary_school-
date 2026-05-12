import { Users } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const ElevesList = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/eleves',
        title: 'Gestion des Élèves',
        subtitle: 'Liste et suivi de tous les élèves inscrits dans l\'établissement',
        icon: <Users />,
        primaryKey: 'matricule',
        searchPlaceholder: "Rechercher un élève (nom, matricule)...",
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
          { key: 'sexe', label: 'Sexe', render: (val) => <span style={{ color: '#374151', fontWeight: 500 }}>{val == 1 ? 'Masculin' : 'Féminin'}</span> },
          { key: 'dateNaissance', label: 'Date Naissance', render: (val) => <span style={{ color: '#6b7280' }}>{val ? new Date(val).toLocaleDateString('fr-FR') : 'N/A'}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
             <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>
               {val ? 'Actif' : 'Inactif'}
             </span>
          )}
        ],
        fields: [
          { name: 'nom', label: 'Nom', type: 'text', required: true },
          { name: 'prenom', label: 'Prénom', type: 'text' },
          { name: 'dateNaissance', label: 'Date de naissance', type: 'date' },
          { name: 'lieuNaissance', label: 'Lieu de naissance', type: 'text' },
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
          { name: 'idVilleNaissance', label: 'ID Ville de naissance', type: 'number' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' },
          { name: 'actif', label: 'Élève actuellement actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
