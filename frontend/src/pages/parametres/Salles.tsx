import { DoorOpen } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Salles = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/salles',
        title: 'Salles de Classe',
        subtitle: 'Gestion des salles et infrastructures',
        icon: <DoorOpen />,
        primaryKey: 'idSalle',
        columns: [
          { key: 'libelle', label: 'Salle', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'position', label: 'Position/Localisation', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'surface', label: 'Surface', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'idClasse', label: 'ID Classe', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Active' : 'Inactive'}</span>
          )}
        ],
        fields: [
          { name: 'libelle', label: 'Nom de la salle (ex: Salle A1)', type: 'text', required: true },
          { name: 'position', label: 'Position / Localisation', type: 'text' },
          { name: 'surface', label: 'Surface (ex: 60m²)', type: 'text' },
          { name: 'idClasse', label: 'ID Classe associée', type: 'number' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' },
          { name: 'actif', label: 'Salle active', type: 'checkbox' }
        ]
      }}
    />
  );
};
