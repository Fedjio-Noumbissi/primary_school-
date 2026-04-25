import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BaseLayout } from './components/layout/BaseLayout';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ElevesList } from './pages/scolarite/ElevesList';
import { Classes } from './pages/scolarite/Classes';
import { Cours } from './pages/scolarite/Cours';
import { Emplois } from './pages/scolarite/Emplois';
import { Titulaires } from './pages/scolarite/Titulaires';

import { Enseignants } from './pages/personnes/Enseignants';
import { Parents } from './pages/personnes/Parents';
import { Admins } from './pages/personnes/Admins';
import { Residents } from './pages/personnes/Residents';

import { Paiements } from './pages/finance/Paiements';
import { Scolarites } from './pages/finance/Scolarites';
import { Tranches } from './pages/finance/Tranches';
import { ModesPaiement } from './pages/finance/ModesPaiement';

import { EvaluationsList as Evaluations } from './pages/evaluations/EvaluationsList';
import { Epreuves } from './pages/evaluations/Epreuves';
import { Rapports } from './pages/evaluations/Rapports';
import { Sessions } from './pages/evaluations/Sessions';
import { Trimestres } from './pages/evaluations/Trimestres';

import { Annees } from './pages/parametres/Annees';
import { Cycles } from './pages/parametres/Cycles';
import { Disciplines } from './pages/parametres/Disciplines';
import { Salles } from './pages/parametres/Salles';
import { Livres } from './pages/parametres/Livres';
import { Specialites } from './pages/parametres/Specialites';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient();


// 🔐 Protected Route Wrapper
const ProtectedRoute = () => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<BaseLayout />}>
              <Route index element={<Dashboard />} />
              
              {/* Scolarité */}
              <Route path="scolarite/eleves" element={<ElevesList />} />
              <Route path="scolarite/classes" element={<Classes />} />
              <Route path="scolarite/cours" element={<Cours />} />
              <Route path="scolarite/emplois" element={<Emplois />} />
              <Route path="scolarite/titulaires" element={<Titulaires />} />

              {/* Personnes */}
              <Route path="personnes/enseignants" element={<Enseignants />} />
              <Route path="personnes/parents" element={<Parents />} />
              <Route path="personnes/admins" element={<Admins />} />
              <Route path="personnes/residents" element={<Residents />} />

              {/* Finance */}
              <Route path="finance/paiements" element={<Paiements />} />
              <Route path="finance/scolarites" element={<Scolarites />} />
              <Route path="finance/tranches" element={<Tranches />} />
              <Route path="finance/modes" element={<ModesPaiement />} />

              {/* Evaluations */}
              <Route path="evaluations/list" element={<Evaluations />} />
              <Route path="evaluations/epreuves" element={<Epreuves />} />
              <Route path="evaluations/rapports" element={<Rapports />} />
              <Route path="evaluations/sessions" element={<Sessions />} />
              <Route path="evaluations/trimestres" element={<Trimestres />} />

              {/* Paramètres */}
              <Route path="parametres/annees" element={<Annees />} />
              <Route path="parametres/cycles" element={<Cycles />} />
              <Route path="parametres/disciplines" element={<Disciplines />} />
              <Route path="parametres/salles" element={<Salles />} />
              <Route path="parametres/livres" element={<Livres />} />
              <Route path="parametres/specialites" element={<Specialites />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          {/* Global fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;