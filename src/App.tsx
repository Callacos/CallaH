import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Sandbox } from './pages/Sandbox';
import { SiteWeb } from './pages/SiteWeb';
import { Article } from './pages/Article';
import { Avantage } from './pages/Avantage';
import { Jolt } from './pages/Jolt';
import { Python } from './pages/Python';
import { CSS } from './pages/CSS';
import { HTML } from './pages/HTML';
import { C } from './pages/C';
import { Groupe } from './pages/Groupe';
import { Chat } from './pages/Chat';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Evenement } from './pages/Evenement';
import { Sondage } from './pages/Sondage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#fff',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }
            }}
          />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/sandbox" element={
              <ProtectedRoute>
                <Layout>
                  <Sandbox />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/siteweb" element={
              <ProtectedRoute>
                <Layout>
                  <SiteWeb />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/article" element={
              <ProtectedRoute>
                <Layout>
                  <Article />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/avantage" element={
              <ProtectedRoute>
                <Layout>
                  <Avantage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/jolt" element={
              <ProtectedRoute>
                <Layout>
                  <Jolt />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/python" element={
              <ProtectedRoute>
                <Layout>
                  <Python />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/css" element={
              <ProtectedRoute>
                <Layout>
                  <CSS />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/html" element={
              <ProtectedRoute>
                <Layout>
                  <HTML />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/c" element={
              <ProtectedRoute>
                <Layout>
                  <C />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/groupe" element={
              <ProtectedRoute>
                <Layout>
                  <Groupe />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <Layout>
                  <Chat />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/evenement" element={
              <ProtectedRoute>
                <Layout>
                  <Evenement />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/sondage" element={
              <ProtectedRoute>
                <Layout>
                  <Sondage />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;