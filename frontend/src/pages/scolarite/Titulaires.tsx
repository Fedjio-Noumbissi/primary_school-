import { UsersRound } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Titulaires = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/scolarite/titulaires',
        title: 'Professeurs Titulaires',
        subtitle: 'Affectation des enseignants principaux aux salles de classe',
        icon: <UsersRound />,
        primaryKey: 'idTitulaire',
        columns: [
          { key: 'idPers', label: 'ID Personne (Enseignant)' },
          { key: 'idSalle', label: 'ID Salle (Classe)' },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>
              {val ? 'Actif' : 'Ancien'}
            </span>
          )}
        ],
        fields: [
          { name: 'idPers', label: 'ID de l\'Enseignant', type: 'number', required: true },
          { name: 'idSalle', label: 'ID de la Salle', type: 'number', required: true },
          { name: 'actif', label: 'Est actuellement titulaire', type: 'checkbox' }
        ]
      }}
    />
  );
};
