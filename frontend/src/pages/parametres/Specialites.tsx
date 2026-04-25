import { GraduationCap } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Specialites = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/specialites',
        title: 'Spécialités',
        subtitle: 'Filières et spécialités pédagogiques',
        icon: <GraduationCap />,
        primaryKey: 'idSpecialite',
        columns: [
          { key: 'libelle', label: 'Libellé de la spécialité' }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé', type: 'text', required: true }
        ]
      }}
    />
  );
};
