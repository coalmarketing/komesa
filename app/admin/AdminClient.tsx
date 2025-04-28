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

export interface AdminClientProps {
  initialData: Reference[];
}

const AdminClient = ({ initialData }: AdminClientProps) => {
  const [references, setReferences] = useState<Reference[]>(initialData);
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
      try {
        const response = await fetch(`${API_URL}/api/admin/check-auth`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
          // Načteme aktuální data po úspěšné autentizaci
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

    // Spustíme kontrolu autentizace pouze pokud máme token v localStorage
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      checkAuth();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Přidáme nový useEffect pro pravidelnou aktualizaci dat
  useEffect(() => {
    if (isAuthenticated) {
      // Načteme data ihned při přihlášení
      fetchReferences();

      // Nastavíme interval pro pravidelnou aktualizaci dat každých 30 sekund
      const interval = setInterval(() => {
        fetchReferences();
      }, 30000);

      // Cleanup při unmount
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchReferences = async () => {
    try {
      console.log('Admin: Načítám reference...');
      const response = await fetch(`${API_URL}/api/admin/references`, {
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (response.status === 401) {
        console.log('Admin: Neautorizovaný přístup, přesměrovávám na přihlášení');
        setIsAuthenticated(false);
        localStorage.removeItem('adminLoggedIn');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nepodařilo se načíst reference');
      }

      const data = await response.json();
      console.log('Admin: Načtená data:', data);
      setReferences(data);
      setError(null);
    } catch (err) {
      console.error('Admin: Chyba při načítání referencí:', err);
      setError(err instanceof Error ? err.message : 'Chyba při načítání referencí');
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
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Chyba při přihlášení');
      }

      const data = await response.json();
      console.log('Admin: Odpověď z přihlášení:', data);

      setSuccess('Přihlášení úspěšné');
      setIsAuthenticated(true);
      localStorage.setItem('adminLoggedIn', 'true');
      await fetchReferences();
    } catch (error) {
      console.error('Admin: Chyba při přihlášení:', error);
      setError(error instanceof Error ? error.message : 'Chyba při přihlášení');
      localStorage.removeItem('adminLoggedIn');
      setIsAuthenticated(false);
    }
  };

  const handleApproval = async (id: number, approved: boolean) => {
    try {
      console.log('Admin: Pokus o aktualizaci reference:', { id, approved });
      const response = await fetch(`${API_URL}/api/admin/approve-reference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id, approved }),
        credentials: 'include'
      });

      if (response.status === 401) {
        console.log('Admin: Neautorizovaný přístup, přesměrovávám na přihlášení');
        setIsAuthenticated(false);
        localStorage.removeItem('adminLoggedIn');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nepodařilo se aktualizovat referenci');
      }

      await fetchReferences();
      setSuccess('Reference byla úspěšně aktualizována');
    } catch (err) {
      console.error('Admin: Chyba při aktualizaci reference:', err);
      setError(err instanceof Error ? err.message : 'Chyba při aktualizaci reference');
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Admin: Odhlášení uživatele');
      const response = await fetch(`${API_URL}/api/admin/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
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
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id }),
        credentials: 'include'
      });

      if (response.status === 401) {
        console.log('Admin: Neautorizovaný přístup, přesměrovávám na přihlášení');
        setIsAuthenticated(false);
        localStorage.removeItem('adminLoggedIn');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nepodařilo se smazat referenci');
      }

      await fetchReferences();
      setSuccess('Reference byla úspěšně smazána');
    } catch (err) {
      console.error('Admin: Chyba při mazání reference:', err);
      setError(err instanceof Error ? err.message : 'Chyba při mazání reference');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Přihlášení administrátora</h1>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Uživatelské jméno</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Heslo</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Přihlásit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Správa referencí</h1>
            <div>
              <button
                onClick={() => setShowChangePassword(!showChangePassword)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Změnit heslo
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Odhlásit
              </button>
            </div>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

          {showChangePassword && (
            <div className="mb-8 p-4 border rounded shadow">
              <h2 className="text-xl font-bold mb-4">Změna hesla</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Současné heslo</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Nové heslo</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Potvrzení nového hesla</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Změnit heslo
                </button>
              </form>
            </div>
          )}

          <div className="grid gap-4">
            {references.map((reference) => (
              <div key={reference.id} className="border p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600">ID: {reference.id}</p>
                    <p className="text-gray-600">Email: {reference.email}</p>
                    <p className="text-gray-600">Lokalita: {reference.location}</p>
                    <p className="text-gray-600">Hodnocení: {reference.stars} hvězd</p>
                    <p className="mt-2">{reference.text}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDistanceToNow(new Date(reference.date), { addSuffix: true, locale: cs })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproval(reference.id, !reference.approved)}
                      className={`px-4 py-2 rounded ${
                        reference.approved
                          ? 'bg-red-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {reference.approved ? 'Neschválit' : 'Schválit'}
                    </button>
                    <button
                      onClick={() => handleDelete(reference.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Smazat
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    reference.approved
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {reference.approved ? 'Schváleno' : 'Neschváleno'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { AdminClient as default }; 