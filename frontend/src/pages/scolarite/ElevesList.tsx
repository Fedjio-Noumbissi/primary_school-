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
          { key: 'matricule', label: 'Matricule', render: (val) => (
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, color: '#4b5563' }}>
                #{val || 'N/A'}
              </span>
          )},
          { key: 'nom', label: 'Nom et Prénom', render: (_, row) => (
             <span style={{ fontWeight: 500 }}>{row.nom} {row.prenom}</span>
          )},
          { key: 'sexe', label: 'Sexe', render: (val) => val == 1 ? 'M' : 'F' },
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
          { name: 'idVilleNaissance', label: 'ID Ville Naissance', type: 'number' },
          { name: 'actif', label: 'Elève actuellement actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
