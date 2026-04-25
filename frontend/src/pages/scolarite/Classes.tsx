import { FolderOpen } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Classes = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/scolarite/classes',
        title: 'Classes',
        subtitle: 'Gestion des classes de l\'établissement',
        icon: <FolderOpen />,
        primaryKey: 'idClasse',
        columns: [
          { key: 'libelle', label: 'Nom de la classe' },
          { key: 'idCycle', label: 'ID Cycle' }
        ],
        fields: [
          { name: 'libelle', label: 'Nom de la classe (ex: 6ème A)', type: 'text', required: true },
          { name: 'idCycle', label: 'ID Cycle rattaché', type: 'number' }
        ]
      }}
    />
  );
};
