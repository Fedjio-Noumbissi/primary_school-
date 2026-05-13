import { usePageMeta } from '../../hooks/usePageMeta';
export const PresencesPage = () => {
  usePageMeta('Gestion des Présences');
  return <div className="p-8"><h1 className="text-2xl font-bold">Saisie des présences</h1></div>;
};
