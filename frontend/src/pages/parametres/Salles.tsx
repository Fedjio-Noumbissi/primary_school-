import { DoorOpen } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Salles = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/salles',
        title: 'Salles de Classe',
        subtitle: 'Gestion des locaux de l\'établissement',
        icon: <DoorOpen />,
        primaryKey: 'idSalle',
        columns: [
          { key: 'libelle', label: 'Nom/Numéro de la salle' },
          { key: 'position', label: 'Position/Bâtiment' },
          { key: 'surface', label: 'Capacité' }
        ],
        fields: [
          { name: 'libelle', label: 'Nom de la salle', type: 'text', required: true },
          { name: 'position', label: 'Bâtiment / Position', type: 'text' },
          { name: 'surface', label: 'Capacité (nb places)', type: 'text' }
        ]
      }}
    />
  );
};
