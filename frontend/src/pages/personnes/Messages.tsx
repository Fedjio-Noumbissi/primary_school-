import { MessageSquare } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Messages = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/messages',
        title: 'Messages',
        subtitle: 'Communications entre l\'école et les parents',
        icon: <MessageSquare />,
        primaryKey: 'idMessages',
        searchPlaceholder: "Rechercher par objet ou contenu...",
        columns: [
          { key: 'objet', label: 'Objet', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'idParent', label: 'ID Parent', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'type_message', label: 'Type', render: (val) => {
            const types: Record<number, string> = { 1: 'Convocation', 2: 'Information', 3: 'Alerte' };
            return <span style={{ color: '#374151', fontWeight: 500 }}>{types[val] || `Type ${val}`}</span>;
          }},
          { key: 'AnneeAcade', label: 'Année', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'valider', label: 'Validé', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Oui' : 'Non'}</span>
          )}
        ],
        fields: [
          { name: 'idExp_Pers', label: 'ID Expéditeur (Personne)', type: 'number', required: true },
          { name: 'idParent', label: 'ID Parent destinataire', type: 'number', required: true },
          { name: 'objet', label: 'Objet du message', type: 'text', required: true },
          { name: 'information', label: 'Contenu du message', type: 'textarea', required: true },
          { 
            name: 'type_message', 
            label: 'Type de message', 
            type: 'select',
            options: [
              { value: 1, label: 'Convocation' },
              { value: 2, label: 'Information générale' },
              { value: 3, label: 'Alerte / Urgence' }
            ]
          },
          { name: 'AnneeAcade', label: 'Année académique (ex: 2024)', type: 'text' },
          { name: 'valider', label: 'Message validé', type: 'checkbox' }
        ]
      }}
    />
  );
};
