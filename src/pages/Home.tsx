import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { BookOpenText } from "lucide-react";

export default function Home() {
  const [supabaseStatus, setSupabaseStatus] = useState<
    "checking" | "connected" | "error"
  >("checking");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier la connexion avec Supabase
    const checkSupabaseConnection = async () => {
      try {
        // Essayer de faire une requête simple vers Supabase
        const { error } = await supabase
          .from("_dummy_query")
          .select("*")
          .limit(1)
          .maybeSingle();

        // Si l'erreur est une erreur d'autorisation ou de table inexistante, la connexion fonctionne quand même
        if (
          error &&
          !error.message.includes("permission denied") &&
          !error.message.includes("does not exist")
        ) {
          setSupabaseStatus("error");
          setErrorMessage(error.message);
        } else {
          setSupabaseStatus("connected");
          setErrorMessage(null);
        }
      } catch (err) {
        setSupabaseStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Erreur inconnue");
      }
    };

    checkSupabaseConnection();
  }, []);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl leading-6 font-medium">
              Bienvenue sur React Boilerplate
            </h3>
            <p className="mt-1 max-w-2xl text-sm">
              Une base de code moderne pour vos projets React
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm font-medium">Supabase:</span>
            {supabaseStatus === "checking" && (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="ml-1 text-xs">Vérification...</span>
              </div>
            )}
            {supabaseStatus === "connected" && (
              <div className="flex items-center">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="ml-1 text-xs font-medium text-green-100">
                  Connecté
                </span>
              </div>
            )}
            {supabaseStatus === "error" && (
              <div className="flex items-center">
                <span className="flex h-3 w-3 relative">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="ml-1 text-xs font-medium text-red-100">
                  Erreur
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {supabaseStatus === "error" && errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Erreur de connexion à Supabase: {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Framework</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              React avec Vite
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Backend</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Supabase (Authentication, Database, Storage)
              {supabaseStatus === "error" && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Déconnecté
                </span>
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Styling</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              TailwindCSS
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              State Management
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Zustand
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-5 sm:px-6 flex justify-center space-x-4">
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          React
          <BookOpenText className="ml-2 h-4 w-4" />
        </a>
        <a
          href="https://supabase.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Supabase
          <BookOpenText className="ml-2 h-4 w-4" />
        </a>
        <a
          href="https://zustand.docs.pmnd.rs/getting-started/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Zustand
          <BookOpenText className="ml-2 h-4 w-4" />
        </a>
        <a
          href="https://tailwindcss.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          TailwindCSS
          <BookOpenText className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
