import { usePageMeta } from '../../hooks/usePageMeta';
export const NotesPage = () => {
  usePageMeta('Mes Evaluations');
  return <div className="p-8"><h1 className="text-2xl font-bold">Mes Evaluations et Notes</h1></div>;
};
