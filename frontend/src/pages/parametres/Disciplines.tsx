import { Scale } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Disciplines = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/disciplines',
        title: 'Disciplines',
        subtitle: 'Barème disciplinaire de l\'établissement',
        icon: <Scale />,
        primaryKey: 'ID',
        columns: [
          { key: 'libelle', label: 'Discipline', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'points', label: 'Points', render: (val) => <span style={{ color: val > 0 ? '#059669' : '#e11d48', fontWeight: 600 }}>{val ?? 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé (ex: Absences, Conduite)', type: 'text', required: true },
          { name: 'points', label: 'Points attribués', type: 'number', required: true }
        ]
      }}
    />
  );
};
