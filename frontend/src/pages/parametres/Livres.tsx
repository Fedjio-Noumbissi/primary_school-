import { Library } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Livres = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/livres',
        title: 'Livres & Manuels',
        subtitle: 'Gestion de la bibliothèque et manuels scolaires',
        icon: <Library />,
        primaryKey: 'idLivre',
        columns: [
          { key: 'titre', label: 'Titre' },
          { key: 'auteurs', label: 'Auteurs' },
          { key: 'edition', label: 'Edition' },
          { key: 'prix', label: 'Prix', render: (val) => val ? `${val} FCFA` : '-' }
        ],
        fields: [
          { name: 'titre', label: 'Titre du livre', type: 'text', required: true },
          { name: 'auteurs', label: 'Auteurs', type: 'text' },
          { name: 'edition', label: 'Maison d\'Edition', type: 'text' },
          { name: 'prix', label: 'Prix', type: 'number' }
        ]
      }}
    />
  );
};
