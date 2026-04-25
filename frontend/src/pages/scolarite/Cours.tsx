import { BookText } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Cours = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/scolarite/cours',
        title: 'Matières & Cours',
        subtitle: 'Configuration des cours par classe et coefficients',
        icon: <BookText />,
        primaryKey: 'idCours',
        columns: [
          { key: 'libelle', label: 'Matière' },
          { key: 'coefficient', label: 'Coefficient' },
          { key: 'idClasse', label: 'ID Classe' },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>
              {val ? 'Actif' : 'Inactif'}
            </span>
          )}
        ],
        fields: [
          { name: 'libelle', label: 'Nom du cours / matière', type: 'text', required: true },
          { name: 'note', label: 'Note sur... (ex: 20)', type: 'number' },
          { name: 'coefficient', label: 'Coefficient', type: 'number' },
          { name: 'description', label: 'Description/Programme', type: 'textarea' },
          { name: 'idClasse', label: 'ID Classe rattachée', type: 'number', required: true },
          { name: 'actif', label: 'Ce cours est-il actif ?', type: 'checkbox' }
        ]
      }}
    />
  );
};
