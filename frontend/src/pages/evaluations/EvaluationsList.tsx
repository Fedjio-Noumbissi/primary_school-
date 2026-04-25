import { PenTool } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const EvaluationsList = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/evaluations',
        title: 'Notes & Évaluations',
        subtitle: 'Saisie des notes obtenues par les élèves',
        icon: <PenTool />,
        primaryKey: 'idEval',
        columns: [
          { key: 'matricule', label: 'Matricule Elève' },
          { key: 'note', label: 'Note Obtenue' },
          { key: 'appreciation', label: 'Appréciation' }
        ],
        fields: [
          { name: 'matricule', label: 'Matricule d\'élève', type: 'number', required: true },
          { name: 'idEpreuve', label: 'ID Épreuve (optionnel)', type: 'number' },
          { name: 'idCours', label: 'ID Cours', type: 'number', required: true },
          { name: 'idSession', label: 'ID Session', type: 'number', required: true },
          { name: 'note', label: 'Note', type: 'number', required: true },
          { name: 'appreciation', label: 'Appréciation (ex: Très bien)', type: 'text' },
          { name: 'idPers', label: 'Identifiant correcteur (Personne)', type: 'number' }
        ]
      }}
    />
  );
};
