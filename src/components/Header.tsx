import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useUser } from "../store/user";
import { LogIn, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const user = useUser((s) => s.user);
  const handleLogout = () => supabase.auth.signOut();
  const location = useLocation();

  // Fonction pour déterminer si un lien est actif
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                React Boilerplate
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 ">
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "border-indigo-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700"
                } 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Accueil
              </Link>
              <Link
                to="/profile"
                className={`${
                  isActive("/profile")
                    ? "border-indigo-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700"
                } 
                  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Profil
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Déconnexion
                <LogOut className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Se connecter
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
