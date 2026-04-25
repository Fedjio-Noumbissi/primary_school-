import { Clock } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Sessions = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/sessions',
        title: 'Séquences / Sessions',
        subtitle: 'Sessions d\'évaluations (Seq 1, Seq 2...)',
        icon: <Clock />,
        primaryKey: 'idSession',
        columns: [
          { key: 'libelle', label: 'Libellé' },
          { key: 'description', label: 'Description' },
          { key: 'idTrimestre', label: 'ID Trimestre' }
        ],
        fields: [
          { name: 'idTrimestre', label: 'Identifiant du Trimestre', type: 'number', required: true },
          { name: 'libelle', label: 'Nom de la session (ex: Première Séquence)', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'idPers', label: 'Responsable (ID Personne)', type: 'number' }
        ]
      }}
    />
  );
};
