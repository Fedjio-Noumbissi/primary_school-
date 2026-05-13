import { Routes, Route, Navigate } from 'react-router-dom';
import { BaseLayout } from '../components/layout/BaseLayout';
import { ProtectedRoute } from '../guards/ProtectedRoute';

// Auth & Public
import { Login } from '../pages/Login';
import { Welcome } from '../pages/Welcome';
import { Unauthorized } from '../pages/Unauthorized';

// Dashboard
import { DashboardRouter } from '../pages/DashboardRouter';

// Scolarité
import { ElevesList } from '../pages/scolarite/ElevesList';
import { EleveDetail } from '../pages/scolarite/EleveDetail';
import { Classes } from '../pages/scolarite/Classes';
import { ClasseDetail } from '../pages/scolarite/ClasseDetail';
import { Cours } from '../pages/scolarite/Cours';
import { Emplois } from '../pages/scolarite/Emplois';
import { Titulaires } from '../pages/scolarite/Titulaires';
import { Frequentes } from '../pages/scolarite/Frequentes';

// Personnes
import { Enseignants } from '../pages/personnes/Enseignants';
import { EnseignantDetail } from '../pages/personnes/EnseignantDetail';
import { Parents } from '../pages/personnes/Parents';
import { Admins } from '../pages/personnes/Admins';
import { Residents } from '../pages/personnes/Residents';
import { Messages } from '../pages/personnes/Messages';

// Finance
import { Paiements } from '../pages/finance/Paiements';
import { PaiementDetail } from '../pages/finance/PaiementDetail';
import { Scolarites } from '../pages/finance/Scolarites';
import { Tranches } from '../pages/finance/Tranches';
import { ModesPaiement } from '../pages/finance/ModesPaiement';

// Evaluations
import { EvaluationsList } from '../pages/evaluations/EvaluationsList';
import { Epreuves } from '../pages/evaluations/Epreuves';
import { NaturesEpreuve } from '../pages/evaluations/NaturesEpreuve';
import { Rapports } from '../pages/evaluations/Rapports';
import { SaisieNotes } from '../pages/evaluations/SaisieNotes';
import { BulletinsPage } from '../pages/evaluations/Bulletins';
import { Sessions } from '../pages/evaluations/Sessions';
import { Trimestres } from '../pages/evaluations/Trimestres';

// Paramètres
import { ParametresPage } from '../pages/parametres/Parametres';
import { Annees } from '../pages/parametres/Annees';
import { Cycles } from '../pages/parametres/Cycles';
import { Disciplines } from '../pages/parametres/Disciplines';
import { Salles } from '../pages/parametres/Salles';
import { Livres } from '../pages/parametres/Livres';
import { Specialites } from '../pages/parametres/Specialites';
import { Quartiers } from '../pages/parametres/Quartiers';
import { VillesNaissance } from '../pages/parametres/VillesNaissance';

// Audit & Profil & Admin
import { AuditView as AuditPage } from '../pages/audit/AuditView';
import { ProfilPage } from '../pages/Profil';
import { Utilisateurs as UtilisateursPage } from '../pages/admin/Utilisateurs';
import { RoutesManager } from '../pages/admin/RoutesManager';

// Rôles Spéciaux
import { ParentDashboard } from '../pages/parent/Dashboard';
import { ParentPaiement } from '../pages/parent/Paiement';
import { EnseignantDashboard } from '../pages/enseignant/Dashboard';
import { PresencesPage } from '../pages/enseignant/Presences';
import { NotesPage } from '../pages/enseignant/Notes';
import { AdministratifDashboard } from '../pages/administratif/Dashboard';

const ALL_ROLES = ['fondateur', 'directeur', 'admin_scolarite', 'admin_auditeur', 'enseignant', 'parent', 'administratif'];

