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
          { key: 'jour', label: 'Jour' },
          { key: 'heure', label: 'Heure' },
          { key: 'idClasse', label: 'ID Classe' },
          { key: 'idCours', label: 'ID Cours' }
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
          { name: 'heure', label: 'Heure (ex: 08:00 - 10:00)', type: 'text', required: true }
        ]
      }}
    />
  );
};
