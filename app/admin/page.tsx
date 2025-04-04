"use client";

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cs } from 'date-fns/locale';
import { API_URL } from '../config';

interface Reference {
  id: number;
  stars: number;
  text: string;
  location: string;
  date: string;
  email: string;
  approved: boolean;
}

const AdminPage = () => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Kontrola autentizace při načtení stránky
    const checkAuth = async () => {
      // Nejprve zkontrolujeme localStorage
      const hasAdminToken = localStorage.getItem('adminLoggedIn') === 'true';
      if (!hasAdminToken) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/admin/check-auth`, {
          credentials: 'include'
        });
        if (response.ok) {
          setIsAuthenticated(true);
          await fetchReferences();
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('adminLoggedIn');
        }
      } catch (err) {
        setIsAuthenticated(false);
        localStorage.removeItem('adminLoggedIn');
        if (err instanceof Error) {
          console.error('Admin: Chyba při kontrole autentizace:', err.message);
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Admin: Uživatel je přihlášen, načítám reference');
      fetchReferences();
    }
  }, [isAuthenticated]);

  const fetchReferences = async () => {
    try {
      console.log('Admin: Načítám reference...');
      const response = await fetch(`${API_URL}/api/admin/references`, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        next: { revalidate: 0 }
      });

      console.log('Admin: Odpověď z API:', response.status);
      const data = await response.json();

      if (response.ok) {
        setReferences(data);
      } else {
        console.error('Admin: Chyba při načítání referencí:', data);
        setError(data.error || 'Chyba při načítání referencí');
      }
    } catch (error) {
      console.error('Admin: Chyba při načítání referencí:', error);
      setError('Chyba při načítání referencí');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log('Admin: Pokus o přihlášení...');
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      console.log('Admin: Odpověď z přihlášení:', data);

      if (response.ok) {
        setSuccess('Přihlášení úspěšné');
        setIsAuthenticated(true);
        localStorage.setItem('adminLoggedIn', 'true');
        await fetchReferences();
      } else {
        setError(data.error || 'Chyba při přihlášení');
      }
    } catch (error) {
      console.error('Admin: Chyba při přihlášení:', error);
      setError('Chyba při přihlášení');
    }
  };

  const handleApproval = async (id: number, approved: boolean) => {
    try {
      console.log('Admin: Pokus o aktualizaci reference:', { id, approved });
      const response = await fetch(`${API_URL}/api/admin/approve-reference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, approved }),
      });

      if (!response.ok) {
        throw new Error('Nepodařilo se aktualizovat referenci');
      }

      console.log('Admin: Reference úspěšně aktualizována');
      await fetchReferences();
    } catch (err) {
      console.error('Admin: Chyba při aktualizaci reference:', err);
      setError('Chyba při aktualizaci reference');
      await fetchReferences();
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Admin: Odhlášení uživatele');
      const response = await fetch(`${API_URL}/api/admin/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setReferences([]);
        setLoginData({ username: '', password: '' });
        localStorage.removeItem('adminLoggedIn');
      } else {
        console.error('Admin: Chyba při odhlášení');
      }
    } catch (err) {
      console.error('Admin: Chyba při odhlášení:', err);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Nové heslo a potvrzení hesla se neshodují');
      return;
    }

    try {
      console.log('Admin: Pokus o změnu hesla');
      const response = await fetch(`${API_URL}/api/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      const data = await response.json();
      console.log('Admin: Odpověď z API:', response.status, data);

      if (response.ok) {
        setPasswordSuccess('Heslo bylo úspěšně změněno');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setShowChangePassword(false);
      } else {
        setPasswordError(data.error || 'Chyba při změně hesla');
      }
    } catch (err) {
      console.error('Admin: Chyba při změně hesla:', err);
      setPasswordError('Chyba při změně hesla');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Opravdu chcete smazat tuto referenci?')) {
      return;
    }

    try {
      console.log('Admin: Pokus o smazání reference:', id);
      const response = await fetch(`${API_URL}/api/admin/delete-reference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Nepodařilo se smazat referenci');
      }

      console.log('Admin: Reference úspěšně smazána');
      setSuccess('Reference byla úspěšně smazána');
      await fetchReferences();
    } catch (err) {
      console.error('Admin: Chyba při mazání reference:', err);
      setError('Chyba při mazání reference');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Přihlášení do administrace</h1>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Uživatelské jméno</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Heslo</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/80"
              disabled={loading}
            >
              {loading ? 'Přihlašování...' : 'Přihlásit se'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Správa referencí</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Změnit heslo
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Odhlásit se
            </button>
          </div>
        </div>

        {showChangePassword && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Změna hesla</h2>
            {passwordError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {passwordSuccess}
              </div>
            )}
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Aktuální heslo</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nové heslo</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Potvrzení nového hesla</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/80"
              >
                Změnit heslo
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="grid gap-6">
          {references.map((ref) => (
            <div key={ref.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{ref.location}</h3>
                  <p className="text-gray-500">
                    {formatDistanceToNow(new Date(ref.date), { addSuffix: true, locale: cs })}
                  </p>
                  <p className="text-gray-600 mt-1">{ref.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: ref.stars }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{ref.text}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleDelete(ref.id)}
                  className="py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
                  title="Smazat referenci"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handleApproval(ref.id, false)}
                  className={`py-2 px-4 rounded ${
                    !ref.approved
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  } hover:opacity-80`}
                >
                  Neschválit
                </button>
                <button
                  onClick={() => handleApproval(ref.id, true)}
                  className={`py-2 px-4 rounded ${
                    ref.approved
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  } hover:opacity-80`}
                >
                  Schválit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 