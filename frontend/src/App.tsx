import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BaseLayout } from './components/layout/BaseLayout';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ElevesList } from './pages/scolarite/ElevesList';
import { Classes } from './pages/scolarite/Classes';
import { Cours } from './pages/scolarite/Cours';
import { Emplois } from './pages/scolarite/Emplois';
import { Titulaires } from './pages/scolarite/Titulaires';
import { Frequentes } from './pages/scolarite/Frequentes';

import { Personnes } from './pages/personnes/Personnes';
import { Enseignants } from './pages/personnes/Enseignants';
import { Parents } from './pages/personnes/Parents';
import { Admins } from './pages/personnes/Admins';
import { Residents } from './pages/personnes/Residents';
import { Messages } from './pages/personnes/Messages';

import { Paiements } from './pages/finance/Paiements';
import { Scolarites } from './pages/finance/Scolarites';
import { Tranches } from './pages/finance/Tranches';
import { ModesPaiement } from './pages/finance/ModesPaiement';

import { EvaluationsList as Evaluations } from './pages/evaluations/EvaluationsList';
import { Epreuves } from './pages/evaluations/Epreuves';
import { Rapports } from './pages/evaluations/Rapports';
import { Sessions } from './pages/evaluations/Sessions';
import { Trimestres } from './pages/evaluations/Trimestres';
import { NaturesEpreuve } from './pages/evaluations/NaturesEpreuve';

import { Annees } from './pages/parametres/Annees';
import { Cycles } from './pages/parametres/Cycles';
import { Disciplines } from './pages/parametres/Disciplines';
import { Salles } from './pages/parametres/Salles';
import { Livres } from './pages/parametres/Livres';
import { Specialites } from './pages/parametres/Specialites';
import { Quartiers } from './pages/parametres/Quartiers';
import { VillesNaissance } from './pages/parametres/VillesNaissance';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { Unauthorized } from './pages/Unauthorized';
import { RoutesManager } from './pages/admin/RoutesManager';
import { Utilisateurs } from './pages/admin/Utilisateurs';
import { ParentDashboard } from './pages/parent/Dashboard';
import { EnseignantDashboard } from './pages/enseignant/Dashboard';
import { AdministratifDashboard } from './pages/administratif/Dashboard';
import { AuditView } from './pages/audit/AuditView';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 10 * 60 * 1000, // 10 minutes — reduce calls to slow remote DB
      gcTime: 15 * 60 * 1000,    // Keep cache 15 minutes
    },
  },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Sora, sans-serif',
            fontSize: '14px',
            borderRadius: '10px',
          },
          success: {
            style: { background: '#059669', color: '#fff' },
            iconTheme: { primary: '#fff', secondary: '#059669' },
          },
          error: {
            style: { background: '#ef4444', color: '#fff' },
            iconTheme: { primary: '#fff', secondary: '#ef4444' },
          },
        }}
      />
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />

          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route element={<BaseLayout />}>
              {/* Dashboard */}
              <Route element={<ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite', 'admin_auditeur']} />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              
              {/* Scolarité */}
              <Route element={<ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']} />}>
                <Route path="/scolarite/eleves" element={<ElevesList />} />
                <Route path="/scolarite/classes" element={<Classes />} />
                <Route path="/scolarite/cours" element={<Cours />} />
                <Route path="/scolarite/emplois" element={<Emplois />} />
                <Route path="/scolarite/titulaires" element={<Titulaires />} />
                <Route path="/scolarite/frequentes" element={<Frequentes />} />
              </Route>

              {/* Personnes (Admins/Résidents require higher auth ideally, but keeping within context) */}
              <Route element={<ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']} />}>
                <Route path="/personnes/personnes" element={<Personnes />} />
                <Route path="/personnes/enseignants" element={<Enseignants />} />
                <Route path="/personnes/parents" element={<Parents />} />
                <Route path="/personnes/admins" element={<Admins />} />
                <Route path="/personnes/residents" element={<Residents />} />
                <Route path="/personnes/messages" element={<Messages />} />
              </Route>

              {/* Finance */}
              <Route element={<ProtectedRoute allowedRoles={['fondateur', 'directeur', 'administratif']} />}>
                <Route path="/finance/paiements" element={<Paiements />} />
                <Route path="/finance/scolarites" element={<Scolarites />} />
                <Route path="/finance/tranches" element={<Tranches />} />
                <Route path="/finance/modes" element={<ModesPaiement />} />
              </Route>

              {/* Evaluations */}
              <Route element={<ProtectedRoute allowedRoles={['fondateur', 'directeur', 'enseignant', 'admin_scolarite']} />}>
                <Route path="/evaluations/list" element={<Evaluations />} />
                <Route path="/evaluations/epreuves" element={<Epreuves />} />
                <Route path="/evaluations/rapports" element={<Rapports />} />
                <Route path="/evaluations/sessions" element={<Sessions />} />
                <Route path="/evaluations/trimestres" element={<Trimestres />} />
                <Route path="/evaluations/natures" element={<NaturesEpreuve />} />
              </Route>

              {/* Paramètres */}
              <Route element={<ProtectedRoute allowedRoles={['fondateur', 'directeur', 'admin_scolarite']} />}>
                <Route path="/parametres/annees" element={<Annees />} />
                <Route path="/parametres/cycles" element={<Cycles />} />
                <Route path="/parametres/disciplines" element={<Disciplines />} />
                <Route path="/parametres/salles" element={<Salles />} />
                <Route path="/parametres/livres" element={<Livres />} />
                <Route path="/parametres/specialites" element={<Specialites />} />
                <Route path="/parametres/quartiers" element={<Quartiers />} />
                <Route path="/parametres/villes" element={<VillesNaissance />} />
              </Route>

              {/* Admin */}
              <Route element={<ProtectedRoute allowedRoles={['fondateur', 'directeur']} />}>
                <Route path="/admin/utilisateurs" element={<Utilisateurs />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['fondateur']} />}>
                <Route path="/admin/routes" element={<RoutesManager />} />
              </Route>

              {/* Audit */}
              <Route element={<ProtectedRoute allowedRoles={['fondateur', 'admin_auditeur']} />}>
                <Route path="/audit" element={<AuditView />} />
              </Route>

              {/* Rôles spécifiques Dashboards */}
              <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
                <Route path="/parent/dashboard" element={<ParentDashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['enseignant']} />}>
                <Route path="/enseignant/dashboard" element={<EnseignantDashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['administratif']} />}>
                <Route path="/administratif/dashboard" element={<AdministratifDashboard />} />
              </Route>

            </Route>
          </Route>

          {/* Global fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;