import { useUser } from "../store/user";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function Profile() {
  const user = useUser((s) => s.user);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  // Déterminer la source de l'avatar (si disponible)
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(user?.user_metadata?.name || user?.email || "User");
  // Déterminer le nom d'affichage
  const displayName =
    user?.user_metadata?.name || user?.email?.split("@")[0] || "Utilisateur";

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-white">
              <img
                src={avatarUrl}
                alt="Avatar de l'utilisateur"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 text-white">
              <h3 className="text-2xl font-medium">{displayName}</h3>
              <p className="text-indigo-100">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            {loading ? "Déconnexion..." : "Déconnexion"}
            <LogOut className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user?.user_metadata?.name || "Non défini"}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Adresse e-mail
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user?.email}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Méthode de connexion
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {/* Afficher les providers d'authentification */}
              <div className="flex flex-wrap gap-2">
                {/* Vérifier si l'utilisateur a des providers */}
                {user?.app_metadata?.providers ? (
                  // Parcourir tous les providers disponibles
                  user.app_metadata.providers.map((provider: string) => {
                    // Définir les styles et noms pour chaque provider
                    const providerStyles: Record<
                      string,
                      { bg: string; text: string; label: string }
                    > = {
                      google: {
                        bg: "bg-blue-100",
                        text: "text-blue-800",
                        label: "Google",
                      },
                      github: {
                        bg: "bg-gray-100",
                        text: "text-gray-800",
                        label: "GitHub",
                      },
                      facebook: {
                        bg: "bg-blue-100",
                        text: "text-blue-900",
                        label: "Facebook",
                      },
                      twitter: {
                        bg: "bg-blue-100",
                        text: "text-blue-800",
                        label: "Twitter",
                      },
                      apple: {
                        bg: "bg-gray-100",
                        text: "text-gray-800",
                        label: "Apple",
                      },
                      azure: {
                        bg: "bg-blue-100",
                        text: "text-blue-800",
                        label: "Microsoft",
                      },
                      // Style par défaut pour les autres providers
                      default: {
                        bg: "bg-purple-100",
                        text: "text-purple-800",
                        label:
                          provider.charAt(0).toUpperCase() + provider.slice(1),
                      },
                    };

                    // Utiliser les styles spécifiques ou par défaut
                    const style =
                      providerStyles[provider] || providerStyles.default;

                    return (
                      <span
                        key={provider}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
                      >
                        {style.label}
                      </span>
                    );
                  })
                ) : user?.app_metadata?.provider ? (
                  // Compatibilité avec l'ancien format (un seul provider)
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.app_metadata.provider === "google"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {user.app_metadata.provider === "google"
                      ? "Google"
                      : "Email / Mot de passe"}
                  </span>
                ) : (
                  // Si aucun provider n'est trouvé, afficher Email / Mot de passe par défaut
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Email / Mot de passe
                  </span>
                )}
              </div>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Dernière connexion
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user?.last_sign_in_at
                ? new Date(user.last_sign_in_at).toLocaleString()
                : "Inconnue"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
