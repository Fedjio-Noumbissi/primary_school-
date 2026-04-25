import { BookOpen } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Disciplines = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/disciplines',
        title: 'Disciplines',
        subtitle: 'Gestion des matières enseignées',
        icon: <BookOpen />,
        primaryKey: 'ID',
        columns: [
          { key: 'libelle', label: 'Libellé' },
          { key: 'points', label: 'Points/Coefficient' }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé de la discipline', type: 'text', required: true },
          { name: 'points', label: 'Points/Catégorie', type: 'number' }
        ]
      }}
    />
  );
};
