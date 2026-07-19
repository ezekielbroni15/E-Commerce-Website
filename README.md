# Exclusive E-Commerce

React + Vite implementation of the KodeCamp 6.0 Stage 6 e-commerce task.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill `.env` with your Firebase web app config:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Firebase Email/Password authentication must be enabled in the Firebase console.

## Implemented Requirements

- React Router routes for Home, Sign Up, Log In, Wishlist, Product Details, Cart, Checkout, Account, About, Contact, and 404.
- Firebase Auth sign up, login, logout, and auth state tracking.
- Sign up redirects to Log In after successful Firebase account creation.
- Redux Toolkit manages cart and wishlist state globally.
- Protected Cart, Wishlist, Checkout, Account page, and Account Dropdown through `withAuth`.
- Shared `useForm` validation for Sign Up, Log In, and Checkout billing fields.
- Shared `useAuth` hook contains the Firebase auth logic.
- Render-prop `Toggle` powers account dropdown state and wishlist heart state.

## Advanced Pattern Locations

- Custom hooks: `src/hooks/useAuth.js`, `src/hooks/useForm.js`
- Higher-Order Component: `src/hocs/withAuth.jsx`
- Render prop component: `src/components/Toggle.jsx`

## Build

```bash
npm run build
```
