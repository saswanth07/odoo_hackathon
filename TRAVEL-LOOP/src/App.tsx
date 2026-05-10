import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth-context';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import BuildItinerary from './pages/BuildItinerary';
import TripList from './pages/TripList';
import Profile from './pages/Profile';
import ActivitySearch from './pages/ActivitySearch';
import ItineraryView from './pages/ItineraryView';
import Community from './pages/Community';
import PackingList from './pages/PackingList';
import TripNotes from './pages/TripNotes';
import ExpenseInvoice from './pages/ExpenseInvoice';
import Pricing from './pages/Pricing';
import AdminDashboard from './pages/AdminDashboard';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/trips" element={<TripList />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/build-itinerary/:id" element={<BuildItinerary />} />
            <Route path="/itinerary/:id" element={<ItineraryView />} />
            <Route path="/explore" element={<ActivitySearch />} />
            <Route path="/community" element={<Community />} />
            <Route path="/packing" element={<PackingList />} />
            <Route path="/journal" element={<TripNotes />} />
            <Route path="/expenses" element={<ExpenseInvoice />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<Profile />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
