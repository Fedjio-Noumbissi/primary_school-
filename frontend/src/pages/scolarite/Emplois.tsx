import { CalendarRange } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Emplois = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/scolarite/emplois',
        title: 'Emploi du Temps',
        subtitle: 'Plannings des cours des classes',
        icon: <CalendarRange />,
        primaryKey: 'idTemps',
        columns: [
          { key: 'jour', label: 'Jour', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'heure', label: 'Heure', render: (val) => <span style={{ color: '#059669', fontWeight: 500 }}>{val || 'N/A'}</span> },
          { key: 'idClasse', label: 'ID Classe', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'idCours', label: 'ID Cours', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'idClasse', label: 'ID Classe', type: 'number', required: true },
          { name: 'idCours', label: 'ID Cours (Matière)', type: 'number', required: true },
          { 
            name: 'jour', 
            label: 'Jour de la semaine', 
            type: 'select', 
            options: [
              { value: 'Lundi', label: 'Lundi' },
              { value: 'Mardi', label: 'Mardi' },
              { value: 'Mercredi', label: 'Mercredi' },
              { value: 'Jeudi', label: 'Jeudi' },
              { value: 'Vendredi', label: 'Vendredi' },
              { value: 'Samedi', label: 'Samedi' }
            ],
            required: true 
          },
          { name: 'heure', label: 'Heure (ex: 08:00)', type: 'text', required: true },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
