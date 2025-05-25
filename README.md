# React + Supabase Boilerplate

[![Use this template](https://img.shields.io/badge/-Use%20this%20template-2088FF?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sydywiizox/boilerplate/generate)

Ce boilerplate est une base de démarrage moderne et élégante pour créer des applications React avec authentification Supabase. Il inclut les fonctionnalités suivantes :

- Authentification complète (email/mot de passe et Google)
- Routes protégées avec redirection intelligente
- Gestion d'état avec Zustand
- Interface utilisateur moderne avec TailwindCSS et mode sombre/clair
- Page 404 personnalisée
- Indicateur de statut de connexion Supabase
- Support multi-providers d'authentification
- Structure modulaire avec composants réutilisables
- Vite comme bundler

## Prérequis

- Node.js (v16+)
- npm ou yarn
- Un compte Supabase

## Configuration

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd boilerplate
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn
```

### 3. Configurer Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Obtenez votre URL Supabase et votre clé anonyme depuis les paramètres du projet
3. Copiez le fichier `.env.example` en `.env` et remplissez les variables d'environnement:

```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anonyme_supabase
```

### 4. Configurer l'authentification Google (optionnel)

1. Créez un projet sur [Google Cloud Console](https://console.cloud.google.com/)
2. Activez l'API Google Identity
3. Créez des identifiants OAuth:
   - Allez dans "APIs & Services" > "Credentials"
   - Cliquez sur "Create Credentials" > "OAuth client ID"
   - Sélectionnez "Web application"
   - Ajoutez votre URL Supabase dans "Authorized JavaScript origins"
   - Ajoutez l'URL de callback Supabase (`https://[votre-projet].supabase.co/auth/v1/callback`) dans "Authorized redirect URIs"
4. Copiez le Client ID et le Client Secret
5. Dans le dashboard Supabase, allez dans Authentication > Providers > Google
6. Activez Google et collez vos identifiants

## Structure du projet

```
/src
  /lib          # Bibliothèques et configurations (Supabase)
  /pages        # Composants de page (Home, Profile, Login, NotFound)
  /store        # Gestion d'état avec Zustand
  /components   # Composants réutilisables (Header, Footer, PrivateRoute)
  /assets       # Assets (images, icônes, etc.)
  App.tsx       # Composant principal avec routage
  main.tsx      # Point d'entrée
```

## Fonctionnalités

### Authentification

- Connexion par email/mot de passe
- Inscription avec email/mot de passe
- Authentification avec Google
- Support multi-providers (prêt pour GitHub, Facebook, Twitter, etc.)
- Déconnexion
- Affichage des informations utilisateur dans le profil

### Interface utilisateur

- Design moderne et responsive avec TailwindCSS
- Mode sombre/clair avec bascule automatique selon les préférences système
- Navigation avec indicateur de page active
- Formulaires avec validation et retour visuel
- Indicateur de statut de connexion Supabase sur la page d'accueil
- Page 404 personnalisée avec redirection
- Layout avec sticky footer

### Routes protégées

Le composant `PrivateRoute` protège les routes qui nécessitent une authentification et redirige les utilisateurs non connectés vers la page de connexion avec un message explicatif.

## Démarrer l'application

```bash
npm run dev
# ou
yarn dev
```

L'application sera disponible sur `http://localhost:5173`.

## Déploiement

Pour construire l'application pour la production :

```bash
npm run build
# ou
yarn build
```

Les fichiers de production seront générés dans le dossier `dist`.

## Ressources

- [Documentation React](https://reactjs.org/docs/getting-started.html)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation TailwindCSS](https://tailwindcss.com/docs)
- [Documentation Zustand](https://github.com/pmndrs/zustand)
- [Documentation Vite](https://vitejs.dev/guide/)

