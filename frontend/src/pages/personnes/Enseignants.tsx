import { Briefcase } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Enseignants = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/enseignants',
        title: 'Enseignants',
        subtitle: 'Corps professoral et vacataires',
        icon: <Briefcase />,
        primaryKey: 'idEnseignant',
        columns: [
          { key: 'idPers', label: 'ID Personne' },
          { key: 'idCours', label: 'Matière d\'ancrage (ID Cours)' },
          { key: 'Actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>
              {val ? 'En Service' : 'Ancien'}
            </span>
          )}
        ],
        fields: [
          { name: 'idPers', label: 'Identifiant Profil Personne', type: 'number', required: true },
          { name: 'idCours', label: 'ID Cours Principal (Matière enseignée)', type: 'number' },
          { name: 'Actif', label: 'Est en activité cette année', type: 'checkbox' }
        ]
      }}
    />
  );
};
