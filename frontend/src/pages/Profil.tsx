import { usePageMeta } from '../hooks/usePageMeta';
export const ProfilPage = () => {
  usePageMeta('Mon Profil');
  return <div className="p-8"><h1 className="text-2xl font-bold">Mon Profil Utilisateur</h1></div>;
};