export const AppRouter = () => {
  return (
    <Routes>
      {/* ═══ PUBLIQUES ═══ */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ═══ LAYOUT PRINCIPAL (routes protégées) ═══ */}
      <Route element={<ProtectedRoute allowedRoles={ALL_ROLES} />}>
        <Route element={<BaseLayout />}>
          {/* Dashboard adaptatif selon le rôle */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardRouter />} />

          {/* ─── SCOLARITÉ ─── */}
          <Route path="/scolarite">
            <Route index element={<Navigate to="/scolarite/eleves" replace />} />
            <Route path="eleves" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <ElevesList />
              </ProtectedRoute>
            } />
            <Route path="eleves/:matricule" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <EleveDetail />
              </ProtectedRoute>
            } />
            <Route path="classes" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <Classes />
              </ProtectedRoute>
            } />
            <Route path="classes/:id" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <ClasseDetail />
              </ProtectedRoute>
            } />
            <Route path="cours" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite', 'enseignant']}>
                <Cours />
              </ProtectedRoute>
            } />
            <Route path="emplois" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite', 'enseignant']}>
                <Emplois />
              </ProtectedRoute>
            } />
            <Route path="titulaires" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Titulaires />
              </ProtectedRoute>
            } />
            <Route path="frequentes" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <Frequentes />
              </ProtectedRoute>
            } />
          </Route>

          {/* ─── PERSONNES ─── */}
          <Route path="/personnes">
            <Route index element={<Navigate to="/personnes/enseignants" replace />} />
            <Route path="enseignants" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Enseignants />
              </ProtectedRoute>
            } />
            <Route path="enseignants/:id" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <EnseignantDetail />
              </ProtectedRoute>
            } />
            <Route path="parents" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <Parents />
              </ProtectedRoute>
            } />
            <Route path="admins" element={
              <ProtectedRoute allowedRoles={['fondateur']}>
                <Admins />
              </ProtectedRoute>
            } />
            <Route path="residents" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Residents />
              </ProtectedRoute>
            } />
            <Route path="messages" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <Messages />
              </ProtectedRoute>
            } />
          </Route>

          {/* ─── FINANCE ─── */}
          <Route path="/finance">
            <Route index element={<Navigate to="/finance/paiements" replace />} />
            <Route path="paiements" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'administratif']}>
                <Paiements />
              </ProtectedRoute>
            } />
            <Route path="paiements/:id" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'administratif']}>
                <PaiementDetail />
              </ProtectedRoute>
            } />
            <Route path="scolarites" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Scolarites />
              </ProtectedRoute>
            } />
            <Route path="tranches" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Tranches />
              </ProtectedRoute>
            } />
            <Route path="modes" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <ModesPaiement />
              </ProtectedRoute>
            } />
          </Route>

          {/* ─── ÉVALUATIONS ─── */}
          <Route path="/evaluations">
            <Route index element={<Navigate to="/evaluations/list" replace />} />
            <Route path="list" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'enseignant', 'admin_scolarite']}>
                <EvaluationsList />
              </ProtectedRoute>
            } />
            <Route path="epreuves" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <Epreuves />
              </ProtectedRoute>
            } />
            <Route path="natures" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <NaturesEpreuve />
              </ProtectedRoute>
            } />
            <Route path="rapports" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Rapports />
              </ProtectedRoute>
            } />
            <Route path=":id/notes" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'enseignant']}>
                <SaisieNotes />
              </ProtectedRoute>
            } />
            <Route path="bulletins" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']}>
                <BulletinsPage />
              </ProtectedRoute>
            } />
            <Route path="sessions" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Sessions />
              </ProtectedRoute>
            } />
            <Route path="trimestres" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Trimestres />
              </ProtectedRoute>
            } />
          </Route>

          {/* ─── PARAMÈTRES ─── */}
          <Route path="/parametres">
            <Route index element={<ParametresPage />} />
            <Route path="annees" element={
              <ProtectedRoute allowedRoles={['fondateur']}>
                <Annees />
              </ProtectedRoute>
            } />
            <Route path="cycles" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Cycles />
              </ProtectedRoute>
            } />
            <Route path="disciplines" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Disciplines />
              </ProtectedRoute>
            } />
            <Route path="salles" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Salles />
              </ProtectedRoute>
            } />
            <Route path="livres" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Livres />
              </ProtectedRoute>
            } />
            <Route path="specialites" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Specialites />
              </ProtectedRoute>
            } />
            <Route path="quartiers" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <Quartiers />
              </ProtectedRoute>
            } />
            <Route path="villes" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <VillesNaissance />
              </ProtectedRoute>
            } />
          </Route>

          {/* ─── AUDIT ─── */}
          <Route path="/audit" element={
            <ProtectedRoute allowedRoles={['fondateur', 'admin_auditeur']}>
              <AuditPage />
            </ProtectedRoute>
          } />

          {/* ─── ADMIN ─── */}
          <Route path="/admin">
            <Route path="utilisateurs" element={
              <ProtectedRoute allowedRoles={['fondateur', 'directeur']}>
                <UtilisateursPage />
              </ProtectedRoute>
            } />
            <Route path="routes" element={
              <ProtectedRoute allowedRoles={['fondateur']}>
                <RoutesManager />
              </ProtectedRoute>
            } />
          </Route>

          {/* ─── MON PROFIL ─── */}
          <Route path="/profil" element={<ProfilPage />} />

          {/* ─── PORTAILS RÔLES SPÉCIAUX ─── */}
          <Route path="/parent">
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ParentDashboard />
              </ProtectedRoute>
            } />
            <Route path="paiement" element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ParentPaiement />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="/enseignant">
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['enseignant']}>
                <EnseignantDashboard />
              </ProtectedRoute>
            } />
            <Route path="presences" element={
              <ProtectedRoute allowedRoles={['enseignant']}>
                <PresencesPage />
              </ProtectedRoute>
            } />
            <Route path="notes" element={
              <ProtectedRoute allowedRoles={['enseignant']}>
                <NotesPage />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="/administratif">
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['administratif']}>
                <AdministratifDashboard />
              </ProtectedRoute>
            } />
          </Route>
        </Route>
      </Route>

      {/* Global fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
