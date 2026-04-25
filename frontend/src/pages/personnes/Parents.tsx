import { UserCheck } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Parents = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/parents',
        title: 'Parents d\'Élèves',
        subtitle: 'Tuteurs et correspondants',
        icon: <UserCheck />,
        primaryKey: 'idParent',
        columns: [
          { key: 'idPers', label: 'ID Profil Parent' },
          { key: 'matricule', label: 'Matricule Enfant rattaché' }
        ],
        fields: [
          { name: 'idPers', label: 'ID Personne (Tuteur)', type: 'number', required: true },
          { name: 'matricule', label: 'Matricule de l\'Enfant (Élève)', type: 'number', required: true }
        ]
      }}
    />
  );
};
