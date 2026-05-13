import { usePageMeta } from '../../hooks/usePageMeta';
import { useParams } from 'react-router-dom';
export const SaisieNotes = () => {
  const { id } = useParams();
  usePageMeta('Saisie des Notes');
  return <div className="p-8"><h1 className="text-2xl font-bold">Saisie des notes pour l\'épreuve #{id}</h1></div>;
};
