import { Flag } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Rapports = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/rapports',
        title: 'Rapports de Conduite',
        subtitle: 'Suivi disciplinaire et sanctions',
        icon: <Flag />,
        primaryKey: 'idRap',
        columns: [
          { key: 'matricule', label: 'Matricule Elève' },
          { key: 'libelle', label: 'Motif' },
          { key: 'points', label: 'Points/Gravité' },
          { key: 'event_date', label: 'Date', render: (val) => val ? new Date(val).toLocaleDateString() : '-' }
        ],
        fields: [
          { name: 'matricule', label: 'Matricule d\'élève', type: 'number', required: true },
          { name: 'idAca', label: 'Année académique (ID)', type: 'number', required: true },
          { name: 'libelle', label: 'Intitulé / Motif', type: 'text', required: true },
          { name: 'points', label: 'Points attribués / retirés', type: 'number' },
          { name: 'commentaire', label: 'Commentaire détaillé', type: 'textarea' },
          { name: 'event_date', label: 'Date de l\'incident', type: 'date' },
          { name: 'idPers', label: 'Rapporteur (ID Personne)', type: 'number' }
        ]
      }}
    />
  );
};
